// import './App.css';
// import Chat from './Chat';

// function App() {
//   return (
//     <div className="App">
//       <Chat />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from Switch to Routes
import './App.css';
import Chat from './chatcomp/Chat';
import Images from './Images'; // Import your new components
import Videos from './Videos';
import Music from './Music';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Chat />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




