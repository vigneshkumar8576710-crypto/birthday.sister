import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeButterfliesProps {
  className?: string;
  count?: number;
}

export const ThreeButterflies: React.FC<ThreeButterfliesProps> = ({
  className = 'absolute inset-0 w-full h-full z-0 pointer-events-none',
  count = 8,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Ambient and point light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf8c8dc, 1.4, 20);
    pointLight1.position.set(5, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffe088, 1.2, 20);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Butterfly Geometry
    function createButterfly(colorHex = 0xf8c8dc) {
      const group = new THREE.Group();
      const wingGeo = new THREE.PlaneGeometry(0.36, 0.48);
      const wingMat = new THREE.MeshPhongMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        shininess: 80,
      });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.position.x = -0.18;
      leftWing.rotation.y = 0.2;
      group.add(leftWing);

      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.position.x = 0.18;
      rightWing.rotation.y = -0.2;
      group.add(rightWing);

      return {
        group,
        leftWing,
        rightWing,
        speed: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        baseY: 0,
        baseX: 0,
        radius: 1.2 + Math.random() * 1.5,
      };
    }

    const butterflies: any[] = [];
    const colors = [0xf8c8dc, 0xffd8e7, 0xffe088, 0xe9bacd, 0xf9d156];

    for (let i = 0; i < count; i++) {
      const b = createButterfly(colors[i % colors.length]);
      b.baseX = (Math.random() - 0.5) * 7.5;
      b.baseY = (Math.random() - 0.5) * 5.0;
      b.group.position.set(
        b.baseX,
        b.baseY,
        (Math.random() - 0.5) * 3.0
      );
      scene.add(b.group);
      butterflies.push(b);
    }

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.0012;

      butterflies.forEach((b, i) => {
        // Organic sinusoidal flight pattern
        b.group.position.y = b.baseY + Math.sin(time * 1.2 + b.phase) * 0.4;
        b.group.position.x = b.baseX + Math.cos(time * 0.8 + b.phase) * 0.5;
        b.group.position.z += Math.sin(time * 0.5 + b.phase) * 0.003;

        // Wing flapping speed
        const flap = Math.sin(time * 12 + b.phase) * 0.85;
        b.leftWing.rotation.y = flap;
        b.rightWing.rotation.y = -flap;

        // Rotation tilt along path
        b.group.rotation.z = Math.sin(time + b.phase) * 0.15;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [count]);

  return <div ref={containerRef} className={className} />;
};
