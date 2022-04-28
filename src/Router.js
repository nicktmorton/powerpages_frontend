import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Listing from "./pages/Listing";

import Header from './components/Header';

export default function Router() {
    return (
        <BrowserRouter>
            <div className="container-fluid">
                <Header />
                <Routes>
                    <Route 
                    path="/"
                    exact
                    element={<Home />}
                    />
                    <Route 
                    path="/home"
                    element={<Home />}
                    />
                    <Route 
                    path="/listing/:id"
                    element={<Listing />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}