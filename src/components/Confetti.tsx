
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

// Define ConfettiPiece class to represent a single confetti piece
class ConfettiPiece {
  x: number;
  y: number;
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  gravity: number;
  oscillationAmplitude: number;
  oscillationX: number;
  wobble: number;
  wobbleSpeed: number;
  
  constructor({ x, y }: { x: number; y: number; }) {
    this.x = x;
    this.y = y;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.width = Math.random() * 10 + 5;
    this.height = Math.random() * 10 + 5;
    this.color = this.getRandomColor();
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
  
  getRandomColor() {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39', 
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
    
    // Set fill color
    ctx.fillStyle = this.color;
    
    // Draw the confetti rectangle
    ctx.fillRect(
      -this.width * scale / 2, 
      -this.height * scale / 2, 
      this.width * scale, 
      this.height * scale
    );
    
    ctx.restore();
  }
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
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
    
    const count = 200;
    const canvas = canvasRef.current;
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;
      
      confettiRef.current.push(new ConfettiPiece({ x, y }));
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
    
    // Update and draw confetti pieces
    confettiRef.current = confettiRef.current.filter(confetti => {
      confetti.update(delta / 16);
      confetti.draw(ctx);
      return confetti.y < canvas.height + 100;
    });
    
    // Continue animation if there's still confetti falling
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

export default Confetti;
