// components/Sidebar.jsx
import { Home, Calendar, Users, Settings, MapPin, BriefcaseMedical } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    { to: '/', label: 'Início', icon: <Home size={20} /> },
    { to: '/agenda', label: 'Agenda', icon: <Calendar size={20} /> },
    { to: '/paciente', label: 'Pacientes', icon: <Users size={20} /> },
    { to: '/profissional', label: 'Profissionais', icon: <BriefcaseMedical size={20} /> },
    { to: '/especialidade', label: 'Especialidades', icon: <Settings size={20} /> },
    { to: '/local', label: 'Locais', icon: <MapPin size={20} /> }
    // { to: '/atendimento', label: 'Atendimentos', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 shadow-lg fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-8">Sistema Agenda</h2>
      <nav className="space-y-3">
        {menu.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors ${
              pathname === to ? 'bg-gray-700' : ''
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
