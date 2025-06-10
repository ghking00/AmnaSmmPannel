import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('/api/signup', { email, password });
      setMsg('Signup successful!');
    } catch (error) {
      setMsg('Signup failed!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Signup</h1>
      <input className="border p-2 my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 my-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSignup}>Signup</button>
      <p>{msg}</p>
    </div>
  );
}