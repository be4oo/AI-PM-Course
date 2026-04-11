# Promptfoo Setup Notes (Sanitized)

This file previously contained a live API token and login command.
The secret has been removed.

## Secure setup

1. Generate a new Promptfoo API token in Promptfoo dashboard.
2. Store it in your shell (do not commit):

```bash
export PROMPTFOO_API_KEY="<your_new_promptfoo_token>"
```

3. Login via CLI:

```bash
npm run promptfoo:login
```

4. Share eval results (after login):

```bash
npx promptfoo@latest share
```

## Repo policy

- Never commit raw API keys into markdown or source files.
- Keep secrets in environment variables or a local untracked `.env` file.
