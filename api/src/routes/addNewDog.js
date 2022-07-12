const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { validationResult, checkSchema } = require("express-validator");

const addNewDog = Router();

const createDoggoSchema = {
  name: {
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Name must be between 3 and 10 characters long",
    },
    matches: {
      options: /^[a-zA-Z]+$/,
      errorMessage: "Name must be letters only",
    },
    custom: {
      options: (value) => {
        return Dog.findOne({
          where: {
            name: value,
          },
        }).then((doggo) => {
          if (doggo) {
            return Promise.reject("Doggo already exists");
          }
        });
      },
    },
  },
  image: {
    optional: { options: { nullable: true } },
  },
};

addNewDog.post("/", checkSchema(createDoggoSchema), async (req, res) => {
  const errors = validationResult(req);
  const { name, height, weight, life_span, temperaments, image } = req.body;

  try {
    let temperament = await Promise.all(
      temperaments.map(
        async (el) => await Temperament.findAll({ where: { name: el } })
      )
    );
    console.log(
      "🚀 ~ file: addNewDog.js ~ line 15 ~ addNewDog.post ~ temperament",
      temperament
    );

    let img =
      "https://pbs.twimg.com/media/FP_jIrZWQAU8cvD?format=png&name=small";

    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    } else {
      const doggos = await Dog.create({
        name,
        height: {
          metric: `${height.min} - ${height.max}`,
        },
        weight: {
          metric: `${weight.min} - ${weight.max}`,
        },
        life_span: `${life_span.min} - ${life_span.max}`,
        image: image ? image : img,
      });

      await doggos.setTemperaments(temperament.flat());

      if (doggos) {
        res
          .status(200)
          .json({ success: true, message: "Dog added successfully", doggos });
      } else {
        res.status(400).json({ message: "Dog not added" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = addNewDog;
