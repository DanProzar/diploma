module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    './typescript.js',
  ],

  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],

  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',

    '@typescript-eslint/no-unused-vars': 'off',

    'import/order': ['error', {
      pathGroups: [
        {
          pattern: '#*', // nuxt pattern
          group: 'external',
          position: 'before',
        },
        {
          pattern: '~~*', // nuxt pattern
          group: 'internal',
          position: 'before',
        },
      ],
    }],
    'vue/no-v-html': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['warn', {
      singleline: 2,
      multiline: 1,
    }],
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/component-tags-order': ['error', {
      order: ['docs', 'script', 'template', 'style'],
    }],
  },
}
