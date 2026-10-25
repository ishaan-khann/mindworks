import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Glass & Chrome Sculpture Component
 * Features:
 * - High-refraction obsidian glass with physical clearcoat (MeshPhysicalMaterial)
 * - Studio softbox lightformers compiled into HDR PMREM environment map
 * - Real-time animated glass reflections (environmentRotation animation)
 * - Subtle cursor parallax interaction
 * - Knot (Hero), Ring (Surface), Capsule (Impact), and Orb (Discovery)
 */
export default function Sculpture({ shape = 'knot', speed = 1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 3. Renderer with tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.className = 'sculpture-canvas';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment Map with Precision Lightformers
    // Recreates the studio softbox setup matching MindWorks / Lovable
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();

    const envScene = new THREE.Scene();

    // Softbox 1: Overhead main key light (broad white highlight)
    const topGeo = new THREE.PlaneGeometry(12, 7);
    const topMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    topMat.color.multiplyScalar(16);
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.set(0, 6, 2.5);
    topMesh.rotation.x = Math.PI / 2;
    envScene.add(topMesh);

    // Softbox 2: Curved front-left strip (creates the sweeping white rim streak)
    const stripGeo1 = new THREE.PlaneGeometry(24, 2.5);
    const stripMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    stripMat1.color.multiplyScalar(10);
    const stripMesh1 = new THREE.Mesh(stripGeo1, stripMat1);
    stripMesh1.position.set(-6, 1.5, -2);
    stripMesh1.rotation.y = Math.PI / 2;
    envScene.add(stripMesh1);

    // Softbox 3: Side-right secondary fill strip
    const stripGeo2 = new THREE.PlaneGeometry(22, 2);
    const stripMat2 = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    stripMat2.color.multiplyScalar(5);
    const stripMesh2 = new THREE.Mesh(stripGeo2, stripMat2);
    stripMesh2.position.set(6, -2, 1.5);
    stripMesh2.rotation.y = -Math.PI / 2;
    envScene.add(stripMesh2);

    // Softbox 4: Bottom specular kicker
    const botGeo = new THREE.PlaneGeometry(14, 6);
    const botMat = new THREE.MeshBasicMaterial({
      color: 0x666666,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    botMat.color.multiplyScalar(2.5);
    const botMesh = new THREE.Mesh(botGeo, botMat);
    botMesh.position.set(0, -6, -3);
    botMesh.rotation.x = -Math.PI / 2;
    envScene.add(botMesh);

    // Generate environment texture
    const envRenderTarget = pmremGenerator.fromScene(envScene, 0.04);
    scene.environment = envRenderTarget.texture;

    // 5. Geometry
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

    // 6. Obsidian Liquid Glass & Physical Clearcoat Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x141416,
      metalness: 0.94,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      ior: 1.5,
      reflectivity: 1.0,
      envMapIntensity: 3.2,
      toneMapped: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 7. Dynamic Direct Lights for extra specular pop
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight2.position.set(-6, -4, -3);
    scene.add(dirLight2);

    // 8. Mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Animation Loop with animated glass reflection sweeps
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
        // Smooth mouse damping
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Rotation & floating animation
        mesh.rotation.y += delta * 0.22 * speed;
        mesh.rotation.x += delta * 0.08 * speed;
        mesh.position.y = Math.sin(currentTime * 0.001 * 0.8) * 0.12;

        mesh.rotation.z = currentMouseX * 0.3;
        mesh.position.x = currentMouseX * 0.2;

        // Animated Glass Reflection: Environment light rotates and shimmers dynamically across the surface!
        if (scene.environmentRotation) {
          scene.environmentRotation.y += delta * 0.18 * speed;
          scene.environmentRotation.x = Math.sin(currentTime * 0.0006) * 0.15;
          scene.environmentRotation.z = Math.cos(currentTime * 0.0008) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 10. Resize handler
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

    // 11. Cleanup
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
      topGeo.dispose();
      topMat.dispose();
      stripGeo1.dispose();
      stripMat1.dispose();
      stripGeo2.dispose();
      stripMat2.dispose();
      botGeo.dispose();
      botMat.dispose();
      envRenderTarget.dispose();
      pmremGenerator.dispose();
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
