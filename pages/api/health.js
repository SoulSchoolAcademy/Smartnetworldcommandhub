export default async function handler(req, res) {
  const service = (req.query.service || 'CORE').toUpperCase();
  try {
    if (service === 'SMARTMAIL') {
      const r = await fetch(`${process.env.SMARTMAIL_API_URL}/health`, {
        headers: { Authorization: `Bearer ${process.env.SMARTMAIL_API_KEY}` }
      });
      const data = await r.json().catch(()=> ({}));
      return res.status(r.status).json({ ok: r.ok, service, upstream: data });
    }
    if (service === 'SMARTTALK') {
      const r = await fetch(`${process.env.SMARTTALK_API_URL}/health`, {
        headers: { Authorization: `Bearer ${process.env.SMARTTALK_API_KEY}` }
      });
      const data = await r.json().catch(()=> ({}));
      return res.status(r.status).json({ ok: r.ok, service, upstream: data });
    }
    // CORE just confirms process + env presence
    return res.status(200).json({
      ok: true,
      service: 'CORE',
      node: process.version,
      hasEnv: {
        SMARTMAIL_API_URL: !!process.env.SMARTMAIL_API_URL,
        SMARTMAIL_API_KEY: !!process.env.SMARTMAIL_API_KEY,
        SMARTTALK_API_URL: !!process.env.SMARTTALK_API_URL,
        SMARTTALK_API_KEY: !!process.env.SMARTTALK_API_KEY
      }
    });
  } catch (e) {
    return res.status(500).json({ ok:false, service, error: e?.message || 'Unknown error' });
  }
}
