# Branch Protection Rules Configuration

This document outlines the required branch protection rules to enforce code quality compliance.

## GitHub Repository Settings

### 1. Enable Branch Protection Rules

Go to your GitHub repository → Settings → Branches → Add rule

**Protected Branch Pattern:** `main` (or `master`)

### 2. Required Settings

#### Protect matching branches:
- [x] **Require a pull request before merging**
  - [x] Require approvals: `1`
  - [x] Dismiss stale PR approvals when new commits are pushed
  - [x] Require review from code owners (if CODEOWNERS file exists)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - **Required status checks:**
    - `code-quality (16.x)`
    - `code-quality (18.x)`
    - `code-quality (20.x)`

- [x] **Require conversation resolution before merging**

- [x] **Restrict pushes that create files**
  - [x] Restrict pushes to matching branches

#### Additional Options:
- [x] **Include administrators** (recommended)
- [x] **Allow force pushes** (unchecked - not recommended)
- [x] **Allow deletions** (unchecked - not recommended)

### 3. Repository Rules (Alternative/Additional)

You can also use the newer "Repository rules" feature:

1. Go to Settings → Rules → Rulesets
2. Create a new ruleset targeting `main` branch
3. Add these rules:
   - **Restrict creations, updates, and deletions**
   - **Require pull request**
   - **Require status checks**

## Enforcement Levels

### Level 1: Basic (Recommended for existing projects)
- ESLint warnings allowed but errors block merge
- Prettier formatting required
- At least 1 approval required

### Level 2: Strict (Recommended for new projects)
- Zero ESLint warnings or errors
- Perfect Prettier formatting
- All security audits must pass
- 2 approvals required

### Level 3: Maximum (For critical projects)
- All of Level 2 plus:
- Required code owner approval
- No force pushes allowed
- Conversation resolution required
- Signed commits required

## Commands for Manual Verification

Repository administrators can use these commands to verify compliance before approving PRs:

```bash
# Check ESLint compliance
npm run lint

# Check Prettier formatting
npm run format:check

# Auto-fix issues (for reviewers to suggest)
npm run lint:fix
npm run format

# Run full compliance check
npm run precommit
```

## Override Procedures (Emergency Only)

In case of critical hotfixes, administrators can:

1. Temporarily disable branch protection
2. Merge emergency fix
3. Immediately re-enable branch protection
4. Create follow-up PR to fix compliance issues

**Note:** All emergency overrides must be documented and followed up within 24 hours.
