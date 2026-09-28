const root = document.documentElement;
const nav = document.querySelector('nav');

const theme_btn = document.createElement('button');
theme_btn.type = 'button';
theme_btn.className = 'theme-btn';
nav.append(theme_btn);

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  theme_btn.textContent = isLight ? "Dark" : "Light";
}

theme_btn.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
})

const saved_theme = localStorage.getItem("theme");
const prefersLight = matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(saved_theme ?? (prefersLight ? "light" : "dark"));

function page_name(path) {
  return path.split("/").pop().replace(".html", "") || "index";
}

const current_page = page_name(location.pathname);
for (const link of nav.querySelectorAll("a")) {
  if (page_name(link.getAttribute("href")) === current_page) {
    link.setAttribute("aria-current", "page");
  }
}
