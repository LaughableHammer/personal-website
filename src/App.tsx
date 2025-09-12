'use client'
import { useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import { LampContainer } from "./components/ui/lamp";
import TypewriterCycle from "./components/ui/typewriter-effect";
import DrawstringCord from "./components/drawstring-cord";

function App() {
  const [lampOn, setLampOn] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* <DrawstringCord onToggle={() => setLampOn((prev) => !prev)} /> */}
        <div className="fixed top-0 right-0 z-30">
          <DrawstringCord onToggle={() => setLampOn((prev) => !prev)} />
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
              {/* <button
                onClick={() => setLampOn((prev) => !prev)}
                className="mt-6 px-6 py-3 rounded-2xl bg-slate-800 text-white font-semibold shadow-lg hover:bg-slate-700 transition"
              >
                {lampOn ? "Turn Lamp Off" : "Turn Lamp On"}
              </button> */}
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
            {/* <div className="h-[150vh]" /> */}
          </div>
        </div>
    </div>
  );
}

export default App;
