function randomIntFromInterval(_0x54d06c, _0x34c3e5) {
  return Math.floor(Math.random() * (_0x34c3e5 - _0x54d06c + 0x1) + _0x54d06c);
}
const rndInt = Math.floor(Math.random() * 10 + 0x1);
const rndInt2 = Math.floor(Math.random() * 10 + 0x1);
const rndInt3 = Math.floor(Math.random() * 50 + 0x1);
const modalDiv = document.body;
const SearchList = document.getElementById("movies-search");
const OnCinemas = document.getElementById("movies-cinemas");
const TrendingNow = document.getElementById('movies-trending');
const SimilarSuggestion = document.getElementById('movies-suggest');
const Recommedation = document.getElementById('movies-recommend');
const TopRatedMovie = document.getElementById("movies-toprated");
const PopularMovie = document.getElementById("movies-popular");
const MyMovieList = document.getElementById("movies-list");
const SeriesListDiv = document.getElementById("series-picks");
let bestDomain = '';
var OnMyList = false;
window.onload = () => {
  SearchList.style.display = "none";
  document.getElementsByClassName('title')[0x0].style.display = 'none';
  const _0x46b03e = document.getElementsByClassName("container")[0x0];
  const _0x1f6299 = document.createElement("div");
  _0x1f6299.innerHTML = "\n    <div style=\"display: flex; align-items: center; justify-content: space-between\">\n        <div style=\"display: flex;align-items: center;\">\n            <img src=\"movie/img/R.gif\" width=\"40\" height=\"40\" />\n            <a href=\"anime.html\" style=\"text-decoration:none;color:#ccc\">Click Here for Animes</a>\n        </div>\n\n        <div id=\"searchDiv\" style=\"display: flex;\">\n            <input id=\"search\" type=\"text\" name=\"search\" placeholder=\"Search title or keyword\"/>\n            <button type=\"button\" onclick=\"GetSearchMovie();\"><img src=\"movie/img/find_7072309.png\" alt=\"find\" width=\"20\" height=\"20\" style=\"box-shadow: none\" /></button>\n        </div>\n    </div>\n\n\n    ";
  _0x1f6299.id = "header";
  _0x1f6299.style = "display: block; visibility: visible";
  _0x46b03e.prepend(_0x1f6299);
  initializeBestDomain();
  GetNowPlaying();
  GetTrending();
  GetSimilar();
  GetRecommendations();
  GetTopRated();
  GetPopular();
  
  process("my_storage");
  tvid.forEach(_0x26177f => {
    GetSeriesList(_0x26177f);
  });
};

async function checkDomainLatency(domain) {
  const start = Date.now();
  try {
    // Use a third-party service to bypass CORS and check latency
    const response = await fetch(`https://api.allorigins.win/get?url=https://${domain}/`);
    if (!response.ok) throw new Error('Network response was not ok');
    return Date.now() - start;
  } catch (error) {
    return Infinity; // Indicating it's unreachable
  }
}

async function getBestDomain(domains) {
  const results = await Promise.all(domains.map(async (domain) => {
    const latency = await checkDomainLatency(domain);
    return { domain, latency };
  }));

  // Filter out unreachable domains
  const reachable = results.filter(result => result.latency !== Infinity);

  if (reachable.length === 0) {
    throw new Error('No domains are reachable');
  }

  // Sort by latency and return the fastest one
  const bestSource = reachable.sort((a, b) => a.latency - b.latency)[0];
  return bestSource.domain;
}

async function initializeBestDomain() {
  const domains = ['vidsrc.in', 'vidsrc.pm', 'vidsrc.xyz', 'vidsrc.net'];

  try {
    bestDomain = await getBestDomain(domains);
    console.log(`Best domain: ${bestDomain}`);
  } catch (error) {
    console.error('Error finding the best domain:', error);
  }
}

