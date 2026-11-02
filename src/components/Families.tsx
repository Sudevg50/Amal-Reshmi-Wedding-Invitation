import { motion } from "framer-motion";
import { invite } from "../config/invite";

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

function FamilyCard({ title, name, relation, parents, address }: {
  title: string; name: string; relation: string; parents: string; address: string;
}) {
  return (
    <div style={{
      background:"rgba(251,246,236,0.7)", backdropFilter:"blur(8px)",
      border:"1px solid rgba(184,134,47,0.25)", borderRadius:"14px",
      padding:"1.5rem", textAlign:"center", width:"100%",
    }}>
      <p style={{ fontFamily:"Raleway, sans-serif", fontSize:"0.5rem", fontWeight:600,
        letterSpacing:"0.25em", textTransform:"uppercase", color:"#7A6450", marginBottom:"0.5rem" }}>
        {title}
      </p>
      <h3 style={{ fontFamily:"Cinzel, serif", fontSize:"1.1rem", fontWeight:600, color:"#4A3524", letterSpacing:"0.06em" }}>
        {name}
      </h3>
      <p style={{ fontFamily:"Cormorant Garamond, serif", fontStyle:"italic", fontSize:"0.85rem", color:"#7A6450", marginTop:"0.4rem" }}>
        {relation}
      </p>
      <div style={{ width:"30px", height:"1px", background:"linear-gradient(90deg,transparent,#B8862F,transparent)", margin:"0.7rem auto" }}/>
      <p style={{ fontFamily:"Raleway, sans-serif", fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#7A6450", lineHeight:1.8 }}>
        {parents}{address ? <><br/>{address}</> : null}
      </p>
    </div>
  );
}

export default function Families() {
  return (
    <section style={{
      background:"linear-gradient(180deg, rgba(232,216,191,0.92) 0%, rgba(226,208,178,0.92) 100%)",
      padding:"5rem 1.5rem",
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
          color:"#4A3524", letterSpacing:"0.12em", textTransform:"uppercase", textAlign:"center",
        }}>
          With the Blessings of Our Families
        </motion.h2>

        {/* Welcome Note */}
        <motion.p variants={fadeUp} style={{
          fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
          fontSize:"1.05rem", color:"#4A3524", textAlign:"center",
          lineHeight:1.8, maxWidth:"360px", whiteSpace:"pre-line",
        }}>
          {invite.copy.welcomeNote}
        </motion.p>

        <motion.div variants={fadeUp} style={{ width:"100%" }}>
          <FamilyCard
            title="Groom"
            name={invite.groom.fullName}
            relation={invite.groom.sonOf}
            parents={`${invite.groom.father} & ${invite.groom.mother}`}
            address={invite.groom.address}
          />
        </motion.div>

        <motion.div variants={fadeUp} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <div style={{ width:"40px", height:"1px", background:"linear-gradient(90deg,transparent,#B8862F)" }}/>
          <span style={{ fontFamily:"Cinzel, serif", color:"#B8862F", fontSize:"1.2rem" }}>✿</span>
          <div style={{ width:"40px", height:"1px", background:"linear-gradient(270deg,transparent,#B8862F)" }}/>
        </motion.div>

        <motion.div variants={fadeUp} style={{ width:"100%" }}>
          <FamilyCard
            title="Bride"
            name={invite.bride.fullName}
            relation={invite.bride.daughterOf}
            parents={`${invite.bride.father} & ${invite.bride.mother}`}
            address={invite.bride.address}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
