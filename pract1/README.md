# RepoScout

RepoScout is a responsive web application for exploring public GitHub repositories by username.

## Features

- Searches public repositories through the GitHub REST API
- Displays repository name, description, language, stars, date, and link
- Filters repositories by programming language
- Sorts repositories by name or number of stars
- Shows loading, validation, empty, and error states
- Remembers the last searched username with `localStorage`
- Includes a responsive layout for desktop, tablet, and mobile screens

## Project structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
```

## Run locally

Open `index.html` in a browser, or start any local static server in the project directory. For example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

## API

Repository data is loaded from the public GitHub REST API:

<https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user>
