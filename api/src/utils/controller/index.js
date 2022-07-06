const axios = require("axios");
const { getDogs } = require("../endpoints");

const getApiDogs = async () => {
  let dogs = [];

  try {
    dogs = (await axios.get(`${getDogs}`)).data;

    dogs = dogs.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url || "",
        name: dog.name,
        temperament: dog.temperament,
        weight: dog.weight.metric,
      };
    });
    return dogs;
  } catch (error) {
    console.log(error);
  }
  return dogs;
};

const getDoggosDetails = async () => {
  let doggos = [];

  try {
    doggos = (await axios.get(`${getDogs}`)).data;
    // console.log(
    //   "🚀 ~ file: index.js ~ line 31 ~ getDoggosDetails ~ doggos",
    //   doggos
    // );

    doggos = doggos.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url || "",
        name: dog.name,
        temperament: dog.temperament,
        weight: dog.weight.metric,
        temperament: dog.temperament,
      };
    });
  } catch (error) {
    console.log(error);
  }
  return doggos;
};

module.exports = {
  getApiDogs,
  getDoggosDetails,
};
