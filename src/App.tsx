// 1. On importe le fond animé (vérifie que le chemin est bon)
import { AnimatedBackground } from './components/AnimatedBackground'; 
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { CV } from './components/CV';
import { Contact } from './components/Contact';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    // 2. J'ai enlevé "bg-background" ici pour laisser la transparence
    <div className="min-h-screen text-foreground relative">
      
      {/* 3. On place le fond ici, tout en haut */}
      <AnimatedBackground />
      
      {/* Le reste du site vient par-dessus */}
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <CV />
      <Contact />
      <Toaster />
    </div>
  );
}