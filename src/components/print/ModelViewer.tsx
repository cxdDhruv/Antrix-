"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/** Orbitable preview of a (Z-up, mm) print geometry. */
export function ModelViewer({
  geometry,
  color,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(1, 2, 1.5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(-1.5, 0.5, -1);
    scene.add(rim);

    const material = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.55,
      metalness: 0.05,
    });
    materialRef.current = material;

    // Slicers treat Z as up; three uses Y. Centre on the bed.
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    mesh.position.set(-center.x, -box.min.y, -center.z);
    scene.add(mesh);

    const radius = Math.max(size.x, size.y, size.z) || 1;
    const grid = new THREE.GridHelper(radius * 2.4, 24, 0x444444, 0x262626);
    scene.add(grid);

    const camera = new THREE.PerspectiveCamera(35, 1, radius / 100, radius * 50);
    camera.position.set(radius * 1.6, radius * 1.2, radius * 1.9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, size.y / 2, 0);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.update();
    const stopSpin = () => (controls.autoRotate = false);
    controls.addEventListener("start", stopSpin);

    function resize() {
      const w = host!.clientWidth;
      const h = host!.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.removeEventListener("start", stopSpin);
      controls.dispose();
      material.dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
      materialRef.current = null;
    };
    // Colour changes are applied below without rebuilding the scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  useEffect(() => {
    materialRef.current?.color.set(color);
  }, [color]);

  return <div ref={hostRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />;
}
