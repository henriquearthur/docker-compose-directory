# Docker Compose Directory

A curated collection of ready-to-use Docker Compose configurations for popular development tools and services. This repository aims to provide a comprehensive library of Docker Compose files to help developers quickly set up their development environment.

Check it out on [docker-compose.directory](https://docker-compose.directory/)

## Contributing

We welcome contributions! Help us keep this library up-to-date and comprehensive.

### How to Add a New Docker Compose Configuration

1. Create a new directory under `public/docker-composes/[service-name]`
2. Add two files:
   ```
   docker-compose.yml  # Your Docker Compose configuration
   metadata.yml       # Service metadata
   ```

3. The `metadata.yml` should follow this format:
   ```yaml
   id: [service-name]
   name: [Display Name]
   description: [Brief description of the service]
   ```

4. Add your service name to `public/docker-composes/index.json`

5. Create a pull request with your changes

### Guidelines for Contributions

- Keep configurations simple and focused
- Include necessary documentation and default values
- Use official Docker images when possible
- Follow the existing file structure
- Test your configuration before submitting

## License

This project is open source and available under the MIT License.
