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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'local',
    element: <LocalPage />
  },
  {
    path: 'especialidade',
    element: <EspecialidadePage />
  },
  {
    path: 'paciente',
    element: <PacientePage />
  },
  {
    path: 'profissional',
    element: <ProfissionalPage />
  },
  {
    path: 'agenda',
    element: <AgendaPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
