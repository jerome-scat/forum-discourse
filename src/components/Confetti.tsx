
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  isActive: boolean;
}

// Utility functions grouped into a single object
const Utils = {
  // Generate a random number between two values, optionally with a fixed precision
  getRandomInRange: (min: number, max: number, precision = 0) => {
    const multiplier = Math.pow(10, precision);
    const randomValue = Math.random() * (max - min) + min;
    return Math.floor(randomValue * multiplier) / multiplier;
  },

  // Pick a random item from an array
  getRandomItem: <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)],

  // Scaling factor based on screen width
  getScaleFactor: () => Math.log(window.innerWidth) / Math.log(1920),
};

// Precomputed constants
const DEG_TO_RAD = Math.PI / 180;

// Centralized configuration for default values
const defaultConfettiConfig = {
  confettiesNumber: 250,
  confettiRadius: 6,
  confettiColors: [
    "#9b87f5", "#7E69AB", "#D946EF", "#D6BCFA", "#8B5CF6", "#E5DEFF", 
    "#FFDEE2", "#1EAEDB", "#33C3F0", "#0FA0CE"
  ],
};

// Confetti class representing individual confetti pieces
class ConfettiPiece {
  speed: { x: number; y: number };
  finalSpeedX: number;
  rotationSpeed: number;
  dragCoefficient: number;
  radius: { x: number; y: number };
  initialRadius: number;
  rotationAngle: number;
  radiusYDirection: 'up' | 'down';
  absCos: number;
  absSin: number;
  position: { x: number; y: number };
  initialPosition: { x: number; y: number };
  color: string;
  createdAt: number;
  direction: 'left' | 'right';

  constructor({ 
    initialPosition, 
    direction, 
    radius, 
    colors 
  }: { 
    initialPosition: { x: number; y: number }; 
    direction: 'left' | 'right'; 
    radius: number; 
    colors: string[] 
  }) {
    const speedFactor = Utils.getRandomInRange(0.9, 1.7, 3) * Utils.getScaleFactor();
    this.speed = { x: speedFactor, y: speedFactor };
    this.finalSpeedX = Utils.getRandomInRange(0.2, 0.6, 3);
    this.rotationSpeed = Utils.getRandomInRange(0.03, 0.07, 3) * Utils.getScaleFactor();
    this.dragCoefficient = Utils.getRandomInRange(0.0005, 0.0009, 6);
    this.radius = { x: radius, y: radius };
    this.initialRadius = radius;
    this.rotationAngle = direction === "left" ? Utils.getRandomInRange(0, 0.2, 3) : Utils.getRandomInRange(-0.2, 0, 3);
    this.radiusYDirection = "down";

    const angle = direction === "left" 
      ? Utils.getRandomInRange(82, 15) * DEG_TO_RAD 
      : Utils.getRandomInRange(-15, -82) * DEG_TO_RAD;
    this.absCos = Math.abs(Math.cos(angle));
    this.absSin = Math.abs(Math.sin(angle));

    const offset = Utils.getRandomInRange(-150, 0);
    const position = {
      x: initialPosition.x + (direction === "left" ? -offset : offset) * this.absCos,
      y: initialPosition.y - offset * this.absSin
    };

    this.position = { ...position };
    this.initialPosition = { ...position };
    this.color = Utils.getRandomItem(colors);
    this.createdAt = Date.now();
    this.direction = direction;
  }

  draw(context: CanvasRenderingContext2D) {
    const { x, y } = this.position;
    const { x: radiusX, y: radiusY } = this.radius;
    const scale = window.devicePixelRatio || 1;

    context.fillStyle = this.color;
    context.beginPath();
    context.ellipse(x * scale, y * scale, radiusX * scale, radiusY * scale, this.rotationAngle, 0, 2 * Math.PI);
    context.fill();
  }

  updatePosition(deltaTime: number, currentTime: number) {
    const elapsed = currentTime - this.createdAt;

    if (this.speed.x > this.finalSpeedX) {
      this.speed.x -= this.dragCoefficient * deltaTime;
    }

    this.position.x += this.speed.x * (this.direction === "left" ? -this.absCos : this.absCos) * deltaTime;
    this.position.y = this.initialPosition.y - this.speed.y * this.absSin * elapsed + 0.00125 * Math.pow(elapsed, 2) / 2;

    this.rotationSpeed -= 1e-5 * deltaTime;
    this.rotationSpeed = Math.max(this.rotationSpeed, 0);

    if (this.radiusYDirection === "down") {
      this.radius.y -= deltaTime * this.rotationSpeed;
      if (this.radius.y <= 0) {
        this.radius.y = 0;
        this.radiusYDirection = "up";
      }
    } else {
      this.radius.y += deltaTime * this.rotationSpeed;
      if (this.radius.y >= this.initialRadius) {
        this.radius.y = this.initialRadius;
        this.radiusYDirection = "down";
      }
    }
  }

  isVisible(canvasHeight: number) {
    return this.position.y < canvasHeight + 100;
  }
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdatedRef = useRef<number>(Date.now());
  
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
        canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Reset confetti array
    confettiRef.current = [];
    
    // Create confetti pieces
    const { confettiesNumber, confettiRadius, confettiColors } = defaultConfettiConfig;
    const baseY = (5 * window.innerHeight) / 7;
    
    for (let i = 0; i < confettiesNumber / 2; i++) {
      confettiRef.current.push(
        new ConfettiPiece({
          initialPosition: { x: 0, y: baseY },
          direction: "right",
          radius: confettiRadius,
          colors: confettiColors,
        })
      );
      
      confettiRef.current.push(
        new ConfettiPiece({
          initialPosition: { x: window.innerWidth, y: baseY },
          direction: "left",
          radius: confettiRadius,
          colors: confettiColors,
        })
      );
    }
    
    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdatedRef.current;
      lastUpdatedRef.current = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confettiRef.current = confettiRef.current.filter((confetti) => {
        confetti.updatePosition(deltaTime, currentTime);
        confetti.draw(ctx);
        return confetti.isVisible(canvas.height);
      });
      
      if (confettiRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);
  
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
