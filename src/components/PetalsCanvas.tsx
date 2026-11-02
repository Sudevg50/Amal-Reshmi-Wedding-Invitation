import { useEffect, useRef } from "react";

interface Petal {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; rotation: number; rotationSpeed: number;
  type: "petal" | "sparkle"; hue: number;
}

export default function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let petals: Petal[] = [];
    const COUNT = 28;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function spawn(): Petal {
      const type = Math.random() > 0.6 ? "sparkle" : "petal";
      return {
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.4 + Math.random() * 0.8,
        size: type === "sparkle" ? 3 + Math.random() * 4 : 6 + Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        type,
        hue: Math.random() > 0.5 ? 42 : 340,
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }
    window.addEventListener("resize", resize);

    function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      if (p.type === "sparkle") {
        ctx.fillStyle = p.hue === 42 ? "#D9A441" : "#F9C8D8";
        ctx.font = `${p.size}px serif`;
        ctx.fillText("✦", -p.size/2, p.size/2);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size*0.5, p.size, 0, 0, Math.PI*2);
        const grad = ctx.createRadialGradient(0,0,0,0,0,p.size);
        grad.addColorStop(0, p.hue === 42 ? "rgba(217,164,65,0.9)" : "rgba(255,220,230,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p, i) => {
        p.x += p.vx + Math.sin(Date.now()*0.001 + i) * 0.2;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 30) {
          petals[i] = spawn();
        }
        drawPetal(ctx, p);
      });
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        pointerEvents:"none", zIndex:1,
      }}
    />
  );
}
