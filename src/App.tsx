import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { CV } from './components/CV';
import { Contact } from './components/Contact';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen text-foreground relative">
      <AnimatedBackground />
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