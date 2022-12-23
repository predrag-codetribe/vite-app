# Getting started

Things to know:
- The minimum Node version is 16.
- `npm` is the default package manager.
- When exporting Page components, make sure to export as default(because we lazy load routes).

Commands:

### `npm run dev`

Starts the dev server.

### `npm run build`

Build the app.

### `npm run preview`

Launch the build app in a server for local preview.

### `npm run test`

Run tests through [vitest](https://vitest.dev/).

### `npm run lint`

Lint and fix auto-fixable ESLint problems.

### `npm prepare`

Ignore this, it is required only for the husky setup.

### `yarn translate`

This command will pull the latest translations from the [translations sheet](https://docs.google.com/spreadsheets/d/12hWS6eq6ISR51NqYbYN5pTpaX5EPZ-5zFwnE-8TxZoo/edit#gid=0) into the translations `./src/i18n/locales/{locale}.json` files.

Don't manually add translations to `./src/i18n/locales/{locale}.json` files!

Instead, add those translations directly to the [translation sheet](https://docs.google.com/spreadsheets/d/12hWS6eq6ISR51NqYbYN5pTpaX5EPZ-5zFwnE-8TxZoo/edit#gid=0) and then run `yarn translate`.
That will automatically pull the latest translations and override the `./src/i18n/locales/{locale}.json` files.

### `yarn find-unused-translations`

Gives you a list of unused translation keys.
