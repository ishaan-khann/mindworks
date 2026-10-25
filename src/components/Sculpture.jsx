import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Interactive Sculpture Component
 * Replicates the original MindWorks 3D geometric sculptures:
 * - 'knot' (Hero)
 * - 'ring' (Surface vs Underneath)
 * - 'capsule' (Your Website Should Do More Than Exist)
 * - 'orb' (Discovery Call background)
 */
export default function Sculpture({ shape = 'knot', speed = 1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
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
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.className = 'sculpture-canvas';
    container.appendChild(renderer.domElement);

    // Geometry based on shape
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

    // Material - Sleek, dark chrome/metallic finish with sharp specular highlights
    const material = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.95,
      roughness: 0.08,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting setup for dynamic highlights on dark metallic surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 7, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 3.5, 20);
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    // Animation loop
    let animationFrameId;
    let lastTime = performance.now();
    let isVisible = true;

    // Intersection observer to only render when in viewport
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
        mesh.rotation.y += delta * 0.22 * speed;
        mesh.rotation.x += delta * 0.08 * speed;
        mesh.position.y = Math.sin(currentTime * 0.001 * 0.8) * 0.12;
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
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
