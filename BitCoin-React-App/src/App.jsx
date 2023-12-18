import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import ErrorCompo from "./Components/ErrorCompo";
import Exchange from "./Components/Exchange compo/Exchange";

const App = () => {
  return (
    <Router>
      <Header/>
      {/* <Loader/> */}
      {/* <ErrorCompo message={<div>Error 4440</div>}/> */}
      <Routes>
        <Route path="/exchanges" element={<Exchange/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
