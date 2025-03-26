import yaml from 'js-yaml';

export interface ComposeFileInfo {
    id: string;
    name: string;
    description: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export async function getComposeFiles(): Promise<ComposeFileInfo[]> {
    // Fetch the index of compose directories
    const indexResponse = await fetch('/docker-composes/index.json');
    const directories = await indexResponse.json() as string[];

    const composeFiles = await Promise.all(
        directories.map(async (dirName) => {
            try {
                // Fetch both files concurrently
                const [composeResponse, metadataResponse] = await Promise.all([
                    fetch(`/docker-composes/${dirName}/docker-compose.yml`),
                    fetch(`/docker-composes/${dirName}/metadata.yml`)
                ]);

                if (!composeResponse.ok || !metadataResponse.ok) {
                    return null;
                }

                const [composeContent, metadataContent] = await Promise.all([
                    composeResponse.text(),
                    metadataResponse.text()
                ]);

                // Parse metadata
                const metadata = yaml.load(metadataContent) as {
                    id: string;
                    name: string;
                    description: string;
                    category: string;
                };

                return {
                    id: metadata.id,
                    content: composeContent,
                    createdAt: new Date().toISOString(), // Use current date
                    updatedAt: new Date().toISOString(), // Use current date
                    ...metadata
                };
            } catch (error) {
                console.error(`Error loading compose file ${dirName}:`, error);
                return null;
            }
        })
    );

    return composeFiles.filter((file): file is ComposeFileInfo => file !== null);
}
