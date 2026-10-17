import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { measure } from "@/lib/printPricing";

export const ACCEPTED = [".stl", ".obj", ".3mf"];

export type LoadedModel = {
  geometry: THREE.BufferGeometry;
  volumeCm3: number;
  areaCm2: number;
  sizeMm: [number, number, number];
};

/** Flatten every mesh in a group into one non-indexed, world-space geometry. */
function flatten(root: THREE.Object3D): THREE.BufferGeometry {
  root.updateMatrixWorld(true);
  const chunks: Float32Array[] = [];
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    const g = (mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone())
      .applyMatrix4(mesh.matrixWorld);
    chunks.push(g.getAttribute("position").array as Float32Array);
  });
  const out = new Float32Array(chunks.reduce((n, c) => n + c.length, 0));
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(out, 3));
  return geometry;
}

export async function loadModel(file: File): Promise<LoadedModel> {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  let geometry: THREE.BufferGeometry;

  if (ext === ".stl") {
    const g = new STLLoader().parse(await file.arrayBuffer());
    geometry = g.index ? g.toNonIndexed() : g;
  } else if (ext === ".obj") {
    geometry = flatten(new OBJLoader().parse(await file.text()));
  } else if (ext === ".3mf") {
    geometry = flatten(new ThreeMFLoader().parse(await file.arrayBuffer()));
  } else {
    throw new Error("Unsupported file type. Use STL, OBJ or 3MF.");
  }

  const pos = geometry.getAttribute("position");
  if (!pos || pos.count < 3) throw new Error("No printable geometry found in this file.");

  const { volumeMm3, areaMm2 } = measure(pos.array);
  if (volumeMm3 <= 0) throw new Error("The model has no volume. Is it a closed solid?");

  geometry.computeBoundingBox();
  const size = new THREE.Vector3();
  geometry.boundingBox!.getSize(size);
  geometry.computeVertexNormals();

  return {
    geometry,
    volumeCm3: volumeMm3 / 1000,
    areaCm2: areaMm2 / 100,
    sizeMm: [size.x, size.y, size.z],
  };
}
