const axios = require("axios");

const fetchFlavors = () => {
  return axios.get("/api/flavors");
};

const fetchMolecules = () => {
  return axios.get("/api/molecules");
};

const createFlavor = async (flavor) => {
  const response = await axios.post("/api/flavors", flavor);
  return response.data;
};

const deleteFlavor = (id) => {
  return axios.delete(`/api/flavors/${id}`);
};

//   const deleteFormula = (id)=> {
//     return axios.delete(`/api/formulas/${id}`);
//   }

//   const createFormula = async({ flavorId, moleculeId })=> {
//     const response = await axios.post(`/api/flavors/${flavorId}/molecules`, {
//       moleculeId
//     });
//     return response.data;
//   };

module.exports = {
  fetchFlavors,
  fetchMolecules,
  createFlavor,
  deleteFlavor,
};
