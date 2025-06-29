import { useEffect, useState } from "react";

function LocalPage() {
  const [locais, setLocais] = useState([]);
  const [localSelecionadoId, setLocalSelecionadoId] = useState("");
  const [localSelecionado, setLocalSelecionado] = useState({
    nome: "",
    endereco: "",
    rota: ""
  });

  const token = localStorage.getItem('token');

  // Buscar locais ao carregar
  useEffect(() => {
    async function fetchLocais() {
      try {
        const response = await fetch("http://localhost:3000/locais", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const dados = await response.json();
        setLocais(dados);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      }
    }

    fetchLocais();
  }, []);

  // Atualizar os campos ao selecionar um local
  useEffect(() => {
    const local = locais.find((l) => l.id === parseInt(localSelecionadoId));
    if (local) {
      setLocalSelecionado({
        nome: local.nome || "",
        endereco: local.endereco || "",
        rota: local.rota || ""
      });
    } else {
      setLocalSelecionado({
        nome: "",
        endereco: "",
        rota: ""
      });
    }
  }, [localSelecionadoId, locais]);

  // Detectar se todos os campos estão preenchidos
  const camposPreenchidos = localSelecionado.nome && localSelecionado.endereco && localSelecionado.rota;

  const modoAlterar = localSelecionadoId !== "";

  // Atualizar campos editáveis
  function handleChange(e) {
    const { name, value } = e.target;
    setLocalSelecionado(prev => ({
      ...prev,
      [name]: value
    }));
  }

  /*********** ++++++++++ EXCLUIR REGISTRO +++++++++++ ************/

    async function btnExcluir(){

        const confirmacao = window.confirm("Deseja realmente excluir este local?");
        if (!confirmacao) return;
        
        const response = await fetch(`http://localhost:3000/locais/${localSelecionadoId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const novosLocais = await fetch('http://localhost:3000/locais', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => (res.json()));
        setLocais(novosLocais);

    }

  // Enviar formulário
  async function btnClick(e) {
    e.preventDefault();

    const url = modoAlterar
      ? `http://localhost:3000/locais/${localSelecionadoId}`
      : "http://localhost:3000/locais";

    const method = modoAlterar ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(localSelecionado)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao salvar");
      }

      const data = await response.json();
      alert(modoAlterar ? "Local atualizado com sucesso!" : "Local criado com sucesso!");
      
      // Recarregar locais após ação
      const novosLocais = await fetch("http://localhost:3000/locais", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json());
      setLocais(novosLocais);

      // Resetar formulário
      setLocalSelecionadoId("");
      setLocalSelecionado({ nome: "", endereco: "", rota: "" });

    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }
  }

  return (
    <div className="bg-slate-300 flex flex-col items-center gap-16 p-8">
      <h1 className="font-bold text-3xl">Criar / Editar Local de Atendimento</h1>

      <div className="shadow rounded-sm bg-white w-11/12 p-8">
        <span className="font-bold text-lg">Preencha os campos:</span>
        <div className="flex flex-col p-8 gap-6">
          {/* Seleção de local existente */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Local:</label>
            <select
              className="p-3 bg-gray-200 border border-gray-300"
              value={localSelecionadoId}
              onChange={(e) => setLocalSelecionadoId(e.target.value)}
            >
              <option value="">Selecionar local...</option>
              {locais.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Campos editáveis */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">Nome do Local:</label>
            <input
              name="nome"
              value={localSelecionado.nome}
              onChange={handleChange}
              className="p-3 bg-gray-200 border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Endereço:</label>
            <input
              name="endereco"
              value={localSelecionado.endereco}
              onChange={handleChange}
              className="p-3 bg-gray-200 border border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Rota:</label>
            <input
              name="rota"
              value={localSelecionado.rota}
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
              setLocalSelecionadoId("");
              setLocalSelecionado({ nome: "", endereco: "", rota: "" });
            }}
            className="bg-black text-white font-bold py-3 px-6"
          >
            Cancelar
          </button>

            <button
              onClick={async () =>{
                  await btnExcluir();

                  setLocalSelecionadoId("");
                  setLocalSelecionado({ nome: "", endereco: "", rota: "" });
              }}
              type="button"
              className={`font-bold py-3 px-6 ${
                  localSelecionadoId
                  ? "bg-red-500 text-black"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              disabled={!localSelecionadoId}
            >
              Excluir
            </button>


        </div>
      </div>
    </div>
  );
}

export default LocalPage;
