const API_URL = "https://api.github.com/users";
const STORAGE_KEY = "reposcout-last-username";

const form = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username");
const formMessage = document.querySelector("#form-message");
const toolbar = document.querySelector("#toolbar");
const languageFilter = document.querySelector("#language-filter");
const sortSelect = document.querySelector("#sort-select");
const statusPanel = document.querySelector("#status-panel");
const repositoryGrid = document.querySelector("#repository-grid");
const resultSummary = document.querySelector("#result-summary");

let repositories = [];

function showStatus(title, message, type = "empty", loading = false) {
  statusPanel.hidden = false;
  statusPanel.className = `status-panel ${type}`;
  statusPanel.innerHTML = loading
    ? `<div class="status-icon"><span class="spinner" aria-hidden="true"></span></div><h3>${title}</h3><p>${message}</p>`
    : `<div class="status-icon" aria-hidden="true">${type === "error" ? "!" : "⌕"}</div><h3>${title}</h3><p>${message}</p>`;
}

function clearStatus() {
  statusPanel.hidden = true;
}

function setFormError(message = "") {
  formMessage.textContent = message;
  usernameInput.setAttribute("aria-invalid", message ? "true" : "false");
}

function updateLanguages() {
  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))].sort();
  languageFilter.innerHTML = '<option value="all">All languages</option>';
  languages.forEach(language => {
    languageFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(language)}">${escapeHtml(language)}</option>`);
  });
  if (repositories.some(repo => !repo.language)) {
    languageFilter.insertAdjacentHTML("beforeend", '<option value="other">Other</option>');
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

function renderRepositories() {
  const selectedLanguage = languageFilter.value;
  const sortBy = sortSelect.value;
  const filtered = repositories.filter(repo => {
    if (selectedLanguage === "all") return true;
    if (selectedLanguage === "other") return !repo.language;
    return repo.language === selectedLanguage;
  });

  filtered.sort((first, second) => {
    if (sortBy === "name-asc") return first.name.localeCompare(second.name);
    if (sortBy === "name-desc") return second.name.localeCompare(first.name);
    if (sortBy === "stars-asc") return first.stargazers_count - second.stargazers_count;
    return second.stargazers_count - first.stargazers_count;
  });

  repositoryGrid.innerHTML = filtered.map(repo => `
    <article class="repository-card">
      <div class="card-meta">
        <span class="language">${escapeHtml(repo.language || "Other")}</span>
        <span>${escapeHtml(repo.updated_at.slice(0, 10))}</span>
      </div>
      <h3>${escapeHtml(repo.name)}</h3>
      <p class="description">${escapeHtml(repo.description || "No description provided.")}</p>
      <div class="card-footer">
        <span class="stars">★ ${repo.stargazers_count.toLocaleString()}</span>
        <a class="repo-link" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">View project ↗</a>
      </div>
    </article>
  `).join("");

  if (filtered.length === 0) {
    showStatus("No matching repositories", "Try choosing another language filter.");
  } else {
    clearStatus();
  }
  resultSummary.textContent = `${filtered.length} of ${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"} shown`;
}

async function searchRepositories(username) {
  setFormError();
  toolbar.hidden = true;
  repositoryGrid.innerHTML = "";
  resultSummary.textContent = "Fetching public repositories...";
  showStatus("Loading repositories", "GitHub is sending the latest results.", "empty", true);

  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);
    if (!response.ok) {
      if (response.status === 404) throw new Error("User not found. Check the username and try again.");
      if (response.status === 403) throw new Error("GitHub API rate limit reached. Please try again later.");
      throw new Error("GitHub could not complete the request. Please try again.");
    }
    repositories = await response.json();
    if (repositories.length === 0) {
      toolbar.hidden = true;
      resultSummary.textContent = "No repositories found.";
      showStatus("No repositories found", "This profile does not have any public repositories.");
      return;
    }
    updateLanguages();
    toolbar.hidden = false;
    renderRepositories();
    localStorage.setItem(STORAGE_KEY, username);
  } catch (error) {
    repositories = [];
    toolbar.hidden = true;
    resultSummary.textContent = "Could not load repositories.";
    showStatus("Something went wrong", error.message, "error");
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const username = usernameInput.value.trim().replace(/^@/, "");
  if (!username) {
    setFormError("Please enter a GitHub username.");
    usernameInput.focus();
    return;
  }
  if (!/^[a-zA-Z0-9-]+$/.test(username)) {
    setFormError("Use only letters, numbers, and hyphens.");
    usernameInput.focus();
    return;
  }
  usernameInput.value = username;
  searchRepositories(username);
  document.querySelector("#results").scrollIntoView({ behavior: "smooth", block: "start" });
});

languageFilter.addEventListener("change", renderRepositories);
sortSelect.addEventListener("change", renderRepositories);

const savedUsername = localStorage.getItem(STORAGE_KEY);
if (savedUsername) usernameInput.value = savedUsername;
