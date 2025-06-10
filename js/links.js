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

function renderLinks() {
  const linksList = document.querySelector("#links");
  linksList.innerHTML = "";
  let categories = [...new Set(links.map((link) => link.category))];

  categories.forEach((category) => {
    let categoryLinks = links.filter((link) => link.category === category);
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-toggle");
    const categoryIcon = categoryLinks[0]?.icon || '📁'; // fallback padrão
    categoryContainer.innerHTML = `
      <button class="category-button link">${categoryIcon} <span>${category}</span></button>
      <ul class="category-links hidden"></ul>
    `;

    let list = categoryContainer.querySelector(".category-links");
    categoryLinks.forEach((link) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <a class="link" href="${link.url}" target="_blank"
        rel="noopener noreferrer" title="${link.name}">
          ${link.icon} <span>${link.name}</span>
        </a>`;
      list.appendChild(listItem);
    });

    linksList.appendChild(categoryContainer);
  });

  document.querySelectorAll('.category-button').forEach(button => {
  button.addEventListener('click', () => {
    const allMenus = document.querySelectorAll('.category-links');
    const currentMenu = button.nextElementSibling;

    allMenus.forEach(menu => {
      if (menu !== currentMenu) {
        menu.classList.add('hidden');
      }
    });

    currentMenu.classList.toggle('hidden');
  });
});

  setupLinkEffects();
}

function addLink(name, url) {
  links.push({ name, url });
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}

function deleteLink(index) {
  links.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
}