async function GetNowPlaying() {
  const _0x53c117 = {
    'method': "GET",
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x5f1300 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" + rndInt + '', _0x53c117);
  const _0x3b2610 = await _0x5f1300.json();
  return _0x3b2610 || [];
}
GetNowPlaying().then(_0x853e18 => {
  if (_0x853e18.results && _0x853e18.results.length > 0x0) {
    NowPlaying(_0x853e18.results);
  }
})["catch"](_0x246325 => console.error("Error:", _0x246325));
function NowPlaying(_0x194a02) {
  _0x194a02.forEach(_0x2cfc24 => {
    RenderNowPlaying(_0x2cfc24.title, _0x2cfc24.id, _0x2cfc24.poster_path, _0x2cfc24.overview, _0x2cfc24.release_date, _0x2cfc24.vote_average);
  });
}
function RenderNowPlaying(_0x2251a7, _0xf67a56, _0x5b3d99, _0x3dec79, _0x399805, _0x21f1ce) {
  const _0x2c4aae = document.createElement("div");
  const _0x33e335 = document.createElement("img");
  _0x2c4aae.className = "movie-wrap";
  _0x33e335.src = "http://image.tmdb.org/t/p/w500/" + _0x5b3d99;
  _0x33e335.title = _0x2251a7;
  _0x33e335.className = "movie-cover";
  const _0x4bfa93 = document.createElement("div");
  _0x4bfa93.className = 'movie-vote';
  _0x4bfa93.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0x21f1ce) + "/10</span>";
  _0x2c4aae.appendChild(_0x4bfa93);
  _0x2c4aae.appendChild(_0x33e335);
  OnCinemas.appendChild(_0x2c4aae);
  _0x2c4aae.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x2251a7, _0xf67a56, _0x5b3d99, _0x3dec79, _0x399805);
  });
}
async function GetTrending() {
  const _0x29a577 = {
    'method': "GET",
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x61da70 = await fetch("https://api.themoviedb.org/3/trending/movie/week?language=en-US", _0x29a577);
  const _0x578055 = await _0x61da70.json();
  return _0x578055 || [];
}
GetTrending().then(_0xc8f765 => {
  if (_0xc8f765.results && _0xc8f765.results.length > 0x0) {
    Trending(_0xc8f765.results);
  }
})['catch'](_0x57efb7 => console.error("Error:", _0x57efb7));
function Trending(_0x32b74e) {
  _0x32b74e.forEach(_0x35a0fb => {
    RenderTrending(_0x35a0fb.title, _0x35a0fb.id, _0x35a0fb.poster_path, _0x35a0fb.overview, _0x35a0fb.release_date, _0x35a0fb.vote_average);
  });
}
function RenderTrending(_0x3b6663, _0x3bcaa6, _0x51dd7e, _0x50f4d3, _0x206be0, _0x1c307b) {
  const _0x4775f6 = document.createElement("div");
  const _0x1b2c0a = document.createElement("img");
  _0x4775f6.className = "movie-wrap";
  _0x1b2c0a.src = "http://image.tmdb.org/t/p/w500/" + _0x51dd7e;
  _0x1b2c0a.title = _0x3b6663;
  _0x1b2c0a.className = "movie-cover";
  const _0x5652b6 = document.createElement("div");
  _0x5652b6.className = 'movie-vote';
  _0x5652b6.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0x1c307b) + "/10</span>";
  _0x4775f6.appendChild(_0x5652b6);
  _0x4775f6.appendChild(_0x1b2c0a);
  TrendingNow.appendChild(_0x4775f6);
  _0x4775f6.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x3b6663, _0x3bcaa6, _0x51dd7e, _0x50f4d3, _0x206be0);
  });
}
async function GetSimilar() {
  document.getElementById("last_title").innerText = localStorage != null ? localStorage.getItem(_0x3987(0x224)) : getCookie("movie_title");
  var _0x554622 = localStorage != null ? localStorage.getItem(_0x3987(0x234)) : getCookie("movie_id");
  const _0x43abc6 = {
    'method': 'GET',
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x32f6c5 = await fetch("https://api.themoviedb.org/3/movie/" + _0x554622 + "/similar?language=en-US&page=" + rndInt3 + '', _0x43abc6);
  const _0x288e45 = await _0x32f6c5.json();
  return _0x288e45 || [];
}
GetSimilar().then(_0x38de6c => {
  if (_0x38de6c.results && _0x38de6c.results.length > 0x0) {
    Similar(_0x38de6c.results);
  } else {
    document.getElementsByClassName('title')[0x4].style.display = "none";
    document.getElementById("movies-suggest").style.display = 'none';
  }
})['catch'](_0x1c23db => console.error('Error:', _0x1c23db));
function Similar(_0x143d3e) {
  _0x143d3e.forEach(_0x5a4eb1 => {
    RenderSimilar(_0x5a4eb1.title, _0x5a4eb1.id, _0x5a4eb1.poster_path, _0x5a4eb1.overview, _0x5a4eb1.release_date, _0x5a4eb1.vote_average);
  });
}
function RenderSimilar(_0x909e0d, _0x119de2, _0x5782c9, _0x509a05, _0x40839f, _0x54d801) {
  const _0x458367 = document.createElement("div");
  const _0x5ba6b1 = document.createElement("img");
  _0x458367.className = 'movie-wrap';
  _0x5ba6b1.src = "http://image.tmdb.org/t/p/w500/" + _0x5782c9;
  _0x5ba6b1.title = _0x909e0d;
  _0x5ba6b1.className = 'movie-cover';
  const _0x1e7aa1 = document.createElement("div");
  _0x1e7aa1.className = "movie-vote";
  _0x1e7aa1.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0x54d801) + '/10</span>';
  _0x458367.appendChild(_0x1e7aa1);
  _0x458367.appendChild(_0x5ba6b1);
  SimilarSuggestion.appendChild(_0x458367);
  _0x458367.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x909e0d, _0x119de2, _0x5782c9, _0x509a05, _0x40839f);
  });
}
async function GetRecommendations() {
  var _0x9fd812 = localStorage != null ? localStorage.getItem(_0x3987(0x234)) : getCookie("movie_id");
  const _0x40efb4 = {
    'method': 'GET',
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x515014 = await fetch("https://api.themoviedb.org/3/movie/" + _0x9fd812 + "/recommendations?language=en-US&page=1", _0x40efb4);
  const _0x5cd1ea = await _0x515014.json();
  return _0x5cd1ea || [];
}
GetRecommendations().then(_0x3f056d => {
  if (_0x3f056d.results && _0x3f056d.results.length > 0x0) {
    Recommend(_0x3f056d.results);
  } else {
    document.getElementsByClassName("title")[0x5].style.display = "none";
    document.getElementById('movies-recommend').style.display = "none";
  }
})["catch"](_0x2ec0b1 => console.error("Error:", _0x2ec0b1));
function Recommend(_0x1f3d53) {
  _0x1f3d53.forEach(_0x1104a2 => {
    RenderRecommend(_0x1104a2.title, _0x1104a2.id, _0x1104a2.poster_path, _0x1104a2.overview, _0x1104a2.release_date, _0x1104a2.vote_average);
  });
}
function RenderRecommend(_0x379e9e, _0x501ce7, _0x2bf4b4, _0x325b96, _0x1213a5, _0x5b604c) {
  const _0x229ef2 = document.createElement("div");
  const _0xe6439d = document.createElement("img");
  _0x229ef2.className = 'movie-wrap';
  _0xe6439d.src = "http://image.tmdb.org/t/p/w500/" + _0x2bf4b4;
  _0xe6439d.title = _0x379e9e;
  _0xe6439d.className = 'movie-cover';
  const _0x4b3bd0 = document.createElement("div");
  _0x4b3bd0.className = "movie-vote";
  _0x4b3bd0.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0x5b604c) + "/10</span>";
  _0x229ef2.appendChild(_0x4b3bd0);
  _0x229ef2.appendChild(_0xe6439d);
  Recommedation.appendChild(_0x229ef2);
  _0x229ef2.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x379e9e, _0x501ce7, _0x2bf4b4, _0x325b96, _0x1213a5);
  });
}
async function GetTopRated() {
  const _0x24dba1 = {
    'method': "GET",
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x16dd1d = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" + rndInt + "&region=ph", _0x24dba1);
  const _0x4aea6f = await _0x16dd1d.json();
  return _0x4aea6f || [];
}
GetTopRated().then(_0x3c9b3c => {
  if (_0x3c9b3c.results && _0x3c9b3c.results.length > 0x0) {
    TopRated(_0x3c9b3c.results);
  }
})["catch"](_0x3c8b16 => console.error("Error:", _0x3c8b16));
function TopRated(_0x247296) {
  _0x247296.forEach(_0x12d941 => {
    RenderTopRatedNow(_0x12d941.title, _0x12d941.id, _0x12d941.poster_path, _0x12d941.overview, _0x12d941.release_date, _0x12d941.vote_average);
  });
}
function RenderTopRatedNow(_0x674c86, _0x2abb24, _0x1517a2, _0x977c98, _0x2c1090, _0xd8d664) {
  const _0x3f98b3 = document.createElement("div");
  const _0x2ab8ef = document.createElement("img");
  _0x3f98b3.className = 'movie-wrap';
  _0x2ab8ef.src = "http://image.tmdb.org/t/p/w500/" + _0x1517a2;
  _0x2ab8ef.title = _0x674c86;
  _0x2ab8ef.className = 'movie-cover';
  const _0x418423 = document.createElement("div");
  _0x418423.className = "movie-vote";
  _0x418423.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0xd8d664) + "/10</span>";
  _0x3f98b3.appendChild(_0x418423);
  _0x3f98b3.appendChild(_0x2ab8ef);
  TopRatedMovie.appendChild(_0x3f98b3);
  _0x3f98b3.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x674c86, _0x2abb24, _0x1517a2, _0x977c98, _0x2c1090);
  });
}
async function GetPopular() {
  const _0x4b2519 = {
    'method': "GET",
    'headers': {
      'accept': "application/json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI"
    }
  };
  const _0x3a1c78 = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=" + rndInt2 + "&region=ph", _0x4b2519);
  const _0x3807c2 = await _0x3a1c78.json();
  return _0x3807c2 || [];
}
GetPopular().then(_0x5d4ef4 => {
  if (_0x5d4ef4.results && _0x5d4ef4.results.length > 0x0) {
    Popular(_0x5d4ef4.results);
  }
})["catch"](_0x5f3c90 => console.error("Error:", _0x5f3c90));
function Popular(_0x3647a6) {
  _0x3647a6.forEach(_0x1226e8 => {
    RenderPopularNow(_0x1226e8.title, _0x1226e8.id, _0x1226e8.poster_path, _0x1226e8.overview, _0x1226e8.release_date, _0x1226e8.vote_average);
  });
}
function RenderPopularNow(_0x2b6770, _0x229da4, _0x462654, _0x1dc941, _0x20784f, _0x3eca29) {
  const _0x2fc47e = document.createElement('div');
  const _0x5ab74b = document.createElement("img");
  _0x2fc47e.className = "movie-wrap";
  _0x5ab74b.src = "http://image.tmdb.org/t/p/w500/" + _0x462654;
  _0x5ab74b.title = _0x2b6770;
  _0x5ab74b.className = 'movie-cover';
  const _0x134bff = document.createElement("div");
  _0x134bff.className = "movie-vote";
  _0x134bff.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0x3eca29) + "/10</span>";
  _0x2fc47e.appendChild(_0x134bff);
  _0x2fc47e.appendChild(_0x5ab74b);
  PopularMovie.appendChild(_0x2fc47e);
  _0x2fc47e.addEventListener("click", () => {
    OnMyList = false;
    ShowModal(_0x2b6770, _0x229da4, _0x462654, _0x1dc941, _0x20784f);
  });
}
function GetSearchMovie() {
  var _0x3b00ac = document.getElementById("search").value;
  SearchList.style.display = "block";
  document.getElementsByClassName('title')[0x0].style.display = "block";
  if (SearchList.innerHTML != '') {
    while (SearchList.firstChild) {
      SearchList.removeChild(SearchList.lastChild);
    }
  }
  const _0x16f3a8 = new XMLHttpRequest();
  _0x16f3a8.onload = function () {
    let _0x21d822 = JSON.parse(this.responseText);
    SearchResults(_0x21d822.results);
  };
  _0x16f3a8.open('GET', "https://api.themoviedb.org/3/search/movie?query=" + _0x3b00ac + "&include_adult=false&language=en-US&page=1", true);
  _0x16f3a8.setRequestHeader("accept", "application/json");
  _0x16f3a8.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI");
  _0x16f3a8.send();
}
function SearchResults(_0x2ccd06) {
  _0x2ccd06.forEach(_0x52b486 => {
    RenderSearchResults(_0x52b486.title, _0x52b486.id, _0x52b486.poster_path, _0x52b486.overview, _0x52b486.release_date, _0x52b486.vote_average);
  });
}
function RenderSearchResults(_0x4e2850, _0x222435, _0x444f76, _0x4d4508, _0x622a95, _0xc05146) {
  const _0x11a96d = document.createElement("div");
  const _0x5b90f3 = document.createElement('img');
  _0x11a96d.className = "movie-wrap";
  _0x5b90f3.src = "http://image.tmdb.org/t/p/w500/" + _0x444f76;
  _0x5b90f3.title = _0x4e2850;
  _0x5b90f3.className = "movie-cover";
  const _0x5a93b7 = document.createElement("div");
  _0x5a93b7.className = "movie-vote";
  _0x5a93b7.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" fill=\"currentColor\" class=\"bi bi-star\" viewBox=\"0 0 16 16\"><path d=\"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z\"/></svg><span>&nbsp;" + parseInt(_0xc05146) + '/10</span>';
  _0x11a96d.appendChild(_0x5a93b7);
  _0x11a96d.appendChild(_0x5b90f3);
  SearchList.appendChild(_0x11a96d);
  _0x11a96d.addEventListener('click', () => {
    OnMyList = false;
    ShowModal(_0x4e2850, _0x222435, _0x444f76, _0x4d4508, _0x622a95);
  });
}
function lsset(_0x1323dd, _0xf8945b) {
  RenderMyList(_0xf8945b.split('#')[0x0], _0xf8945b.split('#')[0x1], _0xf8945b.split('#')[0x2], _0xf8945b.split('#')[0x3], _0xf8945b.split('#')[0x4]);
}
function RenderMyList(_0x1b4cd1, _0xaad75a, _0x29969f, _0x6d85ab, _0x56e6d2) {
  const _0x19ce4a = document.createElement("div");
  const _0x5602ef = document.createElement("img");
  _0x19ce4a.className = "movie-wrap";
  _0x5602ef.src = "http://image.tmdb.org/t/p/w500/" + _0x29969f;
  _0x5602ef.title = _0x1b4cd1;
  _0x5602ef.className = 'movie-cover';
  _0x19ce4a.appendChild(_0x5602ef);
  MyMovieList.appendChild(_0x19ce4a);
  _0x19ce4a.addEventListener("click", () => {
    OnMyList = true;
    ShowModal(_0x1b4cd1, _0xaad75a, _0x29969f, _0x6d85ab, _0x56e6d2);
  });
}
function GetSeriesList(_0x238c89) {
  const _0x1f07a2 = "https://api.themoviedb.org/3/tv/" + _0x238c89 + "/images?include_image_language=en&language=en";
  const _0x41d169 = new XMLHttpRequest();
  _0x41d169.onload = function () {
    let _0x4dec37 = JSON.parse(this.responseText);
    let _0x22298d = _0x4dec37.posters[0x0].file_path;
    let _0x4f68b3 = _0x4dec37.id;
    RenderSeriesList(_0x4f68b3, _0x22298d);
  };
  _0x41d169.open("GET", _0x1f07a2, true);
  _0x41d169.setRequestHeader("accept", 'application/json');
  _0x41d169.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI");
  _0x41d169.send();
}
function RenderSeriesList(_0x3a515e, _0x24a93b) {
  const _0x1cec37 = document.createElement("img");
  _0x1cec37.src = "http://image.tmdb.org/t/p/w500" + _0x24a93b;
  _0x1cec37.alt = '#';
  _0x1cec37.className = "movie-wrap";
  SeriesListDiv.appendChild(_0x1cec37);
  _0x1cec37.addEventListener("click", () => {
    var _0x30faed = "https://api.themoviedb.org/3/tv/" + _0x3a515e + '?language=en-US';
    const _0x5cc7ec = new XMLHttpRequest();
    _0x5cc7ec.onload = function () {
      let _0x20af03 = JSON.parse(this.responseText);
      ShowSeriesModal(_0x20af03.name, _0x20af03.id, _0x24a93b, _0x20af03.overview, _0x20af03.first_air_date, _0x20af03.seasons);
    };
    _0x5cc7ec.open("GET", _0x30faed, true);
    _0x5cc7ec.setRequestHeader('accept', "application/json");
    _0x5cc7ec.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI");
    _0x5cc7ec.send();
  });
}




