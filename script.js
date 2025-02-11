/********************
 * INITIAL SETUP *
 ********************/
const globalBookmarkElement = document.getElementById("global-bookmark");
const globalBookmarkClone = document.getElementById("bookmark-icon-template").content.firstElementChild.cloneNode(true);
globalBookmarkClone.setAttribute("width", "24");
globalBookmarkClone.setAttribute("height", "24");
globalBookmarkElement.appendChild(globalBookmarkClone);

/********************
 * CONFIGURATION & STATE *
 ********************/
let currentLanguage = 'en';
let currentLanguageDisplay = 'ENG';
const languages = [
  { code: 'en', display: 'ENG', name: 'English' },
  { code: 'es', display: 'ESP', name: 'Español' },
  { code: 'de', display: 'DEU', name: 'Deutsch' },
  { code: 'fr', display: 'FRA', name: 'Français' },
  { code: 'it', display: 'ITA', name: 'Italiano' },
  { code: 'nl', display: 'NLD', name: 'Dutch' },
  { code: 'pl', display: 'POL', name: 'Polish' },
  { code: 'pt', display: 'POR', name: 'Português' },
  { code: 'ru', display: 'RUS', name: 'Русский' },
  { code: 'sv', display: 'SWE', name: 'Svenska' },
  { code: 'ko', display: 'KOR', name: '한국어' },
  { code: 'zh', display: 'CHI', name: '中文' },
  { code: 'ja', display: 'JPN', name: '日本語' }
];

/********************
 * ARTICLE CACHING *
 ********************/
const articleCache = [];
let isPreloading = false;
const CACHE_THRESHOLD = 5;
const BULK_FETCH_COUNT = 10;  // Number of articles to fetch at a time

// Fetch mechanics-related articles
async function preloadArticles() {
  if (isPreloading) return;
  isPreloading = true;
  const searchTerm = "classical mechanics"; // Adjust the search term as needed
  const url = `https://${currentLanguage}.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=${BULK_FETCH_COUNT}&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&origin=*`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.query && json.query.pages) {
      const articles = Object.values(json.query.pages);
      const validArticles = articles.filter(article => article.thumbnail && article.thumbnail.source);
      validArticles.forEach(article => articleCache.push(article));
    }
  } catch (error) {
    console.error("Error fetching mechanics articles:", error);
  }
  isPreloading = false;
}

// Fetch a specific article by its pageid
async function fetchArticleById(pageId) {
  const url = `https://${currentLanguage}.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageId}&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&origin=*`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.query && json.query.pages) {
      return Object.values(json.query.pages)[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching article by id:", error);
    return null;
  }
}

/***************************
 * BOOKMARK HANDLING *
 ***************************/
function isBookmarked(title) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
  return bookmarks.some(item => item.title === title);
}

function addBookmark(article) {
  if (!article.title.toLowerCase().includes("mechanics") &&
      !article.extract.toLowerCase().includes("mechanics")) {
    return;
  }
  let bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
  bookmarks.push({
    title: article.title,
    image: (article.thumbnail && article.thumbnail.source) ? article.thumbnail.source : "",
    summary: article.extract,
    url: article.fullurl || (article.content_urls && article.content_urls.desktop && article.content_urls.desktop.page) || "#"
  });
  localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks));
}

function removeBookmark(articleOrItem) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
  bookmarks = bookmarks.filter(item => item.title !== articleOrItem.title);
  localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks));
}

function toggleBookmark(article, bookmarkIcon) {
  if (!isBookmarked(article.title)) {
    const filledHeart = document.getElementById("filled-heart-template").content.firstElementChild.cloneNode(true);
    bookmarkIcon.innerHTML = "";
    bookmarkIcon.appendChild(filledHeart);
    bookmarkIcon.style.backgroundColor = "red";
    addBookmark(article);
  } else {
    const outlinedHeart = document.getElementById("outlined-heart-template").content.firstElementChild.cloneNode(true);
    bookmarkIcon.innerHTML = "";
    bookmarkIcon.appendChild(outlinedHeart);
    bookmarkIcon.style.backgroundColor = "rgba(0,0,0,0.8)";
    removeBookmark(article);
  }
}

/***************************
 * ARTICLE SECTION CREATION *
 ***************************/
