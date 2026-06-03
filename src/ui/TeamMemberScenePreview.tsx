import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Group, Object3D, Vector3 } from "three";

type TeamMemberScenePreviewProps = {
  name: string;
  path: string;
};

type NormalizedModel = {
  object: Object3D;
  scale: number;
  offset: Vector3;
};

function TeamMemberModel({ path }: { path: string }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(path);

  const normalized = useMemo<NormalizedModel>(() => {
    const root = scene.clone(true);
    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const safeHeight = Math.max(size.y, 0.001);
    const scale = 2.35 / safeHeight;
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
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.28;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.85) * 0.05;
  });

  return (
    <group ref={groupRef} scale={normalized.scale} position={[0, -1.12, 0]}>
      <primitive object={normalized.object} position={normalized.offset} />
    </group>
  );
}

export function TeamMemberScenePreview({
  name,
  path,
}: TeamMemberScenePreviewProps) {
  return (
    <div className="team-scene-preview" aria-label={`${name} 3D preview`} role="img">
      <Canvas
        camera={{ fov: 24, position: [0, 1.08, 6.2] }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={["#0a0a0b"]} />
        <fog attach="fog" args={["#0a0a0b", 7.5, 13]} />
        <ambientLight intensity={1.5} />
        <directionalLight intensity={2.4} position={[4, 6, 6]} />
        <directionalLight intensity={1.15} position={[-4, 3, 4]} color="#b88e62" />
        <pointLight intensity={10} position={[0, 1.8, 3.8]} color="#f6ecdd" />
        <Suspense fallback={null}>
          <TeamMemberModel path={path} />
        </Suspense>
      </Canvas>
    </div>
  );
}
