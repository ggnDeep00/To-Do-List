import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://todo-backend-gao2.onrender.com"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const token=localStorage.getItem('token')
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":token
      }
    });
    const json = await response.json() ;
    // const dat=json.sort(compareTrueFalse)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title) => {
    // API Call 
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        // newNotes[index].description = description;
        // newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  
  }

  const editTag = async (id, tag) => {
    // API Call 
    
    const response = await fetch(`${host}/api/notes/updatetag/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].tag = tag;
        // newNotes[index].description = description;
        // newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
   
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes,editTag }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;