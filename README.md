# Desafio frontend

## Task description

> Desenvolva a tela abaixo, utilizando ReactJS. Ao clicar no canto superior direito (os 3 pontinhos marcados na tela), deverá aparecer o menu da imagem 2, com o checkbox clicável que controla quais colunas aparecem.
> Para os dados da tabela, utilize a API Fake [JsonPlaceholder](https://jsonplaceholder.typicode.com/) (rota `/users`)
>
> O que seria interessante:
>
> - Utilizar o Bootstrap / React bootstrap;
> - Utilizar Typescript;
> - Disponibilizar num repositório do Github;
> - Layout o mais parecido possível;
>
> O que seria incrível:
>
> - Documentação / Read.me bacana;
> - Testes unitários (Jest, React Testing Library...);

## About

This project for the *Desafio frontend* was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It was written with *TypeScript* and utilizes `bootstrap`, `react-bootstrap`, `react-icons`, and `sass`.

It consumes its data from [JsonPlaceholder](https://jsonplaceholder.typicode.com/) (route `/users`).

Don't forget that you can run its tests with `npm test` (written with *jest*) and with `npm run cypress:open` (*Cypress* E2E tests).

A sample of this project is online at <https://202206desafiofrontend.netlify.app/>.

## Installation

Just run `npm install` in the project directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open`

Launches the *Cypress* E2E test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
