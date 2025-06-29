// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLogado(!!token); // true se existir token
    }, []);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                throw new Error('Login inválido');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setLogado(true);
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert(error.message);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setLogado(false);
    }

    if (logado) {
        return (
            <div className="flex flex-col items-center mt-20 gap-4">
                <h2 className="text-2xl font-bold">Você está logado!</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-80"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 bg-gray-100 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="p-3 bg-gray-100 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 font-bold"
                >
                    Entrar
                </button>
            </form>
        </div>
  );
}

export default LoginPage;