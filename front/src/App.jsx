import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

import Cards from "./components/Cards/Cards";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Navigation from "./components/Navigation/Navigation";
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";
import PageNotFound from "./components/Page no found/Pagenofound";
import { removeFav } from "./redux/actions";
import { useDispatch } from "react-redux";

import { AppContainer } from "./styled-components/AppContainer.js";

const App = () => {
  const [accessUser, setAccessUser] = useState(false);
  const [characters, setCharacters] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSearch = async (searchTerm, searchBy) => {
    try {
      let url;
      if (searchBy === 'id') {
        if (!searchTerm || isNaN(searchTerm)) {
          return window.alert("Please enter a valid ID number");
        }
        url = `http://localhost:3001/rickandmorty/character/${searchTerm}`;
      } else {
        if (!searchTerm.trim()) {
          return window.alert("Please enter a character name");
        }
        url = `http://localhost:3001/rickandmorty/character?name=${searchTerm}`;
      }

      const response = await axios(url);
      const data = response.data;

      if (Array.isArray(data)) {
        // Search by name returned an array of characters
        const newCharacters = data.filter(newChar => 
          !characters.some(existingChar => existingChar.id === newChar.id)
        );
        if (newCharacters.length === 0) {
          window.alert("No new characters found or they already exist in your list");
        } else {
          setCharacters(oldChars => [...oldChars, ...newCharacters]);
        }
      } else if (data.name) {
        // Search by ID returned a single character
        if (!characters.some(char => char.id === data.id)) {
          setCharacters(oldChars => [...oldChars, data]);
        } else {
          window.alert("This character already exists in your list");
        }
      } else {
        window.alert("No characters found with this ID/name!");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        window.alert("No characters found with this ID/name!");
      } else {
        window.alert("An error occurred while searching. Please try again.");
      }
    }
  };
  const randomSearch = () => {
    const id = Math.floor(Math.random() * 826);
    onSearch(id);
  };

  
  const onClose = (id) => {

    dispatch(removeFav(id));
    const removeChar = characters.filter((char) => char.id !== Number(id));
    setCharacters(removeChar);
  };

  
  const logout = () => {
    setAccessUser(false);
    navigate("/");
  };
  useEffect(() => {
    !accessUser && navigate("/");
  }, [accessUser]);

  return (
    <AppContainer>
      {location.pathname !== "/" && (
        <Navigation
        onSearch={onSearch}
        logout={logout}
        randomSearch={randomSearch}
        />
        )}

      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/detail/:id"
          element={<Detail characters={characters} />}
        />
        <Route path="/fav" element={<Favorites onClose={onClose}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
