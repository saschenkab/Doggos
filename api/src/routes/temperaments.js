const { Router } = require("express");
const { Temperament } = require("../db");
const { getDoggosDetails } = require("../utils/controller/index");
const { getDogs } = require("../utils/endpoints/index");

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

    temperaments = await Promise.all(
      temperaments.map(async (temperament) => {
        return await Temperament.findOrCreate({
          where: {
            name: temperament,
          },
        });
      })
    );

    res.json(temperaments);
  } catch (error) {
    console.log(error);
    return res.json({
      error: "There has been an error getting the temperaments",
    });
  }
});

module.exports = temperament;