function createArticleSection(article) {
  if (!article.title.toLowerCase().includes("mechanics") && 
      !article.extract.toLowerCase().includes("mechanics") &&
      !(article.description && article.description.toLowerCase().includes("mechanics"))) {
    return null;
  }
  
  const section = document.createElement('section');
  section.classList.add('article');
  
  if (article.thumbnail && article.thumbnail.source) {
    section.style.backgroundImage = `url(${article.thumbnail.source})`;
  } else {
    section.style.backgroundColor = '#333';
    return null;
  }
  
  const dimmer = document.createElement('div');
  dimmer.classList.add('dimmer');
  
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  
  if (article.description) {
    const categoryEl = document.createElement('div');
    categoryEl.classList.add('article-category');
    categoryEl.textContent = article.description;
    overlay.appendChild(categoryEl);
  }
  
  const readMoreURL = article.fullurl || (article.content_urls && article.content_urls.desktop && article.content_urls.desktop.page);
  
  const title = document.createElement('a');
  title.textContent = article.title || 'No Title';
  title.classList.add('article-title');
  title.href = readMoreURL;
  title.target = '_blank';
  overlay.appendChild(title);
  
  const summary = document.createElement('p');
  summary.textContent = article.extract || 'No summary available.';
  overlay.appendChild(summary);
  
  if (readMoreURL) {
    const link = document.createElement('a');
    link.href = readMoreURL;
    link.target = '_blank';
    link.textContent = 'Read more on Wikipedia';
    overlay.appendChild(link);
  }
  
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-container');
  
  const bookmarkIcon = document.createElement('div');
  bookmarkIcon.classList.add('icon', 'bookmark');
  if (isBookmarked(article.title)) {
    const filledHeart = document.getElementById("filled-heart-template").content.firstElementChild.cloneNode(true);
    bookmarkIcon.appendChild(filledHeart);
    bookmarkIcon.style.backgroundColor = "red";
  } else {
    const outlinedHeart = document.getElementById("outlined-heart-template").content.firstElementChild.cloneNode(true);
    bookmarkIcon.appendChild(outlinedHeart);
    bookmarkIcon.style.backgroundColor = "rgba(0,0,0,0.8)";
  }
  bookmarkIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleBookmark(article, bookmarkIcon);
  });
  iconContainer.appendChild(bookmarkIcon);
  
  const shareIcon = document.createElement('div');
  shareIcon.classList.add('icon', 'share');
  const shareSvg = document.getElementById("share-icon-template").content.firstElementChild.cloneNode(true);
  shareIcon.appendChild(shareSvg);
  shareIcon.addEventListener('click', async function(e) {
    e.stopPropagation();
    const shareUrl = window.location.protocol + "//" + window.location.host + "/" + article.pageid;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.extract,
        url: shareUrl
      }).catch((error) => console.error('Error sharing:', error));
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          showToast("Link copied to clipboard.");
        })
        .catch((error) => {
          console.error("Clipboard error:", error);
          showToast("Failed to copy link.");
        });
    } else {
      let textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast("Link copied to clipboard.");
      } catch (err) {
        console.error("execCommand error", err);
        showToast("Failed to copy link.");
      }
      document.body.removeChild(textarea);
    }
  });
  iconContainer.appendChild(shareIcon);
  
  overlay.appendChild(iconContainer);
  section.appendChild(dimmer);
  section.appendChild(overlay);
  return section;
}

/***************************
 * SCROLL & OBSERVER *
 ***************************/
const container = document.getElementById('container');
const observerOptions = {
  root: container,
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      addArticle();
    }
  });
}, observerOptions);

async function addArticle() {
  if (articleCache.length === 0) {
    await preloadArticles();
  }
  const articleData = articleCache.shift();
  if (!articleData) return;
  const section = createArticleSection(articleData);
  if (section) {
    container.appendChild(section);
    observer.observe(section);
  }
  if (articleCache.length <= CACHE_THRESHOLD) {
    preloadArticles();
  }
}

