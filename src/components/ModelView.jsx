/* eslint-disable react/no-unknown-property */

import {
  // Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      //! 6.1 and 6.7 size toggle ------------⬇️---showing one 3D model at a time and hiding another one
      // absolute- bring both 3D model in the same position but one will be hidden initially
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}F
      <ambientLight intensity={0.3} />
      {/* Eye like camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      {/* custom lights component */}
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false} //*so you can't move the view around in the 3D scene.*- Panning is like moving the camera around without changing where it's looking.
        rotateSpeed={0.4} // smooth rotation
        target={new THREE.Vector3(0, 0, 0)} // camera target at center-xyz axis
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())} // rotation state at end of rotation when we stop to rotate the 3D model
      />
      {/* //! Without Orbitcontrols cann't rotate the IPhone by mouse */}
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          {/* //* ----------3D Model------------------ */}
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} // initial the size is very small making it increase dynamically for large size
            /* //* ----------details------------------ */
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
