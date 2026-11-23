import { useEffect, useRef } from 'react';

type SolarSystemProps = {
  focus: number;
  onFocusChange: (index: number) => void;
};

const domains = [
  { label: 'RÉSEAUX', name: 'Réseaux', color: '#c6f277', period: 240, phase: -0.55, radius: 0.49, inclination: -0.12 },
  { label: 'CYBER', name: 'Cybersécurité', color: '#92e4ce', period: 310, phase: 2.52, radius: 0.72, inclination: 0.18 },
  { label: 'CODE', name: 'Développement', color: '#b7caff', period: 390, phase: 4.65, radius: 0.94, inclination: -0.2 },
];

type Point3 = { x: number; y: number; z: number };
type Projected = { x: number; y: number; depth: number; scale: number };

function orbitPoint(radius: number, angle: number, inclination: number): Point3 {
  const x = Math.cos(angle) * radius;
  const plane = Math.sin(angle) * radius;
  return { x, y: plane * Math.sin(inclination), z: plane * Math.cos(inclination) };
}

export function SolarSystem({ focus, onFocusChange }: SolarSystemProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusRef = useRef(focus);
  const cameraRef = useRef({ yaw: -0.25, pitch: -0.62, targetYaw: -0.25, targetPitch: -0.62, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => { focusRef.current = focus; }, [focus]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!stage || !canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const started = performance.now();
    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    const render = (now: number) => {
      if (!width || !height) { frame = requestAnimationFrame(render); return; }
      const camera = cameraRef.current;
      camera.yaw += (camera.targetYaw - camera.yaw) * 0.08;
      camera.pitch += (camera.targetPitch - camera.pitch) * 0.08;
      const cx = width / 2;
      const cy = height * 0.52;
      const radius = Math.min(width * 0.44, height * 0.45, 205);
      const perspective = 650;
      const project = (point: Point3): Projected => {
        const x = point.x * Math.cos(camera.yaw) + point.z * Math.sin(camera.yaw);
        const z = -point.x * Math.sin(camera.yaw) + point.z * Math.cos(camera.yaw);
        const y = point.y * Math.cos(camera.pitch) - z * Math.sin(camera.pitch);
        const depth = point.y * Math.sin(camera.pitch) + z * Math.cos(camera.pitch);
        const scale = perspective / (perspective - depth);
        return { x: cx + x * scale, y: cy + y * scale, depth, scale };
      };

      context.clearRect(0, 0, width, height);
      const atmosphere = context.createRadialGradient(cx, cy, 12, cx, cy, radius * 1.45);
      atmosphere.addColorStop(0, '#c6f27735');
      atmosphere.addColorStop(0.42, '#8bc55b12');
      atmosphere.addColorStop(1, '#8bc55b00');
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);

      // Draw the distant halves first so the sun and close planets occlude them.
      const drawOrbit = (index: number, front: boolean) => {
        const domain = domains[index];
        const orbitalRadius = radius * domain.radius;
        context.lineWidth = focusRef.current === index ? 1.45 : 1;
        for (let step = 0; step < 150; step++) {
          const start = project(orbitPoint(orbitalRadius, step * Math.PI * 2 / 150, domain.inclination));
          const end = project(orbitPoint(orbitalRadius, (step + 1) * Math.PI * 2 / 150, domain.inclination));
          if (((start.depth + end.depth) / 2 >= 0) !== front) continue;
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.strokeStyle = domain.color + (front ? (focusRef.current === index ? 'bb' : '66') : '34');
          context.stroke();
        }
      };
      domains.forEach((_, index) => drawOrbit(index, false));

      const elapsed = (now - started) / 1000;
      const planets = domains.map((domain, index) => {
        const angle = domain.phase + elapsed * Math.PI * 2 / domain.period;
        const point = project(orbitPoint(radius * domain.radius, angle, domain.inclination));
        return { domain, index, point };
      });

      const drawPlanets = (front: boolean) => planets.filter(({ point }) => (point.depth >= 0) === front).sort((a, b) => a.point.depth - b.point.depth).forEach(({ domain, index, point }) => {
        const size = (focusRef.current === index ? 12 : 9) * point.scale;
        const shade = context.createRadialGradient(point.x - size * 0.35, point.y - size * 0.4, 1, point.x, point.y, size);
        shade.addColorStop(0, '#ffffff');
        shade.addColorStop(0.28, domain.color);
        shade.addColorStop(0.76, domain.color + 'c0');
        shade.addColorStop(1, '#14201e');
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fillStyle = shade;
        context.shadowColor = domain.color;
        context.shadowBlur = focusRef.current === index ? 22 : 13;
        context.fill();
        context.shadowBlur = 0;

        const card = cardRefs.current[index];
        if (card) {
          const dx = point.x - cx;
          const dy = point.y - cy;
          const distance = Math.max(1, Math.hypot(dx, dy));
          card.style.left = Math.max(44, Math.min(width - 44, point.x + dx / distance * 24)) + 'px';
          card.style.top = Math.max(24, Math.min(height - 24, point.y + dy / distance * 26)) + 'px';
          card.style.zIndex = point.depth >= 0 ? '7' : '3';
        }
      });
      drawPlanets(false);

      const glow = context.createRadialGradient(cx, cy, radius * 0.12, cx, cy, radius * 0.75);
      glow.addColorStop(0, '#c6f2777a');
      glow.addColorStop(0.55, '#a9e96422');
      glow.addColorStop(1, '#a9e96400');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(cx, cy, radius * 0.75, 0, Math.PI * 2);
      context.fill();

      const sunRadius = radius * 0.39;
      const sun = context.createRadialGradient(cx - sunRadius * 0.4, cy - sunRadius * 0.48, sunRadius * 0.04, cx + sunRadius * 0.17, cy + sunRadius * 0.18, sunRadius * 1.25);
      sun.addColorStop(0, '#f9ffdf');
      sun.addColorStop(0.28, '#dbfa94');
      sun.addColorStop(0.7, '#a9dd65');
      sun.addColorStop(1, '#375d3b');
      context.beginPath();
      context.arc(cx, cy, sunRadius, 0, Math.PI * 2);
      context.fillStyle = sun;
      context.shadowColor = '#c6f277';
      context.shadowBlur = 25;
      context.fill();
      context.shadowBlur = 0;
      context.strokeStyle = '#eaffb977';
      context.lineWidth = 1;
      context.stroke();

      domains.forEach((_, index) => drawOrbit(index, true));
      drawPlanets(true);

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    const camera = cameraRef.current;
    camera.dragging = true;
    camera.lastX = event.clientX;
    camera.lastY = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const camera = cameraRef.current;
    if (!camera.dragging) return;
    camera.targetYaw += (event.clientX - camera.lastX) * 0.007;
    camera.targetPitch = Math.max(-1.15, Math.min(-0.2, camera.targetPitch + (event.clientY - camera.lastY) * 0.006));
    camera.lastX = event.clientX;
    camera.lastY = event.clientY;
  };
  const onPointerUp = () => { cameraRef.current.dragging = false; };

  return (
    <div className="solar-stage" ref={stageRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-label="Système solaire interactif des domaines">
      <canvas ref={canvasRef} aria-hidden="true" />
      <button type="button" className="solar-signature" onClick={() => onFocusChange((focus + 1) % domains.length)} aria-label="Explorer le domaine suivant">
        <span className="signature-script">Tom</span><span className="signature-surname">FRANZI</span>
      </button>
      {domains.map((domain, index) => (
        <button type="button" key={domain.label} ref={(node) => { cardRefs.current[index] = node; }} className={'solar-card ' + (focus === index ? 'selected' : '')} style={{ '--planet-color': domain.color } as React.CSSProperties} aria-pressed={focus === index} onClick={() => onFocusChange(index)}>
          <span className="solar-card-index">0{index + 1} / DOMAINE</span><strong>{domain.label}</strong>
        </button>
      ))}
      <span className="solar-hint" aria-hidden="true">GLISSEZ POUR EXPLORER EN 3D</span>
    </div>
  );
}
