# Lab Pages

## Layouts

Lab pages should derive from `layouts/page.njk` when possible.

For stand-alone/interactive pages that need full control of the page body, it is acceptable to derive from `layouts/base.njk` instead. In that case, the visual style defined in `content/css/styles.less` should be adhered to (colors, fonts, spacing, etc.).
