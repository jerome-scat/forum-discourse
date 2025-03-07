
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    // Colors for confetti
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                   '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    // Create particles
    const createParticles = () => {
      const particleCount = 200;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 15 + 5,
          angle: Math.random() * Math.PI * 2,
          rotation: 0,
          rotationSpeed: Math.random() * 0.2 - 0.1
        });
      }
    };
    
    // Update particle positions
    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 0.5; // Add gravity
        p.rotation += p.rotationSpeed;
        
        // Slow down particles
        p.speed *= 0.99;
        
        // Remove particles that are out of bounds or have stopped
        if (p.y > canvas.height || p.speed < 0.5) {
          particles.splice(i, 1);
          i--;
        }
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    };
    
    // Animation loop
    const animate = () => {
      updateParticles();
      drawParticles();
      
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    // Start animation
    createParticles();
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export default Confetti;
