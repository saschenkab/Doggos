// const axios = require("axios");
const { Router } = require("express");
const { getApiDogs, getDoggosDetails } = require("../utils/controller/index");

const dogs = Router();

dogs.get("/", async (req, res) => {
  const { name } = req.query;
  let doggos = await getApiDogs();

  if (name) {
    try {
      let dogsByName = doggos.filter((dog) => {
        return dog.name.toLowerCase().includes(name.toLowerCase());
      });
      doggos = dogsByName;
    } catch (error) {
      console.log(error);
      return res.json({ error: "There has been an error getting the dogs" });
    }
  } else {
    return res.status(400).json({ message: "Dog breed not found" });
  }
  return res.json(doggos);
});

dogs.get("/doggo/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    let doggo = await getDoggosDetails();

    if (id) {
      doggo = doggo.find((dog) => dog.id === id);
    }
    return res.json(doggo);
  } catch (error) {
    console.log(error);
    return res.json({ error: "There has been an error getting the dogs" });
  }
});

module.exports = dogs;
