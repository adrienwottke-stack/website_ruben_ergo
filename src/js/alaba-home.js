import { MEDIA } from "../config.js";
import { gsap, ScrollTrigger, prefersReduced, lenis, scrollToAnchor } from "./scroll.js";

// Match the existing hero mask breakpoint without changing its geometry.
const heroMobile = window.matchMedia("(max-width: 900px)");
const heroMedia = () => ({
  video: (heroMobile.matches && MEDIA.hero.mobileVideo) || MEDIA.hero.video,
  poster: (heroMobile.matches && MEDIA.hero.mobilePoster) || MEDIA.hero.poster,
});

function applyHeroMedia() {
  const videos = Array.from(document.querySelectorAll("[data-hero-video]"));
  const posterOnly = new WeakSet();

  const showPoster = (video) => {
    if (posterOnly.has(video)) return;
    posterOnly.add(video);
    video.autoplay = false;
    video.pause();
    // Reset failed/denied playback to the native poster on the same video layer.
    video.removeAttribute("src");
    video.load();
  };

  const play = (video) => {
    if (prefersReduced || posterOnly.has(video)) return;
    video.play()?.catch((error) => {
      // Scrolling off screen may abort a pending play; that is not a media error.
      if (error.name !== "AbortError") showPoster(video);
    });
  };

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.addEventListener("error", () => showPoster(video));
  });

  const syncMedia = () => {
    const media = heroMedia();
    videos.forEach((video) => {
      posterOnly.delete(video);
      video.poster = media.poster;
      // Also cover decode/loading gaps; background follows the existing crop.
      video.style.backgroundImage = `url(${JSON.stringify(media.poster)})`;
      video.autoplay = !prefersReduced;
      if (prefersReduced) {
        showPoster(video);
      } else {
        if (video.getAttribute("src") !== media.video) {
          video.src = media.video;
          video.load();
        }
        play(video);
      }
    });
  };
  syncMedia();
  heroMobile.addEventListener("change", syncMedia);

  // Stop decoding the two hero layers once the stage is off screen.
  const stage = document.querySelector(".life__stage");
  if (stage && !prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      videos.forEach((video) => {
        if (entry.isIntersecting) play(video);
        else video.pause();
      });
    });
    observer.observe(stage);
  }
}

function initIntro() {
  const intro = document.querySelector("[data-intro]");
  if (!intro) return;

  if (prefersReduced || (location.hash && location.hash !== "#top") || window.scrollY > 20) {
    intro.remove();
    return;
  }

  const html = document.documentElement;
  const page = document.querySelectorAll("#main, .rb-header, .rb-footer, .skip-link");
  intro.hidden = false;
  html.classList.add("intro-lock");
  page.forEach((element) => { element.inert = true; });
  lenis?.stop();
  const letters = intro.querySelectorAll(".rb-intro__name span");
  const media = intro.querySelector(".rb-intro__media");
  const images = [...media.querySelectorAll("img")];
  const claim = intro.querySelector(".rb-intro__claim");
  let closed = false;
  let exiting = false;
  let exitTimeline;
  let failSafe;
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  const cleanup = () => {
    if (closed) return;
    closed = true;
    clearTimeout(failSafe);
    timeline.kill();
    exitTimeline?.kill();
    html.classList.remove("intro-lock");
    page.forEach((element) => { element.inert = false; });
    if (!html.classList.contains("nav-lock")) lenis?.start();
    document.removeEventListener("keydown", skipIntro);
    intro.remove();
    ScrollTrigger.refresh();
  };
  const exitIntro = () => {
    if (closed || exiting) return;
    exiting = true;
    exitTimeline = gsap.timeline({ onComplete: cleanup })
      .to(intro, { yPercent: -100, duration: .85, ease: "power4.inOut" }, 0)
      .to(".rb-intro__content", { yPercent: 20, duration: .85, ease: "power4.inOut" }, 0);
  };
  const skipIntro = (event) => {
    if (event.key === "Escape") exitIntro();
  };
  document.addEventListener("keydown", skipIntro);
  failSafe = window.setTimeout(cleanup, 4500);

  timeline
    .fromTo(media, { scale: .94, opacity: 0 }, { scale: 1, opacity: 1, duration: .6 }, 0)
    .fromTo(letters, { yPercent: 115 }, { yPercent: 0, duration: .65, stagger: .035 }, .12)
    .to(images[1], { opacity: 1, duration: .14 }, .45)
    .to(images[2], { opacity: 1, duration: .14 }, .85)
    .fromTo(claim, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .45 }, .65)
    .fromTo(".rb-intro__line", { scaleX: 0 }, { scaleX: 1, duration: 1.15, ease: "power2.inOut" }, 0);

  // Critical stills and fonts gate the reveal, never the entire video download.
  // A bounded fallback and Escape keep failed/slow media from blocking the page.
  const poster = new Image();
  poster.src = heroMedia().poster;
  const ready = Promise.allSettled([
    ...images.map((image) => image.decode()),
    poster.decode(),
    document.fonts.ready,
  ]);
  const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  Promise.all([delay(1250), Promise.race([ready, delay(2200)])]).then(exitIntro);
}

