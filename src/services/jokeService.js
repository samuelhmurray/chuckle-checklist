export const getAllJokes = async () => {
  return await fetch("http://localhost:3000/jokes").then((res) => res.json());
};

export const postJoke = async (jokeText) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: jokeText, told: false }),
  };
  const response = await fetch("http://localhost:3000/jokes", postOptions);

  return await response.json();
};

export const toggleToldJoke = async (jokeId, jokeText, jokeTold) => {
  const putOptions = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: jokeId, text: jokeText, told: !jokeTold }),
  };
  const response = await fetch(
    `http://localhost:3000/jokes/${jokeId}`,
    putOptions
  );

  return await response.json();
};
export const deleteJoke = async (joke) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  };
  const response = await fetch(
    `http://localhost:3000/jokes/${joke}`,
    deleteOptions
  );

  return await response.json();
};

// export const putToldJokeToTrue = async (jokeId, jokeText) => {
//   const putOptions = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: jokeId, text: jokeText, told: true }),
//   };
//   const response = await fetch(
//     `http://localhost:3000/jokes/${jokeId}`,
//     putOptions
//   );

//   return await response.json();
// };
// export const putToldJokeToFalse = async (jokeId, jokeText) => {
//   const putOptions = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: jokeId, text: jokeText, told: false }),
//   };
//   const response = await fetch(
//     `http://localhost:3000/jokes/${jokeId}`,
//     putOptions
//   );

//   return await response.json();
// };
