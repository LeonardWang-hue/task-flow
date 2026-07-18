# Security Policy

## Supported Versions

Only the latest version of TaskFlow receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

Please **do not** open public issues for security vulnerabilities.

Instead, email [luolei](https://github.com/luolei) directly or use GitHub's
[private vulnerability reporting](https://github.com/luolei/task-flow/security/advisories/new)
feature.

I will respond within 48 hours and work with you on a fix and coordinated disclosure timeline.

## Security Best Practices

- TaskFlow is a client-side application. All data is stored in the browser's `localStorage`.
- No data is ever sent to external servers.
- Always use the latest version of Node.js and keep dependencies up to date.
- Run `npm audit` regularly to check for known vulnerabilities in dependencies.
