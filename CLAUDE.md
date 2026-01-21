# Personal Website - Session Notes

## Current State

The website at **adidesai.org** now uses the alternate website design with password protection.

### Password
- Password: `summer`
- Stored as SHA-256 hash in `secrets.js`
- Uses sessionStorage (clears when browser tab closes)

---

## File Structure

```
/Users/Adi/projects/personal-website/
├── index.html          # About me (main page)
├── projects.html       # Projects page
├── interests.html      # Interests page
├── awards.html         # Awards & Publications
├── blog.html           # Blog listing
├── photos.html         # Photography portfolio (masonry layout)
├── invision.html       # INVISION project detail
├── quorum-sensing.html # Quorum sensing research detail
├── clinical-trials.html# Clinical trials research detail
├── comp-bio.html       # Computational biology detail
├── login.html          # Password entry page
├── secrets.js          # Password hash verification
├── styles.css          # Main stylesheet
├── CNAME               # adidesai.org
├── blog/               # Blog posts (flat .html files)
│   ├── post.css
│   ├── gold.html
│   ├── hiv.html
│   └── ... (12 posts total)
└── CLAUDE.md           # This file
```

---

## GitHub Repos

### personal-website
- **Repo:** github.com/isobutane101/personal-website
- **Domain:** adidesai.org
- **Branch:** main
- **Backup branch:** backup-before-alternate (contains old site)

### just-a-call-away
- **Repo:** github.com/isobutane101/just-a-call-away
- **Domain:** justacallaway.org (pending DNS propagation for HTTPS)
- **Content:** Emergency preparedness resources for elderly immigrant communities
- **Location:** /Users/Adi/projects/just-a-call-away/

---

## Photos Page Features

The photography page (`photos.html`) has custom features:

### Masonry Layout
- CSS columns (3 on desktop, 2 on tablet, 1 on mobile)
- Natural aspect ratios, no cropping

### Award Frames
- Gold Key: Gold gradient border + glow
- Silver Key: Silver gradient border + glow
- Honorable Mention: Bronze gradient border + glow
- Frames use `::before` pseudo-element with `inset: -4px` and `border-radius: 16px`

### Lightbox
- Dark theme with frosted glass UI
- Image: `border-radius: 20px`
- Info box: Fixed width 320px on desktop
- Close button: Frosted glass style, top-right
- Navigation: Left/right arrows with frosted glass
- Scroll preservation: JavaScript saves/restores scroll position on close
- Escape key closes lightbox

---

## CSS Zoom Fix

All pages must have this in their CSS to prevent zoom issues:

```css
html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
}
```

Files with this fix:
- styles.css
- login.html (inline)
- blog/post.css

---

## Old Website

Backed up to: `/Users/Adi/projects/old-website/`
- index.html
- css/ folder
- invision/ folder
- photos/ folder

---

## Git Credentials

Stored in `~/.git-credentials` using credential.helper store.
Token should be regenerated as it was exposed in chat.

---

## Pending Tasks

1. **HTTPS for justacallaway.org** - Waiting for DNS propagation, then enable "Enforce HTTPS" in GitHub Pages settings
2. **Profile photo** - `./photos/profile.jpg` referenced in index.html but file doesn't exist (has fallback)
