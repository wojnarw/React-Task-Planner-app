class CL {
    constructor(settings = {}) {
      const defaultSettings = {
        header: true,
        title: "Coders Lab",
        path: [],
        resultInConsole: false,
        fontAwesome: false,
        bulma: false,
      };
  
      this.settings = {
        ...defaultSettings,
        ...settings,
      };
  
      this.init();
    }
  
    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.head = document.querySelector("head");
        this.body = document.querySelector("body");
        this.currentScript = this.head.querySelector('script[src*="fer-api"]');
  
        this.addFavicon();
        this.addStyles();
        this.addHeader();
  
        if (this.settings.resultInConsole) {
          this.addResultInConsole();
        }
  
        if (this.settings.fontAwesome) {
          this.addFontAwesome();
        }
      });
    }
  
    /**
     * Add Favicon
     */
    addFavicon() {
      const favicon = document.createElement("link");
      favicon.rel = "shortcut icon";
      favicon.href = "https://coderslab.pl/favicon.png";
      this.head.appendChild(favicon);
    }
  
    /**
     * Add Styles
     */
    addStyles() {
      const font = document.createElement("link");
      font.rel = "stylesheet";
      font.href = "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap";
  
      const bootstrap = document.createElement("link");
      bootstrap.rel = "stylesheet";
  
      if (!this.settings.bulma) {
        bootstrap.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
      } else {
        bootstrap.href = "https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css";
      }
  
      const style = document.createElement("style");
      style.innerHTML = `
      :root {
        --primary-color: rgb(243 190 77);
        --color-black: rgb(78 78 80);
        --color-light-grey: rgb(108 117 125);
      }
      
      body {
        font-family: "Ubuntu", sans-serif;
      }
      
      .navbar {
        background-color: var(--primary-color);
        color: var(--color-black);
      }
      
      .navbar-brand {
        font-weight: 500;
      }
      
      .breadcrumb-item {
        color: var(--color-light-grey);
      }
      
      .breadcrumb-item.active {
        color: var(--color-black);
        font-weight: 500;
      }
    `;
  
      this.head.insertBefore(bootstrap, this.currentScript);
      this.head.insertBefore(font, this.currentScript);
      this.head.insertBefore(style, this.currentScript);
    }
  
    /**
     * FontAwesome
     */
    addFontAwesome() {
      const $script = document.createElement("script");
      $script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js";
      this.head.insertBefore($script, this.currentScript);
    }
  
    /**
     * Add Header
     */
    addHeader() {
      const { title, path } = this.settings;
  
      const $header = document.createElement("header");
      $header.classList.add("mb-5");
  
      /**
       * Nav
       */
      const $nav = document.createElement("nav");
      $nav.classList.add("navbar", "navbar-expand-lg", "justify-content-between");
  
      const $title = document.createElement("span");
      $title.classList.add("navbar-brand");
      $title.innerText = title;
  
      $nav.appendChild($title);
      $header.appendChild($nav);
  
      /**
       * Breadcrumbs
       */
      if (path.length > 0) {
        const $ul = document.createElement("ul");
        $ul.classList.add("breadcrumb");
  
        path.forEach((el, i) => {
          const $li = document.createElement("li");
          $li.classList.add("breadcrumb-item");
          $li.innerText = el;
  
          if (i === path.length - 1) {
            $li.classList.add("active");
          }
  
          $ul.appendChild($li);
        });
  
        $header.appendChild($ul);
      }
  
      if (!this.settings.header) {
        $header.style.display = "none";
      }
  
      this.header = $header;
      this.body.insertBefore(this.header, this.body.firstChild);
    }
  
    addResultInConsole() {
      const $section = document.createElement("section");
      $section.classList.add("container", "mb-5");
      $section.innerHTML = `<div class="card">
          <div class="card-body">
            <h2>Sprawdź wynik w konsoli!</h2>
            <h4 class="mt-4">Narzędzia deweloperskie</h4>
            <ul>
              <li><code>F12</code></li>
              <li><code>CTRL + SHIFT + I</code></li>
              <li>MacOS: <code>CMD + OPT + I</code></li>
            </ul>
          </div>
        </div>`;
  
      this.header.parentNode.insertBefore($section, this.header.nextSibling);
    }
  }
  
  window.CL = CL;