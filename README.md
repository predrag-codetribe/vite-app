# Getting started

> make sure to use npm
> make sure to use node v18
- `package.json` -> `engines` -> `node` - specify the correct version to be used for development and production (local and in CI).
- `package.json` -> `devDependencies` -> `@types/node` - the major and minor versions should correspond to `node -v` major and minor versions.

1. Run `npm install`
2. Create a .env file based on .env.example.
3. Setup DB.
4. Execute the following SQL code on the database:
- `./server/resources/db-schema.sql`
5. Start the app in development mode. `npm run dev` or start the app for production `npm start`.


<!--toc:start-->
- [Getting started](#getting-started)
    - [Tech Stack and Libraries:](#tech-stack-and-libraries)
    - [Scripts:](#scripts)
      - [`npm run dev`](#npm-run-dev)
      - [`npm run build`](#npm-run-build)
      - [`npm start`](#npm-start)
      - [`npm run test`](#npm-run-test)
      - [`npm run lint`](#npm-run-lint)
      - [`npm run lint-fix`](#npm-run-lint-fix)
      - [`npm run translate`](#npm-run-translate)
      - [`npm run find-unused-translations`](#npm-run-find-unused-translations)
      - [`npm run storybook`](#npm-run-storybook)
      - [`npm run create-usecase [DIR_NAME] [FILENAME]`](#npm-run-create-usecase-dirname-filename)
    - [Translations](#translations)
    - [Design system](#design-system)
    - [TailwindCSS](#tailwindcss)
    - [vite.config.js](#viteconfigjs)
    - [ESLint](#eslint)
    - [Husky](#husky)
    - [Tests](#tests)
    - [Things to Know](#things-to-know)
    - [Debug the App](#debug-the-app)
    - [Folder structure](#folder-structure)
    - [Logging](#logging)
    - [Dependency versioning](#dependency-versioning)
    - [Adding env variables](#adding-env-variables)
    - [Creating a model](#creating-a-model)
    - [Services](#services)
    - [TypeORM Quirks](#typeorm-quirks)
      - [Breaking changes](#breaking-changes)
      - [@OneToOne and @ManyToMany](#onetoone-and-manytomany)
      - [Avoid using TypeORM `Repository`, `Manager`, or ANY transaction decorator](#avoid-using-typeorm-repository-manager-or-any-transaction-decorator)
      - [Avoid using eager/lazy loading](#avoid-using-eagerlazy-loading)
      - [@Entity default values](#entity-default-values)
      - [Avoid relation property initializers](#avoid-relation-property-initializers)
      - [.findOne](#findone)
      - [.softDelete](#softdelete)
    - [TypeScript](#typescript)
      - [Enums](#enums)
    - [Avoid creating modules with side effects](#avoid-creating-modules-with-side-effects)
<!--toc:end-->

### Tech Stack and Libraries:
- React and TypeScript
- React Router Dom
- React Query
- TailwindCSS
- i18next
- Vite, Vitest, Eslint, Husky, Storybook
- Express
- TypeOrm
- Zod

### Scripts:

#### `npm run dev`

Starts the dev server.

#### `npm run build`

Build the dist/ folder for the client and server app for production.

#### `npm start`

Start the build production server.

#### `npm run test`

Run tests through [Vitest](https://vitest.dev/).

#### `npm run lint`

Lint files.

#### `npm run lint-fix`

Fix all auto-fixable ESLint problems.

#### `npm run translate`

This command generates the `./client/src/i18n/generatedLocales/{locale}.json` files.

Don't manually add translations to `./client/src/i18n/generatedLocales/{locale}.json` files!

#### `npm run find-unused-translations`

Gives you a list of unused translation keys.

#### `npm run storybook`

Open StoryBook documentation.

#### `npm run create-usecase [DIR_NAME] [FILENAME]`

Will create a template file in `server/src/app/usecase/[DIR_NAME]/[FILENAME]`.

To create a new use case run `npm run create-usecase DIR_NAME FILENAME`
- `DIR_NAME` - directory inside `src/app/usecases` to create the usecase in (must exist)
- `FILENAME` - name of new use case


UseCase represents one feature, and one API endpoint.

These implementations should be endpoint specific and **NOT** reused - if you need some reusable logic, define it in the [Services](#services) or some other appropriate utility and reuse it from there.

### Translations

The source of truth for the translations is this sheet:
https://docs.google.com/spreadsheets/d/1PWfDNHxkEBRknzssW5T7ihaiXDQFndJtxBr8AbWUxcU/edit#gid=0

1. Run `npm run translate` and the translations will be generated.

> NOTE 1: if you have conflicts in the code and they are all regarding translations files, just rerun `npm run translate`, as the source of truth is always sheet.

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

Configures Vite to support TypeScript path aliases adds support for SVGR to enable the use of SVG's as in a Create React App, add's "vite-plugin-checker" that spans a new process to run type checking. Setups HMR for Express server for local development.

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
See the list of valid "type" types in `package.json > commitlint > type-enum`.
Example of valid messages:
```
fix(FUN-112): Use Big.js in order to have precise rounding
fix: Use Big.js in order to have precise rounding
```

### Tests

[Vitest](https://vitest.dev/) is used to create and run unit tests.
To create a test file, make sure to add the `.test.ts` extension.
Run `npm run test`, to run the unit tests.

### Things to Know
- `npm` is the default package manager.

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

### Folder structure

```
├── README.md
├── dist
│    ├── client
│    ├── server
│    ├── shared
│    └── This folder is generated when `npm run build` is run.
├── client
│   ├── public
│   │    └── Contains public assets.
│   └── src
│       ├── assets
│       ├── components
│       │    └── Contains reusable components.
│       ├── context
│       │    └── Contains contexts components.
│       ├── hooks
│       ├── http
│       ├── i18n
│       │    └── generatedLocales
│       │        └── Contains autogenerated files.
│       ├── layout
│       ├── main.tsx
│       ├── override-types.d.ts
│       ├── pages
│       │    ├── SomePage
│       │    │      └── SomePage.tsx
│       │    └── SomeOtherPage
│       │           ├── components
│       │           │    └── Contains components that are not reusable, but strictly tied to a page.
│       │           └── SomeOtherPage.tsx
│       ├── router
│       └── utils
├── index.html - Vite entry point
├── package.json
├── server
│   └── TODO: document this
├── shared
│   └── protocol.ts
├── tailwind.config.cjs
├── tsconfig.json
├── tsconfig.shared.json - TSconfig options shared by frontend and backend.
└── vite.config.ts
```

### Logging

Logging from `UseCase` is always done with `ctx.logger`. In doing so, we assure that request's data will be embedded in the log.

Otherwise, logging is done directly through `LogOutput`.

`LogOutput` abstracts the logger from the rest of the application, and enables us to switch the logging backend easily.

ATM, `winston` is used for logging.

All logs are routed to `stdout`, letting the environment handle them. https://12factor.net/logs.

### Dependency versioning

Dependencies are always specified as exact version (**no carets or tildas**) to ensure a deterministic build every time.

Updating dependencies is up to the developer - CHANGELOG.md of the dependency should be carefully reviewed and then updated to the appropriate version.

Tip: Use [npm-gui](https://www.npmjs.com/package/npm-gui)

Tip: Use Snyk to evaluate each dependency, for example [https://snyk.io/advisor/npm-package/axios](https://snyk.io/advisor/npm-package/axios) . Other packages are easily accessed by updating the package name in the last part of the URL.

### Adding env variables

1. Add the variable to your local `.env`
2. Add the variable to `.env.example`
4. Add schema validation in `vite.config.ts`
5. After this, the TypeScript will allow you to access the variable anywhere like `process.env.VARIABLE_NAME` or in `import.meta.env.VITE_APP_VARIABLE_NAME`.
6. Be sure to notify your devops to update the `.env` file on development, staging, and production.

### Creating a model

1. Create a TypeOrm [entity](https://typeorm.io/entities) in `server/src/app/model`
2. No need to add the entity to `databse/TypeOrmConfig.ts` to `entities`, because they are automatically loaded.
3. Create a migration file with `npm run migrate create this is migration name` (see `ARCHITECTURE.md` for more info)

### Services

Services are different from `UseCase`s:

- services are created for reusability, `UseCase` is never reused
- services have no special form/type/interface, they are simple functions, contrary to `UseCase` which is a type of implementation

**Important** - only when reusability is needed, create a service in `src/app/services`, otherwise do the logic in a `UseCase`. Creating a service for every feature violates YAGNI and leads to creating proxy `UseCase`s which only wrap a service call, in hope that we'll reuse the service someday.

If the service operates with the database, the first argument to all functions is `t: TypeOrmEntityManager` which gives the control of the transaction to the function caller.

### TypeORM Quirks

#### Breaking changes

TypeORM is currently ([v0.3.x](https://github.com/typeorm/typeorm/pull/8616)) having a lot of breaking changes, and is due to have more in the next version ([v0.4.x](https://github.com/typeorm/typeorm/issues/3251)).

#### @OneToOne and @ManyToMany
Not really an issue, just lack of control and proper documentation for OneToOne and ManyToMany relationships led me to avoid it and develop all relationships as OneToMany/ManyToOne, with a join table as an @Entity in case of @ManyToMany.

Another argument is that OneToOne and ManyToMany relationships don't exist in the relational sense, but foreign keys map to ManyToOne perfectly.

#### Avoid using TypeORM `Repository`, `Manager`, or ANY transaction decorator
Correct ways of using transactions:

- UseCase transaction (preferred) - use `t` injected to all UseCases as a second argument of the `.execute` method.
- global connection - import `db` and use it like `db.transaction(t => ...)`

#### Avoid using eager/lazy loading
Avoid using eager and lazy relations ([see here](https://typeorm.io/eager-and-lazy-relations)). Lacks control and makes the code more complex - always specify relations to load at query time.
Also, set possible for deprecation by the package owner/maintainer.

#### @Entity default values
Do not declare default values of fields in Entity classes because not-selected columns will assume those default values (when partially selecting).

#### Avoid relation property initializers
Here is a very nice [explanation](https://typeorm.io/relations-faq#avoid-relation-property-initializers) of this issue.
Also, to extend this rule, do not use initializers on neither relations nor properties (columns).

**Deprecated**

Following are the issues from `v0.2`, but should be resolved in currently used `v0.3`. They are kept here, just in case.

#### .findOne
When using `.findOne()` or `.findOneOrFail()`, be sure to pass in the id like this `.findOneOrFail({where: {id: userId}})` instead of like this `.findOneOrFail(userId)`.

Using the latter (wrong) format causes the TypeORM to pull the first entity from the table if the id provided is `null` or `undefined`, the logic being that `null` or `undefined` means "apply no filters, just pull one entity".

#### .softDelete
When using `.softDelete` be sure to pass in **just the id** `userRepo.softDelete(user.id)` rather than the whole entity `userRepo.softDelete(user)`.

Passing in the whole entity causes TypeORM to generate an UPDATE query with one WHERE clause **for each** property of the entity, meaning that if any property changed the entity would not be updated (soft-deleted).
**Deletion should be done strictly by entity's id (primary key).**

### TypeScript

TypeScript -- a story so big it deserves a file of its own.

Resources:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- O'Reilly - Effective TypeScript

A lot of rules are enforced by `tsconfig.json`, as well as `.eslintrc` (linter tool) -- we rely on those mainly to ensure code consistency and, to some degree, prevent programming errors.

#### Enums

As enums are poorly implemented in TypeScript (see [this](https://www.reddit.com/r/typescript/comments/j3vp9d/should_i_use_enums_or_strings/) discussion for example), use string unions to represent types like this:
```typescript
export type Pet = typeof Pets[number]
export const Pets = ['CAT', 'DOG', 'PARROT', 'TURTLE'] as const
export const isPet = (value: unknown): value is Pet => Pets.includes(value as Pet)
```
The above gives us both type and a runtime array of all values, without duplicating the code.

### Avoid creating modules with side effects

Avoid creating modules who's importing leads to side effects (e.g. initializing objects or connections on module's top level), rather export functions which do said behavior, therefore giving the caller the control of when the module's logic will be executed.
