# Prisma Query's

Project to learn how to build a schema with Prisma and run all kind of query's.  

### To install the project
```
npm i
```

### Install dependencies
```
npm i -save-dev prisma typescript ts-node @types/node nodemon
```

### Assign postgresql as datasource
```
npx prisma init --datasource-provider postgresql
```

### Format schema file
```
npx prisma format
```

### Run first migration
```
npx prisma migrate dev --name init
```

### after modifications to schema re-run migration  
```
npx prisma migrate dev
```

### Install Prisma Client
```
npm i @prisma/client
```

### Run project
```
npm run dev
```