import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Lease from "./pages/Lease";
import Price from "./pages/Price";
import Status from "./pages/Status";
import Listing from "./pages/Listing";
import Subdivision from "./pages/Subdivision";

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
                    path="/lease"
                    element={<Lease />}
                    />
                    <Route 
                    path="/price"
                    element={<Price />}
                    />
                    <Route 
                    path="/status"
                    element={<Status />}
                    />
                    <Route 
                    path="/listing/:id"
                    element={<Listing />}
                    />
                    <Route 
                    path="/subdivision/:name"
                    element={<Subdivision />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}