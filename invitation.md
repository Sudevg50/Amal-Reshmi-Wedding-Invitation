You are a senior front-end engineer and motion designer. Build a mobile-first, single-page animated WEDDING INVITATION web card (Kerala Hindu wedding, ivory + olive-green + gold theme). It must be pixel-polished, buttery-smooth and feel like a premium digital invitation. Plan first, then implement, then verify in the browser (mobile viewport 390×844 AND desktop) and fix anything broken.

## TECH STACK
- Vite + React + TypeScript, Tailwind CSS, Framer Motion (animations), no backend.
- Fonts (Google Fonts): "Cinzel" (names, headings), "Cormorant Garamond" italic (body/quotes), "Raleway" (tiny uppercase labels, letter-spacing 0.25em+).
- All content lives in ONE config file `src/config/invite.ts` so I can swap details later (names, parents, dates, venue, map link, music, images).

## CONTENT (default data, put in config)
- Groom: Amal Gopal K — S/O Mr. Rabulan K (Late) & Mrs. Beena M.K, Madhaveeyam, Kallai, Kozhikode
- Bride: Binila A — D/O Mr. A. Prabhakaran & Mrs. T. Jisha (Late), Sreekrishna House, Unniyalungal, Farook College, Kozhikode
- Date: Sunday, 25 October 2026 · 9:00 – 10:00 AM · "Muhurtham · 1202 Thulam 8"
- Venue: Mangalya Auditorium, 8/4, Feroke Chungam, Kozhikode (+ lat/lng and Google Maps link in config)
- Monogram: "A | B" (initials separated by a thin vertical line)
- Invite line: "We cordially invite your esteemed presence, with family, on the auspicious occasion of the marriage of our son Amal Gopal K with Binila A."
- Quote: "One celebration. One beautiful moment. A lifetime of memories to come."
- Closing: "We look forward to celebrating this beautiful beginning with you."
- Footer: "AMAL & BINILA · OUR WEDDING"

## DESIGN TOKENS
- Envelope green: #5B6B3C → #4A5A2E (subtle paper-grain/noise texture overlay, soft vignette)
- Ivory: #FBF6EC / cream #F4EBDD
- Gold: #B8862F (text accents), gold wax seal gradient #D9A441 → #9C6B1E with heart emboss
- Text dark brown: #4A3524; muted brown #7A6450
- Cards (countdown boxes): frosted glass, rgba(255,255,255,0.35), backdrop-blur, 1px gold-tinted border, radius 14px
- Tiny ornament: gold 4-point star "✦" flanked by thin gold gradient lines as section dividers
- Everything centered, max-width 430px container on desktop (centered with soft ivory background around it), full-bleed on mobile.

## SCREEN FLOW

### 1) ENVELOPE INTRO (full-screen, 100dvh)
- Olive-green paper envelope with textured grain. Top label "WEDDING INVITATION" (tiny, letter-spaced, white 80%).
- Triangular flap with a circular gold wax seal with a heart in the centre (slight 3D shadow, gentle pulse/glow loop).
- Lower area: large serif monogram "A | B" in white, a short gold line beneath, then "25 OCTOBER 2026" in letter-spaced caps.
- Bottom: "TAP TO OPEN" blinking softly.
- On tap: seal fades/scales out → flap rotates open (rotateX, transform-origin top, ~900ms) → the ivory floral card slides UP out of the envelope (shows the arch with flowers peeking from the pocket) → envelope slides/fades down while the card scales to full-screen → transitions into the hero. Total ≈ 2.5s with easing (cubic-bezier(.22,1,.36,1)).
- Tapping also starts background music (user gesture required by browsers).

### 2) HERO (full-screen scroll section)
- Background: watercolour-style illustration — ivory arch with climbing jasmine/white flowers & greenery framing the top corners, soft marble pillars on both sides, curved staircase with flower garland on the right, brass traditional lamps (nilavilakku) at the bottom, and a Kerala couple walking hand in hand (groom in white mundu & shirt, bride in cream-gold kasavu saree).
- Top: small gold "ॐ" symbol. Then:
  "AMAL GOPAL K" (Cinzel, large, dark brown), parents line under it in small italic;
  a small gold ampersand "&" ornament between;
  "BINILA A" with her parents line.
