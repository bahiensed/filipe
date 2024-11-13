# Jest

Jest is an open-source JavaScript testing framework developed by Facebook. It is designed to be simple, intuitive, and easy to use, making it a popular choice for testing JavaScript applications, particularly those built with React.  

## Install

1. Install Jest testing framework

```bash
npm install --save-dev jest
```

2. Install type definitions for Jest

```bash
npm install --save-dev @types/jest
```

3. Install `ts-jest`, a Jest transformer for TypeScript  
https://jestjs.io/docs/getting-started#using-typescript  

```bash
npm install --save-dev ts-jest
```

4. Init `ts-jest`. This will create `jest.config.js` file

```bash
npx ts-jest config:init
```


## Run Test

1. Add `jest` script in package.json:  

```bash
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
```

2. Run test:  

```bash
npm test
```

3. Add all other `jest` scripts in package.json:  

```bash
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:debug": "jest --watchAll --debug",
    "test:watch": "jest --watchAll"
  },
```

4. Run, for example, test:watch  

```bash
npm test:watch
```


## Test File Anatomy

```bash
///tests/name.test.js

// test("Nome do Teste", Callback Function)

test("Teste", () => {
  expect(code/softcoded).toBe(value/hardcoded)
})

```


# Docker

Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers.  

Docker is a tool that is used to automate the deployment of applications in lightweight containers so that applications can work efficiently in different environments in isolation.  

Docker can package an application and its dependencies in a virtual container that can run on any Linux, Windows, or macOS computer.  


## Install

### Install Docker using the apt repository
https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository  

1. Set up Docker's `apt` repository.  

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Install the Docker packages.  

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


### Manage Docker as a non root user
https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user  

```bash
sudo usermod -aG docker $USER
newgrp docker
```


## Docker Environment Overview

```bash
                 dockerhub
                     |
    Docker File —— Image —— Container
```


### Docker Image

Docker images are on [Docker Hub](https://hub.docker.com)  
When available, use Alpine (Linux) versions  

#### Examples:

- [MySQL](https://hub.docker.com/_/mysql)
- [Node](https://hub.docker.com/_/node)
- [PostgreSQL image](https://hub.docker.com/_/postgres)
- [Ubuntu image](https://hub.docker.com/_/ubuntu)


## Docker Config

### Create compose.yaml file

```bash
services:
  database:
    image: 'postgres:17-alpine'
    env_file:
      - .env
    #environment:
      #POSTGRES_PASSWORD: 'local_password'
    ports:
      #  host:container
      - '5432:5432'

```


## Docker Container Commands

1. Start:
```bash
docker compose up --detach
```

2. Reload:
```bash
docker compose up --detach --force-recreate
```

3. Stop:
```bash
docker compose down
```

4. List running instances:
```bash
docker ps --all
```


## PostgreSQL Client (psql)

### Install PostgreSQL Client

```bash
apt install postgresql-client
```


### Connect to Docker PostgreSQL Instance

```bash
psql --host=localhost --username=postgres --port=5432
```


## pg

Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.  

### Install pg

1. Install pg

```bash
npm install pg
```

2. Install type definitions for pg

```bash
npm install --save-dev @types/pg
```
