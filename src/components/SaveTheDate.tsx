import { motion } from "framer-motion";
import { invite } from "../config/invite";

const fadeUp = {
  hidden: { opacity:0, y:24 },
  show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] as const } }
};

function generateICS() {
  const dtStart = invite.event.isoStart.replace(/[-:]/g,"").replace("+05:30","");
  const dtEnd   = invite.event.isoEnd.replace(/[-:]/g,"").replace("+05:30","");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${invite.groom.firstName}&${invite.bride.firstName} Wedding//EN`,
    "BEGIN:VEVENT",
    `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
    `DTEND;TZID=Asia/Kolkata:${dtEnd}`,
    `SUMMARY:${invite.groom.fullName} weds ${invite.bride.fullName}`,
    `LOCATION:${invite.venue.name}, ${invite.venue.address}`,
    `DESCRIPTION:${invite.copy.inviteLine}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Wedding tomorrow!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type:"text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invite.groom.firstName.toLowerCase()}-${invite.bride.firstName.toLowerCase()}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

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

          <button
            id="add-to-calendar-btn"
            onClick={generateICS}
            style={{
              marginTop:"1.5rem",
              fontFamily:"Raleway, sans-serif", fontSize:"0.65rem", fontWeight:600,
              letterSpacing:"0.2em", textTransform:"uppercase",
              background:"linear-gradient(135deg, #D9A441, #B8862F)",
              color:"white", border:"none", borderRadius:"999px",
              padding:"0.75rem 1.8rem", cursor:"pointer",
              boxShadow:"0 4px 20px rgba(184,134,47,0.4)",
              transition:"transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform="scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow="0 6px 28px rgba(184,134,47,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform="scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(184,134,47,0.4)";
            }}
          >
            Add to Calendar
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeUp} style={{
          width:"100%", paddingTop:"2rem",
          borderTop:"1px solid rgba(184,134,47,0.25)",
          textAlign:"center",
        }}>
          <p style={{
            fontFamily:"Cinzel, serif", fontSize:"0.75rem", fontWeight:500,
            letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(251,246,236,0.7)",
          }}>
            {invite.groom.fullName} &amp; {invite.bride.fullName} · Our Wedding
          </p>
          <p style={{
            fontFamily:"Raleway, sans-serif", fontSize:"0.5rem",
            letterSpacing:"0.2em", textTransform:"uppercase",
            color:"rgba(251,246,236,0.4)", marginTop:"0.5rem",
          }}>
            {invite.meta.credit}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
