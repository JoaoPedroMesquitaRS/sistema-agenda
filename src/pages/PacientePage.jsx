import { useEffect, useState } from "react";

function PacientePage(){

    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState("");
    const [pacienteSelecionado, setPacienteSelecionado] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        sexo: "",
        telefone: ""
    });

    // Busca por pacientes
    useEffect(() => {
        async function fecthPacientes() {
            try{
               const response = await fetch('http://localhost:3000/pacientes').then(res => (res.json()));
                setPacientes(response);
            } catch(error){
                console.error('Erro ao buscar Pacientes', error);
            }
        }

        fecthPacientes();

    }, []);

    useEffect(() => {
        const paciente = pacientes.find((p) => p.id === parseInt(pacienteSelecionadoId));
        if(paciente){
            setPacienteSelecionado({
                nome: paciente.nome || "",
                cpf: paciente.cpf || "",
                dataNascimento: paciente.dataNascimento || "",
                sexo: paciente.sexo || "",
                telefone: paciente.telefone || ""
            });
        } else{
            setPacienteSelecionado({
                nome: "",
                cpf: "",
                dataNascimento: "",
                sexo: "",
                telefone: ""
            });
        }
    }, [pacienteSelecionadoId, pacientes])

    // 
    function handleChange(e){
        const { name, value } = e.target;
        setPacienteSelecionado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Conferir se todos os campos estão preenchidos
    const camposPreenchidos = pacienteSelecionado.nome && pacienteSelecionado.cpf && pacienteSelecionado.dataNascimento && pacienteSelecionado.sexo && pacienteSelecionado.telefone;

    // ID do paciente está setado ou vazio?
    const modoAlterar = pacienteSelecionadoId !== "";

    /************* EXCLUIR REGISTRO *************/
    async function btnExcluir() {

        const confirmacao = window.confirm("Deseja realmente excluir este profissional?")
        if(!confirmacao) return;

        try{
            const response = await fetch(`http://localhost:3000/pacientes/${pacienteSelecionadoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            alert('Paciente excluído com sucesso!')
        
            const novosPacientes = await fetch('http://localhost:3000/pacientes').then(res => (res.json()));
            setPacientes(novosPacientes);

        } catch{
            console.log('Erro ao excluir!');
        }
    }


    // realiza as requisicoes PUT POST
    async function btnClick() {
        const url = modoAlterar
            ? `http://localhost:3000/pacientes/${pacienteSelecionadoId}`
            : 'http://localhost:3000/pacientes';

        const method = modoAlterar ? 'PUT' : 'POST';

        try{
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(pacienteSelecionado)
            });
            
            if(!response.ok){
                console.error('Erro ao realizar requisição solicitada');
            }
            const data = await response.json();
            alert(modoAlterar ? 'Paciente alterado com sucesso!' : 'Paciente criado com sucesso!');

            // Carrega a lista de Pacientes atualizada
            const novosPacientes = await fetch('http://localhost:3000/pacientes').then(res => (res.json()));
            setPacientes(novosPacientes);

            // Limpa os inputs
            setPacienteSelecionadoId("");
            setPacienteSelecionado({nome: "", descricao: ""});

        }catch(error){
            console.error('Erro!', error);
            alert(error.message);
        }
    }

    return (
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Criar / Editar Paciente</h1>

            <div className="shadow rounded-sm bg-white w-3/4 p-8">
                <span className="font-bold text-lg">Preencha os campos:</span>
                <div className="flex flex-col p-8 gap-6">
                    {/* Seleção de local existente */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Paciente:</label>
                        <select
                            className="p-3 bg-gray-200 border border-gray-300"
                            value={pacienteSelecionadoId}
                            onChange={(e) => setPacienteSelecionadoId(e.target.value)}
                        >
                        <option value="">Selecionar paciente...</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.id} value={paciente.id}>
                                {paciente.nome}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Campos editáveis */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nome do Paciente:</label>
                        <input
                            name="nome"
                            value={pacienteSelecionado.nome}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">CPF do Paciente:</label>
                        <input
                            name="cpf"
                            value={pacienteSelecionado.cpf}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Data de nascimento do Paciente:</label>
                        <input
                            type="date"
                            name="dataNascimento"
                            value={pacienteSelecionado.dataNascimento}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Sexo:</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sexo"
                                    value="M"
                                    checked={pacienteSelecionado.sexo === "M"}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 border border-gray-300"
                                />
                                Masculino
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sexo"
                                    value="F"
                                    checked={pacienteSelecionado.sexo === "F"}
                                    onChange={handleChange}
                                    className="p-3 bg-gray-200 border border-gray-300"
                                />
                                Feminino
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Telefone do Paciente:</label>
                        <input
                            name="telefone"
                            value={pacienteSelecionado.telefone}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                </div>

                <div className="flex justify-center gap-10">
                    <button
                        type="button"
                        onClick={btnClick}
                        className={`font-bold py-3 px-6 ${
                        camposPreenchidos
                            ? "bg-green-500 text-black"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                        disabled={!camposPreenchidos}
                    >
                        {modoAlterar ? "Alterar" : "Criar"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setPacienteSelecionadoId("");
                            setPacienteSelecionado({ nome: "", cpf: "", dataNascimento: "", sexo: "", telefone: "" });
                        }}
                        className="bg-black text-white font-bold py-3 px-6"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={async () => {
                            await btnExcluir();

                            setPacienteSelecionadoId("");
                            setPacienteSelecionado({ nome: "", cpf: "", dataNascimento: "", sexo: "", telefone: "" });
                        }}
                        className={`text-white font-bold py-3 px-6 ${
                            pacienteSelecionadoId
                            ? "bg-red-500 text-black"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                    >
                        Excluir
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PacientePage;