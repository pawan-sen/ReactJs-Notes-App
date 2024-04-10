// import { useState } from 'react';
// import { nanoid } from 'nanoid';
// import NotesList from './Components/NotesList'

// const App = () => {
//   const [notes, setNotes] = useState([
//     {
//       id: nanoid(),
//       text: 'this is my first note!',
//       date: '14/02/2023',
//     },
//     {
//       id: nanoid(),
//       text: 'this is my second note!',
//       date: '28/02/2023',
//     },
//     {
//       id: nanoid(),
//       text: 'this is my third note!',
//       date: '13/03/2024',
//     },
//     {
//       id: nanoid(),
//       text: 'this is my forth note!',
//       date: '14/04/2024',
//     },
//   ]);

//   return (
//     <div className='container'>
//       <NotesList notes={notes} />
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react';
import { nanoid } from 'nanoid'
import NotesList from './Components/NotesList'
import Constants from './Components/Constants'
import Search from './Components/Search';
import Header from './Components/Header';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: [
        {
          id: nanoid(),
          text: 'this is my first note!',
          date: '14/02/2023',
          readonly: true,
        },
        {
          id: nanoid(),
          text: 'this is my second note!',
          date: '28/02/2023',
          readonly: true,
        },
        {
          id: nanoid(),
          text: 'this is my third note!',
          date: '13/03/2024',
          readonly: true,
        },
        {
          id: nanoid(),
          text: 'this is my forth note!',
          date: '14/04/2024',
          readonly: true,
        },
        {
          id: nanoid(),
          text: 'this is my fifth note!',
          date: '24/04/2024',
          readonly: true,
        },
      ],
      searchText: '',
      darkMode: false
    }
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleToggleDarkMode = this.handleToggleDarkMode.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleToggleReadonly = this.handleToggleReadonly.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);

  }

  componentDidMount() {
    const storedNotes = localStorage.getItem('react-notes-app-data');
    if (storedNotes) {
      this.setState({ notes: JSON.parse(storedNotes) });
    }
  }

  // componentDidUpdate: Update localStorage when the notes state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      localStorage.setItem('react-notes-app-data', JSON.stringify(this.state.notes));
    }
  }

  addNote(text) {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text:text,
      date: date.toLocaleDateString(),
      readonly: true,
    }

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote]
    }));
  }

  deleteNote(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note)=> note.id!==id)
    }));
  }

  handleToggleDarkMode() {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode
    }));
  }

  handleSearchText(text) {
    this.setState((prevState) => ({
      // notes: prevState.notes,
      searchText: text
    }));
  }

  handleTextChange(event, id) {
    const charLim = Constants.charLim;

    if(charLim - event.target.value.length>=0) {
      this.setState((prevState) => ({
        notes: prevState.notes.map((note) => {
          if (note.id === id) {
            return { ...note, text: event.target.value };
          }
          return note;
        }),
      }));
    }

    

    // if(charLim - event.target.value.length>=0) {

    //     if(event.target.value.length>charLim) {
    //         setNoteText(noteText);
    //     } else {
    //         setNoteText(event.target.value);
    //     }
        
    // }       
  }

  handleToggleReadonly(id) {

    const date = new Date();

    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if (note.id === id) {
          return { ...note, date: date.toLocaleDateString() ,readonly: !note.readonly };
        }
        return note;
      }),
    }));
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) =>
      note.text.toLowerCase().includes(this.state.searchText.toLowerCase())
    );
    return (
      <div className={this.state.darkMode ? 'dark-mode' : ''}>
        <div className='container'>
        <Header handleToggleDarkMode={this.handleToggleDarkMode} />
        <Search handleSearchText={this.handleSearchText} />
        <NotesList notes={filteredNotes} 
          handleAddNote={this.addNote}
          handleDelNote={this.deleteNote}
          handleToggleReadonly={this.handleToggleReadonly}
          handleTextChange={this.handleTextChange}
          />
        </div>
      </div>
    );
  }
}

export default App;


