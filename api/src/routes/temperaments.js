const { Router } = require("express");
const { Temperament } = require("../db");
const { getDoggosDetails } = require("../utils/controller/index");

const temperament = Router();

temperament.get("/", async (req, res) => {
  try {
    let json = await getDoggosDetails();

    json = json
      .map((temperament) => temperament.temperament)
      .join(",")
      .replace(/ /g, "")
      .split(",")
      .sort();

    let temperaments = [...new Set(json)].filter((el, index) => index > 0);

    temperaments.forEach(async (temperament) => {
      await Temperament.create({
        name: temperament,
      });
    });

    temperaments = temperaments.map((el) => {
      return {
        name: el,
      };
    });

    res.json(temperaments);
  } catch (error) {
    console.log(error);
    return res.json({
      error: "There has been an error getting the temperaments",
    });
  }
});

module.exports = temperament;
