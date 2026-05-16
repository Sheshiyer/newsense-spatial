import {
  CameraControls,
  ContactShadows,
  Environment,
  useProgress,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Group, MathUtils } from "three";
import { useSceneStore } from "../store/sceneStore";
import { GroundPlane } from "./GroundPlane";
import { NewsenseModel } from "./NewsenseModel";

type Vector3Tuple = [number, number, number];

type RigPose = {
  position: Vector3Tuple;
  rotationY: number;
  scale: number;
  floatAmplitude: number;
  floatSpeed: number;
  spinSpeed: number;
};

type ScenePreset = {
  camera: {
    position: Vector3Tuple;
    target: Vector3Tuple;
  };
  stage: RigPose;
  motion: RigPose;
  editorial: RigPose;
};

const SCENE_PRESETS = {
  home: {
    camera: {
      position: [1.2, 2.5, 16.8],
      target: [0.7, 1.82, -0.85],
    },
    stage: {
      position: [3.15, 0.02, -0.35],
      rotationY: -0.14,
      scale: 1.08,
      floatAmplitude: 0.04,
      floatSpeed: 0.48,
      spinSpeed: 0,
    },
    motion: {
      position: [-5.15, 0.82, -1.8],
      rotationY: 0.6,
      scale: 1,
      floatAmplitude: 0.08,
      floatSpeed: 0.9,
      spinSpeed: 0.08,
    },
    editorial: {
      position: [-0.4, 0.14, -6.1],
      rotationY: 0.18,
      scale: 0.94,
      floatAmplitude: 0.03,
      floatSpeed: 0.62,
      spinSpeed: 0.03,
    },
  },
  projects: {
    camera: {
      position: [-1.25, 2.45, 13.6],
      target: [-0.1, 1.8, -1.55],
    },
    stage: {
      position: [4.2, 0.02, 0.2],
      rotationY: -0.28,
      scale: 0.98,
      floatAmplitude: 0.03,
      floatSpeed: 0.44,
      spinSpeed: 0,
    },
    motion: {
      position: [-4.35, 0.98, -0.7],
      rotationY: 0.82,
      scale: 1.12,
      floatAmplitude: 0.09,
      floatSpeed: 1,
      spinSpeed: 0.12,
    },
    editorial: {
      position: [0.5, 0.18, -4.2],
      rotationY: -0.24,
      scale: 1.18,
      floatAmplitude: 0.04,
      floatSpeed: 0.58,
      spinSpeed: 0.04,
    },
  },
  projectDetail: {
    camera: {
      position: [1.55, 2.2, 9.8],
      target: [0.5, 1.7, -2.35],
    },
    stage: {
      position: [5.1, -0.04, -1.25],
      rotationY: -0.42,
      scale: 0.92,
      floatAmplitude: 0.02,
      floatSpeed: 0.36,
      spinSpeed: 0,
    },
    motion: {
      position: [-5.75, 1.18, -2.5],
      rotationY: 0.92,
      scale: 0.96,
      floatAmplitude: 0.05,
      floatSpeed: 0.84,
      spinSpeed: 0.06,
    },
    editorial: {
      position: [0.1, 0.22, -2.35],
      rotationY: 0.08,
      scale: 1.42,
      floatAmplitude: 0.02,
      floatSpeed: 0.44,
      spinSpeed: 0.02,
    },
  },
  studio: {
    camera: {
      position: [2.85, 2.24, 12.8],
      target: [1.25, 1.84, -0.8],
    },
    stage: {
      position: [2.7, 0.02, -0.3],
      rotationY: -0.22,
      scale: 1.12,
      floatAmplitude: 0.03,
      floatSpeed: 0.4,
      spinSpeed: 0,
    },
    motion: {
      position: [-3.95, 1.02, -1.65],
      rotationY: 0.66,
      scale: 0.94,
      floatAmplitude: 0.06,
      floatSpeed: 0.8,
      spinSpeed: 0.06,
    },
    editorial: {
      position: [1.35, 0.1, -4.75],
      rotationY: 0.42,
      scale: 1.28,
      floatAmplitude: 0.03,
      floatSpeed: 0.54,
      spinSpeed: 0.01,
    },
  },
  team: {
    camera: {
      position: [2.2, 2.18, 11.6],
      target: [0.75, 1.76, -0.95],
    },
    stage: {
      position: [3.4, 0.02, 0.4],
      rotationY: -0.18,
      scale: 1,
      floatAmplitude: 0.03,
      floatSpeed: 0.42,
      spinSpeed: 0,
    },
    motion: {
      position: [-3.2, 1.18, -0.9],
      rotationY: 0.7,
      scale: 0.92,
      floatAmplitude: 0.06,
      floatSpeed: 0.88,
      spinSpeed: 0.06,
    },
    editorial: {
      position: [0.25, 0.16, -3.55],
      rotationY: -0.1,
      scale: 1.12,
      floatAmplitude: 0.03,
      floatSpeed: 0.6,
      spinSpeed: 0.03,
    },
  },
  contact: {
    camera: {
      position: [1.4, 2.02, 10.65],
      target: [0.72, 1.64, -0.7],
    },
    stage: {
      position: [2.6, 0.01, -0.1],
      rotationY: -0.16,
      scale: 0.96,
      floatAmplitude: 0.02,
      floatSpeed: 0.38,
      spinSpeed: 0,
    },
    motion: {
      position: [-2.95, 0.92, -1.15],
      rotationY: 0.5,
      scale: 0.88,
      floatAmplitude: 0.05,
      floatSpeed: 0.74,
      spinSpeed: 0.05,
    },
    editorial: {
      position: [0.55, 0.16, -3.1],
      rotationY: 0.22,
      scale: 1.06,
      floatAmplitude: 0.03,
      floatSpeed: 0.48,
      spinSpeed: 0.02,
    },
  },
  archive: {
    camera: {
      position: [-2.4, 2.34, 12.95],
      target: [-1.05, 1.74, -0.85],
    },
    stage: {
      position: [4.95, -0.08, -1.1],
      rotationY: -0.34,
      scale: 0.88,
      floatAmplitude: 0.02,
      floatSpeed: 0.32,
      spinSpeed: 0,
    },
    motion: {
      position: [-5.55, 0.84, -2.35],
      rotationY: 0.5,
      scale: 0.82,
      floatAmplitude: 0.04,
      floatSpeed: 0.65,
      spinSpeed: 0.03,
    },
    editorial: {
      position: [0.9, 0.1, -5.25],
      rotationY: -0.3,
      scale: 0.94,
      floatAmplitude: 0.02,
      floatSpeed: 0.4,
      spinSpeed: 0.01,
    },
  },
  archiveDetail: {
    camera: {
      position: [-0.85, 2.16, 10.4],
      target: [-0.15, 1.7, -2.2],
    },
    stage: {
      position: [5.5, -0.12, -1.75],
      rotationY: -0.48,
      scale: 0.8,
      floatAmplitude: 0.01,
      floatSpeed: 0.28,
      spinSpeed: 0,
    },
    motion: {
      position: [-6.05, 0.76, -3.05],
      rotationY: 0.42,
      scale: 0.74,
      floatAmplitude: 0.03,
      floatSpeed: 0.52,
      spinSpeed: 0.02,
    },
    editorial: {
      position: [-0.2, 0.12, -2.65],
      rotationY: -0.08,
      scale: 1.28,
      floatAmplitude: 0.02,
      floatSpeed: 0.36,
      spinSpeed: 0.01,
    },
  },
} as const satisfies Record<string, ScenePreset>;

