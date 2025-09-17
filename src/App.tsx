'use client'
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import "./App.css";
import { LampContainer } from "./components/ui/lamp";
import TypewriterCycle from "./components/ui/typewriter-effect";
import DrawstringCord from "./components/ui/drawstring-cord";

function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function HeroSection({ lampOn, onToggle }: { lampOn: boolean; onToggle: () => void }) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
        <div className="fixed top-0 right-0 z-30">
          <DrawstringCord onToggle={onToggle} />
        </div>
        {/* Lamp glow overlay at ceiling */}
        <motion.div
          animate={{
            opacity: lampOn ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-900/40 via-cyan-800/20 to-transparent z-0 pointer-events-none"
        />

        {/* Glow design (lamp graphics) */}
        <div className="fixed top-0 left-0 w-full z-10 pointer-events-none">
          <LampContainer lampOn={lampOn} />
        </div>

        {/* Main content */}
        <div className="relative z-20 px-8 pt-48">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            {/* Left half: text */}
            <motion.div
              animate={{ opacity: lampOn ? 1 : 0.25 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 text-center md:text-left space-y-6"
            >
              <TypewriterCycle />
              <p className="text-lg md:text-xl text-slate-400">
                Part-time penetration tester for the Australian Government and full-time fan of the UNSW Security Society
              </p>
            </motion.div>

            {/* Right half: avatar */}
            <motion.div
              animate={{ opacity: lampOn ? 1 : 0.25 }}
              transition={{ duration: 0.5 }}
              className="relative w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
            >
              <div className="relative w-72 md:w-96">
                <img
                  src="/3d_avatar.png"
                  alt="3D Avatar"
                  className="w-full object-contain relative z-10"
                />
                {/* Avatar fade mask limited to avatar width */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
              </div>
            </motion.div>
          </div>
        </div>
    </div>
  );
}

  function AboutSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    
    // Parallax effects for image and text
    const imageX = useParallax(scrollYProgress, -200);
    const textX = useParallax(scrollYProgress, 200);

    return (
      <section className="about-section" ref={ref}>
        <div className="about-container">
          {/* Left: Picture with parallax */}
          <motion.div 
            className="about-image"
            style={{ x: imageX }}
            initial={{ visibility: "hidden" }}
            animate={{ visibility: "visible" }}
          >
            <div className="image-wrapper">
              <div className="placeholder-image">
                <span className="text-slate-400 text-xl">Your Photo</span>
              </div>
              {/* Decorative elements */}
              <div className="glow glow-1"></div>
              <div className="glow glow-2"></div>
            </div>
          </motion.div>

          {/* Right: Content with opposite parallax */}
          <motion.div 
            className="about-content"
            style={{ x: textX }}
            initial={{ visibility: "hidden" }}
            animate={{ visibility: "visible" }}
          >
            <div className="content-wrapper">
              <h2 className="about-title">
                About Me
              </h2>
              
              <div className="about-text">
                <p>
                  I'm a cybersecurity professional with a passion for protecting digital infrastructure and identifying vulnerabilities before they can be exploited.
                </p>
                <p>
                  My work with the Australian Government has given me deep insights into threat landscapes and defensive strategies, while my involvement with the UNSW Security Society keeps me connected to the latest research and techniques.
                </p>
                <p>
                  When I'm not hunting for vulnerabilities or developing security protocols, you'll find me contributing to open-source security tools and mentoring the next generation of cybersecurity professionals.
                </p>
              </div>

              {/* Skills grid */}
              <div className="skills-grid">
                {['Penetration Testing', 'Threat Analysis', 'Security Research', 'Mentoring'].map((skill) => (
                  <div key={skill} className="skill-card">
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  function App() {
    const [lampOn, setLampOn] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });

    return (
      <div className="app-container">
        <HeroSection lampOn={lampOn} onToggle={() => setLampOn(!lampOn)} />
        <AboutSection />
        
        {/* Progress bar */}
        <motion.div className="progress-bar" style={{ scaleX }} />
        
        <StyleSheet />
      </div>
    );
  }

function StyleSheet() {
  return (
    <style>{`
      html {
        scroll-snap-type: y mandatory;
      }
      
      .app-container {
        background: black;
        color: white;
        overflow-x: hidden;
      }
      
      .hero-section {
        height: 100vh;
        scroll-snap-align: start;
        position: relative;
        background: black;
        display: flex;
        align-items: center;
      }
      
      .about-section {
        height: 100vh;
        scroll-snap-align: start;
        background: linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 2rem;
      }
      
      .about-container {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 4rem;
        height: 100%;
      }
      
      .about-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .image-wrapper {
        position: relative;
        width: 100%;
        max-width: 400px;
      }
      
      .placeholder-image {
        width: 100%;
        aspect-ratio: 1;
        background: linear-gradient(135deg, rgb(51, 65, 85) 0%, rgb(71, 85, 105) 100%);
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(148, 163, 184, 0.1);
      }
      
      .glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(40px);
        pointer-events: none;
      }
      
      .glow-1 {
        top: -1rem;
        right: -1rem;
        width: 6rem;
        height: 6rem;
        background: rgba(34, 197, 94, 0.2);
      }
      
      .glow-2 {
        bottom: -1.5rem;
        left: -1.5rem;
        width: 8rem;
        height: 8rem;
        background: rgba(147, 51, 234, 0.1);
      }
      
      .about-content {
        flex: 1;
        display: flex;
        align-items: center;
      }
      
      .content-wrapper {
        width: 100%;
        max-width: 500px;
        space-y: 2rem;
      }
      
      .about-title {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, white 0%, rgb(34, 197, 94) 50%, rgb(59, 130, 246) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 2rem;
        line-height: 1.2;
      }
      
      .about-text {
        space-y: 1rem;
        margin-bottom: 2rem;
      }
      
      .about-text p {
        font-size: 1.125rem;
        line-height: 1.75;
        color: rgb(203, 213, 225);
        margin-bottom: 1rem;
      }
      
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 2rem;
      }
      
      .skill-card {
        background: rgba(51, 65, 85, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 0.5rem;
        padding: 1rem;
        border: 1px solid rgba(71, 85, 105, 0.5);
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .skill-card:hover {
        transform: scale(1.02);
        background: rgba(30, 41, 59, 0.8);
        border-color: rgba(34, 197, 94, 0.5);
        box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
      }
      
      .skill-text {
        color: rgb(34, 197, 94);
        font-weight: 500;
        font-size: 0.875rem;
      }
      
      .progress-bar {
        position: fixed;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, rgb(34, 197, 94) 0%, rgb(59, 130, 246) 100%);
        bottom: 1px;
        transform: scaleX(0);
        transform-origin: 0%;
        z-index: 50;
        border-radius: 2px;
      }
      
      @media (max-width: 768px) {
        .about-container {
          flex-direction: column;
          gap: 2rem;
          padding: 1rem;
        }
        
        .about-title {
          font-size: 2rem;
          text-align: center;
        }
        
        .about-text {
          text-align: center;
        }
        
        .skills-grid {
          grid-template-columns: 1fr;
        }
        
        .placeholder-image {
          max-width: 250px;
        }
      }
    `}</style>
    );
}
// function App() {
//   const [lampOn, setLampOn] = useState(false);

//   return (
//     <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
//         <div className="fixed top-0 right-0 z-30">
//           <DrawstringCord onToggle={() => setLampOn((prev) => !prev)} />
//         </div>
//         {/* Lamp glow overlay at ceiling */}
//         <motion.div
//           animate={{
//             opacity: lampOn ? 1 : 0,
//           }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//           className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-900/40 via-cyan-800/20 to-transparent z-0 pointer-events-none"
//         />

//         {/* Glow design (lamp graphics) */}
//         <div className="fixed top-0 left-0 w-full z-10 pointer-events-none">
//           <LampContainer lampOn={lampOn} />
//         </div>

//         {/* Main content */}
//         <div className="relative z-20 px-8 pt-48">
//           <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
//             {/* Left half: text */}
//             <motion.div
//               animate={{ opacity: lampOn ? 1 : 0.25 }}
//               transition={{ duration: 0.5 }}
//               className="w-full md:w-1/2 text-center md:text-left space-y-6"
//             >
//               <TypewriterCycle />
//               <p className="text-lg md:text-xl text-slate-400">
//                 Part-time penetration tester for the Australian Government and full-time fan of the UNSW Security Society
//               </p>
//             </motion.div>

//             {/* Right half: avatar */}
//             <motion.div
//               animate={{ opacity: lampOn ? 1 : 0.25 }}
//               transition={{ duration: 0.5 }}
//               className="relative w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
//             >
//               <div className="relative w-72 md:w-96">
//                 <img
//                   src="/3d_avatar.png"
//                   alt="3D Avatar"
//                   className="w-full object-contain relative z-10"
//                 />
//                 {/* Avatar fade mask limited to avatar width */}
//                 <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
//               </div>
//             </motion.div>
//             {/* <div className="h-[150vh]" /> */}
//           </div>
//         </div>
//     </div>
//   );
// }

export default App;