- Bottom center: "SCROLL" tiny label with 3 stacked chevrons animating downward in a loop.
- Entrance animation: names fade-up with stagger (0.15s), flowers gently sway (slow ±1.5° rotation loop), subtle parallax on scroll.

### 3) DETAILS SCREEN (same arch illustration continues, lighter/blurred, staircase visible)
- Small pill label "WEDDING", then two interlocking gold rings icon (line art).
- "SUNDAY, 25 OCTOBER 2026" (Cinzel, gold-brown), "9:00 – 10:00 AM" in gold.
- "MUHURTHAM · 1202 THULAM 8" in tiny caps.
- Divider (✦), label "VENUE", "MANGALYA AUDITORIUM" (Cinzel), address in tiny caps, and an outlined pill button "↗ DIRECTIONS" (opens Google Maps).

### 4) CONTENT SECTIONS (background becomes a heavily faded ivory overlay over a blurred couple photo/illustration, parallax fixed). Each section separated by the ✦ divider and revealed with fade-up on scroll (IntersectionObserver / whileInView):
  a) COUNTING DOWN TO OUR SPECIAL DAY — italic subtitle "Every moment brings us closer" — 4 frosted glass boxes: DAYS / HRS / MIN / SEC, live countdown to the event datetime (Asia/Kolkata), numbers in gold Cinzel; animate number flip/slide on change.
  b) WITH LOVE AND JOY — the invitation paragraph (italic Cormorant, centered, line-height 1.8).
  c) WITH THE BLESSINGS OF OUR FAMILIES — groom name + parents + address, small "✿" ornament, bride name + parents + address.
  d) VENUE — "MANGALYA AUDITORIUM", address, then a map card (use an embedded Google Map iframe or Leaflet/OSM tile with a gold pin marker) with a white floating info card overlay: venue name + address + gold "View Location" button.
  e) OUR BEAUTIFUL BEGINNING — the quote in large italic.
  f) SAVE THE DATE — "AMAL GOPAL K & BINILA A" (Cinzel), closing line in italic, big gold "25 · 10 · 2026", pill button "ADD TO CALENDAR" (generate and download an .ics file with title, location, 9:00–10:00 AM IST, and a reminder).
  g) Footer: thin line, "AMAL & BINILA · OUR WEDDING", and "CREATED WITH …" credit in tiny caps (make credit text configurable).

## GLOBAL FEATURES
- Floating circular music button (bottom-right, dark translucent, ♪ icon) — toggles background instrumental audio (use `/public/audio/wedding.mp3` placeholder; loop; show muted/playing state with animated equalizer bars). Respect autoplay policy.
- Smooth scrolling, scroll-snap for the first 3 screens, then free scroll.
- Subtle falling petals / golden sparkles canvas layer on hero (low-density, 60fps, disable if prefers-reduced-motion).
- Fully responsive, safe-area aware (env(safe-area-inset-*)), no horizontal overflow, 100dvh for iOS.
- Respect `prefers-reduced-motion`.
- Open Graph meta tags + title "Amal Gopal K weds Binila A", favicon, and theme-color.
- Lighthouse performance ≥ 90: lazy-load images, use WebP/AVIF, preload fonts.

## ASSETS
- Generate/placeholder the illustrations as separate layers in `/public/images/`: `arch-florals.webp` (transparent PNG/WebP, florals + pillars), `staircase-bg.webp`, `couple.webp` (transparent), `lamps.webp`, `paper-texture.webp`. If you cannot generate them, use high-quality placeholders / inline SVG + CSS gradients and leave clear `TODO: replace asset` comments and a `ASSETS.md` listing exact sizes and filenames I should drop in.
- Wax seal, rings, ✦ ornaments and chevrons as inline SVG.

## DELIVERABLES & VERIFICATION
1. Project structure with components: `EnvelopeIntro`, `Hero`, `Details`, `Countdown`, `Families`, `VenueMap`, `QuoteBlock`, `SaveTheDate`, `MusicToggle`, `PetalsCanvas`.
2. `README.md` with run/build/deploy (Vercel/Netlify) steps and how to edit `invite.ts`.
3. Use the browser tool to open the dev server, test at 390×844 and 1440×900, record a short walkthrough of: tap-to-open animation → hero → scroll through all sections → countdown ticking → Add to Calendar download → music toggle. Fix any visual glitches, overflow, or jank before finishing.