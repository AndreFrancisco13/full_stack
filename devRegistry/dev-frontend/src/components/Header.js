import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation(); // Hook para obter a localização atual

    // Função para verificar se o caminho atual corresponde ao link
    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <nav className="text-center p-9">
            <ul className="flex space-x-4 justify-center">
                <li>
                    <Link to="/" className={`block px-3 py-2 rounded-md ${isActive('/') ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}>Lista de Desenvolvedores</Link>
                </li>
                <li>
                    <Link to="/add" className={`block px-3 py-2 rounded-md ${isActive('/add') ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}>Adicionar Desenvolvedor</Link>
                </li>
                <li>
                    <Link to="/devs/:id" className={`block px-3 py-2 rounded-md ${isActive('/devs/:id') ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}>Procurar Desenvolvedor pelo id</Link>
                </li>
                <li>
                    <Link to="/devs/search" className={`block px-3 py-2 rounded-md ${isActive('/devs/search') ? 'bg-sky-500 text-white' : 'bg-slate-50'}`}>Procurar Desenvolvedor por informação</Link>
                </li>
            </ul>
        </nav>
    );
}
