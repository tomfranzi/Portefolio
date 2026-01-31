import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Award, Download, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const education = [
  {
    degree: 'BTS CIEL Option Informatique et Réseaux (IR)',
    school: 'Établissement Saint-Michel, Annecy',
    period: '2024 - 2026',
    description: 'Cybersécurité, administration système, réseaux et développement (C++, C#, Python).',
  },
  {
    degree: 'Licence en Urbanisme (1ère année)',
    school: 'Université de Montréal (UdeM), Canada',
    period: '2023 - 2024',
    description: 'Année d\'études à l\'étranger. Adaptation et ouverture culturelle internationale.',
  },
  {
    degree: 'Baccalauréat STI2D',
    school: 'Lycée Louis Lachenal, Argonay',
    period: '2023',
    description: 'Spécialité Énergie et Environnement. Obtention du diplôme.',
  },
];

const experience = [
  {
    title: 'Assistant Informatique (Stage + CDD)',
    company: 'Teractem',
    period: '2024 - 2025',
    description: 'Support niveau 1, gestion de parc et maintenance. Participation à l\'intégration de ChatGPT et veille technologique.',
  },
  {
    title: 'Chef d\'équipe',
    company: 'Pizzeria Bros, Montréal',
    period: 'Job Étudiant',
    description: 'Management d\'équipe, gestion des stocks et responsabilité de la satisfaction client.',
  },
];

const certifications = [
  '🏆 Vainqueur Challenge IA (1ère Place)',
  'Plongeur Niveau 3 (Certification Internationale)',
  'Initiateur de Plongée (FFESSM)',
  'Initiateur Secourisme (PSC1)',
  'Permis B & Permis Bateau',
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
          <h2 className="text-4xl md:text-6xl mb-4">Mon Parcours</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            Une formation technique solide enrichie par une expérience internationale.
          </p>
          
          {/* Bouton de téléchargement */}
          <a href="/cv.pdf" download="CV_Tom_Franzi.pdf" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="group">
              <Download size={20} className="mr-2 group-hover:animate-bounce" />
              Télécharger le CV complet
            </Button>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education Colonne */}
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
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold">{edu.degree}</h4>
                      <div className="flex items-center gap-1 text-sm text-foreground/60 bg-accent px-3 py-1 rounded-full w-fit">
                        <Calendar size={14} />
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.school}</p>
                    <p className="text-sm text-foreground/70">{edu.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expérience Colonne */}
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
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold">{exp.title}</h4>
                      <div className="flex items-center gap-1 text-sm text-foreground/60 bg-accent px-3 py-1 rounded-full w-fit">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-foreground/70">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications & Prix */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="p-3 bg-primary rounded-xl">
              <Award size={24} className="text-primary-foreground" />
            </div>
            <h3 className="text-2xl">Distinctions & Certifications</h3>
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
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-accent/50 to-accent/20 border-primary/20 h-full flex items-center justify-center flex-col">
                  <Award size={32} className="mx-auto mb-3 text-primary" />
                  <p className="font-medium">{cert}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}