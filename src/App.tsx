import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { CV } from './components/CV';
import { Contact } from './components/Contact';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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