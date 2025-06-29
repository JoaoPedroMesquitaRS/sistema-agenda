import { useEffect, useState } from "react";

function ProfissionalPage(){

    const token = localStorage.getItem('token');

    /********************* +++++++++ PROFISSIONAIS +++++++++ *****************************/

    const [profissionais, setProfissionais] = useState([]);
    
    /**** Busca por todos os profisisonais ******/
    useEffect(() => {
        async function fetchProfissional() {
            try{
                const profissionaisResponse = await fetch('http://localhost:3000/profissionais', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => (res.json()));
                setProfissionais(profissionaisResponse);
            } catch(error){
                console.log("Erro", error);
            }
        }

        fetchProfissional();
    }, [])


    const [profissionalSelecionadoId, setProfissionalSelecionadoId] = useState("");
    const [profissionalSelecionado, setProfissionalSelecionado] = useState({
        nome: "", registro: "", localId: 0, especialidadeId: 0, telefone: "", email: ""
    }, []);

    // MONITORA PROFISSIONAL E INPUTS
    useEffect(() => {
        console.log(profissionalSelecionado);
    }, [profissionalSelecionado])
    
    useEffect(() => {
        const profissional = profissionais.find((p) => p.id === parseInt(profissionalSelecionadoId));
        if(profissional){
            setProfissionalSelecionado({
                nome: profissional.nome || "",
                registro: profissional.registro || "",
                telefone: profissional.telefone || "",
                email: profissional.email || ""
            });
            setLocalId(profissional.localId);
            setEspecialidadeId(profissional.especialidadeId);
        } else{
            setProfissionalSelecionado({
                nome: "",
                registro: "",
                telefone: "",
                email: ""
            });
        }
    }, [profissionais, profissionalSelecionadoId])

    /********************* +++++++++ ESPECIALIDADES +++++++++ *****************************/
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadeId, setEspecialidadeId] = useState([]);
    
    useEffect(() => {
        async function fetchEspecialidades() {
            try{
                const response = await fetch('http://localhost:3000/especialidades', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => (res.json()));
                setEspecialidades(response);
                console.log(response);
            }catch(error){
                console.log('Erro:', error)
            }
        };
        
        fetchEspecialidades();
    }, []);
    
    function handleChangeEspecialidadeId(e){
        setEspecialidadeId(e.target.value);
        const { value } = e.target;
        setProfissionalSelecionado(prev => ({
            ...prev,
            especialidadeId: parseInt(value)
        }));
    }

    // MOSTRA O ID DA ESPECIALIDADE AO SER SELECIONADO NO INPUT
    useEffect(() =>{
        console.log(especialidadeId)
    }, [especialidadeId])

    // QUANDO O ID DO LOCAL MUDAR, BUSCA O NOME DO LOCAL REFERENTE
    useEffect(() => {
        // console.log("especialidadeId:", especialidadeId);
        async function fetchEspecialidadeId() {
            try{
                const especialidade = await fetch(`http://localhost:3000/especialidades/${especialidadeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => res.json());
            } catch {
                console.log('Erro');
            }
        }

        fetchEspecialidadeId();

    }, [especialidadeId])

    /************************************/
    /********************* +++++++++ LOCAIS +++++++++ *****************************/

    const [locais, setLocais] = useState([]);
    const [localId, setLocalId] = useState([]);
    
    useEffect(() => {
        async function fetchLocais() {
            try{
                const response = await fetch('http://localhost:3000/locais', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => (res.json()));
                setLocais(response);
                console.log(response);
            }catch(error){
                console.log('Erro:', error)
            }
        };
        
        fetchLocais();
    }, []);

    function handleChangeLocalId(e){
        setLocalId(e.target.value);
        const { value } = e.target;
        setProfissionalSelecionado(prev => ({
            ...prev,
            localId: parseInt(value)
        }));
    }

    // MOSTRA O ID DO LOCAL AO SER SELECIONADO NO INPUT
    useEffect(() =>{
        console.log(localId)
    }, [localId])

    // QUANDO O ID DO LOCAL MUDAR, BUSCA O NOME DO LOCAL REFERENTE
    useEffect(() => {
        async function fetchLocalId() {
    
            try{
                const local = await fetch(`http://localhost:3000/locais/${localId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => res.json());
            } catch {
                console.log('Erro');
            }
        }

        fetchLocalId();

    }, [localId])
    
    /***************************************/
    
    function handleChange(e){
        const { name, value } = e.target;
        setProfissionalSelecionado(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Conferir se todos os campos estão preenchidos
    const camposPreenchidos =
        profissionalSelecionado.nome.trim() !== "" &&
        profissionalSelecionado.registro.trim() !== "" &&
        profissionalSelecionado.telefone.trim() !== "" &&
        profissionalSelecionado.email.trim() !== "";

    const modoAlterar = profissionalSelecionadoId !== "";

    /*********** ++++++++++ EXCLUIR REGISTRO +++++++++++ ************/

    async function btnExcluir(){

        const confirmacao = window.confirm("Deseja realmente excluir este profissional?");
        if (!confirmacao) return;
        
        const response = await fetch(`http://localhost:3000/profissionais/${profissionalSelecionadoId},`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const novosProfissionais = await fetch('http://localhost:3000/profissionais', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => (res.json()));
        setProfissionais(novosProfissionais);

    }

    /*********** ++++++++++ REALIZAR REQUISIÇÃO ++++++++++ ***********/

    async function btnClick() {
        const url = modoAlterar
            ? `http://localhost:3000/profissionais/${profissionalSelecionadoId}`
            : 'http://localhost:3000/profissionais';

        const method = modoAlterar ? 'PUT' : 'POST';

        try{
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profissionalSelecionado)
            })

            const data = await response.json()

        } catch(error){
            console.log('Erro', error);
        }

        const novosProfissionais = await fetch('http://localhost:3000/profissionais', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => (res.json()));
        setProfissionais(novosProfissionais);
        
    }


    return(
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Criar / Editar Profissional</h1>

            <div className="shadow rounded-sm bg-white w-11/12 p-8">
                <span className="font-bold text-lg">Preencha os campos:</span>
                <div className="flex flex-col p-8 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Profissioal:</label>
                        <select
                            className="p-3 bg-gray-200 border border-gray-300"
                            value={profissionalSelecionadoId}
                            onChange={(e) => setProfissionalSelecionadoId(e.target.value)}
                        >
                        <option value="">Selecionar profissional...</option>
                        {profissionais.map((profissional) => (
                            <option 
                                key={profissional.id} 
                                value={profissional.id}
                            >
                                {profissional.nome}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Campos editáveis */}
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nome:</label>
                        <input
                            name="nome"
                            value={profissionalSelecionado.nome}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Registro ou Conselho:</label>
                        <input
                            name="registro"
                            value={profissionalSelecionado.registro}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Local:</label>

                        <select
                            name="localId"
                            value={localId} // Controla o valor
                            onChange={handleChangeLocalId}
                            className="p-3 bg-gray-200 border border-gray-300"
                        >
                            <option value="">Escolha um local...</option>

                            {locais.map((local) => (
                                <option key={local.id} value={local.id}>
                                    {local.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Especialidade:</label>

                        <select 
                            name="especialidade"
                            value={especialidadeId} // Controla o valor
                            className="p-3 bg-gray-200 border border-gray-300"
                            onChange={handleChangeEspecialidadeId}
                        >
                                <option value="">Escolha uma especialidade...</option>
                                {especialidades.map((especialidade) =>(
                                    <option
                                        key={especialidade.id} 
                                        value={especialidade.id}
                                    >
                                        {especialidade.nome}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Telefone:</label>
                        <input
                            name="telefone"
                            value={profissionalSelecionado.telefone}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Email:</label>
                        <input
                            name="email"
                            value={profissionalSelecionado.email}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                </div>

                <div className="flex justify-center gap-10">
                    <button
                        type="button"
                        onClick={async () =>{
                            await btnClick();

                            setProfissionalSelecionadoId("");
                            setProfissionalSelecionado({ nome: "", registro: "", localId: 0, especialidadeId: 0, telefone: "", email: "" });
                            setLocalId(0);
                            setEspecialidadeId(0);
                        }}
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
                            setProfissionalSelecionadoId("");
                            setProfissionalSelecionado({ nome: "", registro: "", localId: 0, especialidadeId: 0, telefone: "", email: "" });
                            setLocalId(0);
                            setEspecialidadeId(0);
                        }}
                        className="bg-black text-white font-bold py-3 px-6"
                    >
                        Cancelar
                    </button>

                        <button
                            onClick={async () =>{
                                await btnExcluir();

                                setProfissionalSelecionadoId("");
                                setProfissionalSelecionado({ nome: "", registro: "", localId: 0, especialidadeId: 0, telefone: "", email: "" });
                                setLocalId(0);
                                setEspecialidadeId(0);
                            }}
                            type="button"
                            className={`font-bold py-3 px-6 ${
                                profissionalSelecionadoId
                                ? "bg-red-500 text-black"
                                : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                            disabled={!profissionalSelecionadoId}
                        >
                            Excluir
                        </button>

                </div>
            </div>
        </div>
    )
}

export default ProfissionalPage;