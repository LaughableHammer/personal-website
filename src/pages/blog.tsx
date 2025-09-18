import { motion } from 'framer-motion';

function Blog() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-16 bg-gradient-to-b from-black via-slate-900 to-slate-950">
      <motion.div
        className="max-w-3xl text-center space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-300 to-cyan-400 bg-clip-text text-transparent pb-2">
          Blog
        </h1>
        <p className="text-slate-400 text-lg">
          No posts yet — but stay tuned!
          <br />
          I’ll be writing about CTFs, security projects, and CVEs soon 🚀
        </p>
      </motion.div>
    </section>
  );
}

export default Blog;
