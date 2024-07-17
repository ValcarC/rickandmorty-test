const axios = require("axios");
require("dotenv").config();


const URL_BASE = "https://rym2.up.railway.app/api/character/";
const API_KEY = "pi-valcarc";

const getCharById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    let response;
    if (id) {
      // Search by ID
      response = await axios(`${URL_BASE}${id}?key=${API_KEY}`);
      const { id, name, species, status, gender, origin, image } = response.data;
      const character = { id, name, species, status, gender, origin, image };
      
      if (character.id) return res.status(200).json(character);
      else throw Error('Character not found');
    } else if (name) {
      // Search by name
      response = await axios(`${URL_BASE}?name=${name}&key=${API_KEY}`);
      const characters = response.data.results.map(char => ({
        id: char.id,
        name: char.name,
        species: char.species,
        status: char.status,
        gender: char.gender,
        origin: char.origin,
        image: char.image
      }));
      
      if (characters.length > 0) return res.status(200).json(characters);
      else throw Error('No characters found with that name');
    } else {
      throw Error('No search parameter provided');
    }
  } catch (error) {
    errorHandler(res, error)
  }
};

module.exports = getCharById;