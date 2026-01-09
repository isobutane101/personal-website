# Website Maintenance Notes

This file documents recurring issues and their fixes for Claude Code to reference.

---

## Issue #1: Zoom Reset When Navigating Between Pages

**Symptom:** When navigating from one page to another (e.g., landing page to blog, blog to post), the browser zoom resets or the page appears to zoom out.

**Root Cause:** Inconsistent CSS `text-size-adjust` and `font-size` settings across different stylesheets.

**Fix:** ALL CSS files must have this exact rule on the `html` selector:

```css
html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
}
```

**Files that need this rule:**
- `css/custom.css`
- `css/theme.css`
- `css/styles.css`
- `blog/styles.css`
- `blog/post.css`
- `photos/styles.css`
- `invision/styles.css`
- `emergency-preparedness/styles.css`

**Prevention:** When creating new pages with their own CSS, always include this rule.

---

## Issue #2: Broken Internal Links (.html extensions)

**Symptom:** Links don't work, return 404, or show .html in the URL.

**Root Cause:** The site uses clean URLs with folder structure (`page/index.html`) but links still use `.html` extensions.

**Correct URL patterns:**

| From Location | To Location | Correct href |
|---------------|-------------|--------------|
| Root (`index.html`) | Subpage folder | `folder/` |
| Subpage (`folder/index.html`) | Root | `../` |
| Subpage | Root with anchor | `../#anchor` |
| Blog post (`blog/post/index.html`) | Blog index | `../` |
| Blog post | Root | `../../` |
| Blog post | Root with anchor | `../../#anchor` |

**NEVER use:**
- `index.html` (use `./` or just omit)
- `../index.html` (use `../`)
- `folder/index.html` (use `folder/`)
- `page.html` (use `page/` after converting to folder structure)

**Check command:**
```bash
grep -r '\.html["'"'"']' --include="*.html" . | grep -v 'http'
```
This finds .html in href/src that aren't external URLs. External links (https://) with .html are fine.

---

## Issue #3: New Blog Post Template

When creating a new blog post:

1. Create folder: `blog/post-name/index.html`

2. Use these navigation links:
```html
<nav class="nav">
    <a href="../" class="nav-back">Blog</a>
    <a href="https://adidesai.org" class="logo">A</a>
    <div class="nav-right">
        <a href="../../">Home</a>
        <a href="../">Blog</a>
        <a href="../../#contact" class="nav-cta">Contact</a>
    </div>
</nav>
```

3. Back link in header:
```html
<a href="../" class="back-link">← Back to Blog</a>
```

4. CSS reference:
```html
<link rel="stylesheet" href="../post.css">
```

5. Add post card to `blog/index.html` with:
   - `data-category` matching a filter tag
   - `data-date` in YYYY-MM-DD format
   - `data-reading` as number of minutes
   - `href="post-name/"` (trailing slash, no .html)

---

## Issue #4: Adding New Filter Categories

When adding a new category (like "Finance"):

1. Add filter button to `blog/index.html`:
```html
<button class="tag" data-filter="newcategory">Category Name</button>
```

2. Use lowercase for `data-filter` value
3. Match exactly in post card's `data-category`
4. Update blog description in meta and header if needed

---

## Directory Structure Reference

```
/
├── index.html              # Landing page
├── css/
│   ├── custom.css
│   ├── theme.css
│   └── styles.css
├── blog/
│   ├── index.html          # Blog listing
│   ├── styles.css          # Blog listing styles
│   ├── post.css            # Individual post styles
│   └── post-name/
│       └── index.html      # Individual posts
├── photos/
│   ├── index.html
│   └── styles.css
├── invision/
│   ├── index.html
│   └── styles.css
└── emergency-preparedness/
    ├── index.html
    └── styles.css
```

---

## Quick Checks Before Committing

1. **Zoom consistency:** Verify all CSS files have `text-size-adjust: 100%`
2. **No .html links:** Run grep check above
3. **New posts:** Verify correct relative paths (`../`, `../../`)
4. **Filter categories:** Ensure `data-category` matches filter buttons
