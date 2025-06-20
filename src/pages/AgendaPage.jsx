import { useEffect, useState } from "react";

function AgendaPage(){

    /**************** PROFISSIONAIS *****************/
    
    // Busca por todos os profissionais
    const [profissionais, setProfissionais] = useState([]);
    useEffect(() => {
        async function fetchProfissionais() {
            const response = await fetch('http://localhost:3000/profissionais').then(res => (res.json()));
            setProfissionais(response);
        }

        fetchProfissionais();
    }, [])

    // Seta o ID com o option selecionado
    const [profissionalSelecionadoId, setProfissionalSelecionadoId] = useState("");
    function handleChangeProfissionalId(e){
        setProfissionalSelecionadoId(e.target.value);
    }

    /*********************************/

    // const horarios = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];
    const [horarios, setHorarios] = useState([
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'
    ]);
    
    /**************** DIA *****************/

    const [dia, setDia] = useState("");

    useEffect(() => {
        console.log(dia)
    }, [dia])

    function handleDiaSelecionado(e){
        setDia(e.target.value);
    }

    /*********************************/

    /**************** BUSCAR HORARIOS POR PROFISSIONAL [id] ****************/

    const [consultasAgendadas, setConsultasAgendadas] = useState([]); 

    async function btnClick() {
        try{
            const response = await fetch(`http://localhost:3000/consultas/${profissionalSelecionadoId}/${dia}`).then(res => (res.json()));
            console.log(response);
            setConsultasAgendadas(response);
        } catch(error){
            console.log('Erro', error);
        }
    }

    return (
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Agenda</h1>

            <div className="shadow rounded-sm bg-white w-3/4 p-8">
                {/* <span className="font-bold text-lg">Preencha os campos:</span> */}
                <div className="flex p-8 gap-6 justify-center items-center">
                    <div className="flex gap-3">
                        <label className="font-bold">Profissional:</label>
                        <select 
                            name="profissional"
                            value={profissionalSelecionadoId}
                            onChange={handleChangeProfissionalId}
                            className="bg-gray-200 border border-gray-300 w-52"
                        >
                                <option value="">Selecione...</option>
                                {profissionais.map((profissional) => (
                                    <option 
                                        value={profissional.id}
                                        key={profissional.id}
                                    >
                                        {profissional.nome}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <label className="font-bold">Data:</label>
                        <input type="date" name="" value={dia} onChange={handleDiaSelecionado} id="" className="bg-gray-200 border border-gray-300 w-52"/>
                    </div>

                    <button
                        type="button"
                        onClick={btnClick}
                        className="font-bold py-3 px-6"
                    >
                        Buscar
                    </button>
                
                </div>

                <div className="flex justify-stretch gap-10 w-full">
                    <div className="w-full">
                        <table className="min-w-full bg-slate-200 rounded-lg overflow-hidden shadow-md">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold">Hora</th>
                                    <th className="py-3 px-4 text-left font-semibold">Nome</th>
                                    <th className="py-3 px-4 text-left font-semibold">Idade</th>
                                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {horarios.map((hora) => {
                                    const consulta = consultasAgendadas.find(c => c.horaAgendada === hora);
                                    const ocupado = !!consulta;
                                    
                                    return (
                                        <tr key={hora} className={`border border-slate-300 hover:bg-gray-50 transition-colors ${ocupado ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                            <td className="py-3 px-4 border-gray-300">{hora}</td>
                                            <td 
                                                className="border-slate-300 border py-3 px-4"
                                            >
                                                    {ocupado ? consulta.paciente.nome : '-'}
                                            </td>
                                            <td className="border-slate-300 border py-3 px-4 border-b">
                                                {ocupado ? consulta.paciente.idade : '-'}
                                            </td>
                                            <td className="border-slate-300 border py-3 px-4 border-b">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                    ocupado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {ocupado ? 'Agendado' : 'Livre'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgendaPage;