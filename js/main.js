const root = document.documentElement;
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const themeBtn = document.createElement('button');
themeBtn.type = 'button';
themeBtn.className = 'theme-btn';
header.append(themeBtn);

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeBtn.textContent = isLight ? "Dark" : "Light";
  themeBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
})

const savedTheme = localStorage.getItem("theme");
const prefersLight = matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(savedTheme ?? (prefersLight ? "light" : "dark"));

function pageName(path) {
  return path.split("/").pop().replace(".html", "") || "index";
}

const currentPage = pageName(location.pathname);
for (const link of nav.querySelectorAll("a")) {
  if (pageName(link.getAttribute("href")) === currentPage) {
    link.setAttribute("aria-current", "page");
  }
}
