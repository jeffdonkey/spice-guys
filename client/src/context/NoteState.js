import NoteContext from './NoteContext';  // Import our context
import React, { useState } from 'react';

const NoteState = (props) => {

  // Declare an object array
  const notesInitial = [];

  // Inititalized notes as object
  const [notes, setNotes] = useState(notesInitial);

  // API call to fetch all notes using GET:
  const getNotes = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const json = await response.json();

    // Update notes object and passs as array to Notes.js via context API
    setNotes(json);
  };


  // API call to add a note using POST
  /* addNote function will take title, desc & tag in request body
  user.id will be inserted by backend through authToken
  note.id will be generated automatically by mongo */
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const note = await response.json();

    // Use concat (not push) as it appends new item to array
    setNotes(notes.concat(note));
  };

  // API call to delete a note using DELETE
  const deleteNote = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    // console.log(json);

    /* API call removes note from DB and UI. We then pass a filter function to all the existing notes and filter
    out the note id that does not match the deleted note. */
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note:
  const editNote = async (id, title, description, tag) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/notes/updatenote/${id}`,
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

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;