import { ComposeFileInfo, getComposeFiles } from './fs';

export interface ComposeFile extends ComposeFileInfo {
  tags: string[];
  stars: number;
  downloads: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

// Sample data
export const categories: Category[] = [
  {
    id: "databases",
    name: "Databases",
    description: "SQL, NoSQL, Graph, and Time-Series databases",
    icon: "database",
    color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    count: 8
  },
  {
    id: "web-servers",
    name: "Web Servers",
    description: "Nginx, Apache, Caddy, and other HTTP servers",
    icon: "server",
    color: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    count: 5
  },
  {
    id: "development",
    name: "Development",
    description: "PHP, Node.js, Java, Python, and other environments",
    icon: "code",
    color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    count: 12
  },
  {
    id: "messaging",
    name: "Message Brokers",
    description: "RabbitMQ, Kafka, NATS, and other messaging systems",
    icon: "mail",
    color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    count: 4
  },
  {
    id: "monitoring",
    name: "Monitoring",
    description: "Prometheus, Grafana, ELK Stack for monitoring",
    icon: "activity",
    color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
    count: 6
  },
  {
    id: "orchestration",
    name: "Orchestration",
    description: "Docker Swarm, Kubernetes, and management tools",
    icon: "layers",
    color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
    count: 3
  }
];

// Change from let to export let so it can be imported
export let composeFiles: ComposeFile[] = [];

// Initialize with some default data until real data is loaded
composeFiles = [
  {
    id: "default",
    name: "Loading...",
    description: "Loading compose files...",
    content: "",
    category: "databases",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    stars: 0,
    downloads: 0
  }
];

export async function initializeData() {
  const files = await getComposeFiles();

  // Update the exported array directly
  composeFiles.length = 0; // Clear existing items
  composeFiles.push(...files.map(file => ({
    ...file,
    tags: [],
    stars: 0,
    downloads: 0
  })));
}

// Helper functions
export const getComposeFilesByCategory = (categoryId: string): ComposeFile[] => {
  return composeFiles.filter(file => file.category === categoryId);
};

export const getComposeFileById = (id: string): ComposeFile | undefined => {
  return composeFiles.find(file => file.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const searchComposeFiles = (query: string): ComposeFile[] => {
  const lowercaseQuery = query.toLowerCase();
  return composeFiles.filter(file =>
    file.name.toLowerCase().includes(lowercaseQuery) ||
    file.description.toLowerCase().includes(lowercaseQuery) ||
    file.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
