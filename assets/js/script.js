/* Drishya Tattoo — Vanilla JS interactions (no frameworks) */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const STORAGE = {
  bookings: "drishya_bookings",
};

const PRICES = {
  large: 12000,
  small: 6000,
};

const WHATSAPP_NUMBER = "9779712014211";

function openWhatsAppMessage(text) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const DATA = {
  gallery: [
    // Tattoo
    { src: "./assets/images/tattoogallery.jpg", category: "tattoo", title: "Tattoo — Studio Work" },
    {
      src: "./assets/images/national-academy-of-fine-arts.jpg",
      category: "tattoo",
      title: "Recognition — Nepal Academy of Fine Arts (2022)",
    },
    ...[
      "tattoogallery1.jpg",
      "tattoogallery2.jpg",
      "tattoogallery3.jpg",
      "tattoogallery4.jpg",
      "tattoogallery5.jpg",
      "tattoogallery6.jpg",
      "tattoogallery7.jpg",
      "tattoogallery8.jpg",
      "tattoogallery9.jpg",
      "tattoogallery10.jpg",
      "tattoogallery11.jpg",
      "tattoogallery12.jpg",
      "tattoogallery13.jpg",
      "tattoogallery14.jpg",
      "tattoogallery15.jpg",
      "tattoogallery16.jpg",
      "tattoogallery17.jpg",
      "tattoogallery18.jpg",
      "tattoogallery19.jpg",
      "tattoogallery20.jpg",
      "tattoogallery21.jpg",
      "tattoogallery22.jpg",
      "tattoogallery23.jpg",
      "tattoogallery24.jpg",
      "tattoogallery25.jpg",
      "tattoogallery26.jpg",
      "tattoogallery27.jpg",
      "tattoogallery28.jpg",
      "tattoogallery29.jpg",
      "tattoogallery30.jpg",
      "tattoogallery31.jpg",
      "tattoogallery32.jpg",
      "tattoogallery34.jpg",
    ].map((f, idx) => ({
      src: `./assets/images/${f}`,
      category: "tattoo",
      title: `Tattoo — Completed Work ${idx + 1}`,
    })),

    // Training
    { src: "./assets/images/tattoo-school.jpg", category: "training", title: "Training — Classroom & Practice" },

    // Handicrafts
    { src: "./assets/images/light-throw-art.jpg", category: "handicrafts", title: "Handicrafts Arts — Light Throw Art" },
    { src: "./assets/images/creation-of-cosmos-arts.jpg", category: "handicrafts", title: "Handicrafts Arts — Creation of Cosmos" },
    { src: "./assets/images/praying-for-covid-arts.jpg", category: "handicrafts", title: "Handicrafts Arts — Praying for COVID" },
  ],

  shop: [
    {
      id: "handicrafts-arts",
      name: "Handicrafts Arts",
      image: "./assets/images/light-throw-art.jpg",
      desc: "Premium handmade artwork crafted for modern spaces—minimal, artistic, and collectible.",
    },
    {
      id: "creation-of-cosmos",
      name: "Creation of Cosmos",
      image: "./assets/images/creation-of-cosmos-arts.jpg",
      desc: "A premium statement piece—rich detail and a gallery-grade finish.",
    },
    {
      id: "praying-for-covid",
      name: "Praying for COVID",
      image: "./assets/images/praying-for-covid-arts.jpg",
      desc: "A meaningful collector’s artwork—crafted with care and presence.",
    },
  ],

  people: {
    raju: {
      name: "Raju Lama Yonzan",
      nickname: "Kala drishya",
      role: "Founder & Main Artist",
      meta: "15+ years experience",
      photo: "./assets/images/raju-founder-main-artist.jpg",
      desc:
        "I am an art artist and tattoo artist based in Kathmandu, Nepal, whose practice explores a refined balance between sacred tradition and contemporary expression. Inspired by Buddhist and Hindu philosophy, my work is expressed through a distinctive neo-traditional language—precise, balanced, and deeply symbolic.

From 2012 to 2014, I began my creative journey in both painting and tattooing, building a strong artistic foundation. Since 2015, I have been working professionally in the tattoo field, further refining my skills at Devilz Tattooz in New Delhi, India.

In 2019, after returning from Devilz Tattooz, I established Boudha Ink Gallery Art in Kathmandu, Nepal. Under this company, “Drishya Tattoo” was introduced as the public identity, formally expanding my tattoo practice.

My work is defined by a strong commitment to freehand design, integrating Buddhist and Hindu iconography with geometric structures and Nepali motifs. Each piece is approached as a unique and intentional composition—thoughtfully developed with clarity, depth, and longevity in mind.

Alongside tattooing, I am actively engaged in traditional handicrafts and custom art, transforming cultural heritage and personal narratives into refined artistic forms. I also provide professional training and mentorship in tattooing and the arts, contributing to the growth and development of emerging artists.

In 2020, I was honored at the National Exhibition organized by the Nepal Academy of Fine Arts, receiving national recognition from the President of Nepal. In 2022, I was invited to conduct a seminar at Aliens Tattoo School, further extending my role into education and mentorship.

Tattoo and fine arts painting, for me, are not merely professions—they are mediums through which I translate deeper ideas, emotions, and spiritual sensibilities into enduring visual expressions.
",
    },
    urken: {
      name: "Urken",
      role: "artist",
      meta: "7+ years experience",
      photo: "./assets/images/urken-artist.jpg",
      desc: "Freehand composition with strong placement awareness and clean long-term wear.",
    },
    suvas: {
      name: "Suvas",
      role: "artist",
      meta: "7+ years experience",
      photo: "./assets/images/subash-artist.jpg",
      desc: "Realism-focused work with detail-first shading, contrast, and premium finishing.",
    },
    robin: {
      name: "Robin",
      role: "Manager",
      meta: "Studio operations",
      photo: "./assets/images/robin-manager.jpg",
      desc: "Your point of contact for bookings, confirmations, and a smooth studio experience.",
    },
    nav: {
      name: "Nav",
      role: "International Artist",
      meta: "Guest sessions",
      photo: "./assets/images/international-artist.jpg",
      desc:
        "Specialized in color realism tattoo, delivering high-detail, lifelike designs with precision and creativity. For guest session dates and availability, book early or message us on WhatsApp.",
    },
  },
};

