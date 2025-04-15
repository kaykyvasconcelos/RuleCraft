import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simples verificação local
    if (username === 'admin' && password === '1234') {
      onLoginSuccess();
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto mt-10 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <div>
        <label className="block">Usuário</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block">Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Entrar
      </button>
    </form>
  );
};
