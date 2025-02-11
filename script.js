/********************
 * INITIAL SETUP *
 ********************/
const globalBookmarkElement = document.getElementById("global-bookmark");
const globalBookmarkClone = document.getElementById("bookmark-icon-template").content.firstElementChild.cloneNode(true);
globalBookmarkClone.setAttribute("width", "24");
globalBookmarkClone.setAttribute("height", "24");
globalBookmarkElement.appendChild(globalBookmarkClone);

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=bulk%20modulus&gsrlimit=100&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&origin=*';

fetch(proxyUrl + targetUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));


const mechanicsKeywords = [
  "mechanics",
  "classical mechanics",
  "kinematics",
  "dynamics",
  "Newton",
  "force",
  "momentum",
  "energy",
  "rotation",
  "vibrations",
  "displacement",
  "velocity",
  "acceleration",
  "position",
  "kinematic equations",
  "scalar quantity",
  "vector quantity",
  "free fall",
  "uniform motion",
  "uniformly accelerated motion",
  "instantaneous velocity",
  "average velocity",
  "uniform circular motion",
  "centripetal acceleration",
  "centripetal force",
  "Newton's first law",
  "inertia",
  "mass",
  "Newton's second law",
  "gravitational force",
  "weight",
  "gravitational field",
  "Newton's third law",
  "action-reaction pairs",
  "friction",
  "static friction",
  "kinetic friction",
  "coefficient of friction",
  "applied force",
  "tension",
  "normal force",
  "drag force",
  "thrust",
  "net force",
  "uniform motion in one dimension",
  "projectile motion",
  "horizontal projectile",
  "vertical projectile",
  "trajectory",
  "parabolic motion",
  "acceleration due to gravity",
  "acceleration vector",
  "air resistance",
  "motion in two dimensions",
  "velocity vector",
  "acceleration vector",
  "conservation of momentum",
  "impulse",
  "impulse-momentum theorem",
  "elastic collision",
  "inelastic collision",
  "perfectly inelastic collision",
  "conservation of energy",
  "work",
  "work-energy theorem",
  "kinetic energy",
  "potential energy",
  "gravitational potential energy",
  "spring potential energy",
  "elastic potential energy",
  "conservative force",
  "non-conservative force",
  "work done by a force",
  "power",
  "power equation",
  "efficiency",
  "rotational motion",
  "angular velocity",
  "angular acceleration",
  "torque",
  "moment of inertia",
  "rotational inertia",
  "rotational kinetic energy",
  "angular momentum",
  "conservation of angular momentum",
  "rotational analog of Newton's second law",
  "torque equation",
  "angular impulse",
  "center of mass",
  "center of gravity",
  "moment of force",
  "parallel axis theorem",
  "rolling motion",
  "angular displacement",
  "angular velocity equation",
  "angular acceleration equation",
  "mass moment of inertia",
  "rigid body",
  "non-rigid body",
  "simple harmonic motion",
  "period of oscillation",
  "frequency of oscillation",
  "amplitude",
  "restoring force",
  "mass-spring system",
  "pendulum motion",
  "harmonic oscillator",
  "damped oscillations",
  "forced oscillations",
  "resonance",
  "restoring force law",
  "angular frequency",
  "energy in simple harmonic motion",
  "spring constant",
  "moment of inertia of a disk",
  "moment of inertia of a hoop",
  "moment of inertia of a rod",
  "moment of inertia of a solid sphere",
  "moment of inertia of a spherical shell",
  "energy conservation in rotational motion",
  "energy of an oscillating system",
  "equilibrium position",
  "restoring force in a pendulum",
  "elasticity",
  "Hooke's law",
  "stress",
  "strain",
  "Young's modulus",
  "bulk modulus",
  "shear modulus",
  "wave amplitude",
  "wave frequency",
  "velocity of wave propagation",
  "simple harmonic oscillator energy",
  "pendulum energy",
  "frequency of oscillation for a spring",
  "frequency of oscillation for a pendulum",
  "force constant",
  "equilibrium in harmonic motion",
  "phase constant",
  "period for a spring",
  "period for a pendulum",
  "angular frequency of oscillation",
  "wave interference",
  "constructive interference",
  "destructive interference",
  "standing waves",
  "node",
  "antinode",
  "harmonics",
  "elastic collisions in 1D",
  "elastic collisions in 2D",
  "conservation of mechanical energy",
  "momentum conservation in systems of particles",
  "momentum conservation in collisions",
  "work done by gravity",
  "centripetal force equation",
  "linear momentum",
  "impulse and momentum",
  "angular momentum conservation",
  "moment of inertia of a uniform ring",
  "torque and angular momentum",
  "kinetic energy and work relation",
  "conservation of linear momentum",
  "momentum conservation in collisions",
  "rigid body rotation",
  "angular velocity relationships",
  "angular acceleration equations",
  "displacement-time graph",
  "velocity-time graph",
  "acceleration-time graph",
  "inclined plane",
  "force diagrams",
  "elastic collision equations",
  "non-elastic collision equations",
  "frictional force calculation",
  "angular momentum of a rigid body",
  "work and energy principles",
  "power and energy transformations",
  "centripetal acceleration in circular motion",
  "angular velocity vector",
  "centripetal force in circular motion",
  "uniform circular motion equations",
  "radial acceleration",
  "angular acceleration",
  "rigid body dynamics",
  "kinetic energy in rotational motion",
  "torque as a rotational force",
  "work done by rotational force",
  "angular velocity in rotational dynamics",
  "linear velocity and angular velocity relationship",
  "momentum conservation in rotational motion",
  "angular impulse",
  "angular kinetic energy",
  "tangential velocity",
  "equation for torque",
  "moment of inertia in rotational motion",
  "torque and rotational motion relationship",
  "centripetal force in planetary motion",
  "momentum conservation in angular systems",
  "motion on an incline",
  "motion with friction",
  "centripetal force in a conical pendulum",
  "spring force",
  "force of tension in circular motion",
  "contact forces",
  "force of gravity",
  "work-energy theorem in rotational motion",
  "kinetic energy of rotating objects",
  "mass-spring system analysis",
  "conservation of mechanical energy in oscillations",
  "simple harmonic oscillator force",
  "frictionless motion",
  "applied force and work",
  "equilibrium of forces",
  "force of a moving object",
  "kinematic analysis",
  "circular motion",
  "rolling without slipping",
  "momentum transfer",
  "dynamics of rigid bodies",
  "non-inertial reference frames",
  "equations of motion in rotational dynamics",
  "power in rotational motion",
  "angular displacement",
  "angular velocity",
  "angular acceleration in rotational dynamics",
  "rotational energy in systems",
  "force of gravity on a body",
  "conservation of energy in a system of particles",
  "Newton's law of gravitation",
  "gravitational field",
  "potential energy in systems",
  "uniform motion in a circle",
  "angular velocity in systems",
  "centripetal force and radius relationship",
  "equilibrium in mechanical systems",
  "force due to gravity in circular motion",
  "torque calculation in rotational dynamics",
  "force in a pulley system",
  "angular acceleration in rotational systems",
  "momentum and kinetic energy",
  "force on a moving particle",
  "collision dynamics",
  "dynamic friction",
  "oscillation frequency",
  "translational kinetic energy",
  "mass and rotational inertia",
  "force of a rotating disk",
  "conservation of energy in a spring system",
  "simple harmonic oscillators",
  "angular momentum in a system",
  "rotational work",
  "torque and its effect on angular momentum",
  "radial force in planetary systems",
  "centripetal force in non-uniform circular motion"
];
function getRandomKeyword() {
  return mechanicsKeywords[Math.floor(Math.random() * mechanicsKeywords.length)];
}