const RAJU_WORKS = DATA.gallery.filter((g) => g.category === "tattoo");

function setupHeroSlideshow() {
  const heroBg = $(".hero__bg");
  if (!heroBg) return;

  const matchesTattooGallery = (g) => {
    const src = String(g?.src || "").toLowerCase();
    const title = String(g?.title || "").toLowerCase();
    return src.includes("tattoogallery") || title.includes("tattoo gallery");
  };

  const slides = DATA.gallery
    .filter(matchesTattooGallery)
    .map((g) => g.src)
    .filter(Boolean);

  const uniqueSlides = Array.from(new Set(slides));
  const list = uniqueSlides.length ? uniqueSlides : ["./assets/images/heros.png"];

  const baseLayers = (url) =>
    [
      "linear-gradient(120deg, rgba(25,22,19,.62), rgba(25,22,19,.38) 45%, rgba(25,22,19,.70))",
      "radial-gradient(900px 500px at 20% 20%, rgba(199,162,123,.20), transparent 62%)",
      `url("${url}")`,
    ].join(", ");

  let idx = 0;

  const set = (nextUrl, { fade } = { fade: true }) => {
    if (!fade) {
      heroBg.style.backgroundImage = baseLayers(nextUrl);
      return;
    }
    heroBg.style.opacity = "0";
    window.setTimeout(() => {
      heroBg.style.backgroundImage = baseLayers(nextUrl);
      heroBg.style.opacity = "1";
    }, 380);
  };

  set(list[0], { fade: false });
  if (list.length <= 1) return;

  window.setInterval(() => {
    idx = (idx + 1) % list.length;
    set(list[idx], { fade: true });
  }, 5200);
}

function safeJsonParse(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function formatRs(amount) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Active nav link on scroll */
function setupActiveNav() {
  const links = $$(".nav__link");
  const map = new Map();
  for (const a of links) {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) continue;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) map.set(a, el);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      for (const a of links) a.classList.remove("is-active");
      for (const [a, el] of map.entries()) {
        if (el === visible.target) a.classList.add("is-active");
      }
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0.08, 0.14, 0.2] }
  );

  for (const el of map.values()) obs.observe(el);
}

