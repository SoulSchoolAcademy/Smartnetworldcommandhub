import { useState } from 'react';

export default function CommandStation() {
  const [status, setStatus] = useState('Idle');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function pingService(service) {
    setLoading(true);
    setStatus(`Pinging ${service}...`);
    try {
      const r = await fetch(`/api/health?service=${service}`);
      const data = await r.json();
      setResult({ service, ...data });
      setStatus(`Done: ${service}`);
    } catch (e) {
      setResult({ service, ok:false, error: e?.message || 'Unknown error' });
      setStatus(`Failed: ${service}`);
    } finally {
      setLoading(false);
    }
  }

  const btn = {
    padding: '14px 18px',
    borderRadius: 14,
    border: '1px solid #26304a',
    background: loading ? '#1a2236' : '#11182a',
    color: '#e6e9f2',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    letterSpacing: '0.3px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
  };

  const card = {
    borderRadius: 18,
    border: '1px solid #1f2741',
    background: 'linear-gradient(180deg, #0e1424 0%, #0b0f19 100%)',
    padding: 24,
    boxShadow: '0 10px 35px rgba(0,0,0,0.35)'
  };

  return (
    <div style={card}>
      <h1 style={{fontSize:36, marginBottom:8}}>AI Command Station</h1>
      <p style={{opacity:0.9, marginBottom:24}}>Super admin control hub. Health checks + action triggers wired.</p>
      <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:16}}>
        <button style={btn} disabled={loading} onClick={()=>pingService('SMARTMAIL')}>Check SmartMail</button>
        <button style={btn} disabled={loading} onClick={()=>pingService('SMARTTALK')}>Check SmartTalk</button>
        <button style={btn} disabled={loading} onClick={()=>pingService('CORE')}>Check Core</button>
      </div>
      <div style={{marginTop:8, marginBottom:16, opacity:0.8}}>Status: {status}</div>
      <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word', background:'#0a0e19', padding:16, borderRadius:12, border:'1px solid #1b2240', maxHeight:300, overflow:'auto'}}>
        {JSON.stringify(result, null, 2) || 'No results yet.'}
      </pre>
      <div style={{marginTop:16, fontSize:12, opacity:0.7}}>
        Configure env vars in your host: SMARTMAIL_API_URL, SMARTMAIL_API_KEY, SMARTTALK_API_URL, SMARTTALK_API_KEY.
      </div>
    </div>
  );
}
