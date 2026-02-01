import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, Phone, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null); // Référence pour le formulaire
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 👇 REMPLACE CES 3 VALEURS PAR LES TIENNES 👇
    const serviceID = 'service_m4xycp8';
    const templateID = 'template_ztky0a7';
    const publicKey = 'J7yFqqZQmJdgh6JPk';

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Message envoyé avec succès ! Je vous répondrai bientôt.');
        setFormData({ name: '', email: '', message: '' }); // Vide le formulaire
        setLoading(false);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6" ref={ref}>
      {/* Design Glass Card conservé */}
      <div className="glass-card max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 text-slate-900 font-bold">Contact</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
              <h3 className="text-2xl mb-6 text-slate-800 font-semibold">Mes Coordonnées</h3>
              <p className="text-slate-600 mb-8">
                Je suis actuellement à la recherche d'opportunités en alternance ou emploi
                dans le domaine du développement et des réseaux. Basé sur la région d'Annecy.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a 
                href="mailto:tomtomfranzi74@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-white/50 border border-white/60 rounded-xl cursor-pointer hover:bg-white/80 transition-colors shadow-sm"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">tomtomfranzi74@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="tel:+33768490819"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-white/50 border border-white/60 rounded-xl cursor-pointer hover:bg-white/80 transition-colors shadow-sm"
              >
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Téléphone</p>
                  <p className="font-medium text-slate-900">07 68 49 08 19</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-white/50 border border-white/60 rounded-xl shadow-sm"
              >
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Localisation</p>
                  <p className="font-medium text-slate-900">Argonay / Annecy, France</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form avec EmailJS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white/40 p-8 rounded-2xl border border-white/50 shadow-sm">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-slate-700">Nom</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  disabled={loading}
                  className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-slate-700">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  disabled={loading}
                  className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-slate-700">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Bonjour Tom, j'ai vu votre portfolio..."
                  rows={6}
                  required
                  disabled={loading}
                  className="bg-white/70 border-slate-200 resize-none focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" size="lg" className="w-full group btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send size={18} className="ml-2" />
                    </motion.div>
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-500"
        >
          <p>© 2026 Tom Franzi. Tous droits réservés.</p>
          <p className="text-sm mt-2">Développé avec React, Tailwind & Passion ❤️</p>
        </motion.div>
      </div>
    </section>
  );
}