/* Mobile menu */
function setupMobileMenu() {
  const toggle = $("[data-mobile-toggle]");
  const panel = $("[data-mobile-panel]");
  if (!toggle || !panel) return;

  const close = () => {
    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  panel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* Modal (team/services) */
function setupModal() {
  const modal = $("[data-modal]");
  const content = $("[data-modal-content]");
  if (!modal || !content) return;
  const closeBtns = $$("[data-close-modal]");

  const open = (html) => {
    content.innerHTML = html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    content.innerHTML = "";
    document.body.style.overflow = "";
  };

  for (const b of closeBtns) b.addEventListener("click", close);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  return { open, close };
}

/* Lightbox */
function setupLightbox() {
  const box = $("[data-lightbox]");
  const img = $("[data-lightbox-img]");
  const cap = $("[data-lightbox-cap]");
  const btnClose = $$("[data-close-lightbox]");
  const btnPrev = $("[data-lightbox-prev]");
  const btnNext = $("[data-lightbox-next]");
  if (!box || !img || !cap || !btnPrev || !btnNext) return;

  let list = [];
  let idx = 0;

  const render = () => {
    const item = list[idx];
    if (!item) return;
    img.src = item.src;
    img.alt = item.title || "Preview";
    cap.textContent = item.title || "";
  };

  const open = (items, startIdx = 0) => {
    list = items;
    idx = Math.min(Math.max(startIdx, 0), Math.max(items.length - 1, 0));
    render();
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    img.src = "";
    img.alt = "";
    cap.textContent = "";
    list = [];
    idx = 0;
  };
  const prev = () => {
    if (!list.length) return;
    idx = (idx - 1 + list.length) % list.length;
    render();
  };
  const next = () => {
    if (!list.length) return;
    idx = (idx + 1) % list.length;
    render();
  };

  for (const b of btnClose) b.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);
  window.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  return { open, close };
}

/* Gallery render + filters */
function setupGallery(lightbox) {
  const grid = $("[data-gallery-grid]");
  if (!grid) return;

  let active = "all";
  const filters = $$(".chip[data-filter]");

  const getVisible = () => {
    if (active === "all") return DATA.gallery;
    return DATA.gallery.filter((g) => g.category === active);
  };

  const tileClass = (i) => {
    const classes = ["g-item"];
    if (i % 9 === 1 || i % 9 === 6) classes.push("is-wide");
    if (i % 10 === 3) classes.push("is-tall");
    return classes.join(" ");
  };

  const render = () => {
    const items = getVisible();
    grid.innerHTML = items
      .map(
        (g, i) => `
          <button class="${tileClass(i)}" type="button" data-g-idx="${i}">
            <img src="${g.src}" alt="${g.title}" loading="lazy" />
            <span class="g-cap">
              <span>${g.title}</span>
              <span class="g-cap__tag">${g.category === "handicrafts" ? "Handicrafts Arts" : g.category}</span>
            </span>
          </button>
        `
      )
      .join("");
  };

  render();

  for (const b of filters) {
    b.addEventListener("click", () => {
      active = b.dataset.filter || "all";
      for (const x of filters) {
        const on = x === b;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-selected", String(on));
      }
      render();
    });
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-g-idx]");
    if (!btn) return;
    const visible = getVisible();
    const i = Number(btn.dataset.gIdx || 0);
    lightbox?.open(visible, i);
  });

  return { getVisible };
}

/* Team cards + Services cards */
function setupCards(modal, lightbox) {
  const personBtns = $$("[data-person]");
  for (const btn of personBtns) {
    btn.addEventListener("click", () => {
      const key = btn.dataset.person;
      const p = DATA.people[key];
      if (!p) return;

      modal?.open(`
        <div class="modal-head">
          <div class="person-pop">
            ${
              p.photo
                ? `<img class="avatar${key === "nav" ? " avatar--promo" : ""}" src="${p.photo}" alt="${p.name}" loading="lazy" />`
                : `<div class="avatar avatar--blank" aria-hidden="true"></div>`
            }
            <div>
            <p class="kicker">Our Team</p>
            <h3 class="m-title">${p.name}</h3>
            ${p.nickname ? `<p class="m-meta">Nickname: ${p.nickname}</p>` : ""}
            <p class="m-meta">${p.role} · ${p.meta}</p>
            <p class="m-desc">${p.desc}</p>
            ${
              key === "raju"
                ? `<div class="m-actions"><button class="btn" type="button" data-view-raju>View Completed Works</button></div>`
                : ""
            }
            </div>
          </div>
        </div>
      `);

      const viewBtn = $("[data-view-raju]");
      if (viewBtn && lightbox) {
        viewBtn.addEventListener("click", () => lightbox.open(RAJU_WORKS, 0), { once: true });
      }
    });
  }

  const serviceBtns = $$("[data-service]");
  for (const btn of serviceBtns) {
    btn.addEventListener("click", () => {
      const key = btn.dataset.service;
      if (!key) return;

      const map = {
        tattoo: {
          title: "Tattoo Inking",
          desc: "Custom designs, premium execution, and hygiene-first studio discipline. Tap any image to preview.",
          items: DATA.gallery.filter((g) => g.category === "tattoo"),
        },
        training: {
          title: "Tattoo Training School",
          desc: "Foundation + hygiene + technique. Learn with a studio-first mindset.",
          items: DATA.gallery.filter((g) => g.category === "training"),
        },
        handicrafts: {
          title: "Handicrafts Arts",
          desc: "Premium handcrafted artworks. Tap to preview product images.",
          items: DATA.gallery.filter((g) => g.category === "handicrafts"),
        },
      };

      const s = map[key];
      if (!s) return;

      modal?.open(`
        <div class="modal-head">
          <div>
            <p class="kicker">Service</p>
            <h3 class="m-title">${s.title}</h3>
            <p class="m-desc">${s.desc}</p>
          </div>
        </div>
        <div class="modal-grid" data-modal-grid>
          ${s.items
            .slice(0, 24)
            .map(
              (g, i) => `
              <button class="modal-thumb" type="button" data-modal-img="${i}">
                <img src="${g.src}" alt="${g.title}" loading="lazy" />
              </button>
            `
            )
            .join("")}
        </div>
      `);

      const grid = $("[data-modal-grid]");
      if (grid && lightbox) {
        grid.addEventListener("click", (e) => {
          const b = e.target.closest("[data-modal-img]");
          if (!b) return;
          const i = Number(b.dataset.modalImg || 0);
          lightbox.open(s.items, i);
        });
      }
    });
  }
}

