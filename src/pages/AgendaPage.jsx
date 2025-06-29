import { Check, Circle, CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AgendaPage(){

    const token = localStorage.getItem('token');

    const navigate = useNavigate()
    
    const [dadosAgendamento, setDadosAgendamento] = useState({
        dia: '', horaAgendada: '', profissionalId: null, status: '', localId: null, pacienteId: null, observacoes: ''
    });

    // useEffect(() =>{
    //     console.log('State do Agendamento:', dadosAgendamento);
    // }, [dadosAgendamento]);

    const handleAgendarClick = (hora) => {

        const dadosAgendamento = {
            diaSelecionado: dia,
            horaSelecionada: hora,
            profissionalId: profissionalSelecionadoId
        };

        setDadosAgendamento({
            dia: dadosAgendamento.diaSelecionado,
            horaAgendada: dadosAgendamento.horaSelecionada,
            profissionalId: dadosAgendamento.profissionalId,
            localId: localSelecionadoId
        })

        // console.log(dadosAgendamento);

    };

    /**************** PACIENTES *****************/

    const [pacientes, setPacientes] = useState([]);
    const [pacienteDigitado, setPacienteDigitado] = useState("");
    const [pacienteId, setPacienteId] = useState("");

    function handlePacienteDigitado(e){
        setPacienteDigitado(e.target.value);
    }

    useEffect(() => {
        // console.log(pacienteDigitado);
        
        async function fetchPacienteNome() {
            if (pacienteDigitado.trim() === "") return; // evita chamadas vazias
            try {
                const response = await fetch(`http://localhost:3000/pacientes/busca?caracter=${pacienteDigitado}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // console.log(data);
                setPacientes(data);
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
            }
        }

        fetchPacienteNome();

    }, [pacienteDigitado]);

    /*********************************/

    /**************** PROFISSIONAIS *****************/
    
    // Busca por todos os profissionais
    const [profissionais, setProfissionais] = useState([]);
    useEffect(() => {
        async function fetchProfissionais() {
            const response = await fetch('http://localhost:3000/profissionais', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => (res.json()));
            setProfissionais(response);
        }

        fetchProfissionais();
    }, [])

    
    // Seta o ID com o option selecionado
    const [profissionalSelecionadoId, setProfissionalSelecionadoId] = useState("");

    function handleChangeProfissionalId(e){

        const selectedOption = e.target.options[e.target.selectedIndex];
        let localId = selectedOption.getAttribute('data-localid');
        // console.log(localId)

        setProfissionalSelecionadoId(e.target.value);
        setLocalSelecionadoId(localId)
    }
    
    // useEffect(() =>{
    //     console.log(profissionais.localId);
    // }, [profissionais]);
    /*********************************/

    // const horarios = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];
    const [horarios, setHorarios] = useState([
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'
    ]);
    
    /**************** DIA *****************/

    const [dia, setDia] = useState("");

    // useEffect(() => {
    //     console.log(dia)
    // }, [dia])

    function handleDiaSelecionado(e){
        setDia(e.target.value);
    }

    /*********************************/

    const [carregarAgenda, setCarregarAgenda] = useState(false);

    /**************** BUSCAR HORARIOS POR PROFISSIONAL [id] ****************/

    const [consultasAgendadas, setConsultasAgendadas] = useState([]); 

    async function btnClick() {
        try{
            const response = await fetch(`http://localhost:3000/consultas/${profissionalSelecionadoId}/${dia}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => (res.json()));
            // console.log(response);
            setConsultasAgendadas(response);
            setCarregarAgenda(true);
        } catch(error){
            console.log('Erro', error);
        }
    }



    /**************** PROFISSIONAIS *****************/
    const [localSelecionadoId, setLocalSelecionadoId] = useState(null);

    /******************* MODAL *******************/
    const [mostrarModal, setMostrarModal] = useState(false);
    const abrirModal = () => setMostrarModal(true);
    const fecharModal = () => setMostrarModal(false);
    
    const [mostrarModalAtendimento, setMostrarModalAtendimento] = useState(false);
    const abrirModalAtendimento = () => setMostrarModalAtendimento(true);
    const fecharModalAtendimento = () => setMostrarModalAtendimento(false);

    /******************* ATENDIMENTO *******************/
    // const [dadosInicioAtendimento, setDadosInicioAtendimento] = useState({
    //     pacienteId: null, profissionalId: null, subjetivo: '', objetivo: '', avaliacao: '', plano: ''
    // })

    const [pacienteIdAtendimento, setPacienteIdAtendimento] = useState();
    const [pacienteNomeAtendimento, setPacienteNomeAtendimento] = useState();
    const [pacienteConsultaId, setPacienteConsultaId] = useState();

    // Seta Paciente ID e Nome quando clicar no botão para inciar atendimento
    function handlePacienteAtendimento(e){
        const pacienteId = e.currentTarget.getAttribute('data-paciente-id');
        setPacienteIdAtendimento(pacienteId);

        const pacienteNome = e.currentTarget.getAttribute('data-paciente-nome');
        setPacienteNomeAtendimento(pacienteNome);

        const consultaId = e.currentTarget.getAttribute('data-consulta-id');
        setPacienteConsultaId(consultaId);
    }

    /******************** FETCH AGENDAR CONSULTA ******************** */
    async function fetchAgendar() {
        try{
            const response = await fetch('http://localhost:3000/consultas',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(dadosAgendamento)
            });
            
            const resultado = response.json();
            // console.log('Resposta do servidor: ', resultado)
        } catch(error){
            console.log('Erro ao enviar agendamento:', error);
        }
    }

    /*********************/
    /******************** FETCH DELETAR CONSULTA ******************** */
    async function fetchDeletar(id) {
        try{
            const response = await fetch(`http://localhost:3000/consultas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => (res.json()));
            // console.log('Sucesso:', response);
        } catch(error){
            console.log('Erro:', error);
        }
    };


    return (
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Agenda</h1>

            <div className="shadow rounded-sm bg-white w-11/12 p-8">
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
                                        data-localid={profissional.localId}
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
                                    <th className="py-3 px-4 text-left font-semibold"></th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {horarios.map((hora) => {
                                    const consulta = consultasAgendadas.find(c => c.horaAgendada === hora);
                                    const ocupado = !!consulta;
                                    console.log(consulta);
                                    if(carregarAgenda){
                                        return (
                                            <tr 
                                                key={hora}
                                                // data-consulta-id = {ocupado ? consulta.id : undefined}
                                                className={`border border-slate-300 hover:bg-gray-50 transition-colors ${ocupado ? 'bg-slate-200' : 'bg-slate-100'}`}>
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
                                                        {ocupado ? consulta.status : 'Livre'}
                                                    </span>
                                                </td>
                                                <td className="flex justify-center mt-3 gap-3">
                                                    {consulta && consulta.status === 'agendada' ?(
                                                    <>
                                                    <Trash
                                                        cursor={"pointer"}
                                                        onClick={async () => {
                                                            await fetchDeletar(consulta.id);
                                                            // console.log(consulta.id);
                                                            btnClick();
                                                        }}
                                                        />
                                                    <Check 
                                                        cursor={"pointer"}
                                                        data-paciente-nome= {ocupado ? consulta.paciente.nome : undefined}
                                                        data-paciente-id= {ocupado ? consulta.pacienteId : undefined}
                                                        data-consulta-id= {ocupado ? consulta.id : undefined}
                                                        onClick={(e) =>{
                                                            handlePacienteAtendimento(e);
                                                            handleAgendarClick(hora);
                                                            abrirModalAtendimento();
                                                        }}
                                                    />
                                                    </>
                                                    ) : consulta && consulta.status === 'Atendida' ? (
                                                        <Circle />
                                                    ) : ( 
                                                    <CirclePlus 
                                                        cursor={"pointer"}
                                                        onClick={() => {
                                                            handleAgendarClick(hora);
                                                            abrirModal()
                                                        }}/>
                                                    )
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                                {!carregarAgenda && (
                                    <tr>
                                        <td colSpan={5} className="py-36 text-3xl font-bold text-center text-gray-800">
                                            Selecione uma data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {mostrarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={fecharModal} // Adicione esta função para fechar ao clicar fora
                ></div>
                
                <div className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                    <div className="p-6">
                        <h3 className="text-lg font-bold mb-4">Agendar Consulta</h3>
                        
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Paciente</label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Nome do paciente"
                                    name="pacienteDigitado"
                                    value={pacienteDigitado}
                                    onChange={handlePacienteDigitado}
                                />
                                <div className="flex">
                                    
                                        {Array.isArray(pacientes) && pacientes.length > 0 ? (
                                            pacientes.map((paciente) => (
                                                <span 
                                                    key={paciente.id} 
                                                    className="w-full px-3 border border-gray-300"
                                                    onClick={() => {
                                                        setPacienteDigitado(paciente.nome);
                                                        setPacientes([]);
                                                        setPacienteId(paciente.id)
                                                        setDadosAgendamento(prev => ({
                                                            ...prev,
                                                            pacienteId: paciente.id,
                                                        }));
                                                    }}
                                                >
                                                    {paciente.nome}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="px-3 text-sm text-gray-500">Nenhum paciente encontrado</span>
                                    )}
                                </div>
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Paciente ID</label>
                                <div className="flex gap-2">
                                    {pacienteId}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Profissional ID</label>
                                <div className="flex gap-2">
                                    {dadosAgendamento.profissionalId}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Local ID</label>
                                <div className="flex gap-2">
                                    {localSelecionadoId}
                                </div>
                            </div> */}

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Data e Hora</label>
                                <div className="flex gap-2">
                                    {`${dadosAgendamento.dia} - ${dadosAgendamento.horaAgendada}`}
                                </div>
                            </div>

                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Observações</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    rows="3"
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={fecharModal}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={async () => {
                                        setDadosAgendamento(prev => ({
                                            ...prev,
                                            profissionalId: dadosAgendamento.profissionalId,
                                            localId: localSelecionadoId,
                                            dia: dadosAgendamento.diaSelecionado,
                                            horaAgendada: dadosAgendamento.horaSelecionada,
                                            status: 'Agendada',
                                        }));
                                        await fetchAgendar();
                                        await btnClick();
                                        fecharModal();
                                        setPacienteDigitado('')
                                        setPacientes([])
                                    }}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)}

            {mostrarModalAtendimento && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={fecharModalAtendimento} // Adicione esta função para fechar ao clicar fora
                ></div>
                
                <div className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                    <div className="p-6">
                        <h3 className="text-lg font-bold mb-4">Atender Consulta</h3>
                        
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Paciente</label>
                                <span>{pacienteNomeAtendimento}</span>
                            </div>

                            {/* <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Paciente ID</label>
                                <div className="flex gap-2">
                                    {pacienteIdAtendimento}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Profissional ID</label>
                                <div className="flex gap-2">
                                    {dadosAgendamento.profissionalId}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Local ID</label>
                                <div className="flex gap-2">
                                    {localSelecionadoId}
                                </div>
                            </div> */}

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Data e Hora</label>
                                <div className="flex gap-2">
                                    {`${dadosAgendamento.dia} - ${dadosAgendamento.horaAgendada}`}
                                </div>
                            </div>

                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Observações</label>
                                <textarea 
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    rows="3"
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={fecharModalAtendimento}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={async () => {
                                        const dados = {
                                            pacienteNome: pacienteNomeAtendimento,
                                            pacienteId: pacienteIdAtendimento,
                                            profissionalId: dadosAgendamento.profissionalId,
                                            pacienteConsultaId: pacienteConsultaId
                                        };

                                        navigate("/atendimento", {
                                            state: dados
                                        });
                                        fecharModalAtendimento();
                                    }}
                                >
                                    Iniciar Atendimento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)}

        </div>
    );
}

export default AgendaPage;