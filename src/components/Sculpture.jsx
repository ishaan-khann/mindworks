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

  // Black void background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 512);

  // === Multiple distinct light panels so glass picks up vivid sweeping reflections ===

  // 1. Broad top softbox — main crown highlight
  const topGrad = ctx.createLinearGradient(250, 0, 750, 90);
  topGrad.addColorStop(0,   'rgba(255,255,255,0)');
  topGrad.addColorStop(0.2, 'rgba(255,255,255,0.92)');
  topGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
  topGrad.addColorStop(0.8, 'rgba(255,255,255,0.92)');
  topGrad.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.roundRect(230, 2, 560, 90, 18);
  ctx.fill();

  // 2. Left tall strip — produces the signature tubular rim reflection
  const leftGrad = ctx.createLinearGradient(70, 80, 180, 430);
  leftGrad.addColorStop(0,    'rgba(255,255,255,0)');
  leftGrad.addColorStop(0.15, 'rgba(200,220,255,0.88)');
  leftGrad.addColorStop(0.5,  'rgba(255,255,255,0.95)');
  leftGrad.addColorStop(0.85, 'rgba(200,220,255,0.88)');
  leftGrad.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = leftGrad;
  ctx.beginPath();
  ctx.roundRect(68, 75, 110, 360, 20);
  ctx.fill();

  // 3. Right strip — gives opposing glass edge catch
  const rightGrad = ctx.createLinearGradient(845, 100, 950, 390);
  rightGrad.addColorStop(0,    'rgba(255,255,255,0)');
  rightGrad.addColorStop(0.3,  'rgba(220,235,255,0.80)');
  rightGrad.addColorStop(0.7,  'rgba(255,255,255,0.88)');
  rightGrad.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = rightGrad;
  ctx.beginPath();
  ctx.roundRect(840, 90, 100, 310, 16);
  ctx.fill();

  // 4. Diagonal slash — gives an angled swoosh reflection as the knot rotates
  ctx.save();
  ctx.translate(512, 256);
  ctx.rotate(-0.38);
  const slashGrad = ctx.createLinearGradient(-260, -20, 260, 20);
  slashGrad.addColorStop(0,   'rgba(255,255,255,0)');
  slashGrad.addColorStop(0.4, 'rgba(180,200,255,0.35)');
  slashGrad.addColorStop(0.6, 'rgba(220,235,255,0.55)');
  slashGrad.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = slashGrad;
  ctx.fillRect(-300, -28, 600, 56);
  ctx.restore();

  // 5. Soft bottom bounce so underside isn't completely dead
  const botGrad = ctx.createRadialGradient(512, 485, 10, 512, 485, 200);
  botGrad.addColorStop(0, 'rgba(160,180,220,0.22)');
  botGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = botGrad;
  ctx.fillRect(260, 390, 500, 120);

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
    renderer.toneMappingExposure = 1.1;
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

    // Glass material — transmission + clearcoat for a vivid glass look
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x080808,         // near-black base so background shows through darkly
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.18,      // slight translucency — adds depth without full transparency
      ior: 1.72,               // glass-like refraction index
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      reflectivity: 1.0,
      envMapIntensity: 3.5,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Multi-point glass studio lighting
    // Very low ambient so the glass body stays dark
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.06);
    scene.add(hemiLight);

    // Main key — sharp top highlight
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(2, 9, 5);
    scene.add(keyLight);

    // Left rim — produces left-side strip reflection
    const rimLeft = new THREE.DirectionalLight(0xdde8ff, 1.8);
    rimLeft.position.set(-7, 3, 2);
    scene.add(rimLeft);

    // Right rim
    const rimRight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimRight.position.set(7, 1, -2);
    scene.add(rimRight);

    // Underside fill — adds the faint bottom glow glass shows
    const fillBot = new THREE.DirectionalLight(0xaabbdd, 0.5);
    fillBot.position.set(0, -6, 3);
    scene.add(fillBot);

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
