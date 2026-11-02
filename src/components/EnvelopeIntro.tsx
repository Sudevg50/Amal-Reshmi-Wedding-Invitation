import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invite } from "../config/invite";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
}

export default function EnvelopeIntro({ isOpen, onOpen }: Props) {
  const handleTap = useCallback(() => {
    if (isOpen) return;
    try {
      const audio = new Audio(invite.assets.music);
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
      (window as any).__weddingAudio = audio;
    } catch (_) {}
    onOpen();
  }, [isOpen, onOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="envelope-intro"
          onClick={handleTap}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.96 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 9999,
            background: "#2C3818",
            backgroundImage: "radial-gradient(ellipse at 50% 30%, #46552B 0%, #1E2710 100%)",
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Main Card Shell - centered matching mobile invitation width */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "430px",
              height: "100dvh",
              maxHeight: "920px",
              boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 100px rgba(46,58,26,0.35)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Real envelope photo background */}
            <img
              src="/images/envelope-real.jpg"
              alt="Wedding Invitation Envelope"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                pointerEvents: "none",
              }}
            />

            {/* Subtle soft vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.18) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* 1. TOP LABEL: WEDDING INVITATION */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{
                position: "absolute",
                top: "min(20%, 155px)",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.45rem",
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#6D5438",
                }}
              >
                Wedding Invitation
              </p>
              <div
                style={{
                  width: "44px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #B8862F, transparent)",
                }}
              />
            </motion.div>

            {/* 2. DETAILS ON THE ENVELOPE: MONOGRAM A | R & DATE (Above the wax seal) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{
                position: "absolute",
                bottom: "calc(50% + min(46px, 11.5vw))",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                pointerEvents: "none",
              }}
            >
              {/* Monogram A | R */}
              <h1
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "clamp(1.4rem, 6.2vw, 2.05rem)",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.94)",
                  letterSpacing: "0.18em",
                  lineHeight: 1,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {invite.groom.initial}&nbsp;|&nbsp;{invite.bride.initial}
              </h1>

              {/* Gold rule */}
              <div
                style={{
                  width: "52px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(217,164,65,0.9), transparent)",
                  margin: "0.1rem 0",
                }}
              />

              {/* Event Date */}
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.85)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                {invite.event.date}
              </p>
            </motion.div>

            {/* 4. BOTTOM: INTERLOCKING RINGS + TAP TO OPEN */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                position: "absolute",
                bottom: "min(14%, 110px)",
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                pointerEvents: "none",
              }}
            >
              <svg width="34" height="17" viewBox="0 0 38 19" fill="none">
                <circle cx="12" cy="9.5" r="8" stroke="rgba(184,134,47,0.85)" strokeWidth="1.4" fill="none" />
                <circle cx="26" cy="9.5" r="8" stroke="rgba(184,134,47,0.85)" strokeWidth="1.4" fill="none" />
              </svg>

              <motion.p
                animate={{ opacity: [0.35, 0.95, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#6D5438",
                }}
              >
                Tap to Open
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
