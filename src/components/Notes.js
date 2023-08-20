import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './Noteitem'
import {useNavigate} from 'react-router-dom'

export const Notes = (props) => {
    let navigate=useNavigate()
    const context = useContext(NoteContext)
    const { notes, getNotes,editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login')
        }
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose=useRef(null)

    const [note, setNote] = useState({id:"",etitle:""})
    


    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle:currentNote.title})
    }

   
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle)
        refClose.current.click()
        props.showAlert("Updated successfully","success")
    }

    return (
        <div >
            <AddNote showAlert={props.showAlert}/>
            
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Task description</label>
                                    <input type="text" className="form-control" id="title" name='etitle'  min={3} required value={note.etitle} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" className="btn btn-primary" onClick={handleClick}>Update Task details</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row' style={{padding:'0px 20px'}}>
                
                <h2>Your Tasks</h2>
                <div className='container mx-2'>
                    {notes.length===0 && "There are no Tasks to display"}
                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />
                })}
            </div>
        </div>
    )
}
