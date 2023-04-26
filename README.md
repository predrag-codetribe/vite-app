# Getting started

<!--toc:start-->
- [Getting started](#getting-started)
    - [Tech Stack and Libraries:](#tech-stack-and-libraries)
    - [Scripts:](#scripts)
      - [`npm run dev`](#npm-run-dev)
      - [`npm run build`](#npm-run-build)
      - [`npm run preview`](#npm-run-preview)
      - [`npm run test`](#npm-run-test)
      - [`npm run lint`](#npm-run-lint)
      - [`npm run lint-fix`](#npm-run-lint-fix)
      - [`npm run translate`](#npm-run-translate)
      - [`npm run find-unused-translations`](#npm-run-find-unused-translations)
      - [`npm run storybook`](#npm-run-storybook)
    - [Translations](#translations)
    - [Design system](#design-system)
    - [TailwindCSS](#tailwindcss)
    - [vite.config.js](#viteconfigjs)
    - [ESLint](#eslint)
    - [Husky](#husky)
    - [Tests](#tests)
    - [Context store](#context-store)
    - [Folder structure](#folder-structure)
    - [Things to Know](#things-to-know)
<!--toc:end-->



### Tech Stack and Libraries:
- React and TypeScript
- React Router Dom
- React Query
- TailwindCSS
- i18next
- Vite, Vitest, Eslint, Husky

### Scripts:

#### `npm run dev`

Starts the dev server.

#### `npm run build`

Build the app.

#### `npm run preview`

Launch the build app in a server for local preview.

#### `npm run test`

Run tests through [Vitest](https://vitest.dev/).

#### `npm run lint`

Lint files.

#### `npm run lint-fix`

Fix all auto-fixable ESLint problems.

#### `npm run translate`

This command generates the `./client/i18n/generatedLocales/{locale}.json` files.

Don't manually add translations to `./client/i18n/generatedLocales/{locale}.json` files!

#### `npm run find-unused-translations`

Gives you a list of unused translation keys.

#### `npm run storybook`

Open StoryBook documentation.

### Translations

The source of truth for the translations is this sheet:
https://docs.google.com/spreadsheets/d/1PWfDNHxkEBRknzssW5T7ihaiXDQFndJtxBr8AbWUxcU/edit#gid=0

1. Run `npm run translate` and the translations will be generated.

> NOTE 1: if you have conflicts in the code, just rerun `npm run translate`, as the source of truth is always `translations_sheet.csv`.

**How to remove translations?**

Do not remove them right away.
1. Mark the translation as @deprecated in the translation sheet. (put the string "@deprecated" somewhere in the translation sheet).
2. Remove all places in the code where the translation was used.
3. After the code was merged to `develop`, only then would be a good time to delete the translations from the sheet.

**Why don't delete translations right away?**

The front project has type-safety (the strings inside `t` are type-safe. `t("this_string_is_type_safe")`)
When working with a group of people or different branches, that can cause issues with TypeScript complaining that translations are missing, and the project cannot be compiled successfully.

### Design system

This project uses StoryBook to document components.
To view it, run `npm run storybook`.
To create a story file, make sure to add the `.stories.ts` extension.
See `Button.stories.tsx` for an example.

### TailwindCSS

This project uses TailwindCSS.
All configuration is in `tailwind.config.cjs`.

> NOTE: if you use https://github.com/tailwindlabs/tailwindcss-intellisense/ plugin. you can specify the following setting, to improve the DX experience:
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["classNames\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

### vite.config.js

Configures Vite to support TypeScript path aliases adds support for SVGR to enable the use of SVG's as in a Create React App, add's "vite-plugin-checker" that spans a new process to run type checking.

### ESLint

ESLint is used to lint and format the code.

> NOTE: Please make sure to disable other code format tools such as Prettier or Rome.

### Husky

Husky is used to:
- verify that all test pass before the code gets committed.
- verify that all code is formatted according to the ESLint rules before the code gets committed.
- validate the format of a commit message:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
See the list of valid "type" types in `commitlint.config.cjs`.
Example of valid messages:
```
fix(FUN-112): Use Big.js in order to have precise rounding
fix: Use Big.js in order to have precise rounding
```

### Tests

[Vitest](https://vitest.dev/) is used to create and run unit tests.
To create a test file, make sure to add the `.test.ts` extension.
Run `npm run test`, to run the unit tests.

### Context store

This repo doesn't have any store, it uses the [context API](https://beta.reactjs.org/reference/react/useContext) to share data across components.


### Folder structure

```
├── dist
│    └── This folder is generated when `npm run build` is run.
├── public
│    └── Contains public assets.
├── scripts
│    └── Contains scripts for translations.
├── src
│   ├── assets
│   ├── components
│   │    └── Contains reusable components.
│   ├── context
│   │    └── Contains contexts components.
│   ├── css
│   │    └── Contains css files.
│   ├── hooks
│   │    └── Contains hooks files.
│   ├── http
│   │    └── Contains axios instances. (for communication with the SwissBorg and Fundraising Backend)
│   ├── i18n
│   │    └── generatedLocales
│   │        └── Contains autogenerated files.
│   ├── pages
│   │    ├── SomePage
│   │    │      └── SomePage.tsx
│   │    └── SomeOtherPage
│   │           ├── components
│   │           │    └── Contains components that are not reusable, but strictly tied to a page.
│   │           └── SomeOtherPage.tsx
│   ├── router
│   └── utils - Contains utils functions.
├── package.json
├── postcss.config.cjs - Postcss Configuration required for Tailwind.
├── tailwind.config.cjs - Tailwind Configuration.
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts - Vite Configuration.
```

### Things to Know
- `npm` is the default package manager.
- When exporting Page components, make sure to export as default, because routes are lazy load.

### Debug the App

VS code debug configuration:
```
{
  "name": "ts-node",
  "type": "node",
  "request": "launch",
  "runtimeArgs": ["-r", "ts-node/register", "-r", "tsconfig-paths/register"],
  "args": ["${workspaceRoot}/server/src/index.ts"],
  "env": { "TS_NODE_PROJECT": "server/tsconfig.json" },
  "resolveSourceMapLocations": [
    "${workspaceFolder}/**",
    "!**/node_modules/**"
  ],
  "skipFiles": [
    "**/node_modules/**",
    "<node_internals>/**"
  ]
}
```

