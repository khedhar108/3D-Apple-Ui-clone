import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import gsap from "gsap";

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {

    //*---------- video animation------------------
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo ",
        toggleActions: "play pause reverse restart", //? different due to video animaiton on scroll
        start: "-10% bottom",
        // start: targetElement vertical(y-axis) --cross-- viewPort screen
        //! when explore video is just coming the viewPort screen and cross the viewPort bottom of the screen - animation starts
      },
      // video start to play agai when completed
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap("#features_title", { y: 0, opacity: 1 });
    //*---------------image animation------------------
    animateWithGsap(
      ".g_grow", // target
      { scale: 1, opacity: 1, ease: "power1" }, //animationProps
      { scrub: 5.5 } // scrollProps
    );
    // *---------------text animation------------------
    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="overflow-hidden relative h-full common-padding bg-zinc">
      <div className="screen-max-wdith">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        {/* //*------containers ----feature-video, feature-text-conntainer, feature-text-----initial opacity:0--------  opacity:1 by gsap scrolltrigger-- */}
        <div className="flex overflow-hidden flex-col justify-center items-center">
          {/* //*------heading container-------------- */}
          <div className="pl-24 mt-32 mb-24">
            <h2 className="text-5xl font-semibold lg:text-7xl">iPhone.</h2>
            <h2 className="text-5xl font-semibold lg:text-7xl">
              Forged in titanium.
            </h2>
          </div>

          <div className="flex-col flex-center sm:px-10">
            {/* //*------video container-------------- */}
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="object-cover object-center w-full h-full"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            {/* //*------image container-------------- */}
            <div className="flex relative flex-col w-full">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium 2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>
              {/* //*------text container-------------- */}
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

