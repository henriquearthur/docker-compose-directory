import { ComposeFileInfo, getComposeFiles } from './fs';

export interface ComposeFile extends ComposeFileInfo {
  tags: string[];
}

export let composeFiles: ComposeFile[] = [];

composeFiles = [
  {
    id: "default",
    name: "Loading...",
    description: "Loading compose files...",
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: []
  }
];

export let dataInitialized = false;

export async function initializeData() {
  if (dataInitialized) return;

  try {
    const files = await getComposeFiles();
    composeFiles.length = 0;
    composeFiles.push(...files.map(file => ({
      ...file,
      tags: []
    })));
    dataInitialized = true;
  } catch (error) {
    console.error('Failed to initialize data:', error);
    throw error;
  }
}

export const getComposeFileById = async (id: string): Promise<ComposeFile | undefined> => {
  if (!dataInitialized) {
    await initializeData();
  }
  return composeFiles.find(file => file.id === id);
};

export const searchComposeFiles = (query: string): ComposeFile[] => {
  const lowercaseQuery = query.toLowerCase();
  return composeFiles.filter(file =>
    file.name.toLowerCase().includes(lowercaseQuery) ||
    file.description.toLowerCase().includes(lowercaseQuery)
  );
};
