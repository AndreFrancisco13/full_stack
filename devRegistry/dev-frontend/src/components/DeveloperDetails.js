import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importe useNavigate para redirecionar

export default function DeveloperDetails() {
    const [developer, setDeveloper] = useState(null);
    const [inputId, setInputId] = useState('');
    const navigate = useNavigate();  // Hook para programaticamente navegar

    // Função para carregar o desenvolvedor com base no ID
    const fetchDeveloper = (id) => {
        axios.get(`http://localhost:8000/api/devs/${id}`)
            .then(response => {
                setDeveloper(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar desenvolvedor:', error);
                setDeveloper(null);  // Limpa o desenvolvedor se houver erro
            });
    };

    // Handle do evento submit do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão do formulário
        fetchDeveloper(inputId); // Chama função de busca com o ID fornecido
        navigate(`/devs/${inputId}`);  // Opcional: Atualiza a URL para refletir o ID buscado
    };

    // Atualiza o state quando o input muda
    const handleInputChange = (event) => {
        setInputId(event.target.value);
    };

    return (
        <div className="m-5 font-sans ms-14">
            <form onSubmit={handleSubmit} className="mb-4 ">
                <input
                    type="text"
                    value={inputId}
                    onChange={handleInputChange}
                    placeholder="Digite o ID do Dev"
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
                    Buscar
                </button>
            </form>
            {developer ? (
                <div className="border border-blue-400 p-3 rounded-lg bg-blue-50 shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">Detalhes do Desenvolvedor: {developer.name}</h1>
                    <p className="text-md font-medium text-blue-500">Nickname: <span className="text-gray-700">{developer.nickname}</span></p>
                    <p className="text-md font-medium text-blue-500">Data de Nascimento: <span className="text-gray-700">{developer.birth_date}</span></p>
                    <p className="text-md font-medium text-blue-500">Conhecimento Tecnológico: <span className="text-green-500 font-bold">{developer.stack ? developer.stack.join(', ') : 'Nenhuma'}</span></p>
                </div>
            ) : (
                <p className="text-center text-red-500 m-8">Procure o developer pelo id!</p>
            )}
        </div>
    );
}
