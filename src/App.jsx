import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js'; 
// 💡 UPDATED Sound Imports: Naye imports ka istemal
import voiceSound from '../Sounds/Voice.mp3'; // Voice sound
import welcomeSound from '../Sounds/Welcome.wav'; // Welcome sound

import myimg from '../images/Image.jpg';
import cv from '../images/CV.jpg';
import { Github, Linkedin, Mail, Code, Sparkles, ArrowRight, Globe, Menu, X } from 'lucide-react';
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();


export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 💡 NEW: State to track if sounds are ready to play
  const [areSoundsReady, setAreSoundsReady] = useState(false); 
  
  const typedElement = useRef(null);
  
  const [isAtBottom, setIsAtBottom] = useState(false); 
  
  const countRef1 = useRef(null);
  const countRef2 = useRef(null);
  const countRef3 = useRef(null);
  const countRef4 = useRef(null);
  const [hasCounted, setHasCounted] = useState(false);

  const roles = ['Web Developer', 'Graphic Designer', 'React Developer'];

  const myEmail = "uzairansaridev911@gmail.com";
  const subject = encodeURIComponent("Excited to Have You Join Our Team");
  const body = encodeURIComponent(`Dear Uzair Ansari,

We hope you’re doing well.
After reviewing your profile and skills, we’re pleased to inform you that we’re interested in hiring you for our team. Your experience and talent seem like a great fit for our upcoming projects.

Please let us know a suitable time to discuss the next steps further.

Looking forward to working with you.

Best regards,
[Your Name or Position]`);
  const mailtoLink = `mailto:${myEmail}?subject=${subject}&body=${body}`;

  const myphonenumber = "923283672744";
  const prefilledMessage = "Hey there Uzair Ansari, I want to talk to you!";
  const whatsappLink = `https://wa.me/${myphonenumber}?text=${prefilledMessage}`;
  const projectsurl = "https://github.com/uzairansaridev911?tab=repositories";

  // ------------------------------------
  // ## 🎵 Sound Loading Effect (Checks if sounds are buffered)
  // ------------------------------------
  useEffect(() => {
    // Correctly using the new imported variables
    const audio1 = new Audio(voiceSound); 
    const audio2 = new Audio(welcomeSound);
    
    let loadedCount = 0;
    const totalSounds = 2;

    const checkLoad = () => {
      loadedCount++;
      if (loadedCount === totalSounds && isLoaded) { 
        setAreSoundsReady(true);
      }
    };
    
    audio1.addEventListener('canplaythrough', checkLoad);
    audio2.addEventListener('canplaythrough', checkLoad);

    if (audio1.readyState >= 3) checkLoad();
    if (audio2.readyState >= 3) checkLoad();
    
    return () => {
      audio1.removeEventListener('canplaythrough', checkLoad);
      audio2.removeEventListener('canplaythrough', checkLoad);
    };

  }, [isLoaded]); 

  // ------------------------------------
  // ## 🎵 Sound Playback Effect (Plays Voice first, then Welcome)
  // ------------------------------------
  useEffect(() => {
    if (areSoundsReady) {
      const voiceAudio = new Audio(voiceSound);
      const welcomeAudio = new Audio(welcomeSound);
      
      // 1. Pehle Voice sound play karo
      voiceAudio.volume = 1.0; // Full volume for voice
      voiceAudio.play().catch(error => console.error("Error playing voice sound:", error));
      
      // 2. Welcome sound ko 0.5 ya 0.8 seconds ke delay se play karo
      // 💡 DELAY: 800ms (0.8 seconds) set kiya hai. Aap ise 500ms bhi kar sakte hain.
      const WELCOME_START_DELAY_MS = 800; 
      
      const welcomeTimeout = setTimeout(() => {
        welcomeAudio.volume = 0.5; // Welcome/Jingle ko thoda halka rakha hai
        welcomeAudio.play().catch(error => console.error("Error playing welcome sound:", error));
      }, WELCOME_START_DELAY_MS); 

      // Cleanup function to stop sounds and clear timeout
      return () => {
        voiceAudio.pause();
        welcomeAudio.pause();
        clearTimeout(welcomeTimeout);
      };
    }
  }, [areSoundsReady]);
  // ------------------------------------


  // --- Utility Effects (Scroll/Mouse) (No Change) ---
  useEffect(() => {
    setIsLoaded(true); 
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; 
      const isNearTop = scrollTop < 50; 
      
      if (isNearBottom && !isNearTop) {
        setIsAtBottom(true);
      } 
      else if (isNearTop) {
        setIsAtBottom(false); 
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // --- Typed.js Effect (No Change) ---
  useEffect(() => {
    if (typedElement.current) {
      const typed = new Typed(typedElement.current, {
        strings: roles, 
        typeSpeed: 50, 
        backSpeed: 100,  
        loop: true,     
        showCursor: true, 
      });

      return () => {
        typed.destroy();
      };
    }
  }, [roles]); 

  // --- CountUp Effect (No Change) ---
  useEffect(() => {
    const animateCount = (element, target) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            setHasCounted(true);
            animateCount(countRef1.current, 25);
            animateCount(countRef2.current, 50);
            animateCount(countRef3.current, 5);
            animateCount(countRef4.current, 3);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countRef1.current) {
      observer.observe(countRef1.current);
    }

    return () => observer.disconnect();
  }, [hasCounted]);
  // ------------------------------------

  return (
    <div className="relative min-h-screen bg-[#18021f] text-white overflow-hidden">
      {/* Animated Background Orbs (No Change) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            top: `${mousePosition.y * 0.05}px`,
            left: `${mousePosition.x * 0.05}px`,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation (No Change) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center backdrop-blur-xl bg-white/5 rounded-2xl px-8 py-4 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Portfolio</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', href: '#home' }, 
                { name: 'Skills', href: '#skills' }, 
                { name: 'Projects', href: projectsurl, target: "_blank" }, 
                { name: 'Contact', href: '#contact-footer' } 
              ].map((item, i) => (
                <a 
                  key={item.name}
                  href={item.href}
                  target={item.target || "_self"}
                  rel={item.target === "_blank" ? "noopener noreferrer" : ""}
                  className="relative group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="hover:text-cyan-400 transition-colors duration-300">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden md:block relative group overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <div className="md:hidden">
              <button 
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (No Change) */}
      <div 
        className={`fixed top-0 right-0 w-full h-full max-w-xs sm:max-w-sm bg-[#18021f]/95 backdrop-blur-lg z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="pt-32 px-6 flex flex-col space-y-4">
          {[
            { name: 'Home', href: '#home' }, 
            { name: 'Skills', href: '#skills' }, 
            { name: 'Projects', href: projectsurl, target: "_blank" }, 
            { name: 'Contact', href: '#contact-footer' } 
          ].map((item, i) => (
            <a 
              key={item.name}
              href={item.href}
              target={item.target || "_self"}
              rel={item.target === "_blank" ? "noopener noreferrer" : ""}
              className="text-2xl font-semibold py-3 w-full text-left hover:text-cyan-400 transition-colors duration-300 border-b border-white/10 last:border-b-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" 
            className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Hero Section (No Change) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">Welcome to my portfolio</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8.5xl font-bold leading-tight">
                  <span className="block">Uzair Ansari</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <span ref={typedElement}></span>
                    <span className="animate-pulse">|</span> 
                  </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                  Crafting digital experiences with modern technologies. Transforming ideas into elegant, functional solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={mailtoLink} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Hire Me</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                
                <a href={cv} download={cv} className="px-8 py-4 border-2 border-cyan-500/50 rounded-2xl font-semibold text-lg hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:border-cyan-400">
                  Download CV
                </a>
              </div>

              <div className="flex space-x-4 pt-8">
                {[
                  { icon: Github, href: 'https://github.com/uzairansaridev911' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/uzair-ansari-354435172/' },
                  { icon: Mail, href: mailtoLink },
                  { icon: Globe, href: 'https://www.facebook.com/uzair.ansari.178771' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-14 h-14 flex items-center justify-center rounded-xl border border-white/20 hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:bg-cyan-500/10"
                  >
                    <social.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border-2 border-cyan-500/30 rounded-full animate-ping absolute"></div>
                  <div className="w-5/6 h-5/6 border-2 border-purple-500/30 rounded-full animate-pulse absolute"></div>
                </div>

                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-purple-600/40 rounded-full blur-3xl"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20"></div>
                    <img 
                      src={myimg}
                      alt="Portfolio"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl shadow-2xl shadow-cyan-500/50 flex items-center justify-center text-2xl font-bold animate-bounce">
                    3+
                    <span className="absolute -bottom-2 text-xs">Years</span>
                  </div>

                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-2xl shadow-purple-500/50 flex items-center justify-center text-2xl font-bold animate-bounce delay-300">
                    50+
                    <span className="absolute -bottom-2 text-xs">Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            {[
              { ref: countRef1, label: 'Worldwide Connections', color: 'from-cyan-400 to-cyan-600' },
              { ref: countRef2, label: 'Projects Done', color: 'from-purple-400 to-purple-600' },
              { ref: countRef3, label: 'Honours Beyond Borders', color: 'from-pink-400 to-pink-600' },
              { ref: countRef4, label: 'Years of Passion', color: 'from-indigo-400 to-indigo-600' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="group relative overflow-hidden p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <h3 
                    ref={stat.ref}
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    0+
                  </h3>
                  <p className="text-gray-400 mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section (Skills) (No Change) */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-gray-400 text-lg">What I offer to my clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-12 h-12" />,
                title: 'Frontend Development',
                description: 'HTML, CSS, JavaScript, React.js, Tailwind, Bootstrap',
                gradient: 'from-cyan-400 to-cyan-600'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                ),
                title: 'Backend Development & DVCS',
                description: 'PHP, SQL, MySQL, Git, GitHub',
                gradient: 'from-purple-400 to-purple-600'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 17.5L2 12l5-5.5L8.5 8L5 12l3.5 4zm10 0L22 12l-5-5.5L15.5 8L19 12l-3.5 4z"/>
                  </svg>
                ),
                title: 'Graphic Design',
                description: 'Adobe Photoshop, Canva',
                gradient: 'from-pink-400 to-pink-600'
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (No Change) */}
      <footer className="relative border-t border-white/10 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div id="contact-footer" className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Portfolio</span>
            </div>
            <p className="text-gray-400 mb-6">Building digital experiences that matter</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            {[
              { icon: Github, href: 'https://github.com/uzairansaridev911' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/uzair-ansari-354435172/' },
              { icon: Mail, href: mailtoLink },
              { icon: Globe, href: 'https://www.facebook.com/uzair.ansari.178771' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-5 h-5 hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 Uzair Ansari. All rights reserved.</p>
            <p className="mt-2">Designed & Developed with <span className="text-cyan-400">♥</span> by Uzair Ansari</p>
          </div>
        </div>
      </footer>


      {/* Scroll Indicator (No Change) */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 hidden sm:block ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center space-y-2">
          
          <span className="text-sm text-gray-400">
            {isAtBottom ? 'Scroll Up' : 'Scroll Down'}
          </span>
          
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
            <div 
              className={`w-1.5 h-3 bg-cyan-400 rounded-full mx-auto ${isAtBottom ? 'animate-bounce-up' : 'animate-bounce-down'}`}
            ></div>
          </div>
        </div>
      </div>
      
      {/* CSS Keyframes (No Change) */}
      <style jsx="true">{`

        /* SCROLL DOWN ANIMATION */
        @keyframes bounce-down {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(14px); 
            opacity: 1;
          }
        }
        .animate-bounce-down {
            animation: bounce-down 1.5s infinite;
        }

        /* SCROLL UP ANIMATION */
        @keyframes bounce-up {
          0%, 100% {
            transform: translateY(14px); 
            opacity: 0.1;
          }
          50% {
            transform: translateY(0); 
            opacity: 1;
          }
        }
        .animate-bounce-up {
          animation: bounce-up 1.5s infinite;
        }
      `}</style>
    </div>
  );
}