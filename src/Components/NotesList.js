import React from 'react'
import AddNote from './AddNote'
import Note from './Note'

function NotesList({notes, handleAddNote, handleDelNote, handleToggleReadonly,
                      handleTextChange}) {
  return (
    <div className="notes-list">

      {notes.map((note)=><Note note={note} handleDelNote={handleDelNote} 
                            handleToggleReadonly={handleToggleReadonly}
                            handleTextChange={handleTextChange}/>)}

      <AddNote notes={notes} handleAddNote={handleAddNote} />
    </div>
  )
}

export default NotesList
