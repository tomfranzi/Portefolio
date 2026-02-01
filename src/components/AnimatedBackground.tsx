import { motion, useScroll, useTransform } from 'motion/react'; 
// Note : Si tu as une erreur sur l'import, remplace 'motion/react' par 'framer-motion'

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* --- NOUVEAU : Grille de points (Dot Grid) --- */}
      {/* C'est ce qui remplace les lignes moches. C'est subtil et "tech". */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Orbs colorés animés */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/25 via-pink-400/15 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-indigo-400/30 via-blue-400/20 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        style={{ y: y1 }}
        className="absolute top-2/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400/25 via-teal-400/15 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-10 left-1/2 w-[550px] h-[550px] bg-gradient-to-br from-violet-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl"
      />
      
      {/* Particules flottantes (conservées car elles ajoutent de la vie sans surcharger) */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
          className="absolute w-2 h-2 bg-blue-500/40 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Overlay pour adoucir le tout */}
      <div className="absolute inset-0 bg-white/40" />
    </div>
  );
}