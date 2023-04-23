module.exports = {
  extends: ['./eslint/vue.js'],
  rules: {
    'max-len': [
      'warn', {
        code: 100,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
}
