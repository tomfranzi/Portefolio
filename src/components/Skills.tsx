import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Server, Smartphone, Database, Palette, Zap } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    color: 'from-blue-500/20 to-cyan-500/20',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Motion/Framer'],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'from-green-500/20 to-emerald-500/20',
    items: ['Node.js', 'Express', 'GraphQL', 'REST API', 'Microservices'],
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    color: 'from-purple-500/20 to-pink-500/20',
    items: ['React Native', 'Expo', 'iOS', 'Android', 'PWA'],
  },
  {
    category: 'Database',
    icon: Database,
    color: 'from-orange-500/20 to-red-500/20',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  },
  {
    category: 'Design',
    icon: Palette,
    color: 'from-pink-500/20 to-rose-500/20',
    items: ['UI/UX', 'Figma', 'Prototyping', 'Design Systems', 'Responsive'],
  },
  {
    category: 'DevOps',
    icon: Zap,
    color: 'from-yellow-500/20 to-amber-500/20',
    items: ['Docker', 'CI/CD', 'Git', 'AWS', 'Vercel'],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="min-h-screen py-20 px-6 bg-accent/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4">Compétences</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Technologies et outils que je maîtrise pour créer des solutions complètes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 group-hover:opacity-100`} />
                <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-accent rounded-xl">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl">{skill.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        className="text-foreground/70 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
