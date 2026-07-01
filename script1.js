/* =======================================================
   INITIALISATION GLOBALE SANS DOUBLONS
======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();       
  initActiveMenu();      
  initFadeUp();          
  initCustomCursor();    
  initTiltEffect();      
  initMobileMenu();      
  initPortfolioEngine(); 
});

/* =======================================================
   1. ANIMATION DU CHARGEMENT (PRELOADER FLUIDE)
======================================================= */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const counter = document.getElementById("preloader-counter");
  const bar = document.getElementById("preloader-bar");
  
  if (!preloader) return;
  document.body.classList.add("loading-active");

  let progress = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      let increment = (100 - progress) * 0.08;
      if (increment < 0.5) increment = 0.5 + Math.random() * 1.5; 
      progress += increment;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (counter) counter.innerText = "100%";
        if (bar) bar.style.width = "100%";

        if (counter) {
          counter.style.transition = "all 0.6s cubic-bezier(0.77, 0, 0.175, 1)";
          counter.style.opacity = "0";
          counter.style.transform = "translateY(-30px) scale(0.9)";
        }
        if (bar) bar.parentElement.style.opacity = "0";

        setTimeout(() => {
          preloader.classList.add("hidden");
          document.body.classList.remove("loading-active");
        }, 600);
      } else {
        if (counter) counter.innerText = Math.floor(progress) + "%";
        if (bar) bar.style.width = progress + "%";
      }
    }, 25); 
  }, 300); 
}

/* =======================================================
   2. MENU ACTIF EN FONCTION DU SCROLL
======================================================= */
function initActiveMenu() {
  const links = document.querySelectorAll(".header-menu a");
  const sections = document.querySelectorAll("section[id], div[id='top']");

  function updateMenu() {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        links.forEach(link => {
          link.classList.remove("active");
          if (link.dataset.section === id) link.classList.add("active");
        });
      }
    });
  }
  window.addEventListener("scroll", updateMenu);
}

/* =======================================================
   3. MENU BURGER MOBILE
======================================================= */
function initMobileMenu() {
  const burger = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.header-center');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

/* =======================================================
   4. FADE-UP ANIMATION AU SCROLL
======================================================= */
function initFadeUp() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}

/* =======================================================
   5. EFFET 3D TILT SUR LES CARTES COMPÉTENCES & CATÉGORIES
======================================================= */
function initTiltEffect() {
  const cards = document.querySelectorAll('.category-box, .skill-card-glass');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; 
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'none'; 
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
    });
  });
}

/* =======================================================
   6. CURSEUR PERSONNALISÉ (AVEC INERTIE)
======================================================= */
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  document.querySelectorAll("a, button, .category-box, .project-item").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover-effect"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover-effect"));
  });
}

