import { useState } from "react";
import { motion } from "motion/react";
import "./App.css";
import { LampContainer } from "./components/ui/lamp";

function App() {
  const [lampOn, setLampOn] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
      {/* Glow at the top */}
      <div className="fixed top-0 left-0 w-full z-0 pointer-events-none">
        <LampContainer lampOn={lampOn} children={undefined} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-8 pt-48">
        {/* Left half: text */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent">
            Build lamps <br /> the right way
          </h1>
          <p className="text-lg md:text-xl text-slate-400">
            A glowing experiment in React, Tailwind and Motion.  
            Click the button below to turn on the light!
          </p>
          <button
            onClick={() => setLampOn((prev) => !prev)}
            className="mt-6 px-6 py-3 rounded-2xl bg-slate-800 text-white font-semibold shadow-lg hover:bg-slate-700 transition"
          >
            {lampOn ? "Turn Lamp Off" : "Turn Lamp On"}
          </button>
        </motion.div>

        {/* Right half: avatar */}
        <motion.div
          animate={{ opacity: lampOn ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0"
        >
          <img
            src="/3d_avatar.png"
            alt="3D Avatar"
            className="w-72 md:w-96 object-contain"
          />
        </motion.div>
      </div>

      {/* Dummy scroll space */}
      <div className="h-[150vh]" />
    </div>
  );
}

export default App;
