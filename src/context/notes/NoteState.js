import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "65e82f32aa66e971d182814d",
            "user": "65e56cb1acee3d00c74f7185",
            "title": "Note Title",
            "description": "Learning MEAN Stack",
            "tag": "General",
            "date": "2024-03-06T08:54:10.646Z",
            "__v": 0
        },
        {
            "_id": "65e836f6633c58f8ff7848da",
            "user": "65e56cb1acee3d00c74f7185",
            "title": "Note Title",
            "description": "Learning MERN Stack",
            "tag": "General",
            "date": "2024-03-06T09:27:18.693Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    // Functionality of Add a New Note
    const addNote = (title, description, tag) => {
        // TODO API Call
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
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;