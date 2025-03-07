
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

// Dollar bill image as a base64 string (green dollar bill)
const dollarBillImage = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTAwIj48cmVjdCB3aWR0aD0iMjQwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzg1QkI2NSIgcng9IjUiIHJ5PSI1Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzAiIGZpbGw9IiM4NUJCNjUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iMTIwIiB5PSI2MCIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+JDwvdGV4dD48L3N2Zz4=";

// Define ConfettiPiece class to represent a single dollar bill
class ConfettiPiece {
  x: number;
  y: number;
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
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
    this.width = Math.random() * 30 + 20; // Dollar bill width
    this.height = this.width * 0.4; // Dollar bill proportions
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
  
  draw(ctx: CanvasRenderingContext2D, dollarImage: HTMLImageElement) {
    const scale = window.devicePixelRatio || 1;
    ctx.save();
    
    // Translate to the center of the dollar bill
    ctx.translate((this.x + this.oscillationX) * scale, this.y * scale);
    
    // Rotate
    ctx.rotate(this.rotation * Math.PI / 180);
    
    // Draw the dollar bill image
    ctx.drawImage(
      dollarImage,
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
  const dollarsRef = useRef<ConfettiPiece[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const dollarImageRef = useRef<HTMLImageElement | null>(null);

  // Initialize dollar bill image
  useEffect(() => {
    const img = new Image();
    img.src = dollarBillImage;
    img.onload = () => {
      dollarImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    if (!isActive || !canvasRef.current || !dollarImageRef.current) return;
    
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
    
    // Clear any previous dollars
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    dollarsRef.current = [];
    lastTimeRef.current = Date.now();
    
    // Create dollar bills
    createDollars();
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);
  
  const createDollars = () => {
    if (!canvasRef.current) return;
    
    const count = 100; // Fewer dollars for better performance
    const canvas = canvasRef.current;
    
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;
      
      dollarsRef.current.push(new ConfettiPiece({ x, y }));
    }
  };
  
  const animate = () => {
    if (!canvasRef.current || !dollarImageRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const now = Date.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw dollar bills
    dollarsRef.current = dollarsRef.current.filter(dollar => {
      dollar.update(delta / 16);
      dollar.draw(ctx, dollarImageRef.current!);
      return dollar.y < canvas.height + 100;
    });
    
    // Continue animation if there's still dollars falling
    if (dollarsRef.current.length > 0) {
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
