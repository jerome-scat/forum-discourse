
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
      oscillationSpeed: number;
      oscillationDistance: number;
      oscillationX: number;
    }[] = [];
    
    // Vibrant colors for confetti like in the CodePen example
    const colors = [
      '#9b87f5', '#7E69AB', '#D946EF', '#D6BCFA', '#8B5CF6', '#E5DEFF', 
      '#FFDEE2', '#1EAEDB', '#33C3F0', '#0FA0CE'
    ];
    
    // Create particles
    const createParticles = () => {
      const particleCount = 150;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5 - canvas.height * 0.5, // Start above the screen
          size: Math.random() * 12 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 2,
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.2 - 0.1,
          oscillationSpeed: Math.random() * 0.1 + 0.05,
          oscillationDistance: Math.random() * 40 + 20,
          oscillationX: 0
        });
      }
    };
    
    // Update particle positions
    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update oscillation
        p.oscillationX += p.oscillationSpeed;
        const wiggle = Math.sin(p.oscillationX) * p.oscillationDistance;
        
        // Move with oscillation
        p.x += wiggle;
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        
        // Remove particles that are out of bounds
        if (p.y > canvas.height) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      // Create more particles if all are gone
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        
        // Draw rectangular confetti pieces like in the CodePen example
        ctx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
        
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