/* =======================================================
   7. BASE DE DONNÉES ET GESTION DES PROJETS STICKY
======================================================= */
const portfolioData = {
  marketing: [
    {
      title: "Flyer restaurant Mezzo di Pasta",
      description: "Conception complète d'un dispositif promotionnel imprimé visant à capturer la cible étudiante. Intégration de la charte graphique et gestion de la mise en page sous contraintes fortes de lisibilité.",
      images: ["portfolio_projets/comm/flyer_mezzo/flyer_mezzo_1.png", "portfolio_projets/comm/flyer_mezzo/carte.png"], 
      software: ["Photoshop", "InDesign", "canva"],
      keywords: ["Flyer", "Print", "Stratégie Commerciale"]
    },
    {
      title: "SKILLA",
      description: "Conception UX/UI d'une plateforme internationale de recrutement. Création de l'identité visuelle, d'une interface web et mobile, d'un design system complet ainsi que d'une campagne d'emailing pour offrir une expérience utilisateur moderne, accessible et cohérente.",
      images: ["portfolio_projets/comm/skilla/marketing.png", "portfolio_projets/comm/skilla/marketing2.png"],
      software: ["Photoshop", "canva","Figma"],
      keywords: ["Social Media", "Branding", "Content Strategy"]
    },
    {
        title: "Association La Cravate Solidaire Rennes",
        description: "Refonte de l'identité visuelle et conception UX/UI d'une plateforme pour La Cravate Solidaire Rennes. Ce projet combine recherche utilisateur, direction artistique, création d'une charte graphique et prototypage d'une interface moderne visant à valoriser l'impact de l'association et améliorer son engagement digital.",
        images: ["portfolio_projets/comm/filrouge/sitefg1.png"],
        software: ["Photoshop", "canva", "Figma"],
        keywords: ["Social Media", "Branding", "Content Strategy"]
    }
    ],
  uxui: [
    {
      title: "Handisport club rennes",
      description: "Recherche utilisateur et prototypage d'une interface d'analyse de données marketing. Architecture de l'information pensée pour fluidifier le workflow.",
      images: ["portfolio_projets/ux/handi.png"],
      software: ["Figma"],
      keywords: ["UX Design", "Wireframe", "Dashboard"]
    }
  ],
  branding: [
    {
      title: "ART exposition",
      description: "Création d'une identité visuelle complète pour Honar, une plateforme dédiée à l'univers artistique. Le projet comprend la conception du logo, de la charte graphique et de ses déclinaisons sur différents supports print et digitaux afin de construire une image de marque moderne, minimaliste et cohérente.",
      images: ["portfolio_projets/identité-visuel/artlogo/art.png", "portfolio_projets/identité-visuel/artlogo/art1.png","portfolio_projets/identité-visuel/artlogo/art2.png","portfolio_projets/identité-visuel/artlogo/art3.png", "portfolio_projets/identité-visuel/artlogo/art4.png", "portfolio_projets/identité-visuel/artlogo/art5.png", "portfolio_projets/identité-visuel/artlogo/art6.png"],
      software: ["Illustrator", "Photoshop", "Figma"],
      keywords: ["Logo", "Identity Design", "Branding", "UX Design"]
    },
    {
      title: "Assurance IRAN",
      description: "Conception d'une identité visuelle complète pour une compagnie d'assurance, pensée pour transmettre des valeurs de confiance, de protection et de proximité. Le projet inclut la création du logo, de la direction artistique et de ses déclinaisons sur différents supports de communication, ainsi que des maquettes web et mobile illustrant l'application de cette identité dans un écosystème digital cohérent.",
      images: ["portfolio_projets/identité-visuel/assurancelogo/assurance.png", "portfolio_projets/identité-visuel/assurancelogo/assurance1.png", "portfolio_projets/identité-visuel/assuranceogo/assurance2.png", "portfolio_projets/identité-visuel/assurancelogo/assurance3.png", "portfolio_projets/identité-visuel/assurancelogo/assurance4.png"],
      software: ["Illustrator", "Photoshop", "Figma"],
      keywords: ["Logo", "Identity Design", "Branding","UX Design"]
    },
    {
      title: "ORYN Chaussures",
      description: "ORYN est une marque de sneakers créée de A à Z, de la stratégie de marque à son identité visuelle. Ce projet comprend la création du naming, du logo, de la direction artistique, de la palette de couleurs, de la typographie ainsi que de l'ensemble des supports de communication (packaging, étiquettes et shopping bag). L'objectif était de concevoir une identité premium, contemporaine et facilement reconnaissable, capable d'incarner les valeurs d'innovation, de performance et de style urbain.",
      images: ["portfolio_projets/identité-visuel/oryn/shoes.png", "portfolio_projets/identité-visuel/oryn/shoes1.png", "portfolio_projets/identité-visuel/oryn/shoes2.png", "portfolio_projets/identité-visuel/oryn/shoes2v.mpeg-4.mp4"],
      software: ["Illustrator", "Photoshop", "Figma"],
      keywords: ["Logo", "Identity Design", "Branding", "UX Design"]
    }
  ],
  photo: [
    {
      title: "Portrait street photo",
      description: "Cette série de portraits explore la spontanéité des rencontres et la beauté des instants ordinaires. Réalisées en lumière naturelle, ces photographies capturent des expressions sincères et des émotions authentiques, transformant des scènes du quotidien en récits visuels empreints de simplicité et d'humanité.",
      images: ["portfolio_projets/photographie/photo2.jpeg", "portfolio_projets/photographie/photo3.jpeg"],
      software: ["Photoshop", "Lightroom"],
      keywords: ["Studio", "Portrait", "Retouche Pro"]
    }
  ]
};

