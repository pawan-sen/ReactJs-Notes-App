import React from 'react'
import { MdDeleteForever, MdEdit, MdSave } from 'react-icons/md'
import Constants from './Constants';

function Note({note, handleDelNote, handleToggleReadonly, handleTextChange}) {

  const readOnly = note.readonly;

  const charLim = Constants.charLim;

  return (
    <div className={'note'+ (readOnly?'': ' edit')}>
      {/* <span>{note.text}</span> */}
      <textarea rows="8" cols="10" 
      value={note.text} readOnly={note.readonly}
      onChange={(event) => handleTextChange(event,note.id)}></textarea>
      <div className='note-footer'>
        {readOnly? <small>{note.date}</small> :
                    <small>{charLim - note.text.length} remaining</small>}
        
        <div className='note-icons'>
          {readOnly? <div><MdEdit className='note-icon' size="1.3em" onClick={()=>handleToggleReadonly(note.id)} />
            <MdDeleteForever className='note-icon' size="1.3em" onClick={()=>handleDelNote(note.id)}></MdDeleteForever></div> : 
            <div><MdSave className='note-icon' size="1.3em" onClick={()=>handleToggleReadonly(note.id)}></MdSave></div> }
        </div>
      </div>
    </div>
  )
}

export default Note
