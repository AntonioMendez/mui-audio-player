import React from 'react';
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { Paper } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <Paper square style={{ width: "100%", position: 'fixed', bottom: 0, left: 0 }}>
      <AudioPlayer title="sample-audio.mp3" src="./sample-audio.mp3"/>
    </Paper>
  );
}

export default App;
