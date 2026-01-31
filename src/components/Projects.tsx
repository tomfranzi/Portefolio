import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const projects = [
  {
    id: 1,
    title: 'Mon Portfolio',
    description: 'Le site sur lequel vous êtes ! Développé pour présenter mes compétences et mon parcours en BTS CIEL.',
    image: '/images/site.png',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Git'],
    link: '#',
    github: 'https://github.com/tomfranzi/Portefolio',
  },
  {
    id: 2,
    title: 'App Mobile Terrarium Connecté',
    description: 'Application mobile de contrôle pour un terrarium intelligent. Visualisation des capteurs et gestion de l\'environnement en temps réel.',
    image: '/images/terrarium.png', 
    tags: ['C#', '.NET MAUI', 'IoT', 'Mobile'],
    link: '/images/unnamed.jpg',
    github: 'https://github.com/alexdhh/zbeubarium_app',
  },
  {
    id: 3,
    title: 'Emotion Recognizer (Vainqueur Challenge IA 🏆)',
    description: 'Projet lauréat (1ère place). IA capable de reconnaître les émotions faciales via webcam, hébergée sur le web.',
    image: '/images/emotion.png',
    tags: ['IA', 'Python', 'Web', 'Deep Learning'],
    link: 'https://emotionrecognizer.onrender.com/',
    github: 'https://github.com/francoisdcre/EmotionRecognizer',
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="projects" className="min-h-screen py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4">Mes Projets</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations récentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Voir
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
