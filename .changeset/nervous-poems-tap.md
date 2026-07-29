---
'bna-ui': minor
---

Add `bna-ui convex --no-auth`, a Convex scaffold with no authentication.

`bna-ui convex` previously had one shape: a Convex backend with `@convex-dev/auth`
wired in — Google, Apple, password and email OTP — and no way to opt out. Getting
a plain Convex backend meant scaffolding the auth starter and deleting six
sign-in screens, eight `convex/` modules and seven npm dependencies.

`--no-auth` now scaffolds a backend-only variant: a `tasks` table, a live query
and the mutations behind it, rendered on the home tab so the first run shows the
backend working. `ConvexProvider` replaces `ConvexAuthProvider`, and the only
dependency added over the plain Expo starter is `convex`.

Bare `npx bna-ui convex` is unchanged and still produces the full auth setup. It
also now prints the `AUTH_RESEND_KEY` command on completion — email OTP and
password reset fail silently without it, and nothing in the flow asked for it
before.
