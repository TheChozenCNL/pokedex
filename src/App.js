import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from "./routes/Main/Main"
import Header from "./layout/Header"


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Main /> } />
            </Routes>
        </Router>
    );
}

export default App;
