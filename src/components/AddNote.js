import React,{useState,useContext} from 'react'
import NoteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote}=context;

    const [note, setNote] = useState({title:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title)
        setNote({title:""})
        props.showAlert("Added successfully","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
      <h2>Add Task</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Task Description</label>
          <input type="text" className="form-control" id="title" name='title' min={3} required value={note.title} onChange={onChange}/>
        </div>
        
        <button disabled={note.title.length<3} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Taks</button>
      </form>
      </div>
  )
}

export default AddNote