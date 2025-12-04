import React from 'react';
// Routes configuration
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage';
import CharacterDetailsPage from '../pages/CharacterDetailsPage';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CharactersPage />} />
                <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
