import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

// * ----------Gsap + scollTrigger animation-------dry approach in Feature.jsx--------

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse", //enter leave enter-back leave-back
      start: "top 85%",// targeting the top of element 85% of the viewPort screen
      ...scrollProps, // addtional scrollTrigger props destructuring
    },
  });
};

//*-----------Gsap + timeline + three.js rotation animation-------------

export const animateWithGsapTimeline = (
  timeline,
  rotationRef, // small or large three.group ref
  rotationState,
  firstTarget,
  secondTarget,
  animationProps// getting all
) => {
  // moving back to initial rotation state the current rotation state
  timeline.to(rotationRef.current.rotation, {
    y: rotationState, // y axis rotation -three.js vertical up-down axis default
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,// passing all animation props-{transform,duration} 
      ease: "power2.inOut",
    },
    "<" //!----label------?how it works?---- synchronize the start of this animation with the end of the previous animation-----------
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
