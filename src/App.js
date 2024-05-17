// import './App.css';
// import { BrowserRouter as Route, Router, Routes } from 'react-router-dom';
// import ToastContainer from 'react-toastify';
// // import {Login} from './Login';
// import Registration from './Registration';
// import SchoolRegistration from './SchoolRegistration';
// import ForgetPassword from './ForgetPassword';



// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Registration/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Registration from './Registration';
import SchoolRegistration from './SchoolRegistration';
import ForgetPassword from './ForgetPassword';
import Login from './Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/school_list" element={<SchoolRegistration />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
