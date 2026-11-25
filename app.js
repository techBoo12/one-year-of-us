(() => {
  const D = window.ANNIVERSARY_DATA;
  if (!D) return;

  const $ = (id) => document.getElementById(id);

  function renderMedia(el, media, light = false) {
    if (!el || !media) return;
    if (media.src) {
      if (media.type === 'video' || /\.(mp4|mov|webm)(\?|$)/i.test(media.src || '')) {
        el.innerHTML = `<video src="${media.src}" autoplay muted loop playsinline></video>`;
      } else {
        el.innerHTML = `<img src="${media.src}" alt="${media.placeholderLabel || media.label || ''}" loading="lazy" />`;
      }
      return;
    }
    el.innerHTML = `
      <div class="media-placeholder ${light ? 'light-ph' : ''}">
        <span class="ph-icon">📷</span>
        <span class="ph-label">${media.placeholderLabel || media.label || 'PHOTO SLOT'}</span>
        ${media.placeholderSub ? `<span class="ph-sub">${media.placeholderSub}</span>` : ''}
      </div>
    `;
  }

  // Meta & Frame 1
  if (D.meta?.pageTitle) document.title = D.meta.pageTitle;
  $('f1-heading').textContent = D.frame1.heading;
  $('f1-hint').textContent = D.frame1.tapHint;
  renderMedia($('f1-bg'), D.frame1.bgMedia);

  // Frame 2
  renderMedia($('f2-bg'), D.frame2.heroMedia);
  $('f2-date').textContent = D.frame2.dateBadge;
  $('f2-t1').textContent = D.frame2.titleLine1;
  $('f2-t2').textContent = D.frame2.titleLine2;
  $('f2-scroll-hint').textContent = D.frame2.scrollHint;

  // Frame 3
  $('f3-heading').textContent = D.frame3.cardHeading;
  $('f3-text').textContent = D.frame3.noteText;
  renderMedia($('f3-photo-a'), D.frame3.photoA, true);
  renderMedia($('f3-photo-b'), D.frame3.photoB, true);

  // Frame 4 — Polaroids + Lightbox
  $('f4-heading').textContent = D.frame4.heading;
  const grid = $('polaroid-grid');
  grid.innerHTML = '';
  D.frame4.polaroids.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card reveal';
    card.style.transitionDelay = `${(idx % 2) * 140}ms`;
    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-photo-box"></div>
      <p class="polaroid-caption">${p.caption}</p>
    `;
    renderMedia(card.querySelector('.polaroid-photo-box'), { type: p.type, src: p.src, label: p.label, placeholderSub: p.date }, true);
    card.addEventListener('click', () => openLightbox(p));
    grid.appendChild(card);
  });

  const lb = $('lightbox');
  function openLightbox(p) {
    renderMedia($('lightbox-media'), { type: p.type, src: p.src, label: p.label, placeholderSub: p.date }, true);
    $('lightbox-caption').textContent = p.caption;
    $('lightbox-date').textContent = p.date || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
  }
  $('lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

  // Frame 5 — Filmstrip
  $('f5-header').textContent = D.frame5.header;
  $('f5-footer').textContent = D.frame5.footer;
  renderMedia($('f5-media-a'), D.frame5.mediaA);
  if ($('f5-media-b')) renderMedia($('f5-media-b'), D.frame5.mediaB);

  // Frame 6 — Love Letter
  renderMedia($('f6-photo'), D.frame6.photo, true);
  $('f6-salutation').textContent = D.frame6.salutation;
  $('f6-body').innerHTML = D.frame6.paragraphs.map((t) => `<p>${t}</p>`).join('');
  $('f6-signoff-label').textContent = D.frame6.signOff;
  $('f6-signature').textContent = D.frame6.signature;

  // Frame 7 — Interactive Digicams
  $('f7-hint').textContent = D.frame7.hint;
  const camIdx = { cameraA: 0, cameraB: 0 };
  function renderCam(key) {
    const cam = D.frame7[key];
    const pfx = key === 'cameraA' ? 'camA' : 'camB';
    const shot = cam.shots[camIdx[key]];
    $(`${pfx}-model`).textContent = cam.model;
    renderMedia($(`${pfx}-lcd`), { src: shot.src, label: shot.label });
    $(`${pfx}-counter`).textContent = `${camIdx[key] + 1}/${cam.shots.length}`;
    $(`${pfx}-caption`).textContent = shot.caption;
  }
  renderCam('cameraA');
  renderCam('cameraB');

  document.querySelectorAll('[data-shutter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-shutter');
      const pfx = key === 'cameraA' ? 'camA' : 'camB';
      const flash = $(`${pfx}-flash`);
      flash.classList.add('flash-on');
      setTimeout(() => {
        camIdx[key] = (camIdx[key] + 1) % D.frame7[key].shots.length;
        renderCam(key);
        flash.classList.remove('flash-on');
      }, 140);
    });
  });

  // Frame 8 — replaced by iMessage chat deck below
  if ($('f8-heading')) {
// Frame 8 — Spinning Vinyl Player
  $('f8-heading').textContent = D.frame8.heading;
  $('f8-song-title').textContent = D.frame8.songTitle;
  $('f8-artist').textContent = D.frame8.artist;
  renderMedia($('f8-cover'), D.frame8.albumCover);

  let isPlaying = false;
  let audioEl = D.frame8.audioUrl ? new Audio(D.frame8.audioUrl) : null;
  let chimeTimer = null;
  let audioCtx = null;

  function playChimeNote(freq) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 1.45);
    } catch (_) {}
  }

  $('vinyl-play-btn').addEventListener('click', () => {
    isPlaying = !isPlaying;
    $('vinyl-stage').classList.toggle('is-playing', isPlaying);
    $('play-icon').textContent = isPlaying ? '❚❚' : '▶';
    $('play-label').textContent = isPlaying ? 'Pause Song' : 'Play Song';
    if (audioEl) {
      isPlaying ? audioEl.play().catch(() => {}) : audioEl.pause();
    } else if (isPlaying) {
      const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25];
      let i = 0;
      playChimeNote(notes[i++ % notes.length]);
      chimeTimer = setInterval(() => playChimeNote(notes[i++ % notes.length]), 900);
    } else {
      clearInterval(chimeTimer);
    }
  });

    }

  // Frame 9 — Closing Banner & Floating Hearts
  renderMedia($('f9-bg'), D.frame9.closingMedia);
  $('f9-t1').textContent = D.frame9.titleLine1;
  $('f9-t2').textContent = D.frame9.titleLine2;
  $('f9-date').textContent = D.meta.dateShort;

  const heartsWrap = $('floating-hearts');
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className = 'f-heart';
    h.textContent = i % 3 === 0 ? '♥' : '♡';
    h.style.left = `${(i * 7 + 5) % 94}%`;
    h.style.fontSize = `${12 + (i % 4) * 5}px`;
    h.style.animationDuration = `${6 + (i % 5) * 1.8}s`;
    h.style.animationDelay = `${(i % 6) * 0.9}s`;
    heartsWrap.appendChild(h);
  }


  // Frame 9 — Yes/No & Email Invitation Card
  const btnYes = $('btn-yes');
  const btnNo = $('btn-no');
  const noNudge = $('no-nudge');
  const inviteReveal = $('invite-reveal');
  const rsvpBox = $('rsvp-box');
  const inviteForm = $('invite-form');
  const inviteStatus = $('invite-status');

  const nudges = [
    'Nice try, my queen 😉 the sea & the moon already know it’s Yes!',
    'That button is just for decoration ❤️ tap Yes!',
    'You really thought No was an option? 😘'
  ];
  let noCount = 0;

  btnNo?.addEventListener('click', () => {
    noNudge.textContent = nudges[noCount % nudges.length];
    noCount++;
    btnNo.style.transform = `translateX(${noCount % 2 === 0 ? -12 : 12}px)`;
  });

  btnYes?.addEventListener('click', () => {
    rsvpBox.hidden = true;
    inviteReveal.hidden = false;
    inviteReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  inviteForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('queen-email').value.trim();
    if (!email) return;
    const btn = $('send-invite-btn');
    btn.disabled = true;
    btn.textContent = 'Sending your invitation... 💌';
    inviteStatus.textContent = '';
    try {
      const resp = await fetch('/api/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await resp.json();
      if (resp.ok && data.ok) {
        btn.textContent = 'Invitation Sent! ❤️';
        inviteStatus.textContent = `Check your inbox (${email}) — your anniversary date invitation is waiting! ✨`;
      } else {
        btn.disabled = false;
        btn.textContent = 'Send My Invitation Card ✨';
        inviteStatus.textContent = data.message || 'Your invitation card is ready above ❤️ (Email delivery activates once Resend API key is added in Vercel).';
      }
    } catch (_) {
      btn.disabled = false;
      btn.textContent = 'Send My Invitation Card ✨';
      inviteStatus.textContent = 'Your invitation card is ready above ❤️';
    }
  });

  // Envelope Open & Replay
  const envBtn = $('envelope-btn');
  const envScreen = $('frame-1');
  const storyMain = $('story-main');

  envBtn.addEventListener('click', () => {
    if (envBtn.classList.contains('is-opening')) return;
    envBtn.classList.add('is-opening');
    setTimeout(() => {
      envScreen.classList.add('is-dismissed');
      document.body.classList.remove('locked');
      storyMain.classList.add('is-visible');
      storyMain.setAttribute('aria-hidden', 'false');
      window.scrollTo({ top: 0, behavior: 'instant' });
      observeReveals();
    }, 900);
  });

  $('replay-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    envBtn.classList.remove('is-opening');
    envScreen.classList.remove('is-dismissed');
    document.body.classList.add('locked');
  });

  function observeReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }
})();

/* === Ambient Sea Waves + Envelope Click SFX + Anniversary Song (v2) === */
(function initAnniversaryAudio() {
  const sea = new Audio('media/sea.mp3');
  sea.loop = true;
  sea.volume = 0.35;

  const song = new Audio('media/song.mp3');
  song.loop = true;
  song.volume = 0.85;
  window.__anniversarySong = song;

  let envelopeOpened = false;
  let seaStarted = false;

  function startSea(e) {
    if (envelopeOpened || seaStarted) return;
    // If the very first tap IS on the envelope, don't start sea — go straight to click + song!
    if (e && e.target && e.target.closest && e.target.closest('#envelope-btn, #envelope, .envelope-stage, .envelope-wrap, .envelope, [data-open-envelope]')) {
      return;
    }
    sea.play().then(() => { seaStarted = true; }).catch(() => {});
  }

  startSea();
  ['pointerdown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, startSea, { passive: true, once: true });
  });

  function playClickSfx() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.055);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (_) {}
  }

  function onEnvelopeTap() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    // Immediately stop sea sound
    sea.pause();
    sea.currentTime = 0;
    playClickSfx();
    // Immediately start the anniversary song
    song.currentTime = 0;
    song.play().catch(() => {});
  }

  // Attach to any envelope trigger via event delegation so it NEVER misses
  document.addEventListener('click', (e) => {
    if (envelopeOpened) return;
    if (e.target && e.target.closest && e.target.closest('#envelope-btn, #envelope, #envelope-trigger, .envelope-stage, .envelope-wrap, .envelope, .wax-seal, .frame1-envelope')) {
      onEnvelopeTap();
    }
  }, true);
})();


/* Frame 8: iMessage Stacked Photo Deck interaction */
(function initChatDeck() {
  const deck = document.getElementById('f8-chat-deck');
  const counter = document.getElementById('f8-chat-counter');
  if (!deck) return;
  const cards = Array.from(deck.querySelectorAll('.imsg-card'));
  const total = cards.length;
  let order = cards.map((_, i) => i);
  let busy = false;
  let startX = null;

  function applyPositions() {
    order.forEach((cardIdx, pos) => {
      const el = cards[cardIdx];
      el.classList.remove('pos-0','pos-1','pos-2','pos-3','pos-4','fling-left','fling-right');
      el.classList.add('pos-' + Math.min(pos, 4));
    });
    if (counter) counter.textContent = `${order[0] + 1} / ${total} · Tap or swipe`;
  }

  function flipNext(dir) {
    if (busy) return;
    busy = true;
    const topEl = cards[order[0]];
    topEl.classList.add(dir === 'right' ? 'fling-right' : 'fling-left');
    setTimeout(() => {
      order.push(order.shift());
      applyPositions();
      busy = false;
    }, 240);
  }

  deck.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  deck.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 28) {
      flipNext(dx > 0 ? 'right' : 'left');
    } else {
      flipNext('left');
    }
  });

  applyPositions();
})();