// Handle URL path for specific article pageid
const path = window.location.pathname.replace(/\//g, "");
if (path && !isNaN(path)) {
  fetchArticleById(path).then(article => {
    if (article) {
      const section = createArticleSection(article);
      if (section) {
        container.appendChild(section);
        observer.observe(section);
      }
    }
    if (window.history.replaceState) {
      window.history.replaceState(null, "", "/");
    }
    addArticle();
    addArticle();
    document.getElementById('loader').style.display = 'none';
  });
} else {
  preloadArticles().then(() => {
    addArticle();
    addArticle();
    document.getElementById('loader').style.display = 'none';
  });
}

/***************************
 * BOOKMARK MODAL HANDLING *
 ***************************/
const globalBookmark = document.getElementById('global-bookmark');
const bookmarkModal = document.getElementById('bookmark-modal');
const modalClose = document.querySelector('.modal-close');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkSearch = document.getElementById('bookmark-search');

globalBookmark.addEventListener('click', () => {
  populateBookmarks();
  bookmarkModal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
  bookmarkModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === bookmarkModal) {
    bookmarkModal.style.display = 'none';
  }
});

bookmarkSearch.addEventListener('input', populateBookmarks);

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const matrix = [];
  const aLen = a.length;
  const bLen = b.length;
  for (let i = 0; i <= aLen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bLen; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[aLen][bLen];
}

function fuzzyMatch(text, query) {
  text = text.toLowerCase();
  query = query.toLowerCase();
  if (query === "") return true;
  if (text.includes(query)) return true;
  let threshold = Math.max(1, Math.floor(text.length * 0.3));
  let dist = levenshtein(text, query);
  return dist <= threshold;
}

function populateBookmarks() {
  bookmarkList.innerHTML = '';
  const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
  const query = bookmarkSearch.value.trim();
  const filtered = bookmarks.filter(item => fuzzyMatch(item.title, query));
  if (filtered.length === 0) {
    bookmarkList.innerHTML = '<p>No bookmarks match your search.</p>';
    return;
  }
  filtered.forEach(item => {
    const itemLink = document.createElement('a');
    itemLink.classList.add('bookmark-item');
    itemLink.href = item.url;
    itemLink.target = '_blank';
    if (item.image) {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('bookmark-img-container');
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      imgContainer.appendChild(img);
      itemLink.appendChild(imgContainer);
    }
    const textContainer = document.createElement('div');
    const itemTitle = document.createElement('h3');
    itemTitle.textContent = item.title;
    const itemSummary = document.createElement('p');
    itemSummary.textContent = item.summary;
    textContainer.appendChild(itemTitle);
    textContainer.appendChild(itemSummary);
    itemLink.appendChild(textContainer);
    const removeIcon = document.createElement('span');
    removeIcon.classList.add('remove-bookmark');
    removeIcon.textContent = "✖";
    removeIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeBookmark(item);
      populateBookmarks();
    });
    itemLink.appendChild(removeIcon);
    bookmarkList.appendChild(itemLink);
  });
}

/***************************
 * LANGUAGE SELECTOR HANDLING *
 ***************************/
const globalLanguage = document.getElementById('global-language');
const languageDropdown = document.getElementById('language-dropdown');
const currentLangSpan = document.getElementById('current-lang');

function populateLanguageDropdown() {
  languageDropdown.innerHTML = '';
  languages.forEach(lang => {
    const option = document.createElement('div');
    option.classList.add('language-option');
    option.textContent = lang.name + " (" + lang.display + ")";
    option.dataset.code = lang.code;
    option.dataset.display = lang.display;
    option.addEventListener('click', () => {
      document.getElementById('loader').style.display = 'flex';
      currentLanguage = option.dataset.code;
      currentLanguageDisplay = option.dataset.display;
      currentLangSpan.textContent = currentLanguageDisplay;
      languageDropdown.style.display = 'none';
      document.getElementById('container').innerHTML = '';
      articleCache.length = 0;
      preloadArticles().then(() => {
        addArticle();
        addArticle();
        document.getElementById('loader').style.display = 'none';
      });
    });
    languageDropdown.appendChild(option);
  });
}

populateLanguageDropdown();

globalLanguage.addEventListener('click', (e) => {
  e.stopPropagation();
  if (languageDropdown.style.display === 'block') {
    languageDropdown.style.display = 'none';
  } else {
    languageDropdown.style.display = 'block';
  }
});

window.addEventListener('click', (e) => {
  if (languageDropdown.style.display === 'block') {
    languageDropdown.style.display = 'none';
  }
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 3000);
}
