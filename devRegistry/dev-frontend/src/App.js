
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DeveloperList from './components/DeveloperList';
import AddDeveloper from './components/AddDeveloper';
import DeveloperDetails from './components/DeveloperDetails';
import Header from './components/Header';
import DeveloperSearch from './components/DeveloperSearch';



export default function App() {
  return (
    <BrowserRouter>
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<DeveloperList />} />
          <Route path="/add" element={<AddDeveloper />} />
          <Route path="/devs/:id" element={<DeveloperDetails  />} />
          <Route path="/devs/search" element={<DeveloperSearch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
