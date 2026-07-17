'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

function BrandMark() {
  // Abstract mushroom cap over a lens/reticle — nods to scanning + mycology
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#001E44" />
      <path d="M10 21.5C10 16.253 14.253 12 19.5 12H20.5C25.747 12 30 16.253 30 21.5V22H10V21.5Z" fill="#96BEE6" />
      <rect x="17.5" y="22" width="5" height="8" rx="1.4" fill="#96BEE6" />
      <circle cx="15.5" cy="18" r="1.3" fill="#001E44" />
      <circle cx="24.5" cy="18" r="1.3" fill="#001E44" />
      <circle cx="20" cy="16" r="1.3" fill="#001E44" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => { await supabase.auth.signOut(); setUser(null); };
  const is = (p) => (p === '/' ? pathname === '/' : pathname.startsWith(p));

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark"><BrandMark /></span>
          <span className="brand-text">
            <span className="brand-name">MycoScan</span>
            <span className="brand-sub">Penn State · MRC</span>
          </span>
        </Link>

        <ul className="nav-links">
          <li><Link href="/" className={is('/') ? 'active' : ''}>Home</Link></li>
          <li><Link href="/dataset" className={is('/dataset') ? 'active' : ''}>Dataset</Link></li>
          <li><Link href="/scan" className={is('/scan') ? 'active' : ''}>Identify</Link></li>
          <li><Link href="/library" className={is('/library') ? 'active' : ''}>Disease Library</Link></li>
          <li><Link href="/team" className={is('/team') ? 'active' : ''}>Team</Link></li>
          <li><Link href="/about" className={is('/about') ? 'active' : ''}>About</Link></li>
        </ul>

        <div className="nav-right">
          {user ? (
            <>
              <span className="nav-user"><span className="nav-user-dot" />{user.email?.split('@')[0]}</span>
              <button onClick={signOut} className="btn btn-ghost btn-sm">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/auth" className="btn btn-ghost btn-sm">Sign in</Link>
              <Link href="/upload" className="btn btn-primary btn-sm">Contribute</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
