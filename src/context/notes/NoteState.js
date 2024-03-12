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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTZjYjFhY2VlM2QwMGM3NGY3MTg1In0sImlhdCI6MTcwOTcwNjA4NX0.zxurVV5FRK27Dbel-ZvQXodbhAGwsMmKJ6pZKCJu790"
            },
        });
        const json =  await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        setNotes(json);
    }

    // Functionality of Add a New Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTZjYjFhY2VlM2QwMGM3NGY3MTg1In0sImlhdCI6MTcwOTcwNjA4NX0.zxurVV5FRK27Dbel-ZvQXodbhAGwsMmKJ6pZKCJu790"
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });
        // const json =  response.json(); 

        console.log("Adding a New Note");
        const note = {
            "_id": "65e836f6633c58f8ff7848da",
            "user": "65e56cb1acee3d00c74f7185",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-03-06T09:27:18.693Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // Functionality of Delete Note
    const deleteNote = (_id) => {
        // TODO API Call
        console.log("Deleting the Note with id " + _id);
        const newNotes = notes.filter((note) => { return note._id !== _id })
        setNotes(newNotes);
    }

    // Functionality of Edit Note
    const editNote = async (_id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlNTZjYjFhY2VlM2QwMGM3NGY3MTg1In0sImlhdCI6MTcwOTcwNjA4NX0.zxurVV5FRK27Dbel-ZvQXodbhAGwsMmKJ6pZKCJu790"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json =  response.json(); 

    // Logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === _id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
        }

    }
}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;