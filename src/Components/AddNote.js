import React from 'react'
import { useState } from 'react';
import Constants from './Constants'

function AddNote({notes ,handleAddNote}) {

    const [noteText, setNoteText] = useState('');

    const charLim = Constants.charLim;
    

    function handleChange(event) {
        if(charLim - event.target.value.length>=0) {

            if(event.target.value.length>charLim) {
                setNoteText(noteText);
            } else {
                setNoteText(event.target.value);
            }
            
        }
            
    }

    function handleSaveClick() {
        if(noteText.trim().length>0) {
            handleAddNote(noteText);
        }

        setNoteText('');
    }
    
  return (
    <div className='note new'>
      <textarea rows="8" cols="10" 
      placeholder='type to add a new note...'
      value={noteText}
      onChange={handleChange}></textarea>
      <div className='note-footer'>
        <small>{charLim - noteText.length} remaining</small>
        <button className='save'
        onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  )
}

export default AddNote
