
export interface ComposeFile {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  stars: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
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

export const composeFiles: ComposeFile[] = [
  // Databases
  {
    id: "mysql",
    name: "MySQL",
    description: "MySQL database with phpMyAdmin",
    content: `version: '3.8'

services:
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
    ports:
      - "8080:80"
    depends_on:
      - db

volumes:
  mysql_data:`,
    category: "databases",
    tags: ["mysql", "database", "phpmyadmin"],
    stars: 425,
    downloads: 12045,
    createdAt: "2023-01-15",
    updatedAt: "2023-09-22"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "PostgreSQL database with pgAdmin",
    content: `version: '3.8'

services:
  db:
    image: postgres:14
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  postgres_data:`,
    category: "databases",
    tags: ["postgresql", "database", "pgadmin"],
    stars: 512,
    downloads: 9864,
    createdAt: "2023-02-10",
    updatedAt: "2023-10-05"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "MongoDB with MongoDB Express UI",
    content: `version: '3.8'

services:
  mongo:
    image: mongo:latest
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
      
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
    depends_on:
      - mongo

volumes:
  mongo_data:`,
    category: "databases",
    tags: ["mongodb", "database", "mongo-express"],
    stars: 378,
    downloads: 7325,
    createdAt: "2023-03-05",
    updatedAt: "2023-11-18"
  },
  
  // Web Servers
  {
    id: "nginx",
    name: "Nginx",
    description: "Nginx web server with configurable volume mounts",
    content: `version: '3.8'

services:
  nginx:
    image: nginx:latest
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/html:/usr/share/nginx/html
      - ./nginx/conf:/etc/nginx/conf.d
      - ./nginx/certs:/etc/nginx/certs
    environment:
      - NGINX_HOST=example.com
      - NGINX_PORT=80`,
    category: "web-servers",
    tags: ["nginx", "web-server", "http"],
    stars: 621,
    downloads: 18764,
    createdAt: "2023-01-20",
    updatedAt: "2023-09-15"
  },
  {
    id: "apache",
    name: "Apache",
    description: "Apache HTTP Server with PHP support",
    content: `version: '3.8'

services:
  apache:
    image: php:8.1-apache
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./www:/var/www/html
    environment:
      - APACHE_DOCUMENT_ROOT=/var/www/html`,
    category: "web-servers",
    tags: ["apache", "php", "http"],
    stars: 412,
    downloads: 8953,
    createdAt: "2023-02-12",
    updatedAt: "2023-10-12"
  },
  
  // Development Environments
  {
    id: "node",
    name: "Node.js",
    description: "Node.js development environment with hot reloading",
    content: `version: '3.8'

services:
  node:
    image: node:18
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - "3000:3000"
    command: npm run dev
    environment:
      - NODE_ENV=development`,
    category: "development",
    tags: ["node", "javascript", "development"],
    stars: 723,
    downloads: 22145,
    createdAt: "2023-01-05",
    updatedAt: "2023-10-25"
  },
  {
    id: "php",
    name: "PHP",
    description: "PHP development environment with Composer",
    content: `version: '3.8'

services:
  php:
    image: php:8.1-fpm
    volumes:
      - ./:/var/www/html
    depends_on:
      - db
      
  composer:
    image: composer:latest
    volumes:
      - ./:/app
    command: install
    
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: app
    volumes:
      - mysql_data:/var/lib/mysql
      
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php

volumes:
  mysql_data:`,
    category: "development",
    tags: ["php", "composer", "development"],
    stars: 456,
    downloads: 9876,
    createdAt: "2023-02-25",
    updatedAt: "2023-09-18"
  },
  
  // Message Brokers
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    description: "RabbitMQ message broker with management plugin",
    content: `version: '3.8'

services:
  rabbitmq:
    image: rabbitmq:3-management
    restart: always
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      - RABBITMQ_DEFAULT_USER=user
      - RABBITMQ_DEFAULT_PASS=password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

volumes:
  rabbitmq_data:`,
    category: "messaging",
    tags: ["rabbitmq", "messaging", "queue"],
    stars: 389,
    downloads: 7654,
    createdAt: "2023-03-10",
    updatedAt: "2023-11-05"
  },
  {
    id: "kafka",
    name: "Kafka",
    description: "Kafka with Zookeeper and Kafka UI",
    content: `version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"
    
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    depends_on:
      - kafka
    ports:
      - "8080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092
      KAFKA_CLUSTERS_0_ZOOKEEPER: zookeeper:2181`,
    category: "messaging",
    tags: ["kafka", "zookeeper", "streaming"],
    stars: 542,
    downloads: 8943,
    createdAt: "2023-02-20",
    updatedAt: "2023-10-15"
  },
  
  // Monitoring
  {
    id: "prometheus-grafana",
    name: "Prometheus & Grafana",
    description: "Monitoring stack with Prometheus and Grafana",
    content: `version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    restart: always
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
    ports:
      - "9090:9090"
      
  grafana:
    image: grafana/grafana:latest
    restart: always
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  prometheus_data:
  grafana_data:`,
    category: "monitoring",
    tags: ["prometheus", "grafana", "monitoring"],
    stars: 678,
    downloads: 14532,
    createdAt: "2023-01-25",
    updatedAt: "2023-09-30"
  }
];

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
