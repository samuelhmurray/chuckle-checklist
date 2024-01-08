import { useEffect, useState } from "react";
import "./App.css";
import {
  deleteJoke,
  getAllJokes,
  postJoke,
  putToldJokeToFalse,
  putToldJokeToTrue,
  toggleToldJoke,
} from "./services/jokeService.js";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  }, []);

  // useEffect(() => {
  //   if (toldJokes) {
  //     const allToldJokes = allJokes.filter((joke) => joke.told === true);
  //     setToldJokes(allToldJokes);
  //   }
  //   if (untoldJokes) {
  //     const allUntoldJokes = allJokes.filter((joke) => joke.told === false);
  //     setUntoldJokes(allUntoldJokes);
  //   }
  // }, [allJokes]);

  useEffect(function allJokesSet() {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  }, []);

  useEffect(
    function toldJokesSet() {
      if (toldJokes) {
        const allToldJokes = allJokes.filter((joke) => joke.told === true);
        setToldJokes(allToldJokes);
      }
    },
    [allJokes]
  );

  useEffect(
    function unToldJokesSet() {
      {
        console.log("unToldJokesSet: ", allJokes);
      }
      if (untoldJokes) {
        const allUntoldJokes = allJokes.filter((joke) => joke.told === false);
        setUntoldJokes(allUntoldJokes);
      }
    },
    [allJokes]
  );
  const clickHandler = (joke) => {
    toggleToldJoke(joke.id, joke.text, joke.told).then(
      getAllJokes().then((jokeArr) => {
        setAllJokes(jokeArr);
      })
    );
  };

  const postClickHandler = () => {
    postJoke(inputValue).then(() => {
      setInputValue("");
      getAllJokes().then((jokeArr) => {
        setAllJokes(jokeArr);
      });
    });
  };

  const putClickHandler = (joke) => {
    toggleToldJoke(joke.id, joke.text, joke.told).then(() => {
      getAllJokes().then((jokeArr) => {
        setAllJokes(jokeArr);
      });
    });
  };

  return (
    <>
      {console.log("render: ", allJokes)}

      <div className="app-container">
        <div className="app-heading">
          <div className="app-heading-circle">
            <img className="app-logo" src={stevePic} alt="Good job Steve" />
          </div>
          <h1 className="app-heading-text">Chuckle Checklist</h1>
          <h2>Add Joke</h2>
        </div>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="joke-input-submit " onClick={postClickHandler}>
            Add
          </button>
        </div>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2 className="joke-list-container">
              Untold Jokes <i className="fa-regular fa-face-grin-wide"></i>
              <span className="untold-count">{untoldJokes.length}</span>
            </h2>

            {untoldJokes.map((joke) => {
              return (
                <section className="joke-list-container" key={joke.id}>
                  <li className="joke-list-item">
                    {joke.text}
                    <button
                      onClick={() => clickHandler(joke)}
                      className="joke-list-action-toggle"
                    >
                      <i className="fa-solid fa-face-grin-squint-tears"></i>
                    </button>
                    <button
                      onClick={() =>
                        deleteJoke(joke.id) &
                        getAllJokes().then((jokeArr) => {
                          setAllJokes(jokeArr);
                        })
                      }
                      className="joke-list-action-delete"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </li>
                </section>
              );
            })}
          </div>
          <div className="joke-list-container">
            <h2 className="joke-list-container">
              Told Jokes <i className="fa-regular fa-face-grin-tears"></i>
              <span className="told-count">{toldJokes.length}</span>
            </h2>
            {toldJokes.map((joke) => {
              return (
                <section className="joke-list-container" key={joke.id}>
                  <li className="joke-list-item">
                    {joke.text}
                    <button
                      onClick={() => {
                        putClickHandler(joke);
                      }}
                      className="joke-list-action-toggle"
                    >
                      <i className="fa-solid fa-face-meh"></i>
                    </button>
                    <button
                      onClick={() =>
                        deleteJoke(joke.id) &
                        getAllJokes().then((jokeArr) => {
                          setAllJokes(jokeArr);
                        })
                      }
                      className="joke-list-action-delete"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </li>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
