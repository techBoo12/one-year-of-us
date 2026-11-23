export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      ok: false,
      message: 'Your invitation card is unlocked above! ❤️ (Add RESEND_API_KEY in Vercel Settings to enable inbox delivery.)'
    });
  }

  const html = `
  <div style="background:#3A060E;padding:32px 16px;font-family:Georgia,serif;color:#FBF4E9;text-align:center;">
    <div style="max-width:460px;margin:0 auto;background:#5A0B15;border:2px solid #D4AF37;border-radius:14px;padding:12px;">
      <div style="border:1px solid rgba(243,220,153,0.5);border-radius:10px;padding:30px 22px;">
        <p style="font-size:11px;letter-spacing:3px;color:#F3DC99;margin:0 0 10px;">✦ OFFICIAL INVITATION ✦</p>
        <h1 style="font-size:34px;font-weight:normal;color:#FBF4E9;margin:0 0 6px;">Our Anniversary Date</h1>
        <p style="font-style:italic;color:#F3DC99;font-size:16px;margin:0 0 18px;">For My Queen &amp; Best Friend</p>
        <p style="font-size:15px;line-height:1.7;color:#FBF4E9;margin:0 0 18px;">
          One year ago, I asked you to be mine on the beach, and the gods of the sea, love, and the moon witnessed that.<br/><br/>
          Thank you for saying <strong>Yes</strong> again — to being my girlfriend, my best friend, and my date to celebrate One Year of Us.
        </p>
        <div style="border-top:1px solid rgba(243,220,153,0.35);border-bottom:1px solid rgba(243,220,153,0.35);padding:14px 0;margin:18px 0;font-size:14px;line-height:1.8;">
          <div><strong>Occasion:</strong> One Year of Us ❤️</div>
          <div><strong>When:</strong> As soon as you’re back from your journey</div>
          <div><strong>Dress Code:</strong> Whatever makes you feel radiant</div>
        </div>
        <p style="font-style:italic;color:#F3DC99;font-size:13px;margin:0;">Witnessed by the sea, love &amp; the moon 🌙 · 11 · 28 · 2026</p>
      </div>
    </div>
  </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.INVITE_FROM_EMAIL || 'One Year of Us <onboarding@resend.dev>',
        to: [email],
        subject: '💌 You’re Invited: Our Anniversary Date (One Year of Us)',
        html
      })
    });
    const out = await r.json();
    if (!r.ok) {
      return res.status(502).json({ ok: false, message: out.message || 'Email provider error' });
    }
    return res.status(200).json({ ok: true, id: out.id });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Could not reach email service.' });
  }
}