function initMenu() {
  const toggle = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  const html = document.documentElement;
  const body = document.body;
  const firstLink = menu.querySelector("a");
  const background = document.querySelectorAll("#main, .rb-footer, .rb-mark, .skip-link");
  let focusTimer;

  const setOpen = (open, returnFocus = false) => {
    body.classList.toggle("menu-open", open);
    html.classList.toggle("nav-lock", open);
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    background.forEach((element) => { element.inert = open; });
    clearTimeout(focusTimer);

    if (lenis) {
      if (open) lenis.stop();
      else if (!html.classList.contains("intro-lock")) lenis.start();
    }

    if (open) {
      focusTimer = window.setTimeout(() => firstLink?.focus({ preventScroll: true }), prefersReduced ? 0 : 300);
    } else if (returnFocus) {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!body.classList.contains("menu-open"));
  });

  menu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    setOpen(false);

    if (href?.startsWith("#")) {
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation();
      window.requestAnimationFrame(() => {
        scrollToAnchor(target);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!body.classList.contains("menu-open")) return;
    if (event.key === "Escape") setOpen(false, true);
    if (event.key === "Tab") {
      const focusable = [toggle, ...menu.querySelectorAll("a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches && body.classList.contains("menu-open")) setOpen(false);
  });
}

function initLifeScene() {
  const life = document.querySelector(".life");
  const masked = document.querySelector(".life__video--masked");
  const cinema = document.querySelector(".life__video--cinema");
  const shade = document.querySelector(".life__cinema-shade");
  const statement = document.querySelector(".life__statement");
  const scrollHint = document.querySelector(".life__scroll");

  if (!life || !masked || !cinema || prefersReduced) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: life,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.55,
      invalidateOnRefresh: true,
    },
  })
    .to(masked, {
      opacity: 0,
      scale: 1.07,
      duration: 0.26,
      ease: "power2.in",
    }, 0.35)
    .to(cinema, {
      opacity: 1,
      scale: 1,
      duration: 0.58,
      ease: "power2.inOut",
    }, 0.31)
    .to(".life__rules", { opacity: 0, duration: .22, ease: "none" }, .39)
    .to(shade, {
      opacity: 1,
      duration: 0.22,
      ease: "none",
    }, 0.62)
    .to(statement, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    }, 0.73)
    .to(scrollHint, {
      color: "#ece9e2",
      duration: 0.12,
      ease: "none",
    }, 0.58);
}

function initTextAndImageReveals() {
  if (prefersReduced) {
    document.querySelectorAll("[data-media-reveal]").forEach((el) => el.classList.add("is-in"));
    return;
  }

  document.querySelectorAll("[data-word]").forEach((word) => {
    gsap.to(word, {
      y: 0,
      duration: 0.95,
      ease: "power4.out",
      scrollTrigger: {
        trigger: word.parentElement,
        start: "top 90%",
        once: true,
      },
    });
  });

  document.querySelectorAll("[data-media-reveal]").forEach((media) => {
    ScrollTrigger.create({
      trigger: media,
      start: "top 88%",
      once: true,
      onEnter: () => media.classList.add("is-in"),
    });
  });

}

