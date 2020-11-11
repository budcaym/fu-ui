---
inject: true
to: src/allStyle/index.scss
after: \z
skip_if: <%= name %>.scss
---
@import './<%= name %>.scss';