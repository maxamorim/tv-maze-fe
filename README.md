# About the project

Built on Vue 3 with Vite.
Node version: v18.14.2
npm version: 9.5.0

- I picked up Vue for being a clear and lightweight framework, it shows how clean the architecture and code looks like. Vue has a strong community which helps and developers are stuck with something. I also like the freedom that the framework provides, how easy it is to implement libraries and custom plugins.
- I choose to use a minimalistic approach with smaller components and clear separation, strongly following [Vue style guide](https://vuejs.org/style-guide/). 
- I am using Pinia state management for being lightweight and straight forward state management solution, with this I can decouple components, avoiding entanglements in case the application scales. 
- For http calls, I choose axios for being a strong and robust library. It is well known in the community, and has good documentation.
- For unit tests I am using the default library from Vue, vitest. I tried to keep coverage up to 80%. However, did not have time to cover television.service.ts

#### Possible points of improvement:

- If I had more time, I would invest time improvind the axios error handling. I do not like the code repetition there, I believe this could be solved with interceptors, so I wouldn't have to duplicate code.
- Implement new features such as: Individual cast page, episodes page, clickable genres under show details, related shows.
- Investigate edgy scenarios, such as empty search or redirections.
- Come up with a better design for mobile, it is not bad, but could have been better.

All details on how to run, build and test the project, can be found below.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Unit Tests coverage

```sh
npm run coverage
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