function initPortfolioEngine() {
  const categories = document.querySelectorAll(".category-box");
  const categoriesView = document.getElementById("categories-view");
  const projectsLayout = document.getElementById("projects-layout");
  const projectsList = document.getElementById("projects-list");
  const projectDetail = document.getElementById("project-detail");
  const backBtn = document.getElementById("backToCategories");

  if (!categoriesView || !projectsLayout) return;

  categories.forEach(cat => {
    cat.addEventListener("click", () => {
      const category = cat.dataset.category;
      categoriesView.classList.add("hidden");
      projectsLayout.classList.remove("hidden");
      document.getElementById("projects").scrollIntoView({ behavior: 'smooth' });
      renderProjectsList(category);
    });
  });

  function renderProjectsList(category) {
    projectsList.innerHTML = "";
    const list = portfolioData[category] || [];

    list.forEach((project, index) => {
      const btn = document.createElement("button");
      btn.className = "project-item";
      btn.textContent = project.title;
      btn.addEventListener("click", () => showProjectDetails(category, index));
      projectsList.appendChild(btn);
    });

    if (list.length > 0) showProjectDetails(category, 0);
  }

  function showProjectDetails(category, index) {
    const project = portfolioData[category][index];
    if (!project) return;

    projectDetail.classList.remove("fade-in-content");
    void projectDetail.offsetWidth; 

    // Nouveau carrousel mieux proportionné avec effets visuels intégrés
    let carouselHTML = `
      <div class="carousel-container">
        <div class="carousel-track" id="carousel-track">
          ${project.images.map(img => { if (img.endsWith("mp4")) {return `<video autoplay='true' src="${img}" alt="${project.title}">`} else {return `<img src="${img}" alt="${project.title}">`}}).join("")}
        </div>
        ${project.images.length > 1 ? `
          <button class="carousel-btn prev" id="carousel-prev">←</button>
          <button class="carousel-btn next" id="carousel-next">→</button>
        ` : ""}
      </div>
    `;

    projectDetail.innerHTML = `
      ${carouselHTML}
      <div class="project-info-wrap" style="margin-top: 30px;">
        <h2 style="font-size: 2rem; margin-bottom: 15px; color: #fff;">${project.title}</h2>
        <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">${project.description}</p>
        <div class="software-list" style="margin-top: 15px;">
          ${project.software.map(s => `<div class="software-pill">${s}</div>`).join("")}
        </div>
        <div class="keyword-list" style="margin-top: 10px;">
          ${project.keywords.map(k => `<div class="keyword">${k}</div>`).join("")}
        </div>
      </div>
    `;

    projectDetail.classList.add("fade-in-content");

    const items = projectsList.querySelectorAll(".project-item");
    items.forEach((item, idx) => item.classList.toggle("active", idx === index));

    if (project.images.length > 1) {
      setupCarouselLogic();
    }
  }

  function setupCarouselLogic() {
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    if (!track) return;

    const totalSlides = track.children.length;
    let currentSlide = 0;

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide + 1) % totalSlides;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }

  backBtn.addEventListener("click", () => {
    projectsLayout.classList.add("hidden");
    categoriesView.classList.remove("hidden");
  });
}