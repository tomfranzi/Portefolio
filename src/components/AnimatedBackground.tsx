import { motion, useScroll, useTransform } from 'motion/react';

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Dot Grid animé avec masque radial */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0px 0px', '32px 32px'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, #64748b 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, black 50%, transparent 100%)',
        }}
      />
      
      {/* --- LIGNES DIAGONALES SUPPRIMÉES ICI --- */}
      
      {/* Orbe 1 - Bleu/Cyan avec animations complexes */}
      <motion.div
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
        animate={{
          x: [0, 50, -30, 0],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
      />
      
      {/* Orbe 2 - Violet/Rose */}
      <motion.div
        style={{ y: y2, rotate: rotate2, scale: scale2 }}
        animate={{
          x: [-20, 40, -20],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-violet-500/25 via-purple-400/15 to-transparent rounded-full blur-3xl"
      />
      
      {/* Orbe 3 - Indigo */}
      <motion.div
        style={{ y: y3, scale: scale1 }}
        animate={{
          x: [0, -40, 20, 0],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-1/3 left-1/3 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/30 via-blue-400/15 to-transparent rounded-full blur-3xl"
      />
      
      {/* Orbe 4 - Cyan/Teal */}
      <motion.div
        style={{ y: y1, scale: scale2 }}
        animate={{
          x: [30, -20, 30],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          x: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-2/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/25 via-teal-400/15 to-transparent rounded-full blur-3xl"
      />
      
      {/* Orbe 5 - Rose accent */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          x: [-30, 30, -30],
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          x: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-10 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/20 via-rose-400/10 to-transparent rounded-full blur-3xl"
      />
      
      {/* Particules flottantes avec plus de variété */}
      {[...Array(40)].map((_, i) => {
        const size = Math.random() > 0.5 ? 'w-1 h-1' : 'w-2 h-2';
        const color = ['bg-blue-400/50', 'bg-cyan-400/50', 'bg-violet-400/50', 'bg-indigo-400/50'][Math.floor(Math.random() * 4)];
        
        return (
          <motion.div
            key={i}
            animate={{
              y: [0, -60 - Math.random() * 40, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            className={`absolute ${size} ${color} rounded-full`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        );
      })}
      
      {/* Cercles concentriques animés */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          animate={{
            scale: [1, 2, 1],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: 'easeOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-400/20 rounded-full"
        />
      ))}
      
      {/* Overlay gradient pour adoucir */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/40" />
    </div>
  );
}