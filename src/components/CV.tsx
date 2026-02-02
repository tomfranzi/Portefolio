import { motion, useInView } from 'motion/react'; // ou 'framer-motion'
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
  'Permis B & Permis Bateau',
];

export function CV() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    // J'ai retiré "bg-accent/10" pour laisser voir le fond animé
    <section id="cv" className="min-h-screen py-20 px-6" ref={ref}>
      
      {/* 👇 Ajout de la classe "glass-card" ici */}
      <div className="glass-card max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 text-slate-900 font-bold">Mon Parcours</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Une formation technique solide enrichie par une expérience internationale.
          </p>
          
          {/* Bouton de téléchargement */}
          <a href="/cv.pdf" download="CV_Tom_Franzi.pdf" target="_blank" rel="noopener noreferrer">
            {/* J'ai ajouté la classe btn-primary ici aussi pour être cohérent */}
            <Button size="lg" className="group btn-primary">
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
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">Formation</h3>
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
                  {/* Cartes internes : fond blanc légèrement transparent pour la superposition */}
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-white/60 backdrop-blur-sm border-t-white/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                      <div className="flex items-center gap-1 text-sm text-slate-500 bg-white px-3 py-1 rounded-full w-fit shadow-sm border border-slate-100">
                        <Calendar size={14} />
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{edu.school}</p>
                    <p className="text-sm text-slate-600">{edu.description}</p>
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
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">Expérience</h3>
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
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500 bg-white/60 backdrop-blur-sm border-t-white/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold text-slate-900">{exp.title}</h4>
                      <div className="flex items-center gap-1 text-sm text-slate-500 bg-white px-3 py-1 rounded-full w-fit shadow-sm border border-slate-100">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-indigo-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-sm text-slate-600">{exp.description}</p>
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
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <Award size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-slate-800">Distinctions & Certifications</h3>
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
                {/* J'ai éclairci le gradient pour qu'il soit joli sur le blanc */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 h-full flex items-center justify-center flex-col">
                  <Award size={32} className="mx-auto mb-3 text-blue-500" />
                  <p className="font-medium text-slate-700">{cert}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}