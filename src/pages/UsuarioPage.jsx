import { useEffect, useState } from "react";

function UsuarioPage(){

    const [usuarios, setUsuarios] = useState([]);

    useEffect( () => {
        async function fetchUsuarios() {
            const response = await fetch('http://localhost:3000/usuarios').then(res => (res.json()));
            setUsuarios(response);
        }
        fetchUsuarios();
    }, []);

    /**************************************** */
    
    const [usuarioSelecionadoId, setUsuarioSelecionadoId] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        nome: '', email: '', senha: '', tipo: ''
    });
    const [usuarioDigitado, setUsuarioDigitado] = useState({
        nome: '', email: '', senha: '', tipo: ''
    });

    useEffect(() =>{
        const usuario = usuarios.find((p) => p.id === parseInt(usuarioSelecionadoId));
        setUsuarioSelecionado(usuario);
        if(usuario){
            setUsuarioDigitado({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                tipo: usuario.tipo
            })
        }
    }, [usuarioSelecionadoId, usuarios])

    /**************************************** */

    async function btnExcluir() {
        const confirmacao = window.confirm("Deseja realmente excluir este usuário?")
        if(!confirmacao) return;

        try{
            const response = await fetch(`http://localhost:3000/usuarios/${usuarioSelecionadoId}`,{
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            alert('Usuário excluído com sucesso!')
        } catch{
            console.log('Erro ao excluir!');
        }
    }

    /**************************************** */

    useEffect(() => {
        console.log(usuarioDigitado);
    }, [usuarioDigitado]);

    function handleChange(e){
        const { name, value } = e.target;
        setUsuarioDigitado(prev => ({
            ...prev,
            [name]: value
        }));
    }

    
    const modoAlterar = usuarioSelecionadoId !== "";
    const camposPreenchidos = usuarioDigitado.nome && usuarioDigitado.email && usuarioDigitado.senha && usuarioDigitado.tipo;

    async function btnClick() {

        const url = modoAlterar ? `http://localhost:3000/usuarios/${usuarioSelecionadoId}` : 'http://localhost:3000/usuarios';
        const method = modoAlterar ? 'PUT' : 'POST'

        try{
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(usuarioDigitado)
            }).then(res => (res.json()));
            
            if(response){
                alert('Usuário criado com sucesso!');
            }
        } catch(error){
            console.log({error: error.message});
        }
    }
    
    /******************************************* */


    /******************************************* */

    return (
        <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
            <h1 className="font-bold text-3xl">Criar / Editar Usuário</h1>

            <div className="shadow rounded-sm bg-white w-11/12 p-8">
                <span className="font-bold text-lg">Preencha os campos:</span>
                <div className="flex flex-col p-8 gap-6">
                    
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Usuário:</label>
                        <select
                            className="p-3 bg-gray-200 border border-gray-300"
                            value={usuarioSelecionadoId}
                            onChange={(e) => setUsuarioSelecionadoId(e.target.value)}
                        >
                        <option value="">Selecionar usuário...</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nome do Usuário:</label>
                        <input
                            name="nome"
                            value={usuarioDigitado.nome}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Email:</label>
                        <input
                            name="email"
                            value={usuarioDigitado.email}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={usuarioDigitado.senha}
                            onChange={handleChange}
                            className="p-3 bg-gray-200 border border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Tipo:</label>
                        <select
                            name="tipo"
                            className="p-3 bg-gray-200 border border-gray-300"
                            value={usuarioDigitado.tipo}
                            onChange={handleChange}
                        >
                            <option value="">Selecionar tipo...</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Comum">Comum</option>
                            
                        </select>
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
                        }
                        `}
                        disabled={!camposPreenchidos}
                    >
                        {modoAlterar ? "Alterar" : "Criar"}
                    </button>

                    <button
                        onClick={async () =>{
                            await btnExcluir();

                            setUsuarioSelecionadoId("");
                            setUsuarioSelecionado({ nome: "", email: "", senha: "", tipo: "" });
                        }}
                        type="button"
                        className={`font-bold py-3 px-6 ${
                            usuarioSelecionadoId
                            ? "bg-red-500 text-black"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                        disabled={!usuarioSelecionadoId}
                    >
                        Excluir
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => {
                            setUsuarioSelecionadoId("");
                            setUsuarioDigitado({ nome: "", email: "", senha: "", tipo: "" });
                        }}
                        className="bg-black text-white font-bold py-3 px-6"
                    >
                        Cancelar
                    </button>
            

                </div>
            </div>
        </div>
    )
}

export default UsuarioPage;