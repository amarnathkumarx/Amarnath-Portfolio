import React, { lazy, Suspense } from 'react';

// ⭐ Lazy imports - jab zaroorat tab load
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const BubbleBackground = lazy(() => import('./components/BubbleBackground'));
const RecruiterSummary = lazy(() => import('./components/RecruiterSummary'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const GitHubContributions = lazy(() => import('./components/GitHubContributions'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// ⭐ Loading component
const Loader = () => (
  <div className="h-screen flex items-center justify-center bg-navy-dark">
    <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="bg-navy-dark text-white min-h-screen">
      <Suspense fallback={<Loader />}>
        <BubbleBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <RecruiterSummary />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <GitHubContributions />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </Suspense>
    </div>
  );
}

export default App;