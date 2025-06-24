import { useEffect, useState } from "react";

function EspecialidadePage(){

    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadeSelecionadaId, setEspecialidadeSelecionadaId] = useState("");
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState({
        nome: "",
        descricao: ""
    });

    // Buscar Especialidades
    useEffect(() => {
        async function fetchEspecialidades() {
            try{
                const response = await fetch('http://localhost:3000/especialidades');
                const especialidades = await response.json();
                setEspecialidades(especialidades);
            } catch(error){
                console.error('Erro ao buscar Especialidades', error);
            }
        };

        fetchEspecialidades();
    }, []);

    // Mostrar dados da Esp selecionada
    useEffect(() => {
        const especialidade = especialidades.find((e) => e.id === parseInt(especialidadeSelecionadaId));
        if(especialidade){
            setEspecialidadeSelecionada({
                nome: especialidade.nome || "",
                descricao: especialidade.descricao || ""
            });
        }else{
            setEspecialidadeSelecionada({
                nome: "",
                descricao: ""
            });
        }
    }, [especialidadeSelecionadaId, especialidades]);

    // Atualiza os campos editáveis
    function handleChange(e){
        const { name, value } = e.target;
        setEspecialidadeSelecionada(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Conferir se todos os campos estão preenchidos
    const camposPreenchidos = especialidadeSelecionada.nome && especialidadeSelecionada.descricao;

    const modoAlterar = especialidadeSelecionadaId !== "";

    /*********** ++++++++++ EXCLUIR REGISTRO +++++++++++ ************/

    async function btnExcluir(){

        const confirmacao = window.confirm("Deseja realmente excluir esta especialidade?");
        if (!confirmacao) return;
        
        const response = await fetch(`http://localhost:3000/especialidades/${especialidadeSelecionadaId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const novasEspecialidades = await fetch('http://localhost:3000/especialidades').then(res => (res.json()));
        setEspecialidades(novasEspecialidades);

    }

    // Realizar requisição
    async function btnClick(e) {
        e.preventDefault();

        const url = modoAlterar 
            ? `http://localhost:3000/especialidades/${especialidadeSelecionadaId}`
            : 'http://localhost:3000/especialidades'
        
        const method = modoAlterar ? 'PUT' : 'POST';

        try{
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(especialidadeSelecionada)
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao salvar!');
            }

            const data = await response.json();
            alert(modoAlterar ? "Especialidade alterada com sucesso!" : "Especialidade criada com sucesso!");

            // Carrega a lista de Especialidades atualizada
            const novasEspecialidades = await fetch('http://localhost:3000/especialidades').then(res => res.json());
            setEspecialidades(novasEspecialidades);

            // Limpa os inputs
            setEspecialidadeSelecionadaId("");
            setEspecialidadeSelecionada({nome: "", descricao: ""});


        } catch(error){
            console.error("Erro", error);
            alert(error.message);
        }   
    }

    return (
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Criar / Editar Especialidade</h1>

            <div className="shadow rounded-sm bg-white w-11/12 p-8">
                <span className="font-bold text-lg">Preencha os campos:</span>
                <div className="flex flex-col p-8 gap-6">
                    {/* Seleção de local existente */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Especialidade:</label>
                        <select
                            className="p-3 bg-gray-200 border border-gray-300"
                            value={especialidadeSelecionadaId}
                            onChange={(e) => setEspecialidadeSelecionadaId(e.target.value)}
                        >
                        <option value="">Selecionar especialidade...</option>
                        {especialidades.map((especialidade) => (
                            <option key={especialidade.id} value={especialidade.id}>
                                {especialidade.nome}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Campos editáveis */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nome da Especialidade:</label>
                        <input
                            name="nome"
                            value={especialidadeSelecionada.nome}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Descrição:</label>
                        <textarea 
                            name="descricao" 
                            value={especialidadeSelecionada.descricao}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                            >

                        </textarea>
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
                            setEspecialidadeSelecionadaId("");
                            setEspecialidadeSelecionada({ nome: "", descricao: "" });
                        }}
                        className="bg-black text-white font-bold py-3 px-6"
                    >
                        Cancelar
                    </button>
            
                    <button
                        onClick={async () =>{
                            await btnExcluir();

                            setEspecialidadeSelecionadaId("");
                            setEspecialidadeSelecionada({ nome: "", descricao: "" });
                        }}
                        type="button"
                        className={`font-bold py-3 px-6 ${
                            especialidadeSelecionadaId
                            ? "bg-red-500 text-black"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                        disabled={!especialidadeSelecionadaId}
                    >
                        Excluir
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EspecialidadePage;