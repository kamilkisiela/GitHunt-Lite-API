# GitHunt Lite API

## How to start

### Install

```
npm install
```

### Initialize

```
npm run migrate
npm run seed
```

or

```
npm run clean
```

It removes the old database and creates a new one by running `migrate` and `seed`.

### run

```
npm start
```

## SQL data structure

### comments

```ts
id: number
created_at: Date
posted_by: string
content: string
repository_name: string
```

### entries

```ts
id: number
repository_name: string
created_at: Date
posted_by: string
```

## GitHub API - mock up

### Repositories

All available repositories are available in `mocks/github/data.json`.

- d3/d3
- angular/angular
- angular/angular.js
- jquery/jquery
- facebook/react
- and more...

### Data structure

```ts
name: string
owner: string
description: string
url: string
stars: number
issues: number
```

### Model

```ts
GitHub.repository(owner: string, name: string): Object
```