document.addEventListener("DOMContentLoaded", async () => {
  const lgEl = document.getElementById("lg-gallery");
  if (!lgEl) return;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });

  const BASE = "https://cdn.jsdelivr.net/npm/lightgallery@2.9.0";

  try {
    await loadScript(`${BASE}/lightgallery.umd.js`);
    await Promise.all([
      loadScript(`${BASE}/plugins/zoom/lg-zoom.umd.js`),
      loadScript(`${BASE}/plugins/thumbnail/lg-thumbnail.umd.js`),
    ]);

    // Pull <figcaption> text into data sub html on each anchor so
    // lightGallery shows the caption text instead of the alt.
    lgEl.querySelectorAll("figure").forEach((figure) => {
      const a = figure.querySelector("a");
      const caption = figure.querySelector("figcaption");
      if (a && caption) {
        a.dataset.subHtml = `<p>${caption.textContent.trim()}</p>`;
      }
    });

    lightGallery(lgEl, {
      selector: "a",
      plugins: [lgZoom, lgThumbnail],
      speed: 100,
      backdropDuration: 100,
      download: false,
      zoomFromOrigin: false,
      hideScrollbar: true
    });

  } catch (err) {
    console.error("Error loading LightGallery:", err);
  }
});