type SceneMode = keyof typeof SCENE_PRESETS;

function resolveSceneMode(
  focusTarget: ReturnType<typeof useSceneStore.getState>["focusTarget"],
  selectedProjectSlug: string | null,
  selectedArchiveSlug: string | null,
): SceneMode {
  if (selectedProjectSlug) {
    return "projectDetail";
  }

  if (selectedArchiveSlug) {
    return "archiveDetail";
  }

  return focusTarget;
}

function animateRig(
  rig: Group,
  pose: RigPose,
  time: number,
  delta: number,
) {
  rig.position.x = MathUtils.lerp(rig.position.x, pose.position[0], delta * 1.55);
  rig.position.z = MathUtils.lerp(rig.position.z, pose.position[2], delta * 1.55);
  rig.position.y = MathUtils.lerp(
    rig.position.y,
    pose.position[1] + Math.sin(time * pose.floatSpeed) * pose.floatAmplitude,
    delta * 1.85,
  );
  rig.rotation.y = MathUtils.lerp(
    rig.rotation.y,
    pose.rotationY + time * pose.spinSpeed,
    delta * 1.4,
  );
  const nextScale = MathUtils.lerp(rig.scale.x, pose.scale, delta * 1.5);
  rig.scale.setScalar(nextScale);
}

