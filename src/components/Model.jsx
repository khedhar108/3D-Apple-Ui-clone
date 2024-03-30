import { useEffect, useRef, useState } from "react";
// *------------gsap + useGSAP--------------------------
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// *------------THREE + Canvas(fiber) + View(drei)-----------------3D---------
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

import ModelView from "./ModelView";
import { yellowImg } from "../utils";

import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small"); // intial setup for small size mobile view
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model --  rotationRef        --> THREE.Group():create a group of objects that can be transformed together as a single entity in a 3D scene.
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  //?---------------- animateWithGsapTimeline ---------change the rotation of 3D model of iPhone ------------------
  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      //* Behaviour: when 6.7inch size is selected-> view1=small go to left side  and view2=large comes in the frame
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2",
      //---animation Props------
      {// target small-> moving left to 0(initial position) --negative x axis
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",// setup large -x postion to 0(initial position)
        duration: 2,
      });
    }
  }, [size]);

  //---------------------------------------------
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              // custom variables inital values
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")} //useful for interacting with the model
            >
              {/*View:  manage the camera and view settings for the 3D scene, simplifying the process of setting up and controlling the view in a Three.js application. */}
              <View.Port />
            </Canvas>
          </div>

          <div className="w-full mx-auto">
            <p className="mb-5 text-sm font-light text-center">{model.title}</p>
            {/* //*------------color picker---4 options-----for mobile----------------- */}
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 mx-2 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {/* //*------------size picker---2 options-----6.1 and 6.7----------------- */}
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
