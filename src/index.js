console.log("connected to index");
const axios = require("axios");
const api = require("./api");

const state = {};

const flavorsList = document.querySelector("#flavors-list");
const moleculesList = document.querySelector("#molecules-list");
const form = document.querySelector("form");

//--------- Fetch Setup
const fetchFlavors = async () => {
  const response = await api.fetchFlavors();
  state.flavors = response.data;
};

const fetchMolecules = async () => {
  const response = await api.fetchMolecules();
  state.molecules = response.data;
};

// -------- Form Submission for Flavor Create
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const input = document.querySelector("input");

  const name = input.value;
  const flavor = await api.createFlavor({ name });
  state.flavors.push(flavor);
  window.location.hash = flavor.id;
  input.value = "";
});

// --------- Event Listeners
flavorsList.addEventListener("click", async (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === "A") {
    const flavorId = e.target.getAttribute("data-id") * 1;
    await api.deleteFlavor(flavorId);
    state.flavors = state.flavors.filter((flavor) => flavor.id !== flavorId);
    renderFlavors();
  }
});

window.addEventListener("hashchange", async () => {
  await fetchFlavors();
  renderFlavors();
});

//--------------- Renders
const renderFlavors = () => {
  const id = window.location.hash.slice(1) * 1;
  const html = state.flavors
    .map((flavor) => {
      return `
        <li 'class='${flavor.id === id ? "selected" : ""}'>
          <a data-id='${flavor.id}' href='#${flavor.id}'>
            ${flavor.name}
          </a>
        </li>
      `;
    })
    .join("");
  flavorsList.innerHTML = html;
};

const renderMolecules = () => {
  const html = state.molecules
    .map((molecule) => {
      return `
        <li data-id='${molecule.id}'>

            ${molecule.name}
            ${molecule.description}
        </li>
      `;
    })
    .join("");
  moleculesList.innerHTML = html;
};

//---------Setup
const setUp = async () => {
  console.log("render");
  await fetchFlavors();
  await fetchMolecules();
  renderFlavors();
  renderMolecules();
};

setUp();
