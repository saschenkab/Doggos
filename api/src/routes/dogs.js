// const axios = require("axios");
const { Router } = require("express");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
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

      let dbDogByName = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%` + name.toLowerCase() + `%`,
          },
        },
        include: { model: Temperament },
      });
      console.log(
        "🚀 ~ file: dogs.js ~ line 28 ~ dogs.get ~ dbDogByName",
        dbDogByName
      );

      dbDogByName = dbDogByName.map((dog) => {
        return {
          id: dog.id,
          name: dog.name,
          image: dog.image,
          temperament: dog.temperaments.map((temperament) => temperament.name),
        };
      });

      let allDoggos = [].concat(dogsByName, dbDogByName);

      if (allDoggos.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No doggos found",
        });
      } else {
        return res.status(200).json({
          success: true,
          allDoggos,
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: "There has been an error getting the dogs" });
    }
  }

  let databaseDoggos = await Dog.findAll({
    include: { model: Temperament },
  });
  console.log(
    "🚀 ~ file: dogs.js ~ line 29 ~ dogs.get ~ databaseDoggos",
    databaseDoggos
  );

  databaseDoggos = databaseDoggos.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperaments
        ? dog.temperaments.map((temperament) => temperament.name)
        : [],
      image: dog.image,
    };
  });

  let allDoggos = [...databaseDoggos, ...doggos];
  return res.json(allDoggos);
});

dogs.get("/doggo/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    let doggo = await getDoggosDetails();

    if (id) {
      doggo = doggo.find((dog) => dog.id === id);
    }

    let dbDoggo = await Dog.findAll({
      where: { id },
      include: { model: Temperament },
    });

    dbDoggo = dbDoggo.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        temperament: dog.temperaments
          ? dog.temperaments.map((temperament) => temperament.name)
          : [],
        image: dog.image,
      };
    });

    let allDoggos = [].concat(dbDoggo, doggo);
    return res.json(allDoggos);
  } catch (error) {
    console.log(error);
    return res.json({ error: "There has been an error getting the dogs" });
  }
});

module.exports = dogs;
