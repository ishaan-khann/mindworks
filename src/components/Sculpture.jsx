import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates a high-fidelity studio environment map with softbox lightformers.
 * Generates the signature curved white glass/liquid-chrome reflections
 * matching MindWorks exactly.
 */
function createStudioEnvironmentTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep studio background tone with subtle vertical gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#1c1c22');
  bgGrad.addColorStop(0.5, '#0e0e12');
  bgGrad.addColorStop(1, '#18181e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // 1. Main Overhead Softbox (broad top illumination)
  const topGrad = ctx.createLinearGradient(280, 20, 740, 160);
  topGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  topGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
  topGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
  topGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.95)');
  topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.roundRect(260, 20, 500, 150, 30);
  ctx.fill();

  // 2. Left Signature Rim/Strip Softbox (produces the signature tubular curve reflection)
  const leftGrad = ctx.createLinearGradient(80, 100, 220, 420);
  leftGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  leftGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.98)');
  leftGrad.addColorStop(0.5, 'rgba(240, 248, 255, 0.92)');
  leftGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.98)');
  leftGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = leftGrad;
  ctx.beginPath();
  ctx.roundRect(70, 90, 160, 330, 25);
  ctx.fill();

  // 3. Right Rim Softbox (sharp contour rim reflection)
  const rightGrad = ctx.createLinearGradient(790, 120, 960, 400);
  rightGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  rightGrad.addColorStop(0.25, 'rgba(230, 240, 255, 0.9)');
  rightGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.95)');
  rightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = rightGrad;
  ctx.beginPath();
  ctx.roundRect(780, 110, 170, 300, 20);
  ctx.fill();

  // 4. Center-bottom subtle floor bounce
  const botGrad = ctx.createRadialGradient(512, 480, 20, 512, 480, 280);
  botGrad.addColorStop(0, 'rgba(180, 190, 210, 0.55)');
  botGrad.addColorStop(0.6, 'rgba(100, 110, 130, 0.25)');
  botGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = botGrad;
  ctx.fillRect(200, 360, 624, 150);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

export default function Sculpture({ shape = 'knot', speed = 1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.className = 'sculpture-canvas';
    container.appendChild(renderer.domElement);

    // Studio Environment Texture with Glass Reflections
    const envTexture = createStudioEnvironmentTexture();
    scene.environment = envTexture;

    // Geometry
    let geometry;
    switch (shape) {
      case 'ring':
        geometry = new THREE.TorusGeometry(1.5, 0.42, 64, 160);
        break;
      case 'capsule':
        geometry = new THREE.CapsuleGeometry(0.9, 1.6, 32, 64);
        break;
      case 'orb':
        geometry = new THREE.IcosahedronGeometry(1.7, 24);
        break;
      case 'knot':
      default:
        geometry = new THREE.TorusKnotGeometry(1.25, 0.4, 320, 48, 2, 3);
        break;
    }

    // Liquid Obsidian Glass with Physical Clearcoat
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1c1c20,
      metalness: 0.88,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.025,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Dynamic Studio Lighting for specular pops
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222226, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.4);
    rimLight.position.set(-6, -3, 3);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0xffffff, 1.8);
    topFill.position.set(0, 8, -2);
    scene.add(topFill);

    // Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let lastTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      if (!prefersReducedMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Mesh rotation & oscillation
        mesh.rotation.y += delta * 0.22 * speed;
        mesh.rotation.x += delta * 0.08 * speed;
        mesh.position.y = Math.sin(currentTime * 0.001 * 0.8) * 0.12;

        mesh.rotation.z = currentMouseX * 0.25;
        mesh.position.x = currentMouseX * 0.18;

        // Dynamic Glass Reflection Sweeps: environment shimmers and rotates across the glass surface
        if (scene.environmentRotation) {
          scene.environmentRotation.y += delta * 0.16 * speed;
          scene.environmentRotation.x = Math.sin(currentTime * 0.0007) * 0.12;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
  }, [shape, speed]);

  return (
    <div className={`sculpture-wrapper ${className}`} aria-hidden="true">
      <div className="sculpture-glow" />
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
