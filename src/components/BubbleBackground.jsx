import React, { useEffect, useRef } from 'react';

const BubbleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;
    const fps = 20; // ⭐ 60 se 20 kiya
    const interval = 1000 / fps;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 40 + 15; // ⭐ Size chota
        this.speedX = Math.random() * 0.3 - 0.15; // ⭐ Speed kam
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = `rgba(0, 157, 255, ${Math.random() * 0.07})`; // ⭐ Opacity kam
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.filter = 'blur(6px)';
        ctx.fill();
        ctx.filter = 'none';
      }
    }

    // ⭐ Bubbles ki数量 15 se 6 kiya
    const bubbles = Array.from({ length: 6 }, () => new Bubble());

    const animate = (currentTime) => {
      requestAnimationFrame(animate);
      
      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

export default BubbleBackground;