import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AtendimentoPage(){

    const token = localStorage.getItem('token');

    const location = useLocation();
    const navigate = useNavigate()
;    
    const { pacienteNome, pacienteId, profissionalId, pacienteConsultaId } = location.state || {};

    const [subjetivo, setSubjetivo] = useState('');
    function handleSubjetivo(e){
        const digitado = e.target.value;
        setSubjetivo(digitado);
    }

    const [objetivo, setObjetivo] = useState('');
    function handleObjetivo(e){
        const digitado = e.target.value;
        setObjetivo(digitado);
    }

    const [avaliacao, setAvaliacao] = useState('');
    function handleAvaliacao(e){
        const digitado = e.target.value;
        setAvaliacao(digitado);
    }

    const [plano, setPlano] = useState('');
    function handlePlano(e){
        const digitado = e.target.value;
        setPlano(digitado);
    }

    async function finalizarAtendimento() {
        const dados = {
            pacienteId: pacienteId,
            profissionalId: profissionalId,
            subjetivo: subjetivo,
            objetivo: objetivo,
            avaliacao: avaliacao,
            plano: plano
        };

        const response = await fetch('http://localhost:3000/prontuarios', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        }).then(res => (res.json()));

    }

    async function statusConsulta() {

        const status = 'Atendida'

        const response = await fetch(`http://localhost:3000/consultas/${pacienteConsultaId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({status})
        }).then(res => (res.json()));
    }

    return(
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Atendimento</h1>

            <div className="shadow rounded-sm bg-white w-11/12 p-8 flex flex-col gap-5 items-center">

                <div className="w-full flex justify-between items-center">
                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            <span className="font-bold">Paciente:</span>
                            <span className="text-gray-700">{pacienteNome}</span>
                            <span className="text-gray-700">{pacienteId}</span>
                            <span className="text-gray-700"></span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-bold">Idade:</span>
                            <span className="text-gray-700">30 anos</span>
                        </div>

                    </div>

                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            <span className="font-bold text-slate-600 text-xs">ID:</span>
                            <span className="text-slate-600 text-xs">{pacienteConsultaId}</span>
                        </div>
                    </div>

                </div>

                <div className="border border-slate-300"></div>

                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col">
                        <label className="font-bold">Subjetivo:</label>
                        <textarea 
                            onChange={handleSubjetivo}
                            name={subjetivo} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" rows={3}></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold">Objetivo:</label>
                        <textarea 
                            onChange={handleObjetivo}
                            name={objetivo} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" rows={3}></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold">Avaliação:</label>
                        <textarea
                            onChange={handleAvaliacao} 
                            name={avaliacao} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" rows={3}></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold">Plano:</label>
                        <textarea 
                            onChange={handlePlano}
                            name={plano}
                            className="w-full px-3 py-2 border border-gray-300 rounded" rows={3}></textarea>
                    </div>

                </div>
                
                <button
                    onClick={async () => {
                        await finalizarAtendimento();
                        await statusConsulta();

                        navigate("/agenda");
                    }}
                    type="button" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Finalizar Atendimento
                </button>

            </div>            

        </div>
    )
}

export default AtendimentoPage;