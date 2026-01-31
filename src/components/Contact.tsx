import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

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
    // Simulation d'envoi
    toast.success('Message envoyé avec succès ! Je vous répondrai bientôt.');
    setFormData({ name: '', email: '', message: '' });
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
            Un projet en tête ? N'hésitez pas à me contacter
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
              <h3 className="text-2xl mb-6">Restons en contact</h3>
              <p className="text-foreground/70 mb-8">
                Je suis toujours ouvert à de nouvelles opportunités et collaborations.
                Que ce soit pour un projet, une question ou simplement pour échanger,
                n'hésitez pas à me contacter !
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl"
              >
                <div className="p-3 bg-background rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Email</p>
                  <p>contact@exemple.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-accent/50 rounded-xl"
              >
                <div className="p-3 bg-background rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Localisation</p>
                  <p>Paris, France</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative element */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="hidden lg:block w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl mt-12"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-accent/20 p-8 rounded-2xl border border-border">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Nom
                </label>
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
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
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
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
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
          <p>© 2026 Portfolio. Développé avec passion ❤️</p>
        </motion.div>
      </div>
    </section>
  );
}
