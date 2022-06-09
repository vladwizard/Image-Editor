import React from "react";
import './App.css';
import PreferencesArea from './components/PreferencesArea'
import DisplayArea from './components/DisplayArea'

function App() {
  return (
    <div className="wrapper">
      <PreferencesArea/>
      <DisplayArea/>
    </div>
  );
}

export default App;
