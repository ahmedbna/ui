# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 2.x     | ✅        |
| < 2.0   | ❌        |

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Email [hi@ahmedbna.com](mailto:hi@ahmedbna.com) with:

- What the issue is and where it lives (package and file, if known)
- Steps to reproduce it
- What an attacker could achieve

You can expect an acknowledgement within a few days, and an update on the fix
once the issue is confirmed. Please give us a reasonable window to ship a fix
before disclosing publicly.

## Scope notes

Two things are worth calling out about how BNA UI works:

- **`bna-ui add` fetches component source over HTTPS** from
  `https://ui.ahmedbna.com/r` and writes it into your project. Responses are
  cached under `~/.cache/bna-ui`. If you point `--registry` or
  `BNA_UI_REGISTRY` at a third-party host, you are executing that host's code —
  treat it with the same care as any dependency.
- **Components are copied into your project, not installed as a dependency.**
  Once added, they are your code; `bna-ui` will not silently update them, and
  security fixes reach you only when you re-run `add`.
