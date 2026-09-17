---
build:
  publishResources: false
  render: never
layout: footer
# This fragment becomes the <footer> page element via a partial.
# What you see here doesn't render as <table> elements; instead, each table
# becomes a column of the footer.

# The order you list the tables determines the order of the columns in the footer.
---

<!--
  hugo enforcestables must have a class
  https://gohugo.io/content-management/markdown-attributes/
  prettier puts a newline between those tables and classes

  if you adjust the tables you can temporarily remove the ignore, remove the
  newlines and re-add the ignores
-->
<!-- prettier-ignore-start -->
| Links  | URL / text                                      |
| ------ | ----------------------------------------------- |
| GitHub | https://github.com/controlplaneio/native-cloud/ |
{.footer-socials}

| Sponsors     | URL / text               | Level |
| ------------ | ------------------------ | ----- |
| ControlPlane | https://control-plane.io | 2     |
{.footer-sponsors}
<!-- prettier-ignore-end -->
