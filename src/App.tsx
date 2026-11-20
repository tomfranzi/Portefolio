import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Contact } from './components/Contact';
import { Toaster } from './components/ui/sonner';
import './portfolio.css';

const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'projets', label: 'Projets' },
  { id: 'expertise', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
];

const projects = [
  {
    title: 'Portfolio personnel', type: 'Web', year: '01',
    description: 'Un espace pour présenter mon parcours, mes projets et ma façon de construire des expériences web claires et rapides.',
    image: '/images/site.png', alt: 'Aperçu du portfolio personnel',
    tags: ['React', 'TypeScript', 'Vite'],
    demo: 'https://www.tomfranzi.com/', source: 'https://github.com/tomfranzi/Portefolio',
  },
  {
    title: 'Terrarium connecté', type: 'IoT', year: '02',
    description: 'Une application mobile pour suivre les capteurs et piloter l’environnement d’un terrarium intelligent en temps réel.',
    image: '/images/terrarium.png', alt: 'Interface de l’application de terrarium connecté',
    tags: ['C#', '.NET MAUI', 'IoT'],
    source: 'https://github.com/alexdhh/zbeubarium_app',
  },
  {
    title: 'Emotion Recognizer', type: 'IA', year: '03',
    description: 'Un projet d’intelligence artificielle qui reconnaît les émotions via webcam, lauréat d’un challenge IA.',
    image: '/images/emotion.png', alt: 'Aperçu du projet Emotion Recognizer',
    tags: ['Python', 'IA', 'Web'],
    demo: 'https://emotionrecognizer.onrender.com/', source: 'https://github.com/francoisdcre/EmotionRecognizer',
  },
];

