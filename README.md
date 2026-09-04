# Daniel Cho — Portfolio

A single-page portfolio site: structural dynamics, vibro-acoustics, and audio
hardware work (Air Piano, guitar acoustics research, LANL/Saint-Gobain
background, earlier prototypes).

## Folder structure

```
daniel-cho-portfolio/
├── index.html                                  ← the whole page
├── css/
│   └── style.css                                ← all styling
├── js/
│   └── script.js                                ← placeholder for future interactivity
├── assets/
│   └── resume/
│       └── Daniel_Cho_Resume.pdf                ← linked from the Resume buttons
└── README.md                                    ← this file
```

Everything the page needs is inside this one folder. Nothing references
anything outside it except two Google Fonts (Fraunces, Inter, IBM Plex Mono),
loaded from `fonts.googleapis.com` in the `<head>` of `index.html`.

## Adding photos, video, code, and links

Open `index.html` and search for `MEDIA SLOTS`, `FRF PLOT SLOTS`, or
`CODE SLOTS` — each has an HTML comment marking exactly what to replace.

**To add a photo or plot:**
1. Drop the image file into `assets/` (make a subfolder like `assets/img/` if
   you want to keep it organized).
2. Find the matching `<div class="media-slot">...</div>` in `index.html` and
   replace it with:
   ```html
   <img src="assets/img/your-photo.jpg" alt="describe the photo" style="width:100%;height:100%;object-fit:cover;border-radius:3px;">
   ```

**To add a video:**
1. Drop the video file into `assets/` (e.g. `assets/video/air-piano-demo.mp4`),
   or use a YouTube/Vimeo embed instead.
2. Replace the `<div class="media-slot video">...</div>` with:
   ```html
   <video controls style="width:100%;border-radius:3px;">
     <source src="assets/video/air-piano-demo.mp4" type="video/mp4">
   </video>
   ```

**To add a real link** (GitHub repo, research poster, published paper):
Find the `<span class="link-slot">+ ...</span>` you want to fill in and
replace it with a normal link, e.g.:
```html
<a href="https://github.com/yourname/air-piano" target="_blank" rel="noopener">GitHub repo</a>
```

**To swap the resume:** replace the PDF in `assets/resume/` (keep the same
filename, or update the two `href` values in `index.html` that point to it).

## Running it locally

No build step, no dependencies. Just open `index.html` directly in a
browser, or, for accurate relative-path behavior, serve the folder:

```bash
cd daniel-cho-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying with a custom domain

**Netlify (recommended, easiest custom-domain setup):**
1. Go to [app.netlify.com](https://app.netlify.com), sign in.
2. Drag the whole `daniel-cho-portfolio` folder onto the "Deploy" area.
3. Once live, go to Site settings → Domain management → Add a custom domain,
   and follow the DNS instructions it gives you for your registrar.

**Vercel:** same drag-and-drop idea at [vercel.com](https://vercel.com).

**GitHub Pages:**
1. Create a new GitHub repo, push this folder's contents to it (`index.html`
   at the repo root).
2. In the repo's Settings → Pages, set the source to the `main` branch, root
   folder.
3. Add your custom domain under the same Pages settings.

Any of the three works fine for a static site like this — Netlify just has
the smoothest custom-domain flow of the three.

## Buying a domain

Namecheap, Porkbun, or Cloudflare Registrar are all solid, no-upsell options,
roughly $10–15/year for a `.com`.
