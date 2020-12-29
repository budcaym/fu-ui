---
inject: true
to: src/index.ts
after: \n$
skip_if: export * from './<%= name %>'
---
export * from './<%= name %>'