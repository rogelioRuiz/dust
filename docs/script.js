const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__link");
const filterButtons = document.querySelectorAll("[data-filter]");
const moduleCards = document.querySelectorAll(".card--module");
const installTabs = document.querySelectorAll(".tabs--install [data-tab]");
const installPanels = document.querySelectorAll(".install__panel");
const copyButtons = document.querySelectorAll(".copy-button");
const revealItems = document.querySelectorAll(".reveal");
const year = document.getElementById("year");

const setNavState = () => {
  if (nav) {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  }
};

const closeMenu = () => {
  if (!navToggle || !navMenu) {
    return;
  }
  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("is-open", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    moduleCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.platform === filter;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

installTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    installTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    installPanels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== target;
    });
  });
});

const copyText = async (text) => {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.parentElement ? button.parentElement.querySelector("code") : null;
    if (!code) {
      return;
    }

    const originalLabel = button.textContent;
    try {
      await copyText(code.textContent.trim());
      button.textContent = "Copied";
    } catch (error) {
      button.textContent = "Retry";
    }

    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1400);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -48px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

setNavState();
window.addEventListener("scroll", setNavState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    closeMenu();
  }
});
