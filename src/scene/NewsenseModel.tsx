import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Object3D, Vector3 } from "three";

type NewsenseModelProps = {
  path: string;
  targetHeight: number;
  rotation?: [number, number, number];
};

type NormalizedModel = {
  object: Object3D;
  scale: number;
  offset: Vector3;
};

export function NewsenseModel({
  path,
  targetHeight,
  rotation = [0, 0, 0],
}: NewsenseModelProps) {
  const { scene } = useGLTF(path);

  const normalized = useMemo<NormalizedModel>(() => {
    const root = scene.clone(true);
    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const safeHeight = Math.max(size.y, 0.001);
    const scale = targetHeight / safeHeight;
    const offset = new Vector3(-center.x, -box.min.y, -center.z);

    root.traverse((child) => {
      if ("castShadow" in child) {
        child.castShadow = true;
      }
      if ("receiveShadow" in child) {
        child.receiveShadow = true;
      }
    });

    return { object: root, scale, offset };
  }, [scene, targetHeight]);

  return (
    <group scale={normalized.scale} rotation={rotation}>
      <primitive object={normalized.object} position={normalized.offset} />
    </group>
  );
}

useGLTF.preload("/models/newsense/stage-support.glb");
useGLTF.preload("/models/newsense/motion-node.glb");
useGLTF.preload("/models/newsense/editorial-frame.glb");
