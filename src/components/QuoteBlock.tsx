import { motion } from "framer-motion";
import { invite } from "../config/invite";

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

export default function QuoteBlock() {
  return (
    <section style={{
      background:"linear-gradient(180deg, #DCC8A5 0%, #D4BF98 100%)",
      padding:"5rem 1.5rem",
      display:"flex", flexDirection:"column", alignItems:"center",
    }}>
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.3 }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center",
          gap:"1.5rem", maxWidth:"380px", width:"100%",
        }}
      >
        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/><span className="divider-star">✦</span><div className="divider-line"/>
        </motion.div>

        <motion.h2 variants={fadeUp} style={{
          fontFamily:"Cinzel, serif", fontSize:"clamp(0.85rem,3.5vw,1.1rem)", fontWeight:500,
          color:"#4A3524", letterSpacing:"0.12em", textTransform:"uppercase",
        }}>
          Our Beautiful Beginning
        </motion.h2>

        <motion.div variants={fadeUp} style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"Cinzel, serif", fontSize:"3rem", color:"#B8862F", lineHeight:0.5, display:"block", opacity:0.5 }}>"</span>
          <p style={{
            fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
            fontSize:"clamp(1.2rem,4.5vw,1.5rem)", color:"#4A3524",
            lineHeight:1.7, textAlign:"center",
          }}>
            {invite.copy.quote}
          </p>
          <span style={{ fontFamily:"Cinzel, serif", fontSize:"3rem", color:"#B8862F", lineHeight:0.5, display:"block", opacity:0.5, textAlign:"right" }}>"</span>
        </motion.div>

        <motion.div variants={fadeUp} className="divider">
          <div className="divider-line"/><span className="divider-star">✦</span><div className="divider-line"/>
        </motion.div>
      </motion.div>
    </section>
  );
}
