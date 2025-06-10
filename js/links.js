

function setupLinkEffects() {
  const links = document.querySelectorAll('.link');

  links.forEach(link => {
    link.addEventListener('mousemove', e => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 10;
      const rotateY = (x - centerX) / 10;

      link.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      link.style.setProperty('--glare-x', `${x}px`);
      link.style.setProperty('--glare-y', `${y}px`);
      link.style.setProperty('--glare-opacity', '1');
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'rotateX(0deg) rotateY(0deg)';
      link.style.setProperty('--glare-opacity', '0');
    });
  });
}

// render links to the DOM (#links)
function renderLinks() {
  const linksList = document.querySelector("#links");
  linksList.innerHTML = "";

  let categories = links.map((link) => link.category);
  categories = [...new Set(categories)];

  categories.forEach((category) => {
    let categoryLinks = links.filter((link) => link.category === category);
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category");
    categoryContainer.innerHTML = `<h4>${category}</h4>`;
    let list = document.createElement("ul");

    categoryLinks.forEach((link) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <a class="link" href="${link.url}" target="_blank"
        rel="noopener noreferrer" title="${link.name}">
          ${link.icon} <span>${link.name}</span>
        </a>`;
      list.appendChild(listItem);
    });

    categoryContainer.appendChild(list);
    linksList.appendChild(categoryContainer);
  });

  // 🧠 Instala o efeito de glare e tilt
  setupLinkEffects();
}

// add a new link to the links array and re-render the links
function addLink(name, url) {
  links.push({ name, url });
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}

// delete a link from the links array and re-render the links
function deleteLink(index) {
  links.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}
