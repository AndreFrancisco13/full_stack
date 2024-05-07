import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function DeveloperSearch() {
    const [developers, setDevelopers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get('terms') || '');

    useEffect(() => {
        const terms = searchParams.get('terms');
        if (terms) {
            axios.get(`http://localhost:8000/api/devs/search?terms=${terms}`)
                .then(response => {
                    setDevelopers(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar desenvolvedores:', error);
                });
        } else {
            setDevelopers([]);  // Clear results if no terms
        }
    }, [searchParams]);  // Depend on searchParams instead of terms directly

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        setSearchParams({ terms: searchInput });  // Update the URL and trigger useEffect
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    return (
        <div className="m-5 font-sans ms-14">
            <form onSubmit={handleSearch} className="mb-4 ">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder="Procurar Dev"
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2 ">
                    Buscar
                </button>
            </form>
            {developers.length > 0 ? (
                developers.map(dev => (
                    <div key={dev.id} className="border border-blue-400 p-3 rounded-lg bg-blue-50 shadow-lg mb-5">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">{dev.name} ({dev.nickname})</h2>
                        <p className="text-md font-medium text-blue-500">Data de Nascimento: <span className="text-gray-700">{dev.birth_date}</span></p>
                        <p className="text-md font-medium text-blue-500">Conhecimento Tecnológico: <span className="text-green-500 font-bold">{dev.stack ? dev.stack.join(', ') : 'Nenhum'}</span></p>
                    </div>
                ))
            ) : (
                <p className="text-center text-red-500 m-8">Pesquise um developer pelos termos</p>
            )}
        </div>
    );
}


