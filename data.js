// ============================================================================
// ANNIVERSARY WEBSITE CONFIG — November 28, 2026
// Swap in real photos, videos, messages, and song here. Zero layout changes needed!
// For any media slot: set `src: "assets/photo.jpg"` (or a video URL with `type: "video"`).
// Leave `src: ""` to display the labeled placeholder card.
// ============================================================================

window.ANNIVERSARY_DATA = {
  meta: {
    pageTitle: "One Year of Us",
    dateLabel: "November 28, 2026",
    dateShort: "11 · 28 · 2026",
  },

  // FRAME 1 — Opening Envelope
  frame1: {
    heading: "You got a mail!",
    tapHint: "Tap the seal to open",
    bgMedia: {
      type: "video", // "image" | "video"
      src: "media/frame1.mp4",
      placeholderLabel: "FRAME 1 · BG PHOTO / CLIP #1",
      placeholderSub: "Atmospheric vertical photo or clip",
    },
  },

  // FRAME 2 — Hero Reveal
  frame2: {
    titleLine1: "Happy Anniversary,",
    titleLine2: "My Love!",
    dateBadge: "November 28, 2026",
    scrollHint: "Scroll down for your surprise",
    heroMedia: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 2 · HERO PHOTO / CLIP #2",
      placeholderSub: "Full-bleed favorite couple shot",
    },
  },

  // FRAME 3 — Short Opening Note + 2 Photos
  frame3: {
    cardHeading: "HAPPY ANNIVERSARY, MY LOVE",
    noteText:
      "It’s kind of amazing how much love and laughter we’ve packed into our time together. Every day with you feels like my favorite chapter, and I wouldn’t trade a single second of it for the world. Thank you for being my peace, my best friend, and my favorite place to be.",
    photoA: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 3 · PHOTO 3A",
      placeholderSub: "Portrait photo",
    },
    photoB: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 3 · PHOTO 3B",
      placeholderSub: "Portrait photo",
    },
  },

  // FRAME 4 — Polaroid Memories Wall (8 Polaroids)
  frame4: {
    heading: "Our Time Together",
    polaroids: [
      { id: 1, src: "", label: "POLAROID 1", caption: "Where it all began ✨", date: "Memory 01" },
      { id: 2, src: "", label: "POLAROID 2", caption: "My favorite smile", date: "Memory 02" },
      { id: 3, src: "", label: "POLAROID 3", caption: "Best date night 🍷", date: "Memory 03" },
      { id: 4, src: "", label: "POLAROID 4", caption: "Laughing nonstop", date: "Memory 04" },
      { id: 5, src: "", label: "POLAROID 5", caption: "Golden hour with you", date: "Memory 05" },
      { id: 6, src: "", label: "POLAROID 6", caption: "Little adventures 🤍", date: "Memory 06" },
      { id: 7, src: "", label: "POLAROID 7", caption: "Always my safe space", date: "Memory 07" },
      { id: 8, src: "", label: "POLAROID 8", caption: "To forever & more ❤️", date: "Memory 08" },
    ],
  },

  // FRAME 5 — "My Favorite Person" Filmstrip
  frame5: {
    header: "MY FAVORITE PERSON",
    footer: "I LOVE YOU SO MUCH",
    mediaA: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 5 · FAVE PHOTO / CLIP 5A",
      placeholderSub: "Cinema frame 01",
    },
    mediaB: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 5 · FAVE PHOTO / CLIP 5B",
      placeholderSub: "Cinema frame 02",
    },
  },

  // FRAME 6 — The Love Letter
  frame6: {
    photo: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 6 · LETTER PHOTO #6",
      placeholderSub: "Sweet Polaroid snapshot",
    },
    salutation: "My Dearest,",
    paragraphs: [
      "Happy Anniversary, my love. Putting this little page together made me realize just how many moments we’ve shared that still make me smile out of nowhere.",
      "You have a way of making ordinary days feel like something worth remembering forever. Whether we’re dressed up going out or doing absolutely nothing together, you’re always my favorite part of the day.",
      "Thank you for loving me so gently, for cheering me on, and for being the most wonderful partner I could ever ask for. Here’s to every memory behind us and every single one still waiting for us.",
    ],
    signOff: "Forever yours,",
    signature: "Your Love ❤️",
  },

  // FRAME 7 — Vintage Digicam Stack (Tap shutter to cycle!)
  frame7: {
    hint: "Tap a camera shutter to cycle candids 📸",
    cameraA: {
      model: "CYBER-SHOT · 01",
      shots: [
        { src: "", label: "CANDID 7A · SHOT 1", caption: "Unfiltered & happy" },
        { src: "", label: "CANDID 7A · SHOT 2", caption: "Caught you smiling" },
        { src: "", label: "CANDID 7A · SHOT 3", caption: "Late night laughs" },
      ],
    },
    cameraB: {
      model: "DIGITAL IXUS · 02",
      shots: [
        { src: "", label: "CANDID 7B · SHOT 1", caption: "My favorite view" },
        { src: "", label: "CANDID 7B · SHOT 2", caption: "Sweetest moment" },
        { src: "", label: "CANDID 7B · SHOT 3", caption: "Us, always ❤️" },
      ],
    },
  },

  // FRAME 8 — "This Song Reminds Me of You" Vinyl Player
  frame8: {
    heading: "This song reminds me of you",
    songTitle: "Your Special Song Title",
    artist: "Artist Name · Tap play to spin",
    audioUrl: "", // Optional: direct MP3/M4A URL. If empty, plays gentle music-box chime.
    albumCover: {
      src: "",
      placeholderLabel: "FRAME 8 · ALBUM COVER",
      placeholderSub: "Square artwork",
    },
  },

  // FRAME 9 — Closing Banner
  frame9: {
    titleLine1: "Happy Anniversary,",
    titleLine2: "My Love!",
    subtitle: "Forever with you ❤️",
    closingMedia: {
      type: "image",
      src: "",
      placeholderLabel: "FRAME 9 · CLOSING PHOTO #9",
      placeholderSub: "Final full-bleed couple photo",
    },
  },
};