const expertise = [
  { number: '01', title: 'Support & systèmes', description: 'Diagnostic, résolution d’incidents et accompagnement des utilisateurs.', tags: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Citrix'] },
  { number: '02', title: 'Réseaux & sécurité', description: 'Supervision, VPN, pare-feu et analyse des équipements réseau.', tags: ['Fortinet', 'Cisco', 'VPN', 'Supervision'] },
  { number: '03', title: 'Infrastructure & cloud', description: 'Virtualisation, sauvegarde et exploration des outils d’infrastructure modernes.', tags: ['VMware', 'Hyper-V', 'Veeam', 'Docker'] },
  { number: '04', title: 'Développement', description: 'Création de projets web et automatisation de tâches techniques.', tags: ['React', 'TypeScript', 'Python', 'SQL'] },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('accueil');
  const [filter, setFilter] = useState('Tous');
  const [progress, setProgress] = useState(0);
  useReveal();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.5] });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const filteredProjects = filter === 'Tous' ? projects : projects.filter((project) => project.type === filter);

  return (
    <div className="portfolio-site">
      <div className="reading-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#accueil" onClick={() => setMenuOpen(false)} aria-label="Tom Franzi, retour à l’accueil"><span className="brand-mark">TF<span>.</span></span><span className="brand-name">TOM FRANZI</span></a>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-navigation" aria-label="Navigation principale">
            {navigation.map((item) => <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          </nav>
          <a href="mailto:tomtomfranzi74@gmail.com" className="header-contact">Parlons ensemble <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </header>

      <main id="contenu">
        <section id="accueil" className="hero-section">
          <div className="hero-grid section-shell">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> PORTFOLIO · ANNECY, FRANCE</p>
              <h1>La tech au service <span>des gens.</span></h1>
              <p className="hero-lead">Moi, c’est <strong>Tom Franzi</strong>. Technicien informatique chez Access et étudiant en BTS CIEL. J’aime résoudre les problèmes, comprendre les systèmes et construire des solutions utiles.</p>
              <div className="hero-actions"><a className="action action-lime" href="#projets">Explorer mes projets <ArrowUpRight size={18} aria-hidden="true" /></a><a className="action action-outline" href="#parcours">Découvrir mon parcours</a></div>
              <div className="hero-social" aria-label="Mes liens"><a href="https://github.com/tomfranzi" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Tom Franzi"><Github size={19} /></a><a href="https://www.linkedin.com/in/tom-franzi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Tom Franzi"><Linkedin size={19} /></a><a href="mailto:tomtomfranzi74@gmail.com" aria-label="Envoyer un email à Tom Franzi"><Mail size={19} /></a><span>Retrouvez-moi en ligne</span></div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="visual-top"><span>01 / 04 — À PROPOS</span><span className="visual-spark">✳</span></div>
              <div className="visual-center"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><span>TF</span></div><span className="orbit-label orbit-label-top">RÉSEAUX</span><span className="orbit-label orbit-label-left">SYSTÈMES</span><span className="orbit-label orbit-label-right">CODE</span></div>
              <div className="visual-bottom"><span>IT / CYBER / CLOUD</span><span>ANNECY — FR</span></div>
            </div>
          </div>
          <a href="#projets" className="scroll-cue">Défiler pour explorer <ArrowDown size={17} aria-hidden="true" /></a>
        </section>

        <section className="intro-strip" aria-label="Domaines d’intérêt"><div className="section-shell strip-inner"><span>SUPPORT IT</span><span className="strip-star">✳</span><span>RÉSEAUX</span><span className="strip-star">✳</span><span>CYBERSÉCURITÉ</span><span className="strip-star">✳</span><span>DÉVELOPPEMENT</span></div></section>

        <section id="projets" className="projects-section section-pad"><div className="section-shell">
          <div className="section-heading" data-reveal><div><p className="section-kicker">01 / PROJETS</p><h2>Des idées <em>en action.</em></h2></div><p>Du web aux objets connectés, voici quelques projets qui racontent ce que j’aime créer.</p></div>
          <div className="filter-row" role="group" aria-label="Filtrer les projets">{['Tous', 'Web', 'IoT', 'IA'].map((item) => <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? 'selected' : ''}>{item}</button>)}</div>
          <div className="project-grid" aria-live="polite">{filteredProjects.map((project) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={project.alt} loading="lazy" decoding="async" /><span className="project-type">{project.type}</span></div><div className="project-body"><span className="project-index">PROJET / {project.year}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Voir le projet <ArrowUpRight size={17} aria-hidden="true" /></a>}<a href={project.source} target="_blank" rel="noopener noreferrer">Code source <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></article>)}</div>
          <a className="more-link" href="https://github.com/tomfranzi" target="_blank" rel="noopener noreferrer">Explorer mon GitHub <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div></section>

        <section id="expertise" className="expertise-section section-pad"><div className="section-shell"><div className="section-heading" data-reveal><div><p className="section-kicker">02 / COMPÉTENCES</p><h2>Une curiosité <em>sans frontières.</em></h2></div><p>Du poste utilisateur à l’infrastructure, j’apprends chaque jour sur le terrain et dans mes projets.</p></div><div className="expertise-grid">{expertise.map((area) => <article className="expertise-card" data-reveal key={area.title}><span className="expertise-number">{area.number} / 04</span><h3>{area.title}</h3><p>{area.description}</p><div className="expertise-tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>

        <section id="parcours" className="journey-section section-pad"><div className="section-shell journey-layout"><div className="journey-intro" data-reveal><p className="section-kicker">03 / PARCOURS</p><h2>Apprendre.<br /><em>Faire.</em><br />Avancer.</h2><p>J’associe la pratique en entreprise à une formation technique pour progresser en informatique, en réseau et en cybersécurité.</p><a className="action action-dark" href="/cv.pdf" target="_blank" rel="noopener noreferrer">Consulter mon CV <ArrowUpRight size={18} aria-hidden="true" /></a></div><div className="timeline" data-reveal><article><span className="timeline-dot" /><div><span className="timeline-label">EXPÉRIENCE ACTUELLE</span><h3>Technicien informatique</h3><p className="timeline-place">Access Group</p><p>Support et suivi des incidents clients, supervision, interventions sur les systèmes et les réseaux, échanges directs avec les utilisateurs.</p></div></article><article><span className="timeline-dot" /><div><span className="timeline-label">FORMATION</span><h3>BTS CIEL · Informatique et réseaux</h3><p className="timeline-place">Saint-Michel · Annecy</p><p>Cybersécurité, administration système, infrastructures réseau et développement.</p></div></article><article><span className="timeline-dot" /><div><span className="timeline-label">EXPÉRIENCE PRÉCÉDENTE</span><h3>Assistant informatique</h3><p className="timeline-place">Teractem</p><p>Support aux utilisateurs, maintenance et gestion de parc informatique.</p></div></article></div></div></section>

        <div className="contact-heading section-shell" data-reveal><span className="section-kicker">04 / CONTACT</span><span>Une idée, une opportunité ou simplement envie d’échanger ? <ChevronDown size={18} aria-hidden="true" /></span></div>
        <Contact />
      </main>
      <Toaster />
      <a href="#accueil" className="back-to-top" aria-label="Revenir en haut de la page" style={{ opacity: progress > 15 ? 1 : 0, pointerEvents: progress > 15 ? 'auto' : 'none' }}><ArrowDown size={18} aria-hidden="true" /></a>
    </div>
  );
}
