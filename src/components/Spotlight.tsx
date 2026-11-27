import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      id="spotlight"
<<<<<<< HEAD
      className="spotlight fixed inset-0 pointer-events-none z-20 transition-opacity duration-300"
      style={{
        background: `radial-gradient(620px circle at var(--x, 50vw) var(--y, 50vh), var(--spotlight-color), transparent 78%)`,
=======
      className="spotlight fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--x, 100px) var(--y, 100px), rgba(99, 102, 241, 0.12), transparent 80%)`,
>>>>>>> 6bc85950e0fc565b895ccf783d132a834cf1d3ed
      }}
    />
  );
}
