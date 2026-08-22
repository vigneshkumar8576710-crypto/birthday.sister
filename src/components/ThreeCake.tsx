import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCakeProps {
  candlesLit: boolean;
  cakeCut: boolean;
  onSliceComplete?: () => void;
  className?: string;
}

export const ThreeCake: React.FC<ThreeCakeProps> = ({
  candlesLit,
  cakeCut,
  onSliceComplete,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    candlesLit,
    cakeCut,
    onSliceComplete,
    cutProgress: 0,
    isCutting: false,
    knifeState: 'idle',
    sliceOffset: 0,
    flameScale: 1,
    smokeParticles: [] as { mesh: THREE.Mesh; vy: number; vx: number; vz: number; life: number; maxLife: number }[],
    rotationY: -0.3,
    targetRotationY: -0.3,
    rotationX: 0.22,
    targetRotationX: 0.22,
    isDragging: false,
    prevPointerX: 0,
    prevPointerY: 0,
  });

  useEffect(() => {
    stateRef.current.candlesLit = candlesLit;
  }, [candlesLit]);

  useEffect(() => {
    if (cakeCut && !stateRef.current.cakeCut) {
      stateRef.current.isCutting = true;
      stateRef.current.knifeState = 'slicing';
      stateRef.current.cutProgress = 0;
    } else if (!cakeCut && stateRef.current.cakeCut) {
      stateRef.current.isCutting = false;
      stateRef.current.knifeState = 'idle';
      stateRef.current.cutProgress = 0;
      stateRef.current.sliceOffset = 0;
    }
    stateRef.current.cakeCut = cakeCut;
    stateRef.current.onSliceComplete = onSliceComplete;
  }, [cakeCut, onSliceComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.6, 7.8);
    camera.lookAt(0, 0.9, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Procedural Textures ---
    // 1. Artisanal Whipped Buttercream Spatula & Swirl Texture
    const createArtisanalButtercreamTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Base normal map color (pointing outwards)
      ctx.fillStyle = '#8080ff';
      ctx.fillRect(0, 0, 1024, 1024);

      // Swirled, waving spatula strokes with soft cream ridges
      for (let y = 0; y < 1024; y += 32) {
        ctx.beginPath();
        for (let x = 0; x <= 1024; x += 16) {
          const wave = Math.sin(x * 0.02 + y * 0.05) * 8 + Math.cos(x * 0.04) * 4;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = '#9090ff';
        ctx.lineWidth = 14;
        ctx.stroke();

        // Highlight ridge
        ctx.strokeStyle = '#7070ff';
        ctx.lineWidth = 6;
        ctx.stroke();
      }

      // Stucco cream peaks and stippling
      const imgData = ctx.getImageData(0, 0, 1024, 1024);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 16;
        imgData.data[i] = Math.min(255, Math.max(0, imgData.data[i] + noise));
        imgData.data[i + 1] = Math.min(255, Math.max(0, imgData.data[i + 1] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 2);
      return texture;
    };

    // 2. High-Definition Golden Genoise Sponge Crumb Texture
    const createSpongeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#fce2ba'; // Golden vanilla sponge
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = 0.4 + Math.random() * 2.4;
        const rand = Math.random();
        ctx.fillStyle = rand > 0.6 ? '#ebc285' : rand > 0.3 ? '#fff5e4' : '#dfa960';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const creamNormal = createArtisanalButtercreamTexture();
    const spongeTexture = createSpongeTexture();

    // --- Studio Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.65);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(6, 10, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.0008;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffdbe6, 1.4);
    fillLight.position.set(-6, 5, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeab3, 1.3);
    rimLight.position.set(0, 7, -6);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xfffaea, 1.5, 12);
    topLight.position.set(0, 6, 0);
    scene.add(topLight);

    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // --- Premium Materials ---
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5be38,
      metalness: 0.92,
      roughness: 0.18,
    });

    const roseGoldMat = new THREE.MeshStandardMaterial({
      color: 0xe89eb3,
      metalness: 0.85,
      roughness: 0.22,
    });

    const porcelainMat = new THREE.MeshStandardMaterial({
      color: 0xfffefb,
      roughness: 0.15,
      metalness: 0.04,
    });

    // Outer Frosting: Rose Cream Velvet (Bottom Tier)
    const bottomFrostingMat = new THREE.MeshStandardMaterial({
      color: 0xf8bfcf,
      roughness: 0.35,
      metalness: 0.04,
      normalMap: creamNormal,
      normalScale: new THREE.Vector2(0.45, 0.45),
    });

    // Outer Frosting: Silk Vanilla Crème (Top Tier)
    const topFrostingMat = new THREE.MeshStandardMaterial({
      color: 0xfffbf0,
      roughness: 0.3,
      metalness: 0.03,
      normalMap: creamNormal,
      normalScale: new THREE.Vector2(0.4, 0.4),
    });

    // Outer Glaze / Caramelized Rose Drip
    const glazeMat = new THREE.MeshStandardMaterial({
      color: 0xf49db6,
      roughness: 0.1,
      metalness: 0.1,
    });

    // Chantilly Whipped Cream (used for piped swags, rosettes, and layer fillings)
    const whippedCreamMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    // Delicate Rose Whipped Cream for swags
    const roseWhippedCreamMat = new THREE.MeshStandardMaterial({
      color: 0xfbcfe8,
      roughness: 0.26,
      metalness: 0.02,
    });

    // Genoise Sponge Layer Material
    const innerSpongeMat = new THREE.MeshStandardMaterial({
      color: 0xf9e5c2,
      map: spongeTexture,
      roughness: 0.85,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // Ruby Berry Coulis Ribbon Material
    const innerJamMat = new THREE.MeshStandardMaterial({
      color: 0x9f1239,
      roughness: 0.18,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    // Sugar Pearls & Dragées
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xfff5ea,
      roughness: 0.2,
      metalness: 0.3,
    });

    const goldPearlMat = new THREE.MeshStandardMaterial({
      color: 0xfacf38,
      roughness: 0.18,
      metalness: 0.9,
    });

    // Candles & Flames
    const candleWaxMat1 = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.25 });
    const candleWaxMat2 = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.25 });
    const candleWaxMat3 = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.25 });

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffc83b });
    const flameCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Knife Materials
    const knifeBladeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.08,
      side: THREE.DoubleSide,
    });

    const knifeHandleMat = new THREE.MeshStandardMaterial({
      color: 0x5c2b0e,
      roughness: 0.32,
      metalness: 0.1,
    });

    // --- Cake Stand ---
    const standGroup = new THREE.Group();
    const plateGeom = new THREE.CylinderGeometry(2.55, 2.45, 0.14, 64);
    const plateMesh = new THREE.Mesh(plateGeom, porcelainMat);
    plateMesh.position.y = 0.07;
    plateMesh.receiveShadow = true;
    standGroup.add(plateMesh);

    const rimMesh1 = new THREE.Mesh(new THREE.TorusGeometry(2.52, 0.032, 16, 64).rotateX(Math.PI / 2), goldMat);
    rimMesh1.position.y = 0.14;
    standGroup.add(rimMesh1);

    const rimMesh2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.018, 16, 64).rotateX(Math.PI / 2), goldMat);
    rimMesh2.position.y = 0.142;
    standGroup.add(rimMesh2);

    const stemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.85, 0.55, 32), porcelainMat);
    stemMesh.position.y = -0.2;
    stemMesh.receiveShadow = true;
    standGroup.add(stemMesh);

    const baseFootMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.55, 0.14, 48), porcelainMat);
    baseFootMesh.position.y = -0.48;
    baseFootMesh.receiveShadow = true;
    standGroup.add(baseFootMesh);

    const baseGoldRim = new THREE.Mesh(new THREE.TorusGeometry(1.54, 0.03, 16, 48).rotateX(Math.PI / 2), goldMat);
    baseGoldRim.position.y = -0.42;
    standGroup.add(baseGoldRim);

    cakeGroup.add(standGroup);

    // --- Slicing Math ---
    const SLICE_ANGLE = Math.PI * 0.32; // ~58 degrees
    const MAIN_ANGLE = Math.PI * 2 - SLICE_ANGLE;
    const SLICE_START = 0;
    const MAIN_START = SLICE_ANGLE;

    // --- Gourmet 3D Multi-Layer Cake Cross-Section Generator ---
    // Creates a physical 3D layered cross section (3 sponge layers + 2 cream layers + 2 berry compote ribbons + crown frosting)
    // facing in the correct outward direction along angle `angle`.
    // normalSign: +1 means the interior layers face towards +Z local; -1 means they face towards -Z local.
    const create3DMultiLayerCutWall = (
      rInner: number,
      rOuter: number,
      yBottom: number,
      yTop: number,
      angle: number,
      facingSign: 1 | -1 = 1
    ) => {
      const wallGroup = new THREE.Group();
      const length = rOuter - rInner;
      const height = yTop - yBottom;

      // Layer Heights Distribution:
      // 1. Bottom Sponge: 26%
      // 2. First Chantilly Cream: 10%
      // 3. Ruby Berry Coulis: 6% (embedded within cream)
      // 4. Middle Sponge: 24%
      // 5. Second Chantilly Cream: 10%
      // 6. Second Berry Coulis: 6%
      // 7. Top Sponge: 20%
      // 8. Top Frosting Layer: 4%

      const layerData = [
        { yRel: 0, hRel: 0.25, mat: innerSpongeMat, depthOff: 0 },
        { yRel: 0.25, hRel: 0.10, mat: whippedCreamMat, depthOff: 0.003 * facingSign },
        { yRel: 0.29, hRel: 0.045, mat: innerJamMat, depthOff: 0.006 * facingSign },
        { yRel: 0.35, hRel: 0.25, mat: innerSpongeMat, depthOff: 0 },
        { yRel: 0.60, hRel: 0.10, mat: whippedCreamMat, depthOff: 0.003 * facingSign },
        { yRel: 0.64, hRel: 0.045, mat: innerJamMat, depthOff: 0.006 * facingSign },
        { yRel: 0.70, hRel: 0.24, mat: innerSpongeMat, depthOff: 0 },
        { yRel: 0.94, hRel: 0.06, mat: topFrostingMat, depthOff: 0.002 * facingSign },
      ];

      layerData.forEach((layer) => {
        const lH = height * layer.hRel;
        const lY = yBottom + height * layer.yRel + lH / 2;

        const geom = new THREE.PlaneGeometry(length, lH);
        geom.translate(rInner + length / 2, lY, layer.depthOff);

        const mesh = new THREE.Mesh(geom, layer.mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        wallGroup.add(mesh);
      });

      // Fluted cream border at the outer cut edge
      const outerPiping = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, height, 12),
        whippedCreamMat
      );
      outerPiping.position.set(rOuter, yBottom + height / 2, 0.005 * facingSign);
      wallGroup.add(outerPiping);

      // Rotate group around Y so that local +X maps to the radial vector (sin(angle), cos(angle))
      wallGroup.rotation.y = angle - Math.PI / 2;

      return wallGroup;
    };

    // --- Helper: Scalloped Glaze Drip Rim ---
    const createDripRim = (radius: number, yPos: number, startAngle: number, sweepAngle: number, numDrips: number) => {
      const dripGroup = new THREE.Group();
      for (let i = 0; i < numDrips; i++) {
        const a = startAngle + (i / (numDrips - 1)) * sweepAngle;
        const dripLen = 0.18 + Math.sin(i * 1.7) * 0.12 + Math.cos(i * 3.1) * 0.06;
        const dripDrop = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), glazeMat);
        dripDrop.position.set(Math.sin(a) * (radius + 0.015), yPos - dripLen, Math.cos(a) * (radius + 0.015));
        dripDrop.scale.set(1, 1.4, 0.8);
        dripGroup.add(dripDrop);

        const dripLine = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, dripLen, 12), glazeMat);
        dripLine.position.set(Math.sin(a) * (radius + 0.015), yPos - dripLen / 2, Math.cos(a) * (radius + 0.015));
        dripGroup.add(dripLine);
      }
      return dripGroup;
    };

    // --- Helper: 3D Cream Swags / Draped Buttercream Garlands ---
    const createCreamSwags = (
      radius: number,
      yCenter: number,
      startAngle: number,
      sweepAngle: number,
      numSwags: number,
      mat: THREE.Material
    ) => {
      const swagGroup = new THREE.Group();
      const swagAngle = sweepAngle / numSwags;

      for (let s = 0; s < numSwags; s++) {
        const sStart = startAngle + s * swagAngle;
        const sEnd = sStart + swagAngle;

        // Create curved swag tube using a 3D Quadratic Bezier curve
        const p1 = new THREE.Vector3(Math.sin(sStart) * radius, yCenter, Math.cos(sStart) * radius);
        const midA = sStart + swagAngle / 2;
        const pMid = new THREE.Vector3(Math.sin(midA) * (radius + 0.035), yCenter - 0.16, Math.cos(midA) * (radius + 0.035));
        const p2 = new THREE.Vector3(Math.sin(sEnd) * radius, yCenter, Math.cos(sEnd) * radius);

        const curve = new THREE.QuadraticBezierCurve3(p1, pMid, p2);
        const tubeGeom = new THREE.TubeGeometry(curve, 16, 0.032, 8, false);
        const tubeMesh = new THREE.Mesh(tubeGeom, mat);
        tubeMesh.castShadow = true;
        swagGroup.add(tubeMesh);

        // Gold pearl drop at swag junction
        const dropBead = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), goldPearlMat);
        dropBead.position.copy(p1);
        dropBead.position.y += 0.01;
        swagGroup.add(dropBead);
      }
      return swagGroup;
    };

    // --- Helper: Whipped Buttercream Rosettes ---
    const createRosette = (scale = 1.0) => {
      const rGroup = new THREE.Group();
      for (let petal = 0; petal < 6; petal++) {
        const petalAngle = (petal * Math.PI) / 3;
        const pMesh = new THREE.Mesh(new THREE.ConeGeometry(0.075 * scale, 0.14 * scale, 12), whippedCreamMat);
        pMesh.position.set(Math.sin(petalAngle) * 0.045 * scale, 0.05 * scale, Math.cos(petalAngle) * 0.045 * scale);
        pMesh.rotation.set(0.25 * Math.cos(petalAngle), petalAngle, -0.25 * Math.sin(petalAngle));
        pMesh.castShadow = true;
        rGroup.add(pMesh);
      }
      const centerSwirl = new THREE.Mesh(new THREE.ConeGeometry(0.07 * scale, 0.18 * scale, 12), whippedCreamMat);
      centerSwirl.position.y = 0.08 * scale;
      centerSwirl.castShadow = true;
      rGroup.add(centerSwirl);

      const goldBead = new THREE.Mesh(new THREE.SphereGeometry(0.026 * scale, 12, 12), goldPearlMat);
      goldBead.position.y = 0.18 * scale;
      rGroup.add(goldBead);

      return rGroup;
    };

    // --- Helper: Continuous Whipped Cream Shell Border (Piped pearls along cylinder base) ---
    const createShellBorder = (
      radius: number,
      yPos: number,
      startAngle: number,
      sweepAngle: number,
      numShells: number,
      scale = 1.0
    ) => {
      const shellGroup = new THREE.Group();
      for (let i = 0; i < numShells; i++) {
        const a = startAngle + (i / (numShells - 1)) * sweepAngle;
        const isGold = i % 4 === 0;

        // Tapered whipped shell
        const shell = new THREE.Mesh(
          new THREE.ConeGeometry(0.06 * scale, 0.12 * scale, 12),
          isGold ? goldPearlMat : whippedCreamMat
        );
        shell.position.set(Math.sin(a) * (radius + 0.02), yPos, Math.cos(a) * (radius + 0.02));
        shell.rotation.set(0.4 * Math.cos(a), a, -0.4 * Math.sin(a));
        shell.castShadow = true;
        shellGroup.add(shell);
      }
      return shellGroup;
    };

    // --- Main Cake Body ---
    const mainBodyGroup = new THREE.Group();

    const botTierH = 0.95;
    const botTierR = 2.05;
    const botTierY = 0.14;

    const topTierH = 0.88;
    const topTierR = 1.38;
    const topTierY = botTierY + botTierH;

    // Bottom tier main body
    const botMainGeom = new THREE.CylinderGeometry(botTierR, botTierR, botTierH, 48, 1, false, MAIN_START, MAIN_ANGLE);
    const botMainMesh = new THREE.Mesh(botMainGeom, bottomFrostingMat);
    botMainMesh.position.y = botTierY + botTierH / 2;
    botMainMesh.castShadow = true;
    botMainMesh.receiveShadow = true;
    mainBodyGroup.add(botMainMesh);

    // Top tier main body
    const topMainGeom = new THREE.CylinderGeometry(topTierR, topTierR, topTierH, 40, 1, false, MAIN_START, MAIN_ANGLE);
    const topMainMesh = new THREE.Mesh(topMainGeom, topFrostingMat);
    topMainMesh.position.y = topTierY + topTierH / 2;
    topMainMesh.castShadow = true;
    topMainMesh.receiveShadow = true;
    mainBodyGroup.add(topMainMesh);

    // --- Cut Walls for Main Cake Body ---
    // 1. Front Cut Wall (at MAIN_START): Facing outward into opening (-1 direction)
    mainBodyGroup.add(create3DMultiLayerCutWall(0, botTierR, botTierY, botTierY + botTierH, MAIN_START, -1));
    mainBodyGroup.add(create3DMultiLayerCutWall(0, topTierR, topTierY, topTierY + topTierH, MAIN_START, -1));

    // 2. Back Cut Wall (at MAIN_START + MAIN_ANGLE): Facing outward into opening (+1 direction)
    // This gives the BACK of the cake the exact same rich, glorious 5-layer Genoise crumb and jam ribbons!
    mainBodyGroup.add(create3DMultiLayerCutWall(0, botTierR, botTierY, botTierY + botTierH, MAIN_START + MAIN_ANGLE, 1));
    mainBodyGroup.add(create3DMultiLayerCutWall(0, topTierR, topTierY, topTierY + topTierH, MAIN_START + MAIN_ANGLE, 1));

    // --- Luxurious Outer Cream Decorations on Main Body ---
    // 1. Cream Swags (Garlands) on Bottom Tier
    mainBodyGroup.add(createCreamSwags(botTierR + 0.015, botTierY + botTierH * 0.65, MAIN_START, MAIN_ANGLE, 8, roseWhippedCreamMat));

    // 2. Cream Swags on Top Tier
    mainBodyGroup.add(createCreamSwags(topTierR + 0.015, topTierY + topTierH * 0.62, MAIN_START, MAIN_ANGLE, 6, whippedCreamMat));

    // 3. Glaze Drip Rims
    mainBodyGroup.add(createDripRim(botTierR, topTierY, MAIN_START, MAIN_ANGLE, 28));
    mainBodyGroup.add(createDripRim(topTierR, topTierY + topTierH, MAIN_START, MAIN_ANGLE, 20));

    // 4. Base & Mid Shell Piping
    mainBodyGroup.add(createShellBorder(botTierR, botTierY + 0.04, MAIN_START, MAIN_ANGLE, 36, 1.1));
    mainBodyGroup.add(createShellBorder(topTierR, topTierY + 0.03, MAIN_START, MAIN_ANGLE, 28, 0.9));

    // 5. Top Rim Piped Rosettes on Main Cake
    const numTopRosettes = 14;
    for (let i = 0; i < numTopRosettes; i++) {
      const a = MAIN_START + (i / (numTopRosettes - 1)) * MAIN_ANGLE;
      const rosette = createRosette(0.95);
      rosette.position.set(Math.sin(a) * (topTierR - 0.15), topTierY + topTierH, Math.cos(a) * (topTierR - 0.15));
      rosette.rotation.y = a;
      mainBodyGroup.add(rosette);
    }

    // 6. French Macarons on Cake Top
    const macaronAngles = [MAIN_START + 0.5, MAIN_START + 1.5, MAIN_START + 2.5, MAIN_START + 3.5];
    macaronAngles.forEach((mAngle) => {
      const mGroup = new THREE.Group();
      const topShell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), roseGoldMat);
      topShell.scale.set(1, 0.45, 1);
      topShell.position.y = 0.06;
      mGroup.add(topShell);

      const botShell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), roseGoldMat);
      botShell.scale.set(1, 0.45, 1);
      botShell.position.y = -0.02;
      mGroup.add(botShell);

      const filling = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 16), whippedCreamMat);
      filling.position.y = 0.02;
      mGroup.add(filling);

      mGroup.position.set(Math.sin(mAngle) * (topTierR * 0.55), topTierY + topTierH + 0.08, Math.cos(mAngle) * (topTierR * 0.55));
      mGroup.rotation.set(0.2, mAngle, 0.3);
      mGroup.castShadow = true;
      mainBodyGroup.add(mGroup);
    });

    // 7. Gold Pearls on Top
    const goldDropAngles = [MAIN_START + 0.9, MAIN_START + 1.9, MAIN_START + 2.9, MAIN_START + 3.9];
    goldDropAngles.forEach((gAngle) => {
      const goldSphere = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), goldPearlMat);
      goldSphere.position.set(Math.sin(gAngle) * (topTierR * 0.42), topTierY + topTierH + 0.06, Math.cos(gAngle) * (topTierR * 0.42));
      goldSphere.castShadow = true;
      mainBodyGroup.add(goldSphere);
    });

    cakeGroup.add(mainBodyGroup);

    // --- Cut Wedge Slice Group ---
    const sliceGroup = new THREE.Group();

    // Bottom tier wedge
    const botSliceGeom = new THREE.CylinderGeometry(botTierR, botTierR, botTierH, 18, 1, false, SLICE_START, SLICE_ANGLE);
    const botSliceMesh = new THREE.Mesh(botSliceGeom, bottomFrostingMat);
    botSliceMesh.position.y = botTierY + botTierH / 2;
    botSliceMesh.castShadow = true;
    sliceGroup.add(botSliceMesh);

    // Top tier wedge
    const topSliceGeom = new THREE.CylinderGeometry(topTierR, topTierR, topTierH, 16, 1, false, SLICE_START, SLICE_ANGLE);
    const topSliceMesh = new THREE.Mesh(topSliceGeom, topFrostingMat);
    topSliceMesh.position.y = topTierY + topTierH / 2;
    topSliceMesh.castShadow = true;
    sliceGroup.add(topSliceMesh);

    // Slice Cut Walls (Both faces textured with rich 3D layers!)
    sliceGroup.add(create3DMultiLayerCutWall(0, botTierR, botTierY, botTierY + botTierH, SLICE_START, 1));
    sliceGroup.add(create3DMultiLayerCutWall(0, topTierR, topTierY, topTierY + topTierH, SLICE_START, 1));

    sliceGroup.add(create3DMultiLayerCutWall(0, botTierR, botTierY, botTierY + botTierH, SLICE_START + SLICE_ANGLE, -1));
    sliceGroup.add(create3DMultiLayerCutWall(0, topTierR, topTierY, topTierY + topTierH, SLICE_START + SLICE_ANGLE, -1));

    // Slice Outer Decorations
    sliceGroup.add(createCreamSwags(botTierR + 0.015, botTierY + botTierH * 0.65, SLICE_START, SLICE_ANGLE, 1, roseWhippedCreamMat));
    sliceGroup.add(createCreamSwags(topTierR + 0.015, topTierY + topTierH * 0.62, SLICE_START, SLICE_ANGLE, 1, whippedCreamMat));

    sliceGroup.add(createDripRim(botTierR, topTierY, SLICE_START, SLICE_ANGLE, 6));
    sliceGroup.add(createDripRim(topTierR, topTierY + topTierH, SLICE_START, SLICE_ANGLE, 5));

    sliceGroup.add(createShellBorder(botTierR, botTierY + 0.04, SLICE_START, SLICE_ANGLE, 8, 1.1));
    sliceGroup.add(createShellBorder(topTierR, topTierY + 0.03, SLICE_START, SLICE_ANGLE, 6, 0.9));

    // Slice rosettes
    const numSliceRosettes = 3;
    for (let i = 0; i < numSliceRosettes; i++) {
      const a = SLICE_START + (i / (numSliceRosettes - 1)) * SLICE_ANGLE;
      const rosette = createRosette(0.95);
      rosette.position.set(Math.sin(a) * (topTierR - 0.15), topTierY + topTierH, Math.cos(a) * (topTierR - 0.15));
      rosette.rotation.y = a;
      sliceGroup.add(rosette);
    }

    // Macaron on the slice
    const midSliceAngle = SLICE_START + SLICE_ANGLE / 2;
    const sliceMacaron = new THREE.Group();
    const sTopShell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), roseGoldMat);
    sTopShell.scale.set(1, 0.45, 1);
    sTopShell.position.y = 0.06;
    sliceMacaron.add(sTopShell);
    const sBotShell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), roseGoldMat);
    sBotShell.scale.set(1, 0.45, 1);
    sBotShell.position.y = -0.02;
    sliceMacaron.add(sBotShell);
    const sFilling = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.04, 16), whippedCreamMat);
    sFilling.position.y = 0.02;
    sliceMacaron.add(sFilling);

    sliceMacaron.position.set(Math.sin(midSliceAngle) * (topTierR * 0.55), topTierY + topTierH + 0.08, Math.cos(midSliceAngle) * (topTierR * 0.55));
    sliceMacaron.rotation.set(0.2, midSliceAngle, 0.3);
    sliceGroup.add(sliceMacaron);

    cakeGroup.add(sliceGroup);

    // --- Gold Rimmed Dessert Plate for Cut Wedge ---
    const dessertPlateGroup = new THREE.Group();
    const dessertPlateMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.25, 0.08, 36), porcelainMat);
    dessertPlateMesh.castShadow = true;
    dessertPlateMesh.receiveShadow = true;
    dessertPlateGroup.add(dessertPlateMesh);

    const dRimMesh = new THREE.Mesh(new THREE.TorusGeometry(1.33, 0.028, 14, 36).rotateX(Math.PI / 2), goldMat);
    dRimMesh.position.y = 0.042;
    dessertPlateGroup.add(dRimMesh);

    const sliceTargetDir = new THREE.Vector3(Math.sin(midSliceAngle), 0, Math.cos(midSliceAngle)).normalize();
    dessertPlateGroup.position.copy(sliceTargetDir.clone().multiplyScalar(2.65));
    dessertPlateGroup.position.y = 0.04;
    dessertPlateGroup.visible = false;
    cakeGroup.add(dessertPlateGroup);

    // --- 3D Birthday Candles ---
    const candlesGroup = new THREE.Group();
    const candleWaxes = [candleWaxMat1, candleWaxMat2, candleWaxMat3];
    const candleLights: THREE.PointLight[] = [];
    const flameMeshes: THREE.Group[] = [];

    const candlePositions = [
      { x: -0.45, z: 0.1, h: 0.72, mat: candleWaxes[0] },
      { x: 0.0, z: -0.32, h: 0.86, mat: candleWaxes[1] },
      { x: 0.45, z: 0.1, h: 0.72, mat: candleWaxes[2] },
    ];

    candlePositions.forEach((pos) => {
      const cGroup = new THREE.Group();
      const candleGeom = new THREE.CylinderGeometry(0.042, 0.042, pos.h, 24);
      const candleMesh = new THREE.Mesh(candleGeom, pos.mat);
      candleMesh.position.y = topTierY + topTierH + pos.h / 2;
      candleMesh.castShadow = true;
      cGroup.add(candleMesh);

      const cRing = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 12, 24).rotateX(Math.PI / 2), goldMat);
      cRing.position.y = topTierY + topTierH + 0.015;
      cGroup.add(cRing);

      const wickGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.09, 8);
      const wickMesh = new THREE.Mesh(wickGeom, new THREE.MeshBasicMaterial({ color: 0x1e1e1e }));
      wickMesh.position.y = topTierY + topTierH + pos.h + 0.045;
      cGroup.add(wickMesh);

      const flameGroup = new THREE.Group();
      const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 16).translate(0, 0.09, 0), flameMat);
      flameGroup.add(outerFlame);

      const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.11, 12).translate(0, 0.055, 0), flameCoreMat);
      flameGroup.add(innerFlame);

      flameGroup.position.y = topTierY + topTierH + pos.h + 0.07;
      cGroup.add(flameGroup);
      flameMeshes.push(flameGroup);

      const cLight = new THREE.PointLight(0xffa238, 2.2, 5.0);
      cLight.position.y = topTierY + topTierH + pos.h + 0.16;
      cLight.castShadow = true;
      cGroup.add(cLight);
      candleLights.push(cLight);

      cGroup.position.set(pos.x, 0, pos.z);
      candlesGroup.add(cGroup);
    });

    cakeGroup.add(candlesGroup);

    // --- 3D Chef's Cake Knife ---
    const knifeGroup = new THREE.Group();

    const bladeLen = 2.2;
    const bladeGeom = new THREE.BoxGeometry(0.024, 0.36, bladeLen);
    bladeGeom.translate(0, 0, -bladeLen / 2);
    const bladeMesh = new THREE.Mesh(bladeGeom, knifeBladeMat);
    bladeMesh.castShadow = true;
    knifeGroup.add(bladeMesh);

    const edgeBevel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.018, bladeLen, 8).rotateX(Math.PI / 2),
      knifeBladeMat
    );
    edgeBevel.position.set(0, -0.18, -bladeLen / 2);
    knifeGroup.add(edgeBevel);

    const bolsterGeom = new THREE.BoxGeometry(0.065, 0.42, 0.12);
    bolsterGeom.translate(0, 0, 0.06);
    const bolsterMesh = new THREE.Mesh(bolsterGeom, goldMat);
    knifeGroup.add(bolsterMesh);

    const handleLen = 1.1;
    const handleGeom = new THREE.BoxGeometry(0.06, 0.28, handleLen);
    handleGeom.translate(0, 0, 0.12 + handleLen / 2);
    const handleMesh = new THREE.Mesh(handleGeom, knifeHandleMat);
    handleMesh.castShadow = true;
    knifeGroup.add(handleMesh);

    for (let pin = 0; pin < 3; pin++) {
      const pinMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.065, 12).rotateZ(Math.PI / 2),
        goldMat
      );
      pinMesh.position.set(0, 0, 0.32 + pin * 0.32);
      knifeGroup.add(pinMesh);
    }

    knifeGroup.position.set(0, 5.0, 0);
    knifeGroup.visible = false;
    scene.add(knifeGroup);

    // --- Smoke Particle Generator ---
    const smokeGeom = new THREE.SphereGeometry(0.035, 8, 8);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      transparent: true,
      opacity: 0.65,
    });

    const triggerSmoke = () => {
      candlePositions.forEach((pos) => {
        for (let s = 0; s < 8; s++) {
          const sMesh = new THREE.Mesh(smokeGeom, smokeMat.clone());
          sMesh.position.set(
            pos.x + (Math.random() - 0.5) * 0.08,
            topTierY + topTierH + pos.h + 0.1,
            pos.z + (Math.random() - 0.5) * 0.08
          );
          scene.add(sMesh);
          stateRef.current.smokeParticles.push({
            mesh: sMesh,
            vy: 0.022 + Math.random() * 0.03,
            vx: (Math.random() - 0.5) * 0.018,
            vz: (Math.random() - 0.5) * 0.018,
            life: 0,
            maxLife: 45 + Math.random() * 20,
          });
        }
      });
    };

    // --- Mouse / Touch Orbit Controls ---
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      stateRef.current.isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      stateRef.current.prevPointerX = clientX;
      stateRef.current.prevPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!stateRef.current.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - stateRef.current.prevPointerX;
      const dy = clientY - stateRef.current.prevPointerY;

      stateRef.current.targetRotationY += dx * 0.007;
      stateRef.current.targetRotationX = Math.max(
        -0.05,
        Math.min(0.55, stateRef.current.targetRotationX + dy * 0.005)
      );

      stateRef.current.prevPointerX = clientX;
      stateRef.current.prevPointerY = clientY;
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let wasCandlesLit = stateRef.current.candlesLit;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Ambient drift when not dragging
      if (!stateRef.current.isDragging) {
        stateRef.current.targetRotationY += 0.002;
      }
      stateRef.current.rotationY += (stateRef.current.targetRotationY - stateRef.current.rotationY) * 0.08;
      stateRef.current.rotationX += (stateRef.current.targetRotationX - stateRef.current.rotationX) * 0.08;

      cakeGroup.rotation.y = stateRef.current.rotationY;
      cakeGroup.rotation.x = stateRef.current.rotationX;

      // Candle Flame Animation
      if (stateRef.current.candlesLit) {
        flameMeshes.forEach((flame, i) => {
          flame.visible = true;
          const flicker = 1.0 + Math.sin(elapsed * 16 + i * 2.2) * 0.1 + Math.cos(elapsed * 24 + i) * 0.06;
          flame.scale.set(flicker, flicker * 1.08, flicker);
          flame.rotation.z = Math.sin(elapsed * 12 + i) * 0.08;
        });
        candleLights.forEach((light, i) => {
          light.intensity = 2.2 + Math.sin(elapsed * 18 + i) * 0.5;
        });
        wasCandlesLit = true;
      } else {
        if (wasCandlesLit) {
          triggerSmoke();
          wasCandlesLit = false;
        }
        flameMeshes.forEach((flame) => {
          flame.visible = false;
        });
        candleLights.forEach((light) => {
          light.intensity = 0;
        });
      }

      // Smoke Particles
      for (let i = stateRef.current.smokeParticles.length - 1; i >= 0; i--) {
        const p = stateRef.current.smokeParticles[i];
        p.life += 1;
        p.mesh.position.y += p.vy;
        p.mesh.position.x += p.vx;
        p.mesh.position.z += p.vz;
        const progress = p.life / p.maxLife;
        const s = 1.0 + progress * 2.5;
        p.mesh.scale.set(s, s, s);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - progress) * 0.65);

        if (p.life >= p.maxLife) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          stateRef.current.smokeParticles.splice(i, 1);
        }
      }

      // --- Slicing Animation Sequence ---
      if (stateRef.current.cakeCut) {
        dessertPlateGroup.visible = true;

        if (stateRef.current.isCutting) {
          stateRef.current.cutProgress = Math.min(1.0, stateRef.current.cutProgress + delta * 0.85);
          const cp = stateRef.current.cutProgress;

          knifeGroup.visible = true;

          const worldBisector = midSliceAngle + cakeGroup.rotation.y;
          const radialDist = 1.8;
          const kX = Math.sin(worldBisector) * radialDist;
          const kZ = Math.cos(worldBisector) * radialDist;

          knifeGroup.rotation.y = worldBisector;

          if (cp < 0.35) {
            const p1 = cp / 0.35;
            knifeGroup.position.set(kX, 4.0 - p1 * 1.6, kZ);
            knifeGroup.rotation.x = 0.15 - p1 * 0.1;
          } else if (cp < 0.7) {
            const p2 = (cp - 0.35) / 0.35;
            knifeGroup.position.set(kX, 2.4 - p2 * 1.9, kZ);
            knifeGroup.rotation.x = 0.05 + Math.sin(p2 * Math.PI) * 0.06;
          } else {
            const p3 = (cp - 0.7) / 0.3;
            knifeGroup.position.set(kX, 0.5 + p3 * 2.8, kZ);
            knifeGroup.rotation.x = -0.2 * p3;
            if (p3 > 0.95) knifeGroup.visible = false;
          }

          if (cp > 0.45) {
            const sp = Math.min(1.0, (cp - 0.45) / 0.55);
            const easeOut = 1 - Math.pow(1 - sp, 3);
            const dist = easeOut * 2.25;
            sliceGroup.position.set(sliceTargetDir.x * dist, 0, sliceTargetDir.z * dist);
            sliceGroup.rotation.z = Math.sin(sp * Math.PI) * 0.04;
          }

          if (cp >= 1.0) {
            stateRef.current.isCutting = false;
            stateRef.current.knifeState = 'done';
            if (stateRef.current.onSliceComplete) {
              stateRef.current.onSliceComplete();
            }
          }
        }
      } else {
        knifeGroup.visible = false;
        dessertPlateGroup.visible = false;
        sliceGroup.position.set(0, 0, 0);
        sliceGroup.rotation.set(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Click and drag to rotate 3D cake in 360°"
    />
  );
};
