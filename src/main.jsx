import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

// Pages
import App from './App.jsx'
import LocalPage from './pages/LocalPage.jsx';
import EspecialidadePage from './pages/EspecialidadePage.jsx';
import PacientePage from './pages/PacientePage.jsx';
import ProfissionalPage from './pages/ProfissionalPage.jsx';
import AgendaPage from './pages/AgendaPage.jsx';
import AtendimentoPage from './pages/AtendimentoPage.jsx';
import HomePage from './pages/HomePage.jsx';

// Layout
import AppLayout from './components/AppLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'local', element: <LocalPage /> },
      { path: 'especialidade', element: <EspecialidadePage /> },
      { path: 'paciente', element: <PacientePage /> },
      { path: 'profissional', element: <ProfissionalPage /> },
      { path: 'agenda', element: <AgendaPage /> },
      { path: 'atendimento', element: <AtendimentoPage /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
