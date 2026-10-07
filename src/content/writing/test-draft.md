---
title: "Writing pipeline test"
description: "A draft fixture for validating Markdown, collection metadata, and article routes."
date: 2026-10-07
updatedDate: 2026-10-07
tags:
  - test
draft: true
---

This article is only a test of the Writing collection. It is not intended for publication.

## Markdown rendering

The collection supports **emphasis**, [internal links](/research/), and lists:

- Write the article in Markdown.
- Review its facts and wording.
- Set `draft: false` only when it is ready for publication.

```text
Local Markdown → Astro Content Collection → static HTML
```
