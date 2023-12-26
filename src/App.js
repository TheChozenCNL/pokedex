import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from "./routes/Main/Main"
import Header from "./layout/Header"
import PokeDetails from "./routes/PokeDetails/PokeDetails";


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Main /> } />
                <Route path="/pokemon/:id" element={<PokeDetails /> } />
            </Routes>
        </Router>
    );
}

export default App;
