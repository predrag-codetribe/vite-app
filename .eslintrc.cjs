module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true
  },
  'ignorePatterns': ['.dev/**', "*.cjs", "vite.config.ts", "dist*"],
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:storybook/recommended'],
  'overrides': [{
    'files': ['*.cjs'],
    'rules': {
      'no-undef': 'off'
    }
  },{
    'files': ['*.stories.tsx'],
    'rules': {
      'react/jsx-no-literals': 'off'
    }
  }],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'tsconfigRootDir': __dirname,
    'project': ['./tsconfig.json', './tsconfig.shared.json', './server/tsconfig.json']
  },
  'plugins': ['@typescript-eslint', 'react', 'react-hooks'],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': '(useNoInitialEffect)' // '(useNoInitialEffect|useSomeOtherEffect)'
    }],

    'no-multiple-empty-lines': ['error', {
      'max': 1
    }],
    'no-console': ['error', {
      'allow': ['warn', 'error']
    }],
    '@typescript-eslint/indent': ['error', 4],
    'quotes': ['error', 'single'],
    'jsx-quotes': ["error", "prefer-single"],
    '@typescript-eslint/semi': ['error', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'react/jsx-curly-spacing': ['warn', {
      'when': 'never'
    }],
    'no-multi-spaces': 'warn',
    'array-bracket-spacing': ['error', 'always', {
      'singleValue': false
    }],
    'space-infix-ops': ['error', {
      'int32Hint': false
    }],
    'react/jsx-tag-spacing': ['warn', {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'allow'
    }],
    'react/jsx-closing-bracket-location': ['warn', {
      'selfClosing': 'after-props',
      'nonEmpty': 'after-props'
    }],
    'react/jsx-max-props-per-line': ['warn', {
      'maximum': 1
    }],
    'react/jsx-no-literals': ['warn', {
      'noStrings': false,
      'allowedStrings': [],
      'ignoreProps': true,
      'noAttributeStrings': false
    }],
    '@typescript-eslint/strict-boolean-expressions': ['error', {
      'allowNullableString': true,
      'allowNullableNumber': true
    }],
    // turn off
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off'
  }
};