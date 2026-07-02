import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ArrowUp,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Code2,
  Database,
  Wrench,
  Briefcase,
  GraduationCap,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Terminal,
  Layers,
  ShoppingCart,
  Award,
  Cpu,
  Zap,
  Coffee,
  Heart,
  FolderKanban,
  ShieldCheck,
  Server
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './components/Icons';

// Custom Hook for Scroll Progress
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (totalHeight / windowHeight) * 100;
      setProgress(scrollPercent);
      setShowBackToTop(totalHeight > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, showBackToTop };
};

// Custom Hook for Dark Mode
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  return { isDark, toggleDarkMode: () => setIsDark(!isDark) };
};

// Navbar Component
const Navbar = ({ isDark, toggleDarkMode }: { isDark: boolean; toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home', icon: <User size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code2 size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                AR
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">Aryan Raj</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
               
                onClick={toggleDarkMode}
                className="ml-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeSection === link.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

// Hero Section
const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const titles = ['Frontend Developer', 'Aspiring Full Stack Developer', 'Java Enthusiast'];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentTitle.length) {
          setTypedText(currentTitle.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentTitle.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, titleIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb w-96 h-96 bg-blue-500/30 top-20 -left-48 animate-float" />
        <div className="gradient-orb w-80 h-80 bg-cyan-500/30 bottom-20 -right-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="gradient-orb w-64 h-64 bg-purple-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
        
        {/* Floating Code Elements */}
        <div className="absolute top-32 left-10 md:left-32 text-4xl opacity-20 animate-float">
          <Code2 className="text-blue-600" size={40} />
        </div>
        <div className="absolute top-40 right-10 md:right-40 text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <Terminal className="text-cyan-500" size={35} />
        </div>
        <div className="absolute bottom-40 left-20 md:left-48 text-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>
          <Layers className="text-purple-500" size={35} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting */}
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-4 animate-fade-in-up stagger-1">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Aryan Raj
            </span>
          </h1>

          {/* Animated Title */}
          <div className="h-12 md:h-16 flex items-center justify-center mb-8 animate-fade-in-up stagger-2">
            <span className="text-2xl md:text-4xl font-semibold text-slate-600 dark:text-slate-300">
              {typedText}
            </span>
            <span className="cursor-blink text-2xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400 ml-1">
              |
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-3">
            Crafting beautiful, responsive web experiences with modern technologies.
            Passionate about clean code and intuitive user interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up stagger-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 ripple flex items-center space-x-2"
            >
              <FolderKanban size={20} />
              <span>View Projects</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </button>
            <a
              href="/Aryan_Raj_Resume.pdf"
              download="Aryan_Raj_Resume.pdf"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 ripple flex items-center space-x-2"
            >
              <FileText size={20} />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fade-in-up stagger-5">
            <a
              href="https://github.com/aryanraj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://linkedin.com/in/aryanraj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href="mailto:rajaryan021116@gmail.com"
              className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 animate-bounce-down">
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-slate-900 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="relative order-2 md:order-1">
            <div className="relative">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white">
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-4xl font-bold">
                      AR
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Aryan Raj</h3>
                      <p className="text-white/80">Frontend Developer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin size={18} className="text-white/70" />
                      <span className="text-white/90">Noida, India</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap size={18} className="text-white/70" />
                      <span className="text-white/90">Full Stack Developer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase size={18} className="text-white/70" />
                      <span className="text-white/90">Open to Opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />
            </div>

            {/* Stats Cards */}
            <div className="absolute -right-4 top-1/4 hidden lg:block">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 card-hover">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Award className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">5+</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Projects</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 hidden lg:block">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 card-hover">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Cpu className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">DSA</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Strong Foundation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2" ref={ref}>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Turning Ideas Into{' '}
              <span className="text-blue-600 dark:text-blue-400">Digital Reality</span>
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Results-driven Frontend Developer with hands-on experience building responsive web
                applications using HTML, CSS, JavaScript, and Node.js.
              </p>
              <p>
                Strong foundation in Java programming, Data Structures, and Algorithms. Passionate
                about creating user-friendly and efficient web applications that make a difference.
              </p>
              <p>
                Currently pursuing my MCA from Noida Institute of Engineering & Technology, I'm
                constantly learning and exploring new technologies to stay ahead in this rapidly
                evolving field.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <Code2 size={20} />, text: 'Clean Code' },
                { icon: <Zap size={20} />, text: 'Fast Learner' },
                { icon: <ShieldCheck size={20} />, text: 'Problem Solver' },
                { icon: <Heart size={20} />, text: 'Passionate' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800"
                >
                  <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={24} />,
      skills: [
        { name: 'Java', level: 85, color: 'from-orange-500 to-red-500' },
        { name: 'JavaScript', level: 90, color: 'from-yellow-500 to-amber-500' },
        { name: 'HTML5', level: 95, color: 'from-orange-600 to-orange-400' },
        { name: 'CSS3', level: 90, color: 'from-blue-500 to-blue-400' },
      ],
    },
    {
      title: 'Backend',
      icon: <Server size={24} />,
      skills: [
        { name: 'Node.js', level: 80, color: 'from-green-500 to-emerald-500' },
        { name: 'REST APIs', level: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'CRUD Operations', level: 85, color: 'from-cyan-500 to-blue-500' },
      ],
    },
    {
      title: 'Databases',
      icon: <Database size={24} />,
      skills: [
        { name: 'MySQL', level: 80, color: 'from-blue-600 to-sky-500' },
        { name: 'MongoDB', level: 75, color: 'from-green-600 to-emerald-500' },
      ],
    },
    {
      title: 'Tools',
      icon: <Wrench size={24} />,
      skills: [
        { name: 'VS Code', level: 95, color: 'from-blue-600 to-blue-400' },
        { name: 'Git', level: 85, color: 'from-orange-500 to-red-500' },
        { name: 'GitHub', level: 90, color: 'from-slate-700 to-slate-500' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Technical{' '}
            <span className="text-blue-600 dark:text-blue-400">Expertise</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels in various
            technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg card-hover"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-bar-fill`}
                        style={{ width: `${skill.level}%`, animationDelay: `${skillIndex * 0.3}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-8">
            Also Familiar With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React',
              'TypeScript',
              'Express.js',
              'Tailwind CSS',
              'DSA',
              'OOPs',
              'SQL',
              'JSON',
              'Windows',
              'Linux',
              'Postman',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const Experience = () => {
  const experiences = [
    {
      title: 'Industrial Trainee',
      company: 'NBPDCL (Government of Bihar Undertaking)',
      location: 'Bihar, India',
      period: '2024',
      type: 'Training',
      responsibilities: [
        'IT infrastructure exposure and management',
        'Database administration support',
        'Technical documentation',
        'Team collaboration and coordination',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            Work Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Professional{' '}
            <span className="text-blue-600 dark:text-blue-400">Journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            My professional experience and the valuable skills I've gained along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 z-10">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
              </div>

              {/* Content Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg card-hover">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {exp.type}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{exp.period}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{exp.company}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {exp.location}
                  </p>

                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      title: 'Personal Portfolio Website',
      category: 'Web Development',
      description:
        'A modern, responsive portfolio website showcasing my skills, experience, and projects with smooth animations and dark mode support.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'React'],
      icon: <User size={32} />,
      color: 'from-blue-500 to-cyan-500',
      link: '#',
    },
    {
      title: 'Fashion E-Commerce Website',
      category: 'E-Commerce',
      description:
        'A full-featured e-commerce platform with product listings, category filtering, shopping cart, and user authentication system.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      icon: <ShoppingCart size={32} />,
      color: 'from-purple-500 to-pink-500',
      link: '#',
    },
    {
      title: 'Task Management App',
      category: 'Web Application',
      description:
        'A productivity application for managing tasks with features like categorization, deadlines, and progress tracking.',
      tech: ['JavaScript', 'Node.js', 'MongoDB'],
      icon: <Layers size={32} />,
      color: 'from-green-500 to-emerald-500',
      link: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Featured{' '}
            <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent projects demonstrating my skills in frontend development and
            problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg card-hover"
            >
              {/* Project Header */}
              <div className={`h-48 bg-gradient-to-br ${project.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                {/* Category Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                  {project.category}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <a
                  href={project.link}
                  className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>View Project</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/aryanraj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
          >
            <GithubIcon size={20} />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Education Section
const Education = () => {
  const education = [
    {
      degree: 'Master of Computer Application (MCA)',
      institution: 'Noida Institute of Engineering & Technology',
      location: 'Noida, India',
      period: '2025 – 2026',
      type: 'Post Graduate',
      grade: 'Pursuing',
      icon: <GraduationCap size={28} />,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Patliputra University',
      location: 'Noida, Bihar, India',
      period: '2022 – 2025',
      type: 'Under Graduate',
      grade: 'Appearing',
      icon: <GraduationCap size={28} />,
      color: 'from-purple-600 to-pink-500',
    },
  ];

  return (
    <section id="education" className="py-20 md:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            Education
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Academic{' '}
            <span className="text-blue-600 dark:text-blue-400">Background</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            My educational journey and the foundation I've built for my career in technology.
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg card-hover"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left Color Bar */}
                <div className={`w-full lg:w-2 bg-gradient-to-b ${edu.color}`} />

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white`}>
                        {edu.icon}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 flex flex-wrap items-center gap-4">
                      <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {edu.period}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm lg:ml-[4.5rem]">
                    <MapPin size={14} className="mr-1" />
                    {edu.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'rajaryan021116@gmail.com',
      href: 'mailto:rajaryan021116@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 7033905252',
      href: 'tel:+917033905252',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Noida, India',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: <GithubIcon size={24} />, label: 'GitHub', href: 'https://github.com/aryanraj' },
    {
      icon: <LinkedinIcon size={24} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/aryanraj',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Get In{' '}
            <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out to me.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>

              {/* Form Status */}
              {formStatus === 'success' && (
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                  <span>Message sent successfully!</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{info.label}</p>
                      <p className="text-slate-800 dark:text-white font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                  >
                    {social.icon}
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6 md:p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold">Available for Opportunities</span>
              </div>
              <p className="text-white/90 mb-4">
                I'm currently looking for new opportunities and internships. If you're interested in
                working with me, please don't hesitate to get in touch!
              </p>
              <a
                href="mailto:rajaryan021116@gmail.com"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Mail size={18} />
                <span>Let's Talk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                AR
              </div>
              <span className="text-2xl font-bold">Aryan Raj</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Results-driven Frontend Developer passionate about creating beautiful, responsive web
              applications. Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/aryanraj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com/in/aryanraj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="mailto:aryanraj@example.com"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>rajaryan021116@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 7033905252</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Noida, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Aryan Raj. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> and lots of
            <Coffee size={14} className="mx-1 ml-2" />
            Code
          </p>
        </div>
      </div>
    </footer>
  );
};

// Back to Top Button
const BackToTop = ({ show }: { show: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${show ? 'visible' : ''}`}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};

// Main App Component
function App() {
  const { progress, showBackToTop } = useScrollProgress();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop show={showBackToTop} />
    </div>
  );
}

export default App;
