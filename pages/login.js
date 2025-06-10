import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('Login successful!');
    } catch (error) {
      setMsg('Login failed!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Login</h1>
      <input className="border p-2 my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 my-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white p-2 rounded" onClick={handleLogin}>Login</button>
      <p>{msg}</p>
    </div>
  );
}