import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invite } from "../config/invite";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if audio was started by envelope tap
    const globalAudio = (window as any).__weddingAudio as HTMLAudioElement | undefined;
    if (globalAudio) {
      audioRef.current = globalAudio;
      setPlaying(!globalAudio.paused);
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio(invite.assets.music);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
      (window as any).__weddingAudio = audio;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.button
      id="music-toggle-btn"
      onClick={toggle}
      initial={{ scale:0, opacity:0 }}
      animate={{ scale:1, opacity:1 }}
      transition={{ delay:1.2, duration:0.4, type:"spring" }}
      whileHover={{ scale:1.08 }}
      whileTap={{ scale:0.95 }}
      title={playing ? "Pause music" : "Play music"}
      style={{
        position:"fixed", bottom:"1.5rem", right:"1.5rem", zIndex:9000,
        width:"48px", height:"48px", borderRadius:"50%",
        background:"rgba(74,53,36,0.85)", backdropFilter:"blur(10px)",
        border:"1px solid rgba(184,134,47,0.4)",
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", boxShadow:"0 4px 20px rgba(0,0,0,0.3)",
        color:"white",
      }}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.span key="eq" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ display:"flex", gap:"2px", alignItems:"flex-end", height:"16px" }}>
            {[1,1.4,0.8,1.2,1].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scaleY:[h, h*0.4, h, h*0.6, h] }}
                transition={{ repeat:Infinity, duration:0.7+i*0.12, ease:"easeInOut" }}
                style={{
                  display:"inline-block", width:"2px", height:"12px", background:"#D9A441",
                  borderRadius:"1px", transformOrigin:"bottom",
                }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span key="note" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ fontSize:"1.1rem" }}>♪</motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