export function HomeScene() {
  const focusTarget = useSceneStore((state) => state.focusTarget);
  const selectedProjectSlug = useSceneStore((state) => state.selectedProjectSlug);
  const selectedArchiveSlug = useSceneStore((state) => state.selectedArchiveSlug);
  const setReady = useSceneStore((state) => state.setReady);
  const controlsRef = useRef<CameraControls>(null);
  const stageRigRef = useRef<Group>(null);
  const motionRigRef = useRef<Group>(null);
  const editorialRigRef = useRef<Group>(null);
  const introPlayedRef = useRef(false);
  const { active } = useProgress();
  const sceneMode = resolveSceneMode(
    focusTarget,
    selectedProjectSlug,
    selectedArchiveSlug,
  );

  useEffect(() => {
    setReady(!active);
  }, [active, setReady]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const preset = SCENE_PRESETS[sceneMode].camera;
    controls.setLookAt(
      preset.position[0],
      preset.position[1],
      preset.position[2],
      preset.target[0],
      preset.target[1],
      preset.target[2],
      true,
    );
  }, [sceneMode]);

  useEffect(() => {
    if (introPlayedRef.current) {
      return;
    }

    const stageRig = stageRigRef.current;
    const motionRig = motionRigRef.current;
    const editorialRig = editorialRigRef.current;

    if (!stageRig || !motionRig || !editorialRig) {
      return;
    }

    introPlayedRef.current = true;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(
      stageRig.position,
      { x: 3.8, y: -1.8, z: 1.8 },
      { x: 3.15, y: 0.02, z: -0.35, duration: 1.6 },
    );
    timeline.fromTo(
      stageRig.rotation,
      { y: 0.4 },
      { y: -0.22, duration: 1.6 },
      "<",
    );
    timeline.fromTo(
      motionRig.position,
      { x: -7.2, y: 2.2, z: -2.8 },
      { x: -5.15, y: 0.82, z: -1.8, duration: 1.35 },
      "-=1.05",
    );
    timeline.fromTo(
      motionRig.rotation,
      { y: -0.2 },
      { y: 0.6, duration: 1.35 },
      "<",
    );
    timeline.fromTo(
      editorialRig.position,
      { x: 1.8, y: 3.6, z: -8.6 },
      { x: -0.4, y: 0.14, z: -6.1, duration: 1.45 },
      "-=0.95",
    );
    timeline.fromTo(
      editorialRig.rotation,
      { y: -0.48 },
      { y: 0.18, duration: 1.45 },
      "<",
    );
    timeline.fromTo(
      editorialRig.scale,
      { x: 0.72, y: 0.72, z: 0.72 },
      { x: 0.94, y: 0.94, z: 0.94, duration: 1.45 },
      "<",
    );

    return () => {
      timeline.kill();
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const preset = SCENE_PRESETS[sceneMode];

    if (stageRigRef.current) {
      animateRig(stageRigRef.current, preset.stage, time, delta);
    }

    if (motionRigRef.current) {
      animateRig(motionRigRef.current, preset.motion, time, delta);
    }

    if (editorialRigRef.current) {
      animateRig(editorialRigRef.current, preset.editorial, time, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        intensity={2.6}
        position={[6, 10, 7]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="studio" environmentIntensity={0.55} />

      <group ref={stageRigRef} position={[3.15, 0.02, -0.35]}>
        <NewsenseModel
          path="/models/newsense/stage-support.glb"
          targetHeight={3.55}
          rotation={[0, -0.22, 0]}
        />
      </group>

      <group ref={motionRigRef} position={[-5.15, 0.82, -1.8]}>
        <NewsenseModel
          path="/models/newsense/motion-node.glb"
          targetHeight={2.25}
          rotation={[0, 0.6, 0]}
        />
      </group>

      <group ref={editorialRigRef} position={[-0.4, 0.14, -6.1]}>
        <NewsenseModel
          path="/models/newsense/editorial-frame.glb"
          targetHeight={4.8}
          rotation={[0, 0.22, 0]}
        />
      </group>

      <GroundPlane />

      <ContactShadows
        position={[0, -0.78, -0.2]}
        opacity={0.32}
        scale={24}
        blur={2.8}
        far={7}
      />

      <CameraControls
        ref={controlsRef}
        enabled={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3.2}
      />
    </>
  );
}
