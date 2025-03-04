import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Monitor, Layers, Briefcase, User, FileText, Home, Globe, GraduationCap, Award, ChevronUp } from 'lucide-react';

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refs for animated sections
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [skillsRef, skillsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [projectsRef, projectsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [educationRef, educationVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const projects = [
    {
      title: "Spotify Clone Page",
      description: "Developed a fully interactive playlist page similar to Spotify's web version, featuring dynamic song selection, play/pause functionality, progress bar updates, and real-time audio control using JavaScript.",
      tags: ["HTML", "CSS", "JavaScript", "DOM Manipulation"],
      image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "To-Do-List-Chrome-Extension: Machrome",
      description: "Developed a Chrome extension that helps users manage their tasks efficiently. Integrated user-friendly interfaces using Bootstrap for responsive design. Utilized JavaScript for interactive features and JSON for data storage and configuration.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "JSON"],
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Calculator (InternPe)",
      description: "Created a responsive calculator web app. Implemented basic arithmetic operations and an intuitive interface for a seamless user experience.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  const skills = [
    { name: "Technical Skills", icon: <Code size={24} />, items: ["Java", "OOPs", "JDBC", "SQL", "JavaScript", "Bootstrap", "HTML", "CSS", "React JS"] },
    { name: "Tools", icon: <Monitor size={24} />, items: ["Power BI", "MS Excel", "Google Sheets"] },
    { name: "Soft Skills", icon: <Layers size={24} />, items: ["Adaptability", "Communication", "Teamwork", "Collaboration"] },
    { name: "Hobbies", icon: <Briefcase size={24} />, items: ["Watching Animation", "Video Editing"] }
  ];

  const education = [
    {
      institution: "Vignan Institute Of Technology And Management, Berhampur",
      degree: "B.Tech in Computer Science",
      period: "2020 - 2024"
    },
    {
      institution: "Vinayak Acharya Junior College, Berhampur, Odisha",
      degree: "CHSE (Council of Higher Secondary Education)",
      period: "2018 - 2020"
    },
    {
      institution: "Sri Krishna Sahu High School, Nimakhandi, Berhampur, Odisha",
      degree: "BSE (Board of Secondary Education)",
      period: "2017 - 2018"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-800/90 backdrop-blur-sm shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold animate-pulse-slow">Mahesh Maharana</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {[
                  { id: 'home', label: 'Home', icon: <Home size={16} /> },
                  { id: 'about', label: 'About', icon: <User size={16} /> },
                  { id: 'skills', label: 'Skills', icon: <Code size={16} /> },
                  { id: 'projects', label: 'Projects', icon: <Briefcase size={16} /> },
                  { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
                  { id: 'contact', label: 'Contact', icon: <Mail size={16} /> }
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'border-blue-400 text-white'
                        : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <X size={24} className="animate-spin-slow" /> : <Menu size={24} className="animate-pulse-slow" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 shadow-lg animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { id: 'home', label: 'Home', icon: <Home size={18} /> },
                { id: 'about', label: 'About', icon: <User size={18} /> },
                { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
                { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
                { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
                { id: 'contact', label: 'Contact', icon: <Mail size={18} /> }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-300 animate-slideInFromRight ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg z-50 hover-lift animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Hero Section */}
      <section id="home" className="relative pt-16 overflow-hidden" ref={heroRef}>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 min-h-screen flex items-center">
            <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className={`text-center lg:text-left ${heroVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                <h2 className="text-base font-semibold tracking-wide uppercase text-blue-400 animate-slideInFromLeft">
                  Web Developer
                </h2>
                <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate-slideInFromLeft delay-200">
                  <span className="block text-white xl:inline">Hi, I'm </span>{' '}
                  <span className="block text-blue-400 xl:inline">Mahesh Maharana</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-slideInFromLeft delay-400">
                  I build responsive and interactive web applications using modern technologies. Specializing in front-end development with HTML, CSS, JavaScript, and React.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start animate-slideInFromBottom delay-600">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md btn-primary md:py-4 md:text-lg md:px-10"
                    >
                      View My Work
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md btn-secondary md:py-4 md:text-lg md:px-10"
                    >
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent to-blue-500/10 hidden lg:block animate-gradient"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${aboutVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className="text-base text-center font-semibold tracking-wide uppercase text-blue-400">About Me</h2>
            <p className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              My Journey as a Developer
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className={`relative ${aboutVisible ? 'animate-slideInFromLeft delay-200' : 'opacity-0'}`}>
                <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-lg">
                  <img
                    className="object-cover w-full h-full profile-image"
                    src="https://stackblitz.com/files/vite-react-typescript-starter-qqxnxm/github/stackblitz/vite-react-typescript-starter/main/src/assets/mahesh-photo.jpg"
                    alt="Portrait of Mahesh Maharana"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              </div>
              <div className={`flex flex-col justify-center ${aboutVisible ? 'animate-slideInFromRight delay-400' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-white">Who I Am</h3>
                <p className="mt-4 text-lg text-gray-300">
                  I'm a passionate web developer with experience in creating responsive and interactive web applications. My journey began with HTML and CSS, and I've since expanded my skills to include JavaScript, React, and various other technologies.
                </p>
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-white">Experience</h4>
                  <div className="mt-2 text-lg text-gray-300">
                    <p className="font-medium text-blue-400">InternPe</p>
                    <p>Web Development Intern – October, 2024 – November, 2024</p>
                    <p className="mt-2">
                      As a Web Development Intern at InternPe, I successfully developed responsive web applications using HTML, CSS, Bootstrap, and JavaScript. I collaborated with senior developers to optimize websites for performance and scalability, gaining valuable hands-on experience in front-end development. During my tenure, I contributed to the design and deployment of multiple projects, enhancing their functionality and user experience.
                    </p>
                    <p className="mt-2">
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Completion certificate</a>
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-xl font-semibold text-white">Location</h4>
                  <p className="mt-2 text-lg text-gray-300">
                    Spice Garden Layout, Marathahalli, Bengaluru, Karnataka 560037
                  </p>
                </div>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md btn-primary"
                  >
                    <FileText size={18} className="mr-2" />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900" ref={skillsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${skillsVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className="text-base text-center font-semibold tracking-wide uppercase text-blue-400">Skills</h2>
            <p className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              My Technical Expertise
            </p>
            <p className="mt-4 max-w-2xl text-xl text-center text-gray-300 lg:mx-auto">
              I've worked with a variety of technologies and frameworks to create robust, scalable applications.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-lg overflow-hidden bg-gray-800 transition-all duration-500 hover-lift ${
                    skillsVisible ? 'animate-slideInFromBottom' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="px-6 py-8">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto animate-pulse-slow">
                      {skill.icon}
                    </div>
                    <h3 className="mt-5 text-lg text-center leading-6 font-medium text-white">{skill.name}</h3>
                    <div className="mt-4">
                      <ul className="space-y-2">
                        {skill.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex} 
                            className="text-center text-gray-300"
                            style={{ animationDelay: `${itemIndex * 100 + 500}ms` }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800" ref={projectsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${projectsVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className="text-base text-center font-semibold tracking-wide uppercase text-blue-400">Projects</h2>
            <p className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              My Recent Work
            </p>
            <p className="mt-4 max-w-2xl text-xl text-center text-gray-300 lg:mx-auto">
              Here are some of the projects I've worked on recently. Each project represents a unique challenge and solution.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover-glow bg-gray-700 ${
                  projectsVisible ? 'animate-slideInFromBottom' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover transition-transform duration-500 hover-bright"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 opacity-50"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-2 text-gray-300">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-200 transition-all duration-300 hover:bg-blue-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href={project.link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md btn-primary"
                    >
                      View Project
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-900" ref={educationRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${educationVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className="text-base text-center font-semibold tracking-wide uppercase text-blue-400">Education</h2>
            <p className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Academic Background
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-8">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className={`bg-gray-800 rounded-lg shadow-lg p-6 relative hover-lift ${
                  educationVisible ? 'animate-slideInFromLeft' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute top-6 left-0 w-1 h-10 bg-blue-500 rounded-r-full"></div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                  <p className="mt-1 text-blue-400">{edu.degree}</p>
                  <p className="mt-1 text-gray-400">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className={`max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-6 hover-lift ${
              educationVisible ? 'animate-slideInFromRight delay-600' : 'opacity-0'
            }`}>
              <h3 className="text-xl font-bold text-white mb-4">Certificates</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="flex-shrink-0 h-6 w-6 text-blue-400 mt-0.5 animate-pulse-slow" />
                  <span className="ml-3 text-gray-300">
                    Completed via Great Learning: <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Link</a>
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="flex-shrink-0 h-6 w-6 text-blue-400 mt-0.5 animate-pulse-slow" />
                  <span className="ml-3 text-gray-300">
                    Completion certificate: <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Link</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800" ref={contactRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`lg:text-center ${contactVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className="text-base text-center font-semibold tracking-wide uppercase text-blue-400">Contact</h2>
            <p className="mt-2 text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Get In Touch
            </p>
            <p className="mt-4 max-w-2xl text-xl text-center text-gray-300 lg:mx-auto">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className={`rounded-lg shadow-lg overflow-hidden bg-gray-700 p-6 hover-lift ${
              contactVisible ? 'animate-slideInFromLeft delay-200' : 'opacity-0'
            }`}>
              <h3 className="text-xl font-bold text-white">Send Me a Message</h3>
              <form className="mt-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md shadow-sm bg-gray-600 border-gray-500 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md shadow-sm bg-gray-600 border-gray-500 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md shadow-sm bg-gray-600 border-gray-500 text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium btn-primary"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className={`rounded-lg shadow-lg overflow-hidden bg-gray-700 p-6 hover-lift ${
              contactVisible ? 'animate-slideInFromRight delay-400' : 'opacity-0'
            }`}>
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <Mail className="flex-shrink-0 h-6 w-6 text-blue-400 animate-float" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-sm text-gray-300">maheshtinu273@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="flex-shrink-0 h-6 w-6 text-blue-400 animate-float" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Phone</p>
                    <p className="text-sm text-gray-300">+91 8018819060</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="flex-shrink-0 h-6 w-6 text-blue-400 animate-float" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Location</p>
                    <p className="text-sm text-gray-300">Spice Garden Layout, Marathahalli, Bengaluru, Karnataka 560037</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-medium text-white">Connect with me</h4>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <span className="sr-only">GitHub</span>
                    <Github size={24} className="animate-float" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin size={24} className="animate-float" style={{ animationDelay: '0.2s' }} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <span className="sr-only">Portfolio</span>
                    <Globe size={24} className="animate-float" style={{ animationDelay: '0.4s' }} />
                  </a>
                  <a href="mailto:maheshtinu273@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <span className="sr-only">Mail</span>
                    <Mail size={24} className="animate-float" style={{ animationDelay: '0.6s' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">GitHub</span>
                <Github size={24} className="animate-float" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} className="animate-float" style={{ animationDelay: '0.2s' }} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">Portfolio</span>
                <Globe size={24} className="animate-float" style={{ animationDelay: '0.4s' }} />
              </a>
              <a href="mailto:maheshtinu273@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <span className="sr-only">Mail</span>
                <Mail size={24} className="animate-float" style={{ animationDelay: '0.6s' }} />
              </a>
            </div>
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Mahesh Maharana. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;