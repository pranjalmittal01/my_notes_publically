import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host  ="http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Functionality of Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json =  await response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);
        setNotes(json);
    }

    // Functionality of Add a New Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        const note =  await response.json();
        setNotes(notes.concat(note))
    }

    // Functionality of Delete Note
    const deleteNote = async (_id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json =  await response.json(); 
        // console.log(json);

        // console.log("Deleting the Note with id " + _id);
        const newNotes = notes.filter((note) => { return note._id !== _id })
        setNotes(newNotes);
    }

    // Functionality of Edit Note
    const editNote = async (_id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json =  await response.json();
        // console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === _id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
    }
    setNotes(newNotes);
}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;