const axios = require("axios");
require("dotenv").config();

module.exports = getCharById = async (req, res) => {
  const URL_BASE = "https://rym2.up.railway.app/api/character/";
  const API_KEY = "pi-valcarc";

  try {
    if (!req.params.id) {
      res.status(404).json({ message: "Falta id" });
    } else {
      const id = req.params.id;
      const response = await axios(`${URL_BASE}${id}?key=${API_KEY}`);
      const { name, image, gender, species, origin, status } = response.data;
      if (name) {
        let character = {
          id: +id,
          name: name,
          gender: gender,
          species: species,
          origin: {
            name: origin.name,
            url: origin.url,
          },
          image: image,
          status: status,
        };

        res.status(200).json(character);
      } else {
        res.status(404).send("Not Found");
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};