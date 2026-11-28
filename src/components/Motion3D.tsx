import { ReactNode, useRef, MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareColor?: string;
  scaleOnHover?: number;
}

export function Tilt3DCard({
  children,
  className = '',
  maxTilt = 8,
  glareColor = 'rgba(255, 255, 255, 0.14)',
  scaleOnHover = 1.015,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 260, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glareBg = useMotionTemplate`radial-gradient(280px circle at ${glareX} ${glareY}, ${glareColor}, transparent 75%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.min(1, Math.max(0, x)));
    mouseY.set(Math.min(1, Math.max(0, y)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`relative will-change-transform ${className}`}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: glareBg }}
        />
        {children}
      </motion.div>
    </div>
  );
}

interface Reveal3DProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal3D({ children, delay = 0, className = '' }: Reveal3DProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 32, rotateX: 8, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: 'center top', transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TechCube3D() {
  return (
    <div className="cube-scene" aria-hidden="true" title="Interactive 3D Tech Cube">
      <div className="cube-3d">
        <div className="cube-face cube-front">AI</div>
        <div className="cube-face cube-back">LLM</div>
        <div className="cube-face cube-right">REACT</div>
        <div className="cube-face cube-left">NODE</div>
        <div className="cube-face cube-top">TS</div>
        <div className="cube-face cube-bottom">MERN</div>
      </div>
    </div>
  );
}
