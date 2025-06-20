// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-300 flex flex-col items-center h-screen gap-16 p-8'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>Bem Vindo(a)!</h1>
        <span className=''>Agende e controle a agenda da clínica.</span>
      </div>

      <div className='shadow rounded-sm bg-white w-3/4 p-8'>
        <span className='font-bold text-lg'>Links Rápidos</span>
        <div className='grid grid-cols-3 p-8 gap-14'>
          <div className='flex flex-col gap-6'>
            <span>Traga clareza e produtividade para a sua clínica através de informações claras e objetivas.</span>
            <button className='bg-black text-white p-3'>Agenda Consultas</button>
          </div>

          <div>
            <span className='font-bold'>Profissionais</span>
            <li>Crie um profissional</li>
            <li>Crie uma informação adicional ao atendimento</li>
          </div>

          <div>
            <span className='font-bold'>Local</span>
            <li>Crie um local de atendimento</li>
            <li>Insira a rota do local</li>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
