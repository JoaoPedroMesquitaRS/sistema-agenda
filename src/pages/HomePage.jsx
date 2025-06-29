import { useNavigate } from "react-router-dom";


// pages/HomePage.jsx
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 flex flex-col items-center h-screen gap-16 p-8'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>Bem Vindo(a)!</h1>
        <span className=''>Agende e controle a agenda da sua clínica.</span>
      </div>

      <div className='shadow rounded-sm bg-white w-11/12 p-8'>
        <span className='font-bold text-lg'>Descrição</span>
        <div className='grid grid-cols-3 p-8 gap-14'>
          <div className='flex flex-col gap-6'>
            <span>Traga clareza e produtividade para a sua clínica através de informações claras e objetivas.</span>
          </div>

          <div>
            <button 
            type='button'
            className='font-bold'
            onClick={() =>{
              navigate('/profissional')
            }}
            >
              Profissionais
            </button>
            <li>Crie um profissional</li>
            <li>Crie uma informação adicional ao atendimento</li>
          </div>

          <div>
            <button
            type='button' 
            className='font-bold'
            onClick={() => {
              navigate('/local')
            }}
            >
              Local
            </button>
            <li>Crie um local de atendimento</li>
            <li>Insira a rota do local</li>
          </div>

        </div>
      </div>

    </div>
  )
};

export default HomePage;
