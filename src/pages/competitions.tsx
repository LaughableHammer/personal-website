import { motion } from 'framer-motion';

function Competitions() {
  const ctfComps = [
    {
      name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2021',
      result: '~40 / ~160 — Team: Cyber 4',
      link: '',
    },
    {
      name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2022',
      result: '~13 / ~160 — Team: Sudoers',
    },
    { name: 'DUCTF 2022', result: '387 / 1938 — Team: Laughable-Duck' },
    {
      name: 'CyberTaipan - Australian Youth Cyber Defence Competition 2023',
      result: '🥇 1 / ~160 | Won $5000 — Team: The Kernel Krushers',
    },
    { name: 'DUCTF 2024', result: '234 / 1515 — Team: The Kernel Krushers' },
    { name: 'DamCTF 2024', result: '62 / 207 — Team: P4$$word123' },
    {
      name: 'ASD ANU CTF 2024',
      result: '88 / 187 — Team: The Kernel Krushers',
    },
    {
      name: 'NahamCon CTF 2025',
      result: '388 / 2943 — Team: [Sev.Aus] Cyb3r-Gh0u1z',
    },
    {
      name: 'SecSoc + DevSoc + CSESoc Rookie Code Rumble CTF (May 2025)',
      result:
        '🥇 1st non-beginner | 🥉 3rd overall | Won $90 — Team: The Hammers',
    },
    { name: 'DUCTF 2025', result: '473 / 1668 — Team: [Sev.Aus] Cyber Ghoulz' },
    {
      name: 'SecTalks Ninja Night 18',
      result:
        '🥉 3 / 20 | Won $10, RPi Pico, clear lockpicking lock — Team: ecorp',
    },
    {
      name: 'K17 CTF 2025',
      result:
        ' 229 / 972 — Team: king of hacking',
    },
  ];

  const codingComps = [
    { name: 'CSE Rookie Code Rumble 2024', result: '🥇 1st place' },
    {
      name: 'South Pacific ICPC Level B 2024',
      result: '18 / 52 teams at UNSW',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center px-6 sm:px-12 py-16 bg-gradient-to-b from-black via-slate-900 to-slate-950">
      <motion.div
        className="max-w-5xl w-full space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative group w-full flex justify-center">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            Cyber Competitions
          </h1>
          {/* Tooltip */}
          <div className="absolute top-full mt-2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            at least the ones that I remembered to record :(
          </div>
        </div>

        {/* <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
          Cyber Competitions
        </h1> */}

        <div className="space-y-6">
          {ctfComps.map((comp, i) => (
            <motion.div
              key={i}
              className="bg-slate-900/70 backdrop-blur-md rounded-lg p-6 border border-slate-700/50 
                         hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <h3 className="text-xl font-semibold text-emerald-400">
                {comp.name}
              </h3>
              {comp.link ? (
                <a
                  href={comp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300 text-sm"
                >
                  View writeup / notes →
                </a>
              ) : (
                <p className="text-slate-300 mt-1">{comp.result}</p>
              )}
            </motion.div>
          ))}
        </div>

        <h1 className="text-5xl font-bold text-center mt-20 bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent pb-2">
          Coding Competitions
        </h1>

        <div className="space-y-6">
          {codingComps.map((comp, i) => (
            <motion.div
              key={i}
              className="bg-slate-900/70 backdrop-blur-md rounded-lg p-6 border border-slate-700/50 
                         hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <h3 className="text-xl font-semibold text-emerald-400">
                {comp.name}
              </h3>
              <p className="text-slate-300 mt-1">{comp.result}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Competitions;
