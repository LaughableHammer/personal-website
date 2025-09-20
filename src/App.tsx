'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { lazy, Suspense } from "react";
import './App.css';
import { LampContainer } from './components/ui/lamp';
import TypewriterCycle from './components/ui/typewriter-effect';
import DrawstringCord from './components/ui/drawstring-cord';
// import { PixelatedCanvas } from './components/ui/pixelated-canvas';
const PixelatedCanvas = lazy(() => import("./components/ui/pixelated-canvas"));
const ImageCarousel = lazy(() => import("./components/ui/image-carousel"));
import LightBulb from './components/ui/lightbulb';



function HeroSection({ lampOn }: { lampOn: boolean }) {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden snap-start flex items-center justify-center pb-[10%]">
      {/* Lamp graphics */}
      <div className="fixed top-0 left-0 w-full z-10 pointer-events-none">
        <LampContainer lampOn={lampOn} />
      </div>

      {/* Content */}
      <div className="relative z-20 px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Text */}
          <motion.div
            animate={{ opacity: lampOn ? 1 : 0.1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 text-center md:text-left space-y-6"
          >
            <TypewriterCycle />
            <p className="text-lg md:text-xl text-slate-400">
              Part-time penetration tester for the Australian Government and
              full-time fan of the UNSW Security Society
            </p>
          </motion.div>

          {/* Avatar */}
          <motion.div
            animate={{ opacity: lampOn ? 1 : 0.1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
          >
            <div className="relative w-72 md:w-96">
              <img
                src="/3d_avatar.png"
                alt="3D Avatar"
                className="w-full object-contain relative z-10"
              />
              {/* Fade mask */}
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ lampOn }: { lampOn: boolean }) {
  const [pixelated, setPixelated] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillDetails: Record<string, React.ReactNode> = {
    'Penetration Testing':
      "I use the skills I've acquired in countless CTF competitions to identify security flaws in web apps, APIs, and infrastructure to protect everyday Australians",
    Infrastructure:
      'I enjoy setting up hardware/cloud infra to host projects that provide QOL improvements for myself and others. I have hosted infra for CTFs competitions on CTFd on bare metal and maintain a multi-use homelab',
    Programming: (
      <>
        I'm a CS student at UNSW and enjoy full stack dev (minus the frontend
        part) - checkout my latest project{' '}
        <a
          href="https://github.com/unswsecsoc/SecSock"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline hover:text-emerald-300"
        >
          SecSock
        </a>
      </>
    ),
    Mentoring:
      "As a previous cyber and networking tutor for high school students, I'm passionate about passing on my experience to those who want to get started in cyber",
  };

  return (
    <section
      className="min-h-screen snap-start flex justify-center items-center relative px-6 sm:px-12 py-16 
                 bg-gradient-to-b from-black via-slate-1000 to-slate-950 overflow-hidden"
    >
      <motion.div
        className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: lampOn ? 1 : 0.1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-sm lg:max-w-md">
            <div
              className="mx-auto mt-8 cursor-pointer transition-transform hover:scale-105"
              onClick={() => setPixelated(!pixelated)}
            >
              {!pixelated ? (
                <img
                  src="/cool_image.jpg"
                  alt="Normal"
                  className="rounded-xl border border-neutral-800 shadow-lg"
                />
              ) : (
                <Suspense fallback={<div>Loading canvas...</div>}> 
                  <div className="flex flex-col items-center space-y-4">
                    <PixelatedCanvas
                      src="/cool_image.jpg"
                      width={450}
                      height={650}
                      cellSize={1}
                      dotScale={0.9}
                      shape="square"
                      backgroundColor="#000000"
                      dropoutStrength={0.4}
                      interactive
                      distortionStrength={3}
                      distortionRadius={80}
                      distortionMode="swirl"
                      followSpeed={0.2}
                      jitterStrength={4}
                      jitterSpeed={4}
                      sampleAverage
                      tintColor="#FFFFFF"
                      tintStrength={0.2}
                      className="rounded-xl border border-neutral-800 shadow-lg"
                    />
                    is your cpu feeling it yet 😈
                  </div>
                </Suspense>
              )}
            </div>

            {/* Glows */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-8 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Right: Text */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-8">
            <h2
              className="text-4xl lg:text-5xl font-bold 
                           bg-gradient-to-r from-white via-emerald-300 to-cyan-400 
                           bg-clip-text text-transparent leading-tight"
            >
              whoami
            </h2>

            <div className="space-y-5 text-lg leading-relaxed text-slate-300">
              <p>
                I'm the current director of Projects at UNSW SecSoc and before
                that I was in the Projects subcommittee.
              </p>
              <p>
                Alongside uni, I'm a penetration tester at Services Australia,
                focusing primarily on web app security.
              </p>
              <p>
                When I'm not doing security, you'll find me meddling with my
                homelab or playing car soccer.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.keys(skillDetails).map((skill) => (
                <motion.button
                  key={skill}
                  onClick={() => setActiveSkill(skill)}
                  whileTap={{ scale: 0.95 }} // tap animation for mobile
                  className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-slate-700/50 
                            hover:scale-105 hover:border-emerald-400/50 
                            hover:shadow-lg hover:shadow-emerald-500/10 
                            transition-all cursor-pointer w-full text-left focus:outline-none"
                >
                  <span className="text-emerald-400 font-medium">{skill}</span>
                </motion.button>
              ))}
            </div>


            {/* <div className="grid grid-cols-2 gap-4">
              {Object.keys(skillDetails).map((skill) => (
                <motion.div
                  key={skill}
                  className="bg-slate-900/60 backdrop-blur-md rounded-lg p-4 border border-slate-700/50 
                             hover:scale-105 hover:border-emerald-400/50 
                             hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer"
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveSkill(skill)}
                >
                  <span className="text-emerald-400 font-medium">{skill}</span>
                </motion.div>
              ))}
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSkill(null)}
          >
            <motion.div
              className="bg-slate-900/90 border border-slate-700 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                {activeSkill}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {skillDetails[activeSkill]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="bg-black text-white overflow-x-hidden relative">
      <LightBulb lampOn={lampOn} height={32} />
      {/* Drawstring Cord */}
      <div className="fixed top-0 right-0 z-30">
        <DrawstringCord onToggle={() => setLampOn(!lampOn)} />
      </div>
      {/* Global lamp glow overlay */}
      <motion.div
        animate={{ opacity: lampOn ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full h-full 
                   bg-gradient-to-b from-cyan-900/40 via-cyan-800/20 to-transparent 
                   z-0 pointer-events-none"
      />
      <HeroSection lampOn={lampOn} />
      <AboutSection lampOn={lampOn} />
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading gallery...</div>}>
        <ImageCarousel
        images={[
          '/secsoc1.webp',
          '/secsoc2.webp',
          '/secsoc3.webp',
          '/secsoc4.webp',
          '/secsoc5.webp',
        ]}
        lightOn={lampOn}
        />
      </Suspense>
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 bottom-0 z-50 rounded-sm origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default App;
