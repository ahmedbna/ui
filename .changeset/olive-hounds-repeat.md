---
'bna-ui': patch
---

Let yarn write the lockfile it is being asked to create.

Yarn 2+ turns `enableImmutableInstalls` on whenever `CI` is set, and an
immutable install refuses to create or modify a lockfile. A project `init` has
just scaffolded has no lockfile at all — the very install being refused is the
one that would write it — so `bna-ui init --yarn` died on every CI runner and
inside every container:

```
➤ YN0028: The lockfile would have been created by this install, which is
          explicitly forbidden.
✗ Could not install dependencies in /tmp/e2e-install/app.
```

`bna-ui add` hit the same guard through `yarn add`, for the same reason.

Both install paths now spawn yarn with `YARN_ENABLE_IMMUTABLE_INSTALLS=false`.
Only yarn is touched — npm, pnpm and bun all create a missing lockfile without
complaint, and nothing here should be quietly relaxing a `--frozen` intent for a
manager that never had a problem.
