// import { useState } from 'react'

// import "./App.css";
import Cards from "./components/Cards";
import Dashboard from "./components/Dashboard";
import NavbarHorizontal from "./components/NavbarHorizontal";

function App() {
  return (
    <>
      <div className="relative h-screen bg-zinc-400  flex ">
        <Dashboard />
        
        <NavbarHorizontal />

        {/* <Cards/> */}
      </div>
    </>
  );
}

export default App;
