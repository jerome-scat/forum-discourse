
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetti[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        const scale = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Clear any previous confetti
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    confettiRef.current = [];
    lastTimeRef.current = Date.now();
    
    // Create confetti pieces
    createConfetti();
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);
  
  const createConfetti = () => {
    if (!canvasRef.current) return;
    
    const colors = [
      "#9b87f5", "#7E69AB", "#D946EF", "#D6BCFA", "#8B5CF6", "#E5DEFF", 
      "#FFDEE2", "#1EAEDB", "#33C3F0", "#0FA0CE"
    ];
    
    const count = 250;
    const canvas = canvasRef.current;
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confettiRef.current.push(new ConfettiPiece({
        x, 
        y, 
        color, 
        width: Math.random() * 10 + 5,
        height: Math.random() * 4 + 2
      }));
    }
  };
  
  const animate = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const now = Date.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw confetti
    confettiRef.current = confettiRef.current.filter(confetti => {
      confetti.update(delta / 16);
      confetti.draw(ctx);
      return confetti.y < canvas.height + 100;
    });
    
    // Continue animation if there's still confetti
    if (confettiRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
  if (!isActive) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// ConfettiPiece class represents a single confetti particle
class ConfettiPiece {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  velocity: { x: number; y: number };
  gravity: number;
  oscillationAmplitude: number;
  oscillationX: number;
  wobble: number;
  wobbleSpeed: number;
  
  constructor({ x, y, color, width, height }: { 
    x: number; 
    y: number; 
    color: string; 
    width: number; 
    height: number; 
  }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.velocity = {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 + 2
    };
    this.gravity = 0.1;
    this.oscillationAmplitude = Math.random() * 2;
    this.oscillationX = 0;
    this.wobble = 0;
    this.wobbleSpeed = Math.random() * 0.1;
  }
  
  update(deltaTime: number) {
    // Apply gravity
    this.velocity.y += this.gravity * deltaTime;
    
    // Update position
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
    
    // Apply rotation
    this.rotation += this.rotationSpeed * deltaTime;
    
    // Apply horizontal oscillation
    this.wobble += this.wobbleSpeed * deltaTime;
    this.oscillationX = Math.sin(this.wobble) * this.oscillationAmplitude;
    this.x += this.oscillationX;
    
    // Slow down over time
    this.velocity.x *= 0.99;
    this.rotationSpeed *= 0.99;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    const scale = window.devicePixelRatio || 1;
    ctx.save();
    
    // Translate to the center of the confetti piece
    ctx.translate((this.x + this.oscillationX) * scale, this.y * scale);
    
    // Rotate
    ctx.rotate(this.rotation * Math.PI / 180);
    
    // Draw the confetti piece
    ctx.fillStyle = this.color;
    ctx.fillRect(
      -this.width * scale / 2, 
      -this.height * scale / 2, 
      this.width * scale, 
      this.height * scale
    );
    
    ctx.restore();
  }
}

export default Confetti;
