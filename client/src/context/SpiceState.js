import SpiceContext from './SpiceContext';  // Import our context
import React, { useState } from 'react';

const SpiceState = (props) => {

  // Declare an object array
  const spicesInitial = [];

  // Inititalized spices as object
  const [spices, setSpices] = useState(spicesInitial);

  // API call to fetch all spicess using GET:
  const getSpices = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/spices/fetchallspices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const json = await response.json();

    // Update spices object and passs as array to Spices.js via context API
    setSpices(json);
  };


  // API call to add a spice using POST
  /* addSpice function will take title, desc & tag in request body
  user.id will be inserted by backend through authToken
  spice.id will be generated automatically by mongo */
  const addSpice = async (title, description, tag) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/spices/addspice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const spice = await response.json();

    // Use concat (not push) as it appends new item to array
    setSpices(spices.concat(spice));
  };

  // API call to delete a spice using DELETE
  const deleteSpice = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/spices/deletespice/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    // console.log(json);

    /* API call removes spice from DB and UI. We then pass a filter function to all the existing spices and filter
    out the spice id that does not match the deleted spice. */
    const newSpices = spices.filter((spice) => {
      return spice._id !== id;
    });
    setSpices(newSpices);
  };

  // Edit a spice:
  const editSpice = async (id, title, description, tag) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/spices/updatespice/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    // const json = await response.json()

    let newSpices = JSON.parse(JSON.stringify(spices));
    for (let index = 0; index < newSpices.length; index++) {
      const element = newSpices[index];
      if (element._id === id) {
        newSpices[index].title = title;
        newSpices[index].description = description;
        newSpices[index].tag = tag;
        break;
      }
    }
    setSpices(newSpices);
  };

  return (
    <SpiceContext.Provider
      value={{
        spices,
        setSpices,
        addSpice,
        deleteSpice,
        editSpice,
        getSpices,
      }}
    >
      {props.children}
    </SpiceContext.Provider>
  );
}

export default SpiceState;