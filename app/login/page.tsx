'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', { redirect: false, username: email, password });
    if (res?.error) {
      setError(res.error);
      return;
    }
    // on success, go to dashboard
    router.push('/dashboard');
  }

  return (
    <div style={{padding:32}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:360}}>
        <input placeholder="email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </div>
  );
}
