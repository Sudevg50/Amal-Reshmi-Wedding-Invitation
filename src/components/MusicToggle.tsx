import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioManager } from "../utils/audio";

export default function MusicToggle() {
  const [playing, setPlaying] = useState<boolean>(() => audioManager.getIsPlaying());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((isPlaying) => {
      setPlaying(isPlaying);
    });
    return unsubscribe;
  }, []);

  const toggle = () => {
    audioManager.toggle();
  };

  return (
    <motion.button
      id="music-toggle-btn"
      onClick={toggle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      title={playing ? "Mute music" : "Play music"}
      aria-label={playing ? "Mute music" : "Play music"}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9000,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "rgba(44, 32, 22, 0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1.5px solid rgba(184, 134, 47, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(184, 134, 47, 0.2)",
        color: "white",
        outline: "none",
        padding: 0,
      }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span
            key="eq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              gap: "2.5px",
              alignItems: "flex-end",
              height: "16px",
              paddingBottom: "1px",
            }}
          >
            {[1, 1.4, 0.7, 1.3, 0.9].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [h, h * 0.35, h * 1.1, h * 0.5, h] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.75 + i * 0.12,
                  ease: "easeInOut",
                }}
                style={{
                  display: "inline-block",
                  width: "2.5px",
                  height: "14px",
                  background: "linear-gradient(180deg, #F5D78E 0%, #B8862F 100%)",
                  borderRadius: "1.5px",
                  transformOrigin: "bottom",
                }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.div
            key="muted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              width: "24px",
              height: "24px",
            }}
          >
            <span
              style={{
                fontSize: "1.25rem",
                color: "#C4A67B",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              ♪
            </span>
            {/* Elegant diagonal mute strike */}
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "2px",
                background: "#E57373",
                transform: "rotate(-45deg)",
                borderRadius: "1px",
                boxShadow: "0 0 3px rgba(0,0,0,0.6)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
