---
inject: true
to: src/allStyle/index.scss
skip_if: <%= name %>.scss
---
@import './<%= name %>.scss'