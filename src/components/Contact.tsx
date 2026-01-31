import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react'; // J'ai ajouté l'icône Phone
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner'; // Version corrigée sans le @version

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi (Pour le rendre réel, il faudra utiliser EmailJS plus tard)
    toast.success('Message envoyé avec succès ! Je vous répondrai bientôt.');
    setFormData({ name: '', email: '', message: '' });
    
    // Petite astuce : Ouvre le logiciel de mail par défaut
    window.location.href = `mailto:tomtomfranzi74@gmail.com?subject=Contact depuis le Portfolio&body=${formData.message}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4">Contact</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Un projet en tête ou une offre de stage ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6">Mes Coordonnées</h3>
              <p className="text-foreground/70 mb-8">
                Je suis actuellement à la recherche d'opportunités en alternance ou emploi
                dans le domaine du développement et des réseaux. Basé sur la région d'Annecy.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <motion.a 
                href="mailto:tomtomfranzi74@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl cursor-pointer hover:bg-accent transition-colors"
              >
                <div className="p-3 bg-background rounded-lg">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Email</p>
                  <p className="font-medium">tomtomfranzi74@gmail.com</p>
                </div>
              </motion.a>

              {/* Téléphone (Ajouté depuis ton CV) */}
              <motion.a 
                href="tel:+33768490819"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl cursor-pointer hover:bg-accent transition-colors"
              >
                <div className="p-3 bg-background rounded-lg">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Téléphone</p>
                  <p className="font-medium">07 68 49 08 19</p>
                </div>
              </motion.a>

              {/* Localisation */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl"
              >
                <div className="p-3 bg-background rounded-lg">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Localisation</p>
                  <p className="font-medium">Argonay / Annecy, France</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-accent/20 p-8 rounded-2xl border border-border shadow-sm">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Nom</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Bonjour Tom, j'ai vu votre portfolio..."
                  rows={6}
                  required
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full group">
                <span>Envoyer le message</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Send size={18} className="ml-2" />
                </motion.div>
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-border text-center text-foreground/60"
        >
          <p>© 2026 Tom Franzi. Tous droits réservés.</p>
          <p className="text-sm mt-2">Développé avec React, Tailwind & Passion ❤️</p>
        </motion.div>
      </div>
    </section>
  );
}