'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setMsg(null);
    if (!email || !password) { setMsg({ type: 'err', text: 'Enter your email and password.' }); return; }
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dataset');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg({ type: 'ok', text: 'Account created. Check your email to confirm, then sign in.' });
        setMode('signin');
      }
    } catch (e) {
      setMsg({ type: 'err', text: e.message || 'Something went wrong.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="page page-narrow">
        <div className="auth-wrap">
          <div className="panel panel-pad">
            <h2>{mode === 'signin' ? 'Sign in' : 'Create an account'}</h2>
            <p className="sub">
              {mode === 'signin'
                ? 'Access the dataset and contribute imagery.'
                : 'Join the community to contribute data.'}
            </p>

            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institution.edu" onKeyDown={(e) => e.key === 'Enter' && submit()} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" onKeyDown={(e) => e.key === 'Enter' && submit()} />
            </div>

            {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}

            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
              onClick={submit} disabled={busy}>
              {busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>

            <div className="form-foot">
              {mode === 'signin' ? (
                <>New here? <a onClick={() => { setMode('signup'); setMsg(null); }} style={{ cursor: 'pointer' }}>Create an account</a></>
              ) : (
                <>Already have an account? <a onClick={() => { setMode('signin'); setMsg(null); }} style={{ cursor: 'pointer' }}>Sign in</a></>
              )}
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink3)', marginTop: 18 }}>
            You can <Link href="/scan">identify a disease</Link> without an account.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
