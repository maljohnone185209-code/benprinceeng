import { useEffect, useRef } from "react";

const COLORS = { link: "#4d8dff", email: "#ff3ea5", price: "#ff9f2e", id: "#2fe08a", phone: "#c06bff" };
const RX = /(https?:\/\/[^\s]+)|([\w.\-]+@[\w.\-]+\.[a-z]{2,})|([₦$£€][\d,.]+)|(10\.\d{4,}\/[\w.\-]+)|(\+\d[\d ]{8,14}\d)/g;

type Hit = { type: keyof typeof COLORS; text: string; x: number; y: number; w: number; h: number };

export function LiveCrawler() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    let cancelled = false;
    let width = 0;
    let height = 0;
    let head = { x: 60, y: 90 };
    let target = { x: 60, y: 90 };
    let hits: Hit[] = [];
    let current = 0;
    const nodes: { x: number; y: number }[] = [];
    const marks: Hit[] = [];
    const pops: { hit: Hit; time: number }[] = [];
    const root = document.body;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const collect = () => {
      const found: Hit[] = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style,noscript,[data-live-crawler]")) continue;
        RX.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = RX.exec(node.nodeValue || ""))) {
          const range = document.createRange();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + match[0].length);
          const box = range.getBoundingClientRect();
          const type = match[2] ? "email" : match[3] ? "price" : match[4] ? "id" : match[5] ? "phone" : "link";
          if (box.width && box.height) found.push({ type, text: match[0], x: box.left + scrollX, y: box.top + scrollY, w: box.width, h: box.height });
        }
      }
      root.querySelectorAll("a[href]").forEach((anchor) => {
        if (anchor.closest("[data-live-crawler]")) return;
        const box = anchor.getBoundingClientRect();
        if (box.width && box.height && anchor.getAttribute("href")) found.push({ type: "link", text: anchor.getAttribute("href") || "", x: box.left + scrollX, y: box.top + scrollY, w: box.width, h: box.height });
      });
      return found.sort((a, b) => a.y - b.y || a.x - b.x);
    };

    const loop = async () => {
      while (!cancelled) {
        hits = collect(); current = 0; marks.length = 0; pops.length = 0;
        for (const hit of hits) {
          if (cancelled) return;
          target = { x: hit.x + hit.w / 2, y: hit.y + hit.h / 2 };
          window.scrollTo({ top: Math.max(0, hit.y - height * 0.4), behavior: "smooth" });
          await new Promise((resolve) => setTimeout(resolve, 700));
          marks.push(hit); pops.push({ hit, time: performance.now() }); current++;
          await new Promise((resolve) => setTimeout(resolve, 380));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }
    };

    const draw = (time: number) => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      const sx = scrollX; const sy = scrollY;
      head.x += (target.x - head.x) * 0.075 + Math.sin(time / 90);
      head.y += (target.y - head.y) * 0.075 + Math.cos(time / 70);
      if (frame % 4 === 0) { nodes.push({ x: head.x + (Math.random() - 0.5) * 30, y: head.y + (Math.random() - 0.5) * 30 }); if (nodes.length > 80) nodes.shift(); }
      marks.forEach((m) => { ctx.fillStyle = `${COLORS[m.type]}22`; ctx.strokeStyle = COLORS[m.type]; ctx.lineWidth = 1.5; ctx.fillRect(m.x - sx - 3, m.y - sy - 2, m.w + 6, m.h + 4); ctx.strokeRect(m.x - sx - 3, m.y - sy - 2, m.w + 6, m.h + 4); });
      ctx.strokeStyle = "rgba(255,62,165,.55)"; ctx.lineWidth = 1;
      nodes.forEach((n, i) => { for (let j = 1; j < 4 && i - j >= 0; j++) { ctx.beginPath(); ctx.moveTo(n.x - sx, n.y - sy); ctx.lineTo(nodes[i - j].x - sx, nodes[i - j].y - sy); ctx.stroke(); } });
      ctx.fillStyle = "#2fe08a"; nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n.x - sx, n.y - sy, 2.5, 0, Math.PI * 2); ctx.fill(); });
      const hx = head.x - sx; const hy = head.y - sy; const angle = Math.atan2(target.y - head.y, target.x - head.x);
      ctx.globalCompositeOperation = "lighter";
      hits.slice(current, current + 5).forEach((h, i) => { const x = h.x + h.w / 2 - sx; const y = h.y + h.h / 2 - sy; ctx.strokeStyle = COLORS[h.type]; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + x) / 2 + Math.sin(time / 200 + i) * 12, (hy + y) / 2, x, y); ctx.stroke(); ctx.setLineDash([4, 3]); ctx.strokeRect(h.x - sx - 3, h.y - sy - 2, h.w + 6, h.h + 4); ctx.setLineDash([]); });
      ctx.strokeStyle = "#2fe08a"; for (let i = 0; i < 9; i++) { const a = angle + (i - 4) * 0.28 + Math.sin(time / 260 + i * 2) * 0.2; const len = 48 + i * 11; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx + Math.cos(a + .2) * len * .55, hy + Math.sin(a + .2) * len * .55, hx + Math.cos(a) * len, hy + Math.sin(a) * len); ctx.stroke(); }
      ctx.font = "10px ui-monospace, monospace"; ctx.globalAlpha = .4; for (let i = 0; i < 8; i++) ctx.fillText(`${((frame + i) * 2654435761 >>> 0).toString(16).slice(0, 6)}`, hx + Math.cos(i) * (70 + i * 8), hy + Math.sin(i) * (70 + i * 8));
      ctx.globalAlpha = 1; ctx.shadowColor = "#2fe08a"; ctx.shadowBlur = 18; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(hx, hy, 4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      const now = performance.now(); ctx.font = "bold 20px ui-monospace, monospace"; pops.splice(0, pops.length, ...pops.filter((p) => now - p.time < 3000)); pops.forEach((p) => { const alpha = 1 - (now - p.time) / 3000; ctx.globalAlpha = alpha; ctx.fillStyle = "#00e5ff"; ctx.fillText(p.hit.text, Math.max(4, p.hit.x - sx), p.hit.y - sy + p.hit.h + 24); ctx.fillStyle = COLORS[p.hit.type]; ctx.fillText(p.hit.text, Math.max(4, p.hit.x - sx + 2), p.hit.y - sy + p.hit.h + 24); });
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; raf = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); loop(); raf = requestAnimationFrame(draw);
    return () => { cancelled = true; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" data-live-crawler style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }} />;
}
