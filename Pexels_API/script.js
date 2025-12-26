/* =========================
   CONFIG
========================= */
const API_KEY = "TJKdWP6hc06mpQPKXWV2tD9hfttgEfMqfGwhh6dTIbGRnUQzj9asYjCi";
const BASE_URL = "https://api.pexels.com/v1";

/* =========================
   DOM ELEMENTS
========================= */
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const errorEl = document.getElementById("error");
const themeBtn = document.getElementById("themeBtn");

/* =========================
   UI HELPERS
========================= */
function setLoading(on) {
  loading.classList.toggle("hidden", !on);
  searchBtn.disabled = on;
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
}

function clearUI() {
  gallery.innerHTML = "";
  errorEl.classList.add("hidden");
}

/* =========================
   FETCH PHOTOS
========================= */
async function fetchPhotos(query) {
  setLoading(true);
  clearUI();

  try {
    const res = await fetch(
      `${BASE_URL}/search?query=${query}&per_page=12`,
      {
        headers: { Authorization: API_KEY },
      }
    );

    if (!res.ok) throw new Error("Failed API call");

    const data = await res.json();

    if (data.photos.length === 0) {
      showError("No results found.");
      return;
    }

    displayPhotos(data.photos);
  } catch {
    showError("Error fetching data.");
  } finally {
    setLoading(false);
  }
}

/* =========================
   DISPLAY
========================= */
function displayPhotos(photos) {
  photos.forEach(photo => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${photo.src.medium}" alt="photo">
      <p>📷 ${photo.photographer}</p>
    `;

    gallery.appendChild(card);
  });
}

/* =========================
   EVENTS
========================= */
searchBtn.onclick = () => {
  const query = input.value.trim();

  if (!query) {
    showError("Input cannot be empty.");
    return;
  }

  fetchPhotos(query);
};

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};
