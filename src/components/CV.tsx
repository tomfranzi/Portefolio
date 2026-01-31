import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const education = [
  {
    degree: 'Bachelor Développeur et Réseaux',
    school: 'École d\'Informatique',
    period: '2024 - 2026',
    description: 'Spécialisation en développement web et administration réseaux',
  },
  {
    degree: 'BTS Services Informatiques',
    school: 'Lycée Technique',
    period: '2022 - 2024',
    description: 'Formation aux bases du développement et de l\'infrastructure',
  },
];

const experience = [
  {
    title: 'Développeur Web - Stage',
    company: 'Startup Tech',
    period: 'Été 2025',
    description: 'Développement d\'applications web avec React et Node.js',
  },
  {
    title: 'Assistant Réseau - Stage',
    company: 'Entreprise IT',
    period: 'Été 2024',
    description: 'Configuration et maintenance d\'infrastructure réseau',
  },
];

const certifications = [
  'Certification React Advanced',
  'CCNA - Cisco Certified Network Associate',
  'AWS Cloud Practitioner',
];

export function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="cv" className="min-h-screen py-20 px-6 bg-accent/10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4">Mon CV</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Mon parcours académique et professionnel
          </p>
          <Button size="lg" className="group">
            <Download size={20} className="mr-2 group-hover:animate-bounce" />
            Télécharger le CV
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary rounded-xl">
                <GraduationCap size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl">Formation</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg">{edu.degree}</h4>
                      <div className="flex items-center gap-1 text-sm text-foreground/60 bg-accent px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-2">{edu.school}</p>
                    <p className="text-sm text-foreground/60">{edu.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary rounded-xl">
                <Briefcase size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-2xl">Expérience</h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg">{exp.title}</h4>
                      <div className="flex items-center gap-1 text-sm text-foreground/60 bg-accent px-3 py-1 rounded-full">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-2">{exp.company}</p>
                    <p className="text-sm text-foreground/60">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary rounded-xl">
              <Award size={24} className="text-primary-foreground" />
            </div>
            <h3 className="text-2xl">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-accent/50 to-accent/20">
                  <Award size={32} className="mx-auto mb-3 text-primary" />
                  <p>{cert}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