/********************
 * ARTICLE CACHING *
 ********************/
const articleCache = [];
let isPreloading = false;
const CACHE_THRESHOLD = 10;
const BULK_FETCH_COUNT = 20;  // Number of articles to fetch at a time

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fetch mechanics-related articles
async function preloadArticles() {
  if (isPreloading) return;
  isPreloading = true;
  const searchTerm = getRandomKeyword(); // Use a random keyword
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=${BULK_FETCH_COUNT}&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&origin=*`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.query && json.query.pages) {
      const articles = Object.values(json.query.pages);
      const validArticles = articles.filter(article => article.thumbnail && article.thumbnail.source);
      validArticles.forEach(article => articleCache.push(article));
      // Shuffle the pool for randomness
      shuffleArray(articleCache);
    }
  } catch (error) {
    console.error("Error fetching mechanics articles:", error);
  }
  isPreloading = false;
}

// Fetch a specific article by its pageid
async function fetchArticleById(pageId) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageId}&prop=extracts|pageimages|info&inprop=url&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&origin=*`;
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
  if (
    !(article.title && article.title.toLowerCase().includes("mechanics")) &&
    !(article.extract && article.extract.toLowerCase().includes("mechanics")) &&
    !(article.description && article.description.toLowerCase().includes("mechanics"))
  ) {
    return null;
  }
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
  bookmarkModal.style.display = 'block';
  const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles") || "[]");
  bookmarkList.innerHTML = '';
  storedBookmarks.forEach(bookmark => {
    const listItem = document.createElement('li');
    listItem.classList.add('bookmark-item');
    const titleLink = document.createElement('a');
    titleLink.textContent = bookmark.title;
    titleLink.href = bookmark.url;
    titleLink.target = '_blank';
    listItem.appendChild(titleLink);
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-bookmark');
    removeButton.addEventListener('click', () => {
      removeBookmark(bookmark);
      bookmarkList.removeChild(listItem);
    });
    listItem.appendChild(removeButton);
    bookmarkList.appendChild(listItem);
  });
});

modalClose.addEventListener('click', () => {
  bookmarkModal.style.display = 'none';
});

bookmarkSearch.addEventListener('input', () => {
  const searchTerm = bookmarkSearch.value.toLowerCase();
  const items = document.querySelectorAll('.bookmark-item');
  items.forEach(item => {
    const title = item.querySelector('a').textContent.toLowerCase();
    item.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
});
