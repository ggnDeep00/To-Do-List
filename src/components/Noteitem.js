import React,{useContext, useState,useRef, useEffect} from 'react'
import NoteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const { notes,updateNote } = props;
    const context = useContext(NoteContext)
    const {deleteNote,editTag}=context
    
    const [note, setNote] = useState({id:notes._id,etag:notes.tag})
    
    const handleClick=async(currentNote)=>{
        if(note.etag==0) {setNote({ id: currentNote._id, etag: 1 })}
        else if(note.etag==2) {setNote({ id: currentNote._id, etag: 1 })}
        else if(note.etag==1) {setNote({ id: currentNote._id, etag: 2 })}
        
     
        
    }
    useEffect(()=>{
        editTag(note.id,note.etag)
    },[note])

    return (
        // <div className='col-md'>
            <div className={`card text-bg-${(note.etag===1)?"success":"info"} my-1`}>
                
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        {/* <p className="card-text">{notes.description}</p> */}
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id);props.showAlert("Deleted successfully","success")}}></i>
                        <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(notes)}} data-bs-toggle="tooltip"
        title="Edit"></i>
                        {!(note.etag===1) && <i className="fa-solid fa-square-check" data-bs-toggle="tooltip"
        title="Mark as done" onClick={()=>{handleClick(notes)}}></i>}
                        {(note.etag===1) && <i className="fa-sharp fa-solid fa-square-xmark" data-bs-toggle="tooltip"
        title="Mark as not done" onClick={()=>{handleClick(notes)}}></i>}
                    </div>
            {/* </div> */}
        </div>
    )
}

export default NoteItem