/* Shop */
function setupShop() {
  const grid = $("[data-shop-grid]");
  if (!grid) return null;

  const render = () => {
    grid.innerHTML = DATA.shop
      .map(
        (p) => `
          <article class="card product" data-product="${p.id}">
            <span class="card__media">
              <img src="${p.image}" alt="${p.name}" loading="lazy" />
              <span class="card__arrow" aria-hidden="true">Shop</span>
            </span>
            <div class="card__body">
              <span class="pill">Art Shop</span>
              <div class="row" style="justify-content:space-between; gap:12px;">
                <div>
                  <div class="card__title">${p.name}</div>
                  <div class="card__meta">Large: Rs. ${formatRs(PRICES.large)} · Small: Rs. ${formatRs(PRICES.small)}</div>
                </div>
              </div>
              <p class="card__desc">${p.desc}</p>
              <div class="row" style="justify-content:space-between;">
                <select class="select" data-size>
                  <option value="large">Large (37 x 64 in) — Rs. ${formatRs(PRICES.large)}</option>
                  <option value="small">Small — Rs. ${formatRs(PRICES.small)}</option>
                </select>
                <button class="btn" type="button" data-order-now>Order on WhatsApp</button>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  };

  render();
  return grid;
}

function setupShopOrdering(shopGrid) {
  if (!shopGrid) return;

  shopGrid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-product]");
    const orderBtn = e.target.closest("[data-order-now]");
    if (!card || !orderBtn) return;

    const id = card.dataset.product;
    const product = DATA.shop.find((p) => p.id === id);
    if (!product) return;

    const size = card.querySelector("[data-size]")?.value || "large";
    const sizeLabel = size === "large" ? "Large (37 x 64 in)" : "Small";
    const unitPrice = size === "large" ? PRICES.large : PRICES.small;

    const lines = [
      "*Drishya Tattoo — Art Shop Order Inquiry*",
      `Product: ${product.name}`,
      `Size: ${sizeLabel}`,
      `Price: Rs. ${formatRs(unitPrice)}`,
      "",
      "Please share availability and order confirmation details.",
    ];
    openWhatsAppMessage(lines.join("\n"));
  });
}

/* Booking form */
function setupBooking() {
  const form = $("#bookingForm");
  const msg = $("#bookingMsg");
  if (!form || !msg) return;

  const tattooOnly = $("[data-tattoo-only]");
  const handicraftsOnly = $("[data-handicrafts-only]");

  const loadBookings = () => safeJsonParse(localStorage.getItem(STORAGE.bookings), []);
  const saveBookings = (list) => localStorage.setItem(STORAGE.bookings, JSON.stringify(list));

  const setVisibility = (type) => {
    const isTattoo = type === "tattoo";
    const isHand = type === "handicrafts";
    if (tattooOnly) tattooOnly.hidden = !isTattoo;
    if (handicraftsOnly) handicraftsOnly.hidden = !isHand;
  };

  form.addEventListener("change", (e) => {
    if (e.target?.name === "serviceType") setVisibility(e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.classList.remove("error");

    const fd = new FormData(form);
    const payload = {
      serviceType: String(fd.get("serviceType") || "").trim(),
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      date: String(fd.get("date") || "").trim(),
      time: String(fd.get("time") || "").trim(),
      placement: String(fd.get("placement") || "").trim(),
      handicraftInterest: String(fd.get("handicraftInterest") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      createdAt: new Date().toISOString(),
    };

    if (!payload.serviceType || !payload.name || !payload.phone || !payload.date || !payload.description) {
      msg.textContent = "Please fill in Service, Name, Phone, Date, and Description.";
      msg.classList.add("error");
      return;
    }

    const serviceLabel =
      payload.serviceType === "tattoo"
        ? "Tattoo Inking"
        : payload.serviceType === "tanning"
          ? "Tanning"
          : payload.serviceType === "school"
            ? "School"
          : payload.serviceType === "handicrafts"
            ? "Handicrafts"
            : payload.serviceType;

    const lines = [
      "*Drishya Tattoo — Booking request*",
      `Service: ${serviceLabel}`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Date: ${payload.date}`,
      payload.time ? `Time: ${payload.time}` : null,
      payload.placement ? `Placement: ${payload.placement}` : null,
      payload.handicraftInterest ? `Artwork interest: ${payload.handicraftInterest}` : null,
      "",
      "*Description:*",
      payload.description,
    ].filter(Boolean);

    const list = loadBookings();
    list.unshift(payload);
    saveBookings(list);

    openWhatsAppMessage(lines.join("\n"));
    msg.textContent = "Opening WhatsApp with your booking details. Thank you.";
    form.reset();
    setVisibility("");
  });
}