function ShowModal(_0x230085, _0x4a67d4, _0x1ae7e9, _0x5af1b5, _0x540425) {
  setStorageValue("movie_id", _0x4a67d4);
  setStorageValue("movie_title", _0x230085);
  const _0x40a64f = document.createElement("div");
  const _0x30a902 = document.createElement("div");
  const _0x22c71b = document.createElement("div");
  const _0x15a6fa = document.createElement("img");
  const _0x5ed218 = document.createElement("div");
  const _0x41ef07 = document.createElement('div');
  const _0x60d917 = document.createElement('h2');
  const _0x56b761 = document.createElement('p');
  const _0x4a0d61 = document.createElement('p');
  const _0x32fb4b = document.createElement("button");
  const _0x48d9d8 = document.createElement('button');
  const _0x1d110a = document.createElement('button');
  const _0x6ed09d = document.createElement("button");
  _0x22c71b.className = 'modal-content-wrap';
  _0x30a902.className = 'movie_player';
  _0x48d9d8.type = "button";
  _0x48d9d8.innerText = "Close";
  _0x48d9d8.id = 'close-modal';
  _0x1d110a.type = "button";
  _0x1d110a.innerText = "Add to my list";
  _0x1d110a.id = "add-list";
  _0x6ed09d.type = 'button';
  _0x6ed09d.innerText = "Remove from my list";
  _0x6ed09d.id = 'remove-list';
  _0x40a64f.className = "modal";
  _0x15a6fa.src = "http://image.tmdb.org/t/p/w500/" + _0x1ae7e9;
  _0x15a6fa.className = "movie-backdrop";
  _0x5ed218.className = 'movie-details';
  _0x40a64f.appendChild(_0x15a6fa);
  _0x41ef07.className = 'movie-syp';
  _0x60d917.innerText = _0x230085;
  _0x56b761.innerText = _0x540425.split('-')[0x0];
  _0x4a0d61.innerText = _0x5af1b5;
  _0x41ef07.appendChild(_0x60d917);
  _0x41ef07.appendChild(_0x56b761);
  _0x41ef07.appendChild(_0x4a0d61);
  const _0x4081e1 = "https://api.themoviedb.org/3/movie/" + _0x4a67d4 + "/videos?language=en-US";
  const _0x3ee183 = new XMLHttpRequest();
  _0x3ee183.onload = function () {
    let _0x299b12 = JSON.parse(this.responseText);
    for (let _0x5ce70e = 0x0; _0x5ce70e < _0x299b12.results.length; _0x5ce70e++) {
      const _0x283f93 = _0x299b12.results[_0x5ce70e];
      if (_0x283f93.name.includes("Trailer")) {
        if (!document.getElementById("trailer")) {
          const _0x22d367 = document.createElement('iframe');
          _0x22d367.id = "trailer";
          _0x22d367.src = "https://www.youtube.com/embed/" + _0x283f93.key + "?enablejsapi=1&origin=http://youtube.com";
          _0x22d367.title = "YouTube video player";
          _0x22d367.setAttribute("frameborder", '0');
          _0x22d367.setAttribute("allowfullscreen", "true");
          _0x22d367.setAttribute("autoplay", "true");
          _0x30a902.appendChild(_0x22d367);
        }
      }
    }
  };
  _0x3ee183.open("GET", _0x4081e1, true);
  _0x3ee183.setRequestHeader("accept", "application/json");
  _0x3ee183.setRequestHeader('Authorization', "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E1NDkyMDNlYmNlOGY2ZTFjOTMyNjQ1MzYyMjNlMCIsInN1YiI6IjY1ODNkMzI2MTgwZGVhNTQzZThiZThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAc27W_LNc2uGh_9Pcl13c7_f9Mv_YGeYvWVfhE1NBI");
  _0x3ee183.send();
  _0x32fb4b.innerText = "Watch Now";
  _0x32fb4b.id = "play_button";
  _0x5ed218.appendChild(_0x41ef07);
  _0x22c71b.appendChild(_0x5ed218);
  _0x22c71b.appendChild(_0x32fb4b);
  _0x22c71b.appendChild(_0x48d9d8);
  _0x22c71b.appendChild(_0x1d110a);
  _0x22c71b.appendChild(_0x6ed09d);
  if (!OnMyList) {
    _0x6ed09d.style.display = "none";
  } else {
    _0x1d110a.style.display = 'none';
  }
  _0x40a64f.appendChild(_0x30a902);
  _0x40a64f.appendChild(_0x22c71b);
  modalDiv.appendChild(_0x40a64f);
  var _0x403dd1 = document.querySelector("#close-modal");
  _0x403dd1.addEventListener('click', () => {
    modalDiv.removeChild(modalDiv.lastChild);
  });
  var _0x428ffd = document.querySelector("#remove-list");
  _0x428ffd.addEventListener("click", () => {
    if (confirm("Are you sure?") == true) {
      lsdel("my_storage", _0x230085 + '#' + _0x4a67d4 + '#' + _0x1ae7e9 + '#' + _0x5af1b5 + '#' + _0x540425);
      setTimeout(function () {
        modalDiv.removeChild(modalDiv.lastChild);
      }, 0x1f4);
    } else {
      console.log("false");
    }
  });
  var _0x105c58 = document.querySelector("#add-list");
  _0x105c58.addEventListener('click', () => {
    lsadd("my_storage", _0x230085 + '#' + _0x4a67d4 + '#' + _0x1ae7e9 + '#' + _0x5af1b5 + '#' + _0x540425);
    MyMovieList.innerHTML = '';
    MyMovieList.innerText = '';
    process("my_storage");
    setTimeout(function () {
      modalDiv.removeChild(modalDiv.lastChild);
    }, 0x1f4);
  });
  var _0x51ceb2 = document.querySelector("#play_button");
  _0x51ceb2.addEventListener("click", async () => {
  if (!bestDomain) {
    await initializeBestDomain(); // Ensure bestDomain is initialized
  }
    try {
    // Set up the iframe using the best domain
    const _0x34c301 = document.createElement("iframe");
    _0x34c301.src = `https://${bestDomain}/embed/movie/${_0x4a67d4}`;
    _0x34c301.setAttribute('frameborder', '0');
    _0x34c301.setAttribute("allowfullscreen", "true");
    _0x34c301.setAttribute("referrerpolicy", "origin");
    _0x30a902.removeChild(_0x30a902.firstChild);
    _0x30a902.prepend(_0x34c301);

    // Update the src for TV show using the best domain
    _0x389f85.src = `https://${bestDomain}/embed/tv/${_0x50ced8}/1/1`;

    _0x51ceb2.setAttribute("disabled", 'true');
  } catch (error) {
    console.error('Error setting up the iframe:', error);
  }
 
  });
}



