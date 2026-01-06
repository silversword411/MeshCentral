# Developer Commit Guide - MeshCentral

This guide ensures code quality and consistency across the MeshCentral project by enforcing ESLint and Prettier standards.

## Prerequisites

Before making commits, ensure you have the following tools installed and configured:

### 1. Node.js Installation

**MeshCentral requires Node.js 16.0.0 or higher.**

#### Windows Installation:
1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Choose the "LTS" (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Restart your terminal/PowerShell after installation
5. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

#### Alternative: Using Package Managers
- **Chocolatey**: `choco install nodejs`
- **Winget**: `winget install OpenJS.NodeJS`
- **Scoop**: `scoop install nodejs`

### 2. Required Dependencies

**After Node.js is installed**, install the following development dependencies:

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

For additional rules and compatibility:
```bash
npm install --save-dev eslint-plugin-node eslint-plugin-security @eslint/js
```

### 3. Global Tools (Optional but Recommended)

Install ESLint and Prettier globally for command-line access:

```bash
npm install -g eslint prettier
```

## Configuration Files

### 1. ESLint Configuration (`.eslintrc.js`)

Create an `.eslintrc.js` file in the project root:

```javascript
module.exports = {
    env: {
        node: true,
        es2021: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:security/recommended',
        'prettier'
    ],
    plugins: ['prettier', 'security'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script'
    },
    rules: {
        // Prettier integration
        'prettier/prettier': 'error',

        // Code quality rules
        'no-console': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-var': 'error',
        'prefer-const': 'error',

        // Node.js specific
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'error',
        'node/no-extraneous-require': 'error',

        // Security
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-fs-filename': 'warn',

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
```

### 2. Prettier Configuration (`.prettierrc.js`)

Create a `.prettierrc.js` file in the project root:

```javascript
module.exports = {
    semi: true,
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 256,
    tabWidth: 4,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    bracketSameLine: false,
    quoteProps: 'as-needed'
};
```

### 3. Prettier Ignore (`.prettierignore`)

Create a `.prettierignore` file:

```
node_modules/
agents/
public/scripts/
views/
*.min.js
dist/
build/
package-lock.json
*.md
```

## VS Code Configuration

### Workspace Settings (`.vscode/settings.json`)

Add these settings to your existing `.vscode/settings.json`:

```json
{
    // ESLint configuration
    "eslint.enable": true,
    "eslint.validate": ["javascript"],
    "eslint.format.enable": true,
    "eslint.lintTask.enable": true,

    // Prettier configuration
    "prettier.enable": true,
    "prettier.requireConfig": true,

    // Default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true,
    "editor.formatOnType": false,

    // Language-specific settings
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        }
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    // File associations
    "files.associations": {
        "*.js": "javascript"
    },

    // Auto-save settings
    "files.autoSave": "onFocusChange",

    // Line ending consistency
    "files.eol": "\n",

    // Trim whitespace
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true
}
```

### Recommended Extensions (`.vscode/extensions.json`)

Create or update `.vscode/extensions.json`:

```json
{
    "recommendations": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "ms-vscode.vscode-json",
        "streetsidesoftware.code-spell-checker"
    ]
}
```

## NPM Scripts

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "lint": "eslint *.js",
        "lint:fix": "eslint *.js --fix",
        "format": "prettier --write *.js",
        "format:check": "prettier --check *.js",
        "precommit": "npm run lint && npm run format:check",
        "dev:setup": "npm install && npm run lint:fix && npm run format"
    }
}
```

## Automated PR Compliance Checks

### GitHub Actions Integration

All pull requests are automatically checked for code quality compliance using GitHub Actions. The workflow runs on every PR and checks:

1. **ESLint Compliance** - Code must pass all ESLint rules
2. **Prettier Formatting** - Code must be properly formatted
3. **Security Audit** - Dependencies must pass security audit
4. **Multi-Node Testing** - Tests run on Node.js 16.x, 18.x, and 20.x

### PR Status Checks

Before a PR can be merged, it must pass all required status checks:
- ✅ `code-quality (16.x)` - ESLint and Prettier on Node 16
- ✅ `code-quality (18.x)` - ESLint and Prettier on Node 18
- ✅ `code-quality (20.x)` - ESLint and Prettier on Node 20

### Automated PR Comments

The GitHub Action will automatically comment on PRs with:
- **Lint results summary** (errors and warnings count)
- **Detailed error locations** with file names and line numbers
- **Rule violations** with specific ESLint rule names
- **Success confirmation** when all checks pass

### Branch Protection Rules

The main branch is protected with the following rules:
- Pull requests required before merging
- Status checks must pass before merging
- Branches must be up to date before merging
- Conversations must be resolved before merging

## Pre-commit Workflow

### 1. Install Git Hooks (Optional but Recommended)

Install husky for git hooks:

```bash
npm install --save-dev husky lint-staged
```

Add to `package.json`:

```json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.js": [
            "eslint --fix",
            "prettier --write",
            "git add"
        ]
    }
}
```

### 2. Manual Pre-commit Checklist

Before committing, run these commands:

```bash
# 1. Check for ESLint errors
npm run lint

# 2. Auto-fix ESLint issues
npm run lint:fix

# 3. Format code with Prettier
npm run format

# 4. Verify formatting
npm run format:check

# 5. Run the complete pre-commit check
npm run precommit
```

## Commit Guidelines

### Commit Message Format

Follow conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(webserver): add new authentication method

Implement OAuth2 integration for enhanced security.
Includes configuration options and error handling.

Fixes #123
```

### Code Quality Checklist

Before committing, ensure:

- [ ] All ESLint errors are resolved
- [ ] Code is formatted with Prettier
- [ ] No console.log statements in production code
- [ ] Proper error handling is implemented
- [ ] JSDoc comments for new functions
- [ ] No hardcoded credentials or sensitive data
- [ ] Code follows existing patterns in the codebase

### Common ESLint Fixes

**Unused Variables:**
```javascript
// ❌ Bad
function example(param1, param2) {
    return param1;
}

// ✅ Good
function example(param1, _param2) {
    return param1;
}
```

**Consistent Quotes:**
```javascript
// ❌ Bad
const message = "Hello World";

// ✅ Good
const message = 'Hello World';
```

**Proper Indentation:**
```javascript
// ❌ Bad
if (condition) {
  doSomething();
}

// ✅ Good
if (condition) {
    doSomething();
}
```

## Troubleshooting

### Node.js and npm Issues

1. **'npm' is not recognized**:
   - Node.js is not installed or not in PATH
   - Restart your terminal after installing Node.js
   - On Windows, ensure the installer added Node.js to PATH
   - Verify with: `where node` and `where npm`

2. **Permission errors on global installs**:
   ```powershell
   # Windows: Run PowerShell as Administrator, or use npx instead
   npx eslint --init
   ```

3. **Node.js version too old**:
   ```bash
   node --version  # Should be 16.0.0 or higher
   ```

### Common Issues

1. **ESLint and Prettier conflicts**: Ensure `eslint-config-prettier` is installed and included in your ESLint extends array.

2. **VS Code not formatting on save**: Check that the Prettier extension is enabled and set as the default formatter.

3. **Git line ending issues**: Ensure consistent line endings with:
   ```bash
   git config core.autocrlf false
   ```

### Emergency Override

If you need to commit code that doesn't pass linting (emergency situations only):

```bash
git commit --no-verify -m "emergency: critical hotfix"
```

**Note**: This should be followed immediately by a cleanup commit that fixes the linting issues.

## Resources

- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

*This guide ensures code consistency and quality across the MeshCentral project. Please follow these guidelines for all contributions.*
