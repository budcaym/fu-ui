---
inject: true
to: src/allStyle/index.scss
after: \n$
skip_if: <%= name %>.scss
---
@import './<%= name %>.scss';