import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { invite } from "../config/invite";

function getTimeLeft() {
  const target = new Date(invite.event.isoStart).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
}

function CountBox({ label, value }: { label: string; value: number }) {
  const prevRef = useRef(value);
  const changed = prevRef.current !== value;
  prevRef.current = value;

  return (
    <div
      className="frosted-card"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "1rem 0.5rem",
        minWidth: "70px", flex: 1,
      }}
    >
      <motion.span
        key={value}
        initial={changed ? { y: -10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22,1,0.36,1] as const }}
        style={{
          fontFamily:"Cinzel, serif", fontSize:"clamp(1.6rem,6vw,2.2rem)", fontWeight:700,
          color:"#B8862F", lineHeight:1, display:"block",
        }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span style={{
        fontFamily:"Raleway, sans-serif", fontSize:"0.5rem", fontWeight:600,
        letterSpacing:"0.2em", textTransform:"uppercase", color:"#7A6450",
        marginTop:"0.4rem",
      }}>
        {label}
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const entries = [
    { label:"Days", value:time.days },
    { label:"Hrs",  value:time.hrs },
    { label:"Min",  value:time.min },
    { label:"Sec",  value:time.sec },
  ];

  return (
    <section style={{
      background:"linear-gradient(180deg, rgba(237,224,204,0.88) 0%, rgba(232,216,191,0.92) 100%)",
      padding:"5rem 1.5rem",
      display:"flex", flexDirection:"column", alignItems:"center",
    }}>
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.3 }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.5rem", maxWidth:"430px", width:"100%",
        }}
      >
        {/* Divider */}
        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/><span className="divider-star">✦</span><div className="divider-line"/>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily:"Cinzel, serif", fontSize:"clamp(0.85rem,3.5vw,1.1rem)", fontWeight:500,
          color:"#4A3524", letterSpacing:"0.12em", textTransform:"uppercase", textAlign:"center",
        }}>
          Counting Down to Our Special Day
        </motion.h2>
        <motion.p variants={fadeUp} style={{
          fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
          fontSize:"1rem", color:"#7A6450", textAlign:"center",
        }}>
          {invite.copy.countdownSubtitle}
        </motion.p>

        {/* Boxes */}
        <motion.div variants={fadeUp} style={{ display:"flex", gap:"0.75rem", width:"100%" }}>
          {entries.map(e => <CountBox key={e.label} label={e.label} value={e.value} />)}
        </motion.div>
      </motion.div>
    </section>
  );
}
