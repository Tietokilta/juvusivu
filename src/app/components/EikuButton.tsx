"use client";
import { useRef } from "react";
import { Button } from "@components/basic/Button";

export const EikuButton = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const spawn = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    let x = r.left + r.width / 2,
      y = r.top + r.height / 2;
    const el = new Image();
    el.src = "/eiku_button.png";
    el.alt = "EIKU";
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:100px;transform:translate(-50%,-50%);pointer-events:none;z-index:50;`;
    document.body.appendChild(el);
    const vx = Math.random() * 400 - 200;
    let vy = -300 - Math.random() * 200;
    let rot = 0;
    const vr = Math.random() * 240 - 120;
    const g = 900;
    let t = performance.now();
    const step = (now: number) => {
      const dt = (now - t) / 1000;
      t = now;
      vy += g * dt;
      x += vx * dt;
      y += vy * dt;
      rot += vr * dt;
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = `translate(-50%,-50%) rotate(${rot}deg)`;
      if (y < innerHeight + 80) requestAnimationFrame(step);
      else el.remove();
    };
    requestAnimationFrame(step);
  };
  return (
    <div ref={ref} onClick={spawn} className="cursor-pointer select-none">
      <Button text={text} fake />
    </div>
  );
};
