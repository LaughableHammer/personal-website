'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { lazy, Suspense } from 'react';
import './App.css';
import { LampContainer } from './components/ui/lamp';
import TypewriterCycle from './components/ui/typewriter-effect';
import DrawstringCord from './components/ui/drawstring-cord';
const ImageCarousel = lazy(() => import('./components/ui/image-carousel'));
import LightBulb from './components/ui/lightbulb';

function HeroSection({ lampOn }: { lampOn: boolean }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);
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
              full-time Computer Science student at UNSW Sydney.
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

      {/* Scroll Down Indicator */}
      {!hasScrolled && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-sm flex flex-col items-center space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: [0, 6, 0] }}
          transition={{
            delay: 1.5,
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="animate-pulse">Scroll down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

function AboutSection({ lampOn }: { lampOn: boolean }) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillDetails: Record<string, React.ReactNode> = {
    'Penetration Testing':
      "I use the skills I've acquired playing in many CTF competitions to identify security flaws in web apps, APIs, and infrastructure as part of my job",
    Infrastructure:
      'I enjoy setting up hardware/cloud infra to host projects that provide QoL improvements for myself and others. I have hosted infra for CTFs competitions on CTFd on bare metal and maintain a multi-use homelab',
    Programming: (
      <>
        I'm a CS student at UNSW and enjoy full stack dev (minus the frontend
        part) - checkout my latest project{' '}
        <a
          href="https://secsock.secso.cc/"
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
                 bg-gradient-to-b from-black via-slate-1000 to-slate-1000 overflow-hidden"
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
          <img
            src="/main_image.png"
            alt="Image of Kushaagra"
          />
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
                I'm a 2nd year Computer Science student at UNSW, majoring in Security Engineering.
              </p>
              <p>
                As a second time projects director at the UNSW Security Society, I'm involved with recruiting and leading subcommittee to build projects that improve technical ability and also have an impact on the security community at UNSW.
              </p>
              <p>
                Alongside I'm a part-time penetration tester at Services Australia,
                focusing primarily on web app security.
              </p>
              <p>
                When I'm not doing security, you'll find me fixing PCs at {' '}
        <a
          href="https://www.arc.unsw.edu.au/community/ereuse"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline hover:text-emerald-300"
        >
          eReuse
        </a>, meddling with my
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

function ContactPanel() {
  return (
    <div className="w-full lg:w-2/5 flex flex-col items-center space-y-6 mt-6 lg:mt-0">

      <h2
        className="text-4xl font-bold 
                   bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400
                   bg-clip-text text-transparent"
      >
        Find Me
      </h2>

      {/* Discord */}
      <a
        href="https://discord.com/users/421601310522081291"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md 
                   border border-slate-700/50 rounded-xl px-6 py-4 w-full 
                   hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/20 
                   transition-all"
      >
        <img src="/discord.png" className="w-7 h-7 opacity-90" />
        <span className="text-lg">Discord</span>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/kushaagra-k/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md 
                   border border-slate-700/50 rounded-xl px-6 py-4 w-full 
                   hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20 
                   transition-all"
      >
        <img src="/linkedin.png" className="w-7 h-7 opacity-90" />
        <span className="text-lg">LinkedIn</span>
      </a>
    </div>
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

      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-7xl">
          
          {/* LEFT: Carousel */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <Suspense fallback={<div>Loading...</div>}>
              <ImageCarousel
                images={["/secsoc1.webp", "/ereuse1.jpg"]}
                lightOn={lampOn}
                embedMode
              />
            </Suspense>
          </div>

          {/* RIGHT: Contact */}
          <div className="w-full lg:w-2/5">
            <ContactPanel />
          </div>

        </div>
      </section>



      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 bottom-0 z-50 rounded-sm origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default App;
