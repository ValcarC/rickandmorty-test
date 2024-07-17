import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from './Detail.module.css'

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(data);
        setEpisodes(data.episode);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (!character) {
    return <div className={style.container}>Loading...</div>;
  }

  // Define the frame class based on the character's species
  let frameClass = '';
  switch (character.species) {
    case 'Human':
      frameClass = `${style.frame} ${style.human}`;
      break;
    case 'Alien':
      frameClass = `${style.frame} ${style.alien}`;
      break;
    case 'Robot':
      frameClass = `${style.frame} ${style.robot}`;
      break;
    case 'Humanoid':
      frameClass = `${style.frame} ${style.humanoid}`;
      break;
    default:
      frameClass = `${style.frame}`;
  }

  return (
    <div className={`${style.container} ${style.wrapper}`}>
      <div className={frameClass}>
        <h2 className={style.text}>Id: {character.id}</h2>
        <h2 className={style.text}>Name: {character.name}</h2>
        <h4 className={style.text}>Status: {character.status}</h4>
        <h4 className={style.text}>Species: {character.species}</h4>
        <h4 className={style.text}>Gender: {character.gender}</h4>
        <h4 className={style.text}>Origin: {character.origin?.name}</h4>
        <h4 className={style.text}>Type: {character.type}</h4>
        <img src={character.image} alt={character.name} className={style.image} />
        <div className={style.episodesContainer}>
          <h3 className={style.text}>Episodes:</h3>
          <div className={style.episodesList}>
            {episodes.map((episode, index) => (
              <p key={index} className={style.text}>
                {episode.split('/').pop()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;