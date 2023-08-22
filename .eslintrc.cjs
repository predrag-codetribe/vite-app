module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'tsconfigRootDir': __dirname,
    'project': ['./server/tsconfig.json', './client/tsconfig.json']
  },
  'ignorePatterns': ['.dev/**', '*.cjs', 'vite.config.ts', 'env.validate.ts', 'dist*', 'migrations*'],
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:storybook/recommended'],
  'overrides': [
    {
      'files': ['*.cjs'],
      'rules': {
        'no-undef': 'off'
      }
    },
    {
      'files': ['*.stories.tsx'],
      'rules': {
        'react/jsx-no-literals': 'off'
      }
    },
    {
      'files': ['server/src/app/model/**/*'],
      'rules': {
        '@typescript-eslint/indent': 'off',
      }
    }
  ],
  'plugins': ['@typescript-eslint', 'react', 'react-hooks'],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    //// JSX
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': '(useNoInitialEffect)' // '(useNoInitialEffect|useSomeOtherEffect)'
    }],

    'react/jsx-curly-spacing': ['warn', {
      'when': 'never'
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

    //// Layout & Formatting // https://eslint.org/docs/rules/#layout-formatting
    'no-multiple-empty-lines': ['error', {
      'max': 1
    }],
    'no-console': ['error', {
      'allow': ['warn', 'error']
    }],
    '@typescript-eslint/indent': ['error', 4],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/semi': ['error', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'no-multi-spaces': 'warn',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'operator-linebreak': ['error', 'before'],
    'rest-spread-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'wrap-iife': ['error', 'inside'],
    'wrap-regex': ['error'],
    'array-bracket-spacing': ['error', 'always', {
      'singleValue': false
    }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'always-multiline'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'max-statements-per-line': 'error',
    'new-parens': 'error',
    'space-infix-ops': ['error', {
      'int32Hint': false
    }],

    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': true,
        'minimumDescriptionLength': 25
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    //// Possible Problems // https://eslint.org/docs/rules/#possible-problems
    'array-callback-return': ['error'],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'require-atomic-updates': 'warn',

    //// Suggestions // https://eslint.org/docs/rules/#suggestions
    'consistent-this': 'error',
    'eqeqeq': 'error',
    'func-name-matching': 'error',
    'func-names': 'error',

    //// turn off
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // we have tsconfig noUnusedLocals enabled
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off'
  }
};