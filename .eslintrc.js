module.exports = {
    root: true,
    "env": {
        "browser": true,
        "node": true
    },
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'standard',
    rules: {
        "indent": ["error", 4]
    },
    plugins: [
        'html'
    ],
    globals: {
        "require": true
    }
}
