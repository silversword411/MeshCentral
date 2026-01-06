module.exports = {
    env: {
        node: true,
        es2021: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script'
    },
    rules: {
        // Code quality rules
        'no-console': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-var': 'error',
        'prefer-const': 'error',

        // Style consistency
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'curly': 'error',
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'max-len': ['warn', { code: 256 }]
    },
    ignorePatterns: [
        'node_modules/',
        'agents/',
        'public/scripts/',
        'views/',
        '*.min.js',
        'dist/',
        'build/'
    ]
};