function setupContactForm() {
  const form = $("#contactForm");
  const msg = $("#contactMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.classList.remove("error");

    const fd = new FormData(form);
    const service = String(fd.get("service") || "").trim();
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!service || !name || !phone || !message) {
      msg.textContent = "Please complete Service, Name, Phone, and Message.";
      msg.classList.add("error");
      return;
    }

    const lines = [
      "*Drishya Tattoo — Contact*",
      `Service: ${service}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      "",
      "*Message:*",
      message,
    ].filter(Boolean);

    openWhatsAppMessage(lines.join("\n"));
    msg.textContent = "Opening WhatsApp with your message.";
    form.reset();
  });
}

/* Global: add CSS for modal grid content (kept in JS to keep HTML clean) */
function injectModalCss() {
  const css = `
    .modal-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:14px}
    .person-pop{display:flex;gap:14px;align-items:flex-start}
    .avatar{width:92px;height:92px;border-radius:18px;object-fit:cover;object-position:center top;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.02)}
    .avatar--promo{width:min(100%, 200px);height:200px;border-radius:20px;object-fit:contain;object-position:center;background:#050505}
    .avatar--blank{display:block}
    .m-title{margin:0;font-weight:950;font-size:24px;letter-spacing:.01em}
    .m-meta{margin:6px 0 0;color:rgba(255,255,255,.68)}
    .m-desc{margin:10px 0 0;color:rgba(255,255,255,.72);max-width:85ch;line-height:1.65}
    .m-actions{margin-top:12px}
    .modal-grid{display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:10px}
    .modal-thumb{padding:0;border:1px solid rgba(255,255,255,.10);background:#0b0b0b;border-radius:14px;overflow:hidden;cursor:pointer}
    .modal-thumb img{width:100%;height:140px;object-fit:cover;transform:scale(1.02);transition:transform .5s ease, filter .5s ease;filter:saturate(.95) contrast(1.05)}
    .modal-thumb:hover img{transform:scale(1.10);filter:saturate(1.05) contrast(1.07)}
    .muted{color:rgba(255,255,255,.72)}
    @media (max-width: 900px){ .modal-grid{grid-template-columns:repeat(3, minmax(0, 1fr));} }
    @media (max-width: 700px){ .person-pop{flex-direction:column} .avatar{width:100%;height:220px;object-position:center 20%} .avatar--promo{height:min(52vw, 280px)} }
    @media (max-width: 600px){ .modal-grid{grid-template-columns:repeat(2, minmax(0, 1fr));} .modal-thumb img{height:120px} }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

function initYear() {
  const y = $("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  injectModalCss();
  setupHeroSlideshow();
  setupActiveNav();
  setupMobileMenu();

  const modal = setupModal();
  const lightbox = setupLightbox();

  setupGallery(lightbox);
  setupCards(modal, lightbox);

  const shopGrid = setupShop();
  setupShopOrdering(shopGrid);

  setupBooking();
  setupContactForm();

});

