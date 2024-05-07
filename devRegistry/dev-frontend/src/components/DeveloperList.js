import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DeveloperList() {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/devs')
            .then(response => {
                setDevelopers(response.data);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return (
        <div className="m-5 font-sans ">
    <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Lista de Desenvolvedores</h1>
    {developers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
            {developers.map(dev => (
                <div key={dev.id} className="md:col-span-2 border border-blue-400 p-3 mb-2 rounded-lg bg-blue-50">
                    <h2 className="text-blue-500">{dev.name} ({dev.nickname})</h2>
                    <p>Data de Nascimento: <span className="text-gray-700">{dev.birth_date}</span></p>
                    <p>Conhecimento Tecnológico: <span className="text-green-500 font-bold">{dev.stack ? dev.stack.join(', ') : 'Nenhum'}</span></p>
                </div>
            ))}
        </div>
    ) : (
        <div className='text-center'>
            <p className="text-center text-red-500 m-8">Nenhum desenvolvedor encontrado.</p>
            <Link className='p-2 bg-blue-600 rounded-md text-white' to="/add">Adicionar</Link>
        </div>
    )}
</div>

    
    );
}

