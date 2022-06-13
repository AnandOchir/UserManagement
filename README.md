# DENTAL BACK END

> ### `Code structure`

### 1. Back End

The main code will be inside `./back/index.ts`.
Added to that there is also 2 main folders, which are `models` and `resolvers`.

Inside `models` you can find all schemas, for example: `group.ts, user.ts etc...`

Same as that `mutations, typedefs, queries` will include all the mutations, typeDefs and queries.

> ### `How to start backend`
>
> First of all you have to install the dependencies

```zsh
yarn
```

You can start the backend server in local simply by

```zsh
yarn start
```

you have to have nodemon globally.

If server has started successfully, there will be `console.log` that says

```zsh
🚀  Server ready at http://localhost:4000/
MongoDB database connection established successfully
```

you can communicate directly to server with `http://localhost:4000/`

or simply you can communicate directly with

```zsh
backend: https://user-management-ten.vercel.app
```

### 2. Front End

The main code will be inside `./front`.
The main folder is `src`

Inside `src` you can see all the `components`, `pages`, `icons` and `graphql` folders.


> ### `How to start frontend`
>
> First of all you have to install the dependencies

```zsh
yarn
```

You can start the frontend server in local simply by

```zsh
yarn start
```

you can communicate directly to server with `http://localhost:3000/`

or simply you can communicate directly with

```zsh
frontend: https://usermanagement-nest.web.app/
```