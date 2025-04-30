import { useGLTF } from "@react-three/drei";

export function TukTukRickshaw(props) {
  const { nodes, materials } = useGLTF("/models/tuk_tuk_rikshaw/scene.gltf");

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.195}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[0, 315.201, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane001_Body_01_0.geometry}
              material={materials.Body_01}
            />
            <group
              position={[0, -1.92, 6.188]}
              rotation={[-2.959, 0, 0]}
              scale={2.414}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rin_Metal_Rin_0.geometry}
                material={materials.Metal_Rin}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rin_Llanta_0.geometry}
                material={materials.Llanta}
              />
            </group>
            <group
              position={[0, -1.92, -5.035]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={2.414}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rin001_Metal_Rin_0.geometry}
                material={materials.Metal_Rin}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rin001_Llanta_0.geometry}
                material={materials.Llanta}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane002_Top_0.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane003_Glass_0.geometry}
              material={materials.Glass}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/tuk_tuk_rikshaw/scene.gltf");

export default TukTukRickshaw;
