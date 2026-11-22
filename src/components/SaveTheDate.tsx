import { motion } from "framer-motion";
import { invite } from "../config/invite";

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

export default function SaveTheDate() {
  return (
    <section style={{
      background:"linear-gradient(180deg, #D4BF98 0%, #4A5A2E 100%)",
      padding:"5rem 1.5rem 4rem",
      display:"flex", flexDirection:"column", alignItems:"center",
    }}>
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.2 }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.5rem", maxWidth:"430px", width:"100%",
        }}
      >
        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/><span className="divider-star">✦</span><div className="divider-line"/>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily:"Cinzel, serif", fontSize:"clamp(0.85rem,3.5vw,1.1rem)", fontWeight:500,
          color:"#4A3524", letterSpacing:"0.12em", textTransform:"uppercase",
        }}>
          Save the Date
        </motion.h2>

        <motion.div variants={fadeUp} style={{
          background:"rgba(251,246,236,0.12)", backdropFilter:"blur(10px)",
          border:"1px solid rgba(184,134,47,0.35)", borderRadius:"20px",
          padding:"2.5rem 2rem", textAlign:"center", width:"100%",
        }}>
          <h3 style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1rem,4vw,1.3rem)", fontWeight:600,
            color:"#FBF6EC", letterSpacing:"0.08em", lineHeight:1.4,
          }}>
            {invite.groom.fullName} & {invite.bride.fullName}
          </h3>

          <div style={{
            width:"50px", height:"1px",
            background:"linear-gradient(90deg,transparent,#D9A441,transparent)",
            margin:"1rem auto",
          }}/>

          <p style={{
            fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
            fontSize:"0.95rem", color:"rgba(251,246,236,0.8)", lineHeight:1.7, marginBottom:"1.5rem",
          }}>
            {invite.copy.closing}
          </p>

          <p style={{
            fontFamily:"Cinzel, serif", fontSize:"clamp(1.8rem,7vw,2.5rem)", fontWeight:700,
            color:"#D9A441", letterSpacing:"0.12em",
          }}>
            {invite.event.dateShort}
          </p>

        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeUp} style={{
          width:"100%", paddingTop:"2rem",
          borderTop:"1px solid rgba(184,134,47,0.25)",
          textAlign:"center",
        }}>
          <p style={{
            fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
            fontSize:"1.05rem", fontWeight:400,
            letterSpacing:"0.04em", color:"rgba(251,246,236,0.85)",
          }}>
            Your presence is the greatest gift.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
