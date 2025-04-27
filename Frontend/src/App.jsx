// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Todo from './pages/Todo';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/todo" element={<Todo />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Todo from './pages/Todo';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/todo" element={<Todo />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;  // ✅ THIS LINE IS IMPORTANT


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // 🏠 import Home
import Login from './pages/Login';
import Signup from './pages/Signup';  // if you have Signup
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 🏠 Home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
