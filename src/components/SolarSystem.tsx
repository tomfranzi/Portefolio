import { useEffect, useRef } from 'react';

type SolarSystemProps = {
  focus: number;
  onFocusChange: (index: number) => void;
};

const domains = [
  { label: 'RÉSEAUX', name: 'Réseaux', color: '#c6f277', period: 240, phase: -0.55, radius: 0.65, inclination: -0.12 },
  { label: 'CYBER', name: 'Cybersécurité', color: '#92e4ce', period: 310, phase: 2.52, radius: 0.84, inclination: 0.18 },
  { label: 'CODE', name: 'Développement', color: '#b7caff', period: 390, phase: 3.82, radius: 1.02, inclination: -0.2 },
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
  const cameraRef = useRef({ yaw: -0.25, pitch: -0.62, targetYaw: -0.25, targetPitch: -0.62, dragging: false, lastX: 0, lastY: 0, needsPaint: true });

  useEffect(() => { focusRef.current = focus; cameraRef.current.needsPaint = true; }, [focus]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!stage || !canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = performance.now();
    const started = lastFrame;
    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      cameraRef.current.needsPaint = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    const render = (now: number) => {
      if (!width || !height) { frame = requestAnimationFrame(render); return; }
      const dt = Math.min(now - lastFrame, 80);
      lastFrame = now;
      const camera = cameraRef.current;
      const easing = 1 - Math.exp(-dt / 90);
      if (Math.abs(camera.targetYaw - camera.yaw) + Math.abs(camera.targetPitch - camera.pitch) > 0.0001) {
        camera.yaw += (camera.targetYaw - camera.yaw) * easing;
        camera.pitch += (camera.targetPitch - camera.pitch) * easing;
        camera.needsPaint = true;
      }
      const cx = width / 2;
      const cy = height * 0.52;
      const radius = Math.min(width * 0.36, height * 0.42, 180);
      const perspective = 650;
      const cosYaw = Math.cos(camera.yaw);
      const sinYaw = Math.sin(camera.yaw);
      const cosPitch = Math.cos(camera.pitch);
      const sinPitch = Math.sin(camera.pitch);
      const project = (point: Point3): Projected => {
        const x = point.x * cosYaw + point.z * sinYaw;
        const z = -point.x * sinYaw + point.z * cosYaw;
        const y = point.y * cosPitch - z * sinPitch;
        const depth = point.y * sinPitch + z * cosPitch;
        const scale = perspective / (perspective - depth);
        return { x: cx + x * scale, y: cy + y * scale, depth, scale };
      };

      // The background and orbital paths are static until the camera or selection moves.
      if (camera.needsPaint) {
        camera.needsPaint = false;
        context.clearRect(0, 0, width, height);
        const atmosphere = context.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.65);
        atmosphere.addColorStop(0, '#c6f27732');
        atmosphere.addColorStop(0.42, '#8bc55b0f');
        atmosphere.addColorStop(1, '#8bc55b00');
        context.fillStyle = atmosphere;
        context.fillRect(0, 0, width, height);

        const drawOrbit = (index: number, front: boolean) => {
          const domain = domains[index];
          const orbitalRadius = radius * domain.radius;
          const segments = 120;
          let drawing = false;
          context.beginPath();
          for (let step = 0; step < segments; step++) {
            const a = project(orbitPoint(orbitalRadius, step * Math.PI * 2 / segments, domain.inclination));
            const b = project(orbitPoint(orbitalRadius, (step + 1) * Math.PI * 2 / segments, domain.inclination));
            if (((a.depth + b.depth) / 2 >= 0) !== front) {
              drawing = false;
              continue;
            }
            if (!drawing) context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            drawing = true;
          }
          context.lineWidth = focusRef.current === index ? 1.7 : 1.15;
          context.strokeStyle = domain.color + (front ? (focusRef.current === index ? 'cc' : '8a') : '3d');
          context.stroke();
        };
        domains.forEach((_, index) => drawOrbit(index, false));
        domains.forEach((_, index) => drawOrbit(index, true));
      }

      const elapsed = (now - started) / 1000;
      domains.forEach((domain, index) => {
        const angle = domain.phase + elapsed * Math.PI * 2 / domain.period;
        const point = project(orbitPoint(radius * domain.radius, angle, domain.inclination));
        const card = cardRefs.current[index];
        if (!card) return;
        const scale = Math.max(0.88, Math.min(1.1, point.scale));
        card.style.transform = `translate3d(${point.x.toFixed(2)}px,${point.y.toFixed(2)}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`;
        const layer = point.depth >= 0 ? '7' : '3';
        if (card.style.zIndex !== layer) card.style.zIndex = layer;
      });
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
