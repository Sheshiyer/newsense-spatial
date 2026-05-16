import { useMemo } from "react";
import { Color, PlaneGeometry } from "three";

export function GroundPlane() {
  const planeGeometry = useMemo(() => {
    const geometry = new PlaneGeometry(70, 70, 120, 120);
    const positions = geometry.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const distance = Math.sqrt(x * x + y * y);
      const height =
        Math.cos(x * 0.08) * 0.05 +
        Math.sin(y * 0.12) * 0.04 -
        Math.min(distance * 0.0022, 0.24);
      positions.setZ(index, height);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <>
      <mesh geometry={planeGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.86, -4]}>
        <meshStandardMaterial color={new Color("#202020")} roughness={0.96} metalness={0.08} />
      </mesh>

      <mesh position={[0, 2.9, -16]}>
        <circleGeometry args={[8.5, 64]} />
        <meshBasicMaterial color="#6d5633" transparent opacity={0.16} />
      </mesh>
    </>
  );
}