function ShowSeriesModal(_0x38d5b3, _0x50ced8, _0x194da4, _0x3d0d17, _0x470b1d, _0x173bac) {
  setStorageValue('movie_id', _0x50ced8);
  setStorageValue("movie_title", _0x38d5b3);
  const _0x46903a = document.createElement("div");
  const _0x47b4fb = document.createElement("div");
  const _0xbdbb77 = document.createElement("img");
  const _0x555053 = document.createElement("div");
  const _0x5e2d5c = document.createElement("div");
  const _0x46f265 = document.createElement('h2');
  const _0x14fe26 = document.createElement('p');
  const _0x36ce67 = document.createElement('p');
  const _0xfcbe12 = document.createElement("button");
  const _0x3e8fc7 = document.createElement("button");
  const _0x392be9 = document.createElement("button");
  const _0x49e742 = document.createElement("div");
  const _0x389f85 = document.createElement('iframe');
  const _0x1324cc = document.createElement('div');
  _0x1324cc.className = "movie-btn-group";
  const _0x4c720b = document.createElement("div");
  _0x4c720b.id = "season-div";
  const _0x236b57 = document.createElement("div");
  _0x236b57.id = "episode-div";
  _0x47b4fb.className = "modal-content-wrap";
  _0xfcbe12.type = "button";
  _0xfcbe12.innerText = "Close";
  _0xfcbe12.id = "close-modal";
  _0x3e8fc7.type = "button";
  _0x3e8fc7.innerText = "Add to my list";
  _0x3e8fc7.id = "add-list";
  _0x392be9.type = "button";
  _0x392be9.innerText = "Remove from my list";
  _0x392be9.id = "remove-list";
  _0x46903a.className = "modal";
  _0xbdbb77.src = "http://image.tmdb.org/t/p/w500/" + _0x194da4;
  _0xbdbb77.className = "movie-backdrop";
  _0x555053.className = "movie-details";
  _0x46903a.appendChild(_0xbdbb77);
  _0x5e2d5c.className = 'movie-syp';
  _0x46f265.innerText = _0x38d5b3;
  _0x14fe26.innerText = _0x470b1d.split('-')[0x0];
  _0x5e2d5c.appendChild(_0x46f265);
  _0x5e2d5c.appendChild(_0x14fe26);
  _0x555053.appendChild(_0x5e2d5c);
  _0x47b4fb.appendChild(_0x555053);
  _0x1324cc.appendChild(_0x4c720b);
  _0x1324cc.appendChild(_0x236b57);
  _0x47b4fb.appendChild(_0x1324cc);
  _0x47b4fb.prepend(_0x49e742);
  _0x389f85.src = `https://${bestDomain}/embed/tv/${_0x50ced8}/1/1`; //`https://${bestDomain}/embed/tv/${_0x50ced8}/1/1`
  _0x389f85.setAttribute("frameborder", '0');
  _0x389f85.setAttribute("allowfullscreen", 'true');
   _0x389f85..setAttribute("referrerpolicy", "origin");
  _0x49e742.appendChild(_0x389f85);
  _0x173bac.forEach(_0x2e91de => {
    const _0x14f0dc = document.createElement("button");
    _0x14f0dc.type = "button";
    _0x14f0dc.className = "season-btn";
    _0x14f0dc.innerText = _0x2e91de.name;
    _0x4c720b.appendChild(_0x14f0dc);
    _0x14f0dc.addEventListener('click', () => {
      let _0x55af70 = _0x2e91de.episode_count;
      _0x36ce67.innerText = _0x2e91de.overview;
      if (_0x236b57.innerHTML != '') {
        while (_0x236b57.firstChild) {
          _0x236b57.removeChild(_0x236b57.lastChild);
        }
      }
      for (let _0x5c983e = 0x0; _0x55af70 > _0x5c983e; _0x5c983e++) {
        let _0x48788c = _0x5c983e + 0x1;
        const _0x42a4d6 = document.createElement("button");
        _0x42a4d6.type = "button";
        _0x42a4d6.className = 'episode-btn';
        _0x42a4d6.innerText = "Ep " + _0x48788c;
        _0x42a4d6.addEventListener("click", () => {
          if (_0x49e742.innerHTML != '') {
            while (_0x49e742.firstChild) {
              _0x49e742.removeChild(_0x49e742.lastChild);
            }
          }
          _0x389f85.src = `https://${bestDomain}/embed/tv/${_0x50ced8}/${_0x2e91de.season_number}/${_0x48788c}`;//`https://${bestDomain}/embed/tv/${_0x50ced8}/${_0x2e91de.season_number}/${_0x48788c}`
          _0x389f85.setAttribute('frameborder', '0');
          _0x389f85.setAttribute('allowfullscreen', "true");
          _0x389f85..setAttribute("referrerpolicy", "origin");
          _0x49e742.prepend(_0x389f85);
        });
        _0x236b57.appendChild(_0x42a4d6);
        _0x5e2d5c.appendChild(_0x36ce67);
      }
    });
  });
  _0x47b4fb.appendChild(_0xfcbe12);
  _0x47b4fb.appendChild(_0x392be9);
  if (!OnMyList) {
    _0x392be9.style.display = 'none';
  } else {
    _0x3e8fc7.style.display = "none";
  }
  _0x46903a.appendChild(_0x47b4fb);
  modalDiv.appendChild(_0x46903a);
  var _0x5b8ed3 = document.querySelector("#close-modal");
  _0x5b8ed3.addEventListener("click", () => {
    modalDiv.removeChild(modalDiv.lastChild);
  });
  var _0x567583 = document.querySelector("#remove-list");
  _0x567583.addEventListener('click', () => {
    if (confirm("Are you sure?") == true) {
      lsdel('my_storage', _0x38d5b3 + '#' + _0x50ced8 + '#' + _0x194da4 + '#' + _0x3d0d17 + '#' + _0x470b1d);
      setTimeout(function () {
        modalDiv.removeChild(modalDiv.lastChild);
      }, 0x1f4);
    } else {
      console.log("false");
    }
  });
  var _0x1eab11 = document.querySelector("#add-list");
  _0x1eab11.addEventListener('click', () => {
    lsadd("my_storage", _0x38d5b3 + '#' + _0x50ced8 + '#' + _0x194da4 + '#' + _0x3d0d17 + '#' + _0x470b1d);
    MyMovieList.innerHTML = '';
    MyMovieList.innerText = '';
    process("my_storage");
    setTimeout(function () {
      modalDiv.removeChild(modalDiv.lastChild);
    }, 0x1f4);
  });
}
function lsadd(_0x541021, _0x2c8c74, _0x23d8c8) {
  var _0x2622aa = [];
  _0x2622aa = JSON.parse(localStorage != null ? localStorage.getItem(_0x541021) : getCookie(_0x541021)) || [];
  var _0x3a5f69 = JSON.parse(localStorage != null ? localStorage.getItem(_0x541021) : getCookie(_0x541021));
  if ((localStorage != null ? localStorage.getItem(_0x541021) : getCookie(_0x541021)) === null) {
    _0x2622aa.push(_0x2c8c74);
    setStorageValue(_0x541021, JSON.stringify(_0x2622aa));
    process("my_storage");
  } else {
    if (_0x3a5f69.indexOf(_0x2c8c74) == -0x1) {
      var _0x2587ac = _0x3a5f69.length;
      if (_0x2587ac >= _0x23d8c8) {
        _0x3a5f69.splice(0x0, 0x1);
        setStorageValue(_0x541021, JSON.stringify(_0x3a5f69));
        _0x2622aa.push(_0x2c8c74);
      } else {
        _0x2622aa.push(_0x2c8c74);
        setStorageValue(_0x541021, JSON.stringify(_0x2622aa));
      }
      process("my_storage");
    } else {
      alert("its already added!");
    }
  }
}
function lsdel(_0x56ba80, _0x5c8657) {
  if ((localStorage != null ? localStorage.getItem(_0x56ba80) : getCookie(_0x56ba80)) === null) {} else {
    var _0x337cea = JSON.parse(localStorage != null ? localStorage.getItem(_0x56ba80) : getCookie(_0x56ba80));
    var _0xd2144 = _0x337cea.indexOf(_0x5c8657);
    if (_0xd2144 == -0x1) {} else {
      _0x337cea.splice(_0xd2144, 0x1);
      setStorageValue(_0x56ba80, JSON.stringify(_0x337cea));
      MyMovieList.innerHTML = '';
      MyMovieList.innerText = '';
      process("my_storage");
    }
  }
}
function process(_0x4c2483) {
  if ((localStorage != null ? localStorage.getItem(_0x4c2483) : getCookie(_0x4c2483)) === null) {
    document.getElementById("movies-list").style.display = 'none';
    document.getElementsByClassName("title")[0x1].style.display = "none";
  } else {
    var _0x57227d = JSON.parse(window.localStorage.getItem(_0x4c2483));
    var _0x1e4a16 = 0x0;
    for (var _0x490526 = _0x57227d.length; _0x1e4a16 < _0x490526; _0x1e4a16++) {
      lsset('my_storage', _0x57227d[_0x1e4a16]);
    }
  }
}
function setStorageValue(_0x49ea31, _0x3742f8) {
  if (localStorage != null) {
    localStorage.setItem(_0x49ea31, _0x3742f8);
  } else {
    setCookie(_0x49ea31, _0x3742f8, 0x16c);
  }
}
function removeStorageValue(_0x50e219) {
  if (localStorage != null) {
    localStorage.removeItem(_0x50e219);
  } else {
    eraseCookie(_0x50e219);
  }
}
function getStorageValue(_0x506a24) {
  return localStorage != null ? localStorage.getItem(_0x506a24) : getCookie(_0x506a24);
}
function setCookie(_0x5cb629, _0x10b49c, _0x3fbc47) {
  var _0x131371 = '';
  if (_0x3fbc47) {
    var _0x4b240a = new Date();
    _0x4b240a.setTime(_0x4b240a.getTime() + _0x3fbc47 * 0x18 * 0x3c * 0x3c * 0x3e8);
    _0x131371 = "; expires=" + _0x4b240a.toUTCString();
  }
  document.cookie = _0x5cb629 + '=' + (_0x10b49c || '') + _0x131371 + "; path=/";
}
function getCookie(_0x39d858) {
  var _0x2ef8a1 = _0x39d858 + '=';
  var _0x1f1ef6 = document.cookie.split(';');
  for (var _0x7b5d2e = 0x0; _0x7b5d2e < _0x1f1ef6.length; _0x7b5d2e++) {
    var _0x11e31d = _0x1f1ef6[_0x7b5d2e];
    while (_0x11e31d.charAt(0x0) == " ") {
      _0x11e31d = _0x11e31d.substring(0x1, _0x11e31d.length);
    }
    if (_0x11e31d.indexOf(_0x2ef8a1) == 0x0) {
      return _0x11e31d.substring(_0x2ef8a1.length, _0x11e31d.length);
    }
  }
  return null;
}
function eraseCookie(_0x14a41a) {
  document.cookie = _0x14a41a + "=; Max-Age=-99999999;";
}

window.addEventListener('load', initializeBestDomain);