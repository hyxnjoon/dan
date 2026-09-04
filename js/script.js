// Daniel Cho — portfolio site

// Poster overlay: clicking a "Research poster" link opens a rendered image
// of the poster inline with a "Back to portfolio" button and a PDF download
// link, instead of navigating away.
const posterOverlay = document.getElementById('poster-overlay');
const posterImg = document.getElementById('poster-frame-img');
const posterTitle = document.getElementById('poster-overlay-title');
const posterDownload = document.getElementById('poster-download-link');

document.querySelectorAll('.poster-link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    posterImg.src = link.getAttribute('data-img');
    posterTitle.textContent = link.getAttribute('data-title') || '';
    posterDownload.href = link.getAttribute('href');
    posterDownload.setAttribute('data-filename', link.getAttribute('data-filename') || 'poster.pdf');
    posterOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('poster-back-btn').addEventListener('click', function () {
  posterOverlay.hidden = true;
  posterImg.src = '';
  document.body.style.overflow = '';
});

// --- File saving ---
// This block only does anything inside the claude.ai artifact viewer,
// where window.claude exists and a plain <a download> is inert. On this
// normally hosted copy of the site, window.claude is undefined, so
// saveViaClaudeOrFallback returns immediately and every download link
// just works natively via its href/download attribute.
function dataUriToBlob(dataUri) {
  const commaIdx = dataUri.indexOf(',');
  const meta = dataUri.slice(0, commaIdx);
  const b64 = dataUri.slice(commaIdx + 1);
  const mimeMatch = meta.match(/data:([^;]+);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const byteChars = atob(b64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  return new Blob([new Uint8Array(byteNumbers)], { type: mime });
}

async function saveViaClaudeOrFallback(e, filename) {
  if (!(window.claude && typeof window.claude.use === 'function')) {
    return; // not inside the claude.ai viewer; let the native download proceed
  }
  e.preventDefault();
  const href = e.currentTarget.href;
  try {
    const downloads = await window.claude.use('downloads');
    if (!downloads) {
      window.open(href, '_blank');
      return;
    }
    const blob = dataUriToBlob(href);
    await downloads.save({ filename: filename, data: blob });
  } catch (err) {
    window.open(href, '_blank');
  }
}

document.getElementById('resume-link').addEventListener('click', function (e) {
  saveViaClaudeOrFallback(e, 'Daniel_Cho_Resume.pdf');
});
document.getElementById('resume-link-2').addEventListener('click', function (e) {
  saveViaClaudeOrFallback(e, 'Daniel_Cho_Resume.pdf');
});
posterDownload.addEventListener('click', function (e) {
  saveViaClaudeOrFallback(e, posterDownload.getAttribute('data-filename') || 'poster.pdf');
});

// --- Email copy fallback ---
// mailto: links are blocked by the sandboxed claude.ai preview frame
// (unlike plain https:// links, which are allowed to open in a new
// tab). Whether or not the mail app actually opens, also copy the
// address to the clipboard and confirm it, so the viewer always has
// a way to get it. On a normally hosted copy of this site the mailto:
// link already works fine; the copy is just a bonus confirmation here.
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function (resolve, reject) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

document.querySelectorAll('.email-link').forEach(function (link) {
  const originalText = link.textContent;
  link.addEventListener('click', function () {
    const email = link.getAttribute('data-email');
    copyText(email).then(function () {
      link.textContent = 'Copied!';
      setTimeout(function () {
        link.textContent = originalText;
      }, 1500);
    }).catch(function () {
      // clipboard unavailable; the mailto: attempt is the only fallback left
    });
  });
});
