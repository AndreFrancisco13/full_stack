import React, { useState } from 'react';
import axios from 'axios';

export default function AddDeveloper() {
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [stack, setStack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const developerData = {
            nickname,
            name,
            birth_date: birthDate,
            stack: stack.split(',').map(s => s.trim())  // converte a string em array, removendo espaços extras
            
        };

        axios.post('http://localhost:8000/api/devs', developerData)
            .then(response => {
                alert('Desenvolvedor adicionado com sucesso!');
                setNickname('');
                setName('');
                setBirthDate('');
                setStack('');
            })
            .catch(error => {
                alert('Erro ao adicionar desenvolvedor!');
                console.log(developerData)
                console.error('Erro:', error);
                
            });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10 text-center">Adicionar Desenvolvedor</h1>
        <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
                Alcunha (nickname):
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required className="mt-1 p-2 block w-full border-2 border-grey-600 rounded-md shadow-lg mb-5"/>
            </label>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
                Nome:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 block w-full border-2 border-grey-600 rounded-md shadow-lg mb-6"/>
            </label>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2">
                Data de Nascimento:
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="mt-1 p-2 block w-full border-2 border-grey-600 rounded-md shadow-lg mb-6"/>
            </label>
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-md font-bold mb-2">
                Conhecimento Tecnológico (separado por vírgula):
                <input type="text" value={stack} onChange={(e) => setStack(e.target.value)} className="mt-1 p-2 block w-full border-2 border-grey-600 rounded-md shadow-lg mb-6"/>
            </label>
        </div>
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Adicionar</button>
    </form>
    
    );
}

