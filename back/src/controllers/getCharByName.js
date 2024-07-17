const axios = require("axios");
require("dotenv").config();

const URL_BASE = "https://rym2.up.railway.app/api/character";
const API_KEY = "pi-valcarc";

module.exports = getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;

    if (!id && !name) {
      return res.status(400).json({ message: "Falta id o nombre" });
    }

    let url;
    if (id) {
      url = `${URL_BASE}/${id}?key=${API_KEY}`;
    } else {
      url = `${URL_BASE}/?name=${name}&key=${API_KEY}`;
    }

    const response = await axios(url);

    if (id) {
      // Búsqueda por ID
      const { name, image, gender, species, origin, status } = response.data;
      if (name) {
        const character = {
          id: +id,
          name,
          gender,
          species,
          origin: {
            name: origin.name,
            url: origin.url,
          },
          image,
          status,
        };
        return res.status(200).json(character);
      }
    } else {
      // Búsqueda por nombre
      const characters = response.data.results.map(char => ({
        id: char.id,
        name: char.name,
        gender: char.gender,
        species: char.species,
        origin: {
          name: char.origin.name,
          url: char.origin.url,
        },
        image: char.image,
        status: char.status,
      }));
      if (characters.length > 0) {
        return res.status(200).json(characters);
      }
    }

    return res.status(404).send("Not Found");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).send("Not Found");
    }
    return res.status(500).json({ message: error.message });
  }
};