// render links to the DOM (#links)
function renderLinks() {
  const linksList = document.querySelector("#links");
  linksList.innerHTML = "";
  // get links by category
  let categories = links.map((link) => link.category);
  categories = [...new Set(categories)];

  categories.forEach((category) => {
    let categoryLinks = links.filter((link) => link.category === category);
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category");
    categoryContainer.innerHTML = `<h4>${category}</h4>`;
    let list = document.createElement("ul");
    categoryLinks.forEach((link, index) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
          <a class="link" href="${link.url}" target="_blank"
          rel="noopener noreferrer" title="${link.name}"
          >${link.icon} <span>${link.name}</span></a>
        `;
      list.appendChild(listItem);
    });
    categoryContainer.appendChild(list);
    linksList.appendChild(categoryContainer);
  });
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
