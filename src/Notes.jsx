import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function Notes() {
    //#Use States
    const [note, setNote] = useState({
        title: "",
        desc: ""
    })
    const [notes, setNotes] = useState([])
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [updateIndex, setupdateIndex] = useState()
    const [selectNotes, setSelectNotes] = useState([])
    const [showDeleteAllNote, setShowDeleteAllNote] = useState(false)

    //Handle Functions Handle notes input:- title & desc input
    function handleNotes(e) {
        const target = e.target.name
        let localNotes = {
            title: "",
            desc: ""

        }

        if (target == "titleInput") {
            localNotes.title = e.target.value
            localNotes.desc = note.desc
        }
        else if (target == "descInput") {
            localNotes.title = note.title
            localNotes.desc = e.target.value
        }
        setNote(localNotes)
    }


    //Handle Add Note button
    function handleAddNote() {
        // let localNoteArr = [...notess]
        if (note.title?.length > 0 && note.desc?.length > 0) {
            toast.success('Note added Successfully') //toast success msg
            setNotes([...notes].concat(note)) //add notes to our array of notes
            setNote({ title: "", desc: "" }) //clear value of inputs
        } else {
            toast.error("Something went wrong") //toast
        }
    }



    //Handle Delete button:- delete that note 
    function handleDelete(index) {
        // debugger;
        let arr = [...notes]
        arr.splice(index, 1)
        setNotes(arr)
    }

    //Handle Edit button
    function handleEdit(index) {
        setShowUpdateButton(true)  //for showing update btn
        setupdateIndex(index);  //set updateindex
        setNote(notes[index]);  //change input
    }


    //Handle Update button:-
    function handleUpdate() {
        setShowUpdateButton(false)
        const localArr = [...notes]
        localArr[updateIndex] = note  //update localarr of udatedindex
        setNote({ title: "", desc: "" })
        setNotes(localArr)
        setupdateIndex()
    }

    // handle select button:
    function handleSelect(index, e) {
        setShowDeleteAllNote(true)
        const targetNote = notes[index]
        if (e.target.checked) {
            setSelectNotes([...selectNotes].concat(targetNote))
        }
        else {
            let targetIndex = selectNotes.indexOf(targetNote)
            let arr = [...selectNotes]
            arr.splice(targetIndex, 1)
            setSelectNotes(arr)
        }
    }


    // handle deleteall button
    function handleDeleteAllNote() {
        setShowDeleteAllNote(false)
        let arr = []
        arr = notes.filter((note) => {
            return !selectNotes.includes(note)
        })
        setNotes(arr)
    }

    //Verify notes is valid or not
    // function verifyNote() {
    //     if (note.title.length == 0 || note.desc.length == 0) {
    //         return false
    //     }
    //     return true
    // }


    return (
        <>
            <Toaster />
            {/* Notes Form */}
            <div className='w-75 m-auto my-1 shadow p-4 rounded'>
                <h1 className='text-center bg-primary p-2 mb-3 '>Notes</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{ fontSize: "20px" }}>Title</label>
                    <input type="text" className="form-control" id="title" onChange={handleNotes} name='titleInput' value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" style={{ fontSize: "20px" }}>Description</label>
                    <input type="text" className="form-control" id="description" onChange={handleNotes} name='descInput' value={note.desc} />
                </div>
                {
                    (!showUpdateButton && !showDeleteAllNote)
                    &&
                    <div className='text-center'>
                        <button type="submit" className="btn btn-warning w-25 text-white" onClick={handleAddNote}>Add Note</button>
                    </div>
                }
                {
                    showUpdateButton
                    &&
                    <div className='text-center'>
                        <button type="submit" className="btn btn-success w-25 text-white" onClick={handleUpdate}>Update Note</button>
                    </div>
                }
                {
                    showDeleteAllNote
                    &&
                    <div className='text-center'>
                        <button type="submit" className="btn btn-success w-25 text-white" onClick={handleDeleteAllNote}>Delete Selected Note</button>
                    </div>
                }
            </div>


            {/* Notes List in index */}
            <div className='my-4 container d-flex flex-wrap justify-content-center  gap-5'>
                {
                    notes.map((note, index) => {
                        return (
                            <div key={index} className='d-flex gap-2'>                                {/* Select Checkbox */}
                                <input type="checkbox" className="cursor-pointer" style={{ width: "18px", cursor: "pointer" }} onChange={(e) => handleSelect(index, e)} />
                                {/* note box */}
                                <div className='border shadow d-flex flex-column justify-content-between pb-2' style={{ minWidth: "250px", maxWidth: "400px", borderRadius: "10px", minHeight: "200px" }}>
                                    <h2 className='bg-success text-center text-white py-1' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>{note.title}</h2>
                                    <p className='fs-5 text-center px-2' style={{ textWrap: "wrap", width: "100%" }}>{note.desc}</p>
                                    <div className='d-flex '>
                                        <button className='btn btn-primary flex-fill' value="edit" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className='btn btn-danger flex-fill' value="delete" onClick={() => handleDelete(index)}>Delete</button>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Notes

