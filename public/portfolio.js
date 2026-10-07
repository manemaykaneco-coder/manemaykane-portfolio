const projects = [
  {
    id: "dakar-mobilite",
    title: "DAKAR MOBILITÉ",
    type: "Production audiovisuelle",
    video: "portfolio/1007.mp4",
    poster: "",
    url: "https://www.instagram.com/reel/DXyoP3XDUg0/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    featured: true,
  },
  {
    id: "projet-02",
    title: "DAKAR MOBILITÉ",
    type: "Production audiovisuelle",
    video: "",
    poster: "portfolio/dakar-mobilite-sonatel.png",
    url: "https://www.instagram.com/reel/Da3qDFRADPc/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    id: "projet-03",
    title: "SIZE IMPACT",
    type: "Production audiovisuelle",
    video: "",
    poster: "portfolio/size-impact-poster-20261007.jpg",
    url: "https://www.instagram.com/reel/DaLJr8eNNjh/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    id: "projet-04",
    title: "BKG SPEED",
    type: "Production audiovisuelle",
    video: "",
    poster: "portfolio/home.jpg.webp",
    url: "https://www.instagram.com/reel/DBob-3DCEPF/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    id: "projet-05",
    title: "SunuBrt",
    type: "Production audiovisuelle",
    video: "",
    poster: "portfolio/sunubrt-poster-20261007.png",
    url: "https://www.instagram.com/reel/Db7-8ZbD3tm/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
];

const projectGrid = document.querySelector("#project-grid");

const createProjectCard = (project, index) => {
  const card = document.createElement("article");
  card.className = `project${project.featured ? " project-featured" : ""}`;
  card.dataset.projectId = project.id;

  const media = document.createElement(project.url ? "a" : "div");
  media.className = "media-frame";
  media.setAttribute("aria-label", `Extrait vidéo : ${project.title}`);
  if (project.url) {
    media.href = project.url;
    media.target = "_blank";
    media.rel = "noopener noreferrer";
    media.setAttribute("aria-label", `Ouvrir la vidéo complète : ${project.title}`);
  }

  if (project.poster) {
    media.style.backgroundImage = `url("${project.poster}")`;
    media.style.backgroundSize = "cover";
    media.style.backgroundPosition = "center";
    media.classList.add("has-video");
  }

  if (project.video) {
    const video = document.createElement("video");
    video.src = project.video;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "none";
    media.append(video);
    media.classList.add("has-video");
    media.addEventListener("mouseenter", () => {
      video.play().catch((error) => console.warn("Impossible de lire l’aperçu vidéo.", error));
    });
    media.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
    media.addEventListener("focusin", () => {
      video.play().catch((error) => console.warn("Impossible de lire l’aperçu vidéo.", error));
    });
    media.addEventListener("focusout", () => {
      video.pause();
      video.currentTime = 0;
    });
  }

  const number = document.createElement("span");
  number.className = "media-index";
  number.textContent = String(index + 1).padStart(2, "0");

  const placeholder = document.createElement("span");
  placeholder.className = "media-placeholder";
  placeholder.textContent = project.video || project.poster ? "APERÇU" : "EXTRAIT À INTÉGRER";

  const play = document.createElement("span");
  play.className = "media-play";
  play.setAttribute("aria-hidden", "true");
  play.textContent = "↗";

  media.append(number, placeholder, play);

  const caption = document.createElement("div");
  caption.className = "project-caption";

  const title = document.createElement("h3");
  if (project.url) {
    const titleLink = document.createElement("a");
    titleLink.href = project.url;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = project.title;
    title.append(titleLink);
  } else {
    title.textContent = project.title;
  }

  const type = document.createElement("p");
  type.textContent = project.type;
  caption.append(title, type);
  card.append(media, caption);
  return card;
};

if (projectGrid) {
  projects.forEach((project, index) => {
    projectGrid.append(createProjectCard(project, index));
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  document
    .querySelectorAll(
      ".intro-copy, .intro-aside, .gallery-heading, .project, .contact-main, .contact-details",
    )
    .forEach((element) => {
      element.classList.add("reveal", "will-reveal");
      revealObserver.observe(element);
    });
}
