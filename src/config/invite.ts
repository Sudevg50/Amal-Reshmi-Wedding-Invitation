// ============================================================
// WEDDING INVITATION CONFIG
// Edit all details here — no other files need to change.
// ============================================================

export const invite = {
  // ---------- COUPLE ----------
  groom: {
    firstName: "Amal",
    lastName: "",
    fullName: "Amal",
    initial: "A",
    father: "Sasidharan",
    mother: "Meera",
    address: "",
    sonOf: "S/O Sasidharan & Meera",
  },
  bride: {
    firstName: "Reshmi",
    lastName: "",
    fullName: "Reshmi",
    initial: "R",
    father: "Balakrishnan",
    mother: "Usha",
    address: "",
    daughterOf: "D/O Balakrishnan & Usha",
  },

  // ---------- EVENT ----------
  event: {
    title: "Wedding Ceremony",
    dayOfWeek: "Saturday",
    date: "2 January 2027",
    dateShort: "02 · 01 · 2027",
    dateISO: "2027-01-02",
    timeStart: "11:23",
    timeEnd: "12:33",
    timeDisplay: "11:23 AM – 12:33 PM",
    timezone: "Asia/Kolkata",
    muhurtham: "11:23 AM – 12:33 PM",
    isoStart: "2027-01-02T11:23:00+05:30",
    isoEnd:   "2027-01-02T12:33:00+05:30",
  },

  // ---------- VENUE ----------
  venue: {
    name: "Nandhalala Auditorium",
    address: "Kunhimangalam, Kannur, Kerala",
    lat: 12.08025,
    lng: 75.2436,
    mapsUrl: "https://maps.app.goo.gl/tmdhVrPAPfpTXPVE8?g_st=ic",
    iframeSrc: "https://maps.google.com/maps?q=12.0802514,75.2435982&z=15&output=embed",
  },

  // ---------- COPY ----------
  copy: {
    welcomeTitle: "Welcome",
    welcomeNote:
      "Two hearts, one beautiful journey, and a lifetime of togetherness.\n\nWe are delighted to welcome you to celebrate our special day and bless us as we begin our forever.",
    inviteLine:
      "Two hearts, one beautiful journey, and a lifetime of togetherness. We are delighted to welcome you to celebrate our special day and bless us as we begin our forever.",
    quote:
      "Two hearts, one beautiful journey, and a lifetime of togetherness.",
    closing:
      "We are delighted to welcome you to celebrate our special day and bless us as we begin our forever.",
    countdownSubtitle: "Counting down to our forever",
  },

  // ---------- ASSETS ----------
  assets: {
    music: "/audio/wedding.mp3",
  },

  // ---------- META ----------
  meta: {
    title: "Amal weds Reshmi",
    description:
      "Join us as Amal & Reshmi celebrate their wedding on 2 January 2027 at Nandhalala Auditorium, Kunhimangalam.",
    themeColor: "#5B6B3C",
    credit: "Made with ♥ for Amal & Reshmi",
  },
};

export type InviteConfig = typeof invite;