function initImageMotion() {
  if (prefersReduced) return;

  const portrait = document.querySelector(".portrait-story__image");
  if (portrait) {
    gsap.fromTo(portrait, {
      yPercent: -7,
    }, {
      yPercent: 7,
      ease: "none",
      scrollTrigger: {
        trigger: ".portrait-story",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.55,
      },
    });
  }

  const media = gsap.matchMedia();
  media.add({ mobile: "(max-width: 600px)", desktop: "(min-width: 601px)" }, (context) => {
    const distance = context.conditions.mobile ? 24 : 64;
    document.querySelectorAll(".lens__item").forEach((item, index) => {
      const direction = index % 2 ? -1 : 1;
      gsap.fromTo(item, { y: distance * direction }, {
        y: -distance * direction,
        ease: "none",
        scrollTrigger: { trigger: ".lens", start: "top bottom", end: "bottom top", scrub: .6 },
      });
      gsap.fromTo(item.querySelector("img"), { yPercent: -8 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: .6 },
      });
    });
    document.querySelectorAll(".lens__labels span").forEach((label, index) => {
      gsap.fromTo(label, { y: distance * (index ? -1 : 1) }, {
        y: distance * (index ? 1 : -1),
        ease: "none",
        scrollTrigger: { trigger: ".lens", start: "top bottom", end: "bottom top", scrub: .6 },
      });
    });
  });
}

function initFooterReveal() {
  const footer = document.querySelector(".rb-footer");
  if (!footer) return;
  // Keyboard focus must reveal footer links that the white main still covers.
  footer.addEventListener("focusin", (event) => {
    if (!event.target.matches(":focus-visible")) return;
    if (document.getElementById("main").getBoundingClientRect().bottom <= footer.getBoundingClientRect().top + 1) return;
    const bottom = document.documentElement.scrollHeight - window.innerHeight;
    if (lenis) lenis.scrollTo(bottom, { immediate: true });
    else window.scrollTo({ top: bottom, behavior: "instant" });
  });
  if (prefersReduced) return;
  // The optional message can be resized without shifting the footer reveal.
  const messageInput = document.getElementById("visionMessage");
  if (messageInput && "ResizeObserver" in window) {
    let refreshTimer;
    let previousHeight = messageInput.offsetHeight;
    const observer = new ResizeObserver(() => {
      if (messageInput.offsetHeight === previousHeight) return;
      previousHeight = messageInput.offsetHeight;
      clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(messageInput);
  }
  const media = gsap.matchMedia();
  media.add("(min-height: 651px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-scene",
        start: "bottom bottom",
        end: () => `+=${footer.offsetHeight}`,
        scrub: .5,
        invalidateOnRefresh: true,
      },
    })
      .fromTo(".rb-footer__wordmark span", { yPercent: 38 }, { yPercent: 0, ease: "none" }, 0)
      .fromTo(".rb-footer__top", { y: 36, opacity: .6 }, { y: 0, opacity: 1, ease: "none" }, 0);
  });
}

function initFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

export function initAlabaHome() {
  document.documentElement.classList.add("alaba-page");
  if (!prefersReduced) document.body.classList.add("motion-ready");
  applyHeroMedia();
  initIntro();
  initMenu();
  initLifeScene();
  initTextAndImageReveals();
  initImageMotion();
  initFooterReveal();
  initFooterYear();

  // Native smooth anchor scrolling can be interrupted by the initial GSAP
  // measurements. Restore a direct #contact visit after fonts and layout settle.
  const initialHash = location.hash;
  const initialAnchor = initialHash ? document.getElementById(initialHash.slice(1)) : null;
  let userNavigated = false;
  const cancelInitialAnchor = () => { userNavigated = true; };
  const inputEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
  if (initialAnchor) {
    inputEvents.forEach((event) => window.addEventListener(event, cancelInitialAnchor, { once: true, passive: true }));
  }
  const settleLayout = async () => {
    await document.fonts.ready;
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (initialAnchor && !userNavigated && location.hash === initialHash) {
        scrollToAnchor(initialAnchor, { immediate: true });
      }
      inputEvents.forEach((event) => window.removeEventListener(event, cancelInitialAnchor));
    }));
  };
  if (document.readyState === "complete") settleLayout();
  else window.addEventListener("load", settleLayout, { once: true });
}
