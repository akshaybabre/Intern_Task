import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Shield, Settings, BarChart3, Chrome } from 'lucide-react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

const HomePage = () => {
  const heroRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-heading',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.hero-subtext',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.cta-button',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          delay: 0.6, 
          ease: 'back.out(1.7)',
          stagger: 0.2
        }
      );

      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.9, 
          ease: 'power2.out',
          stagger: 0.2
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <section ref={heroRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-heading text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-blue-600">Zyon Admin Portal</span>
          </h1>
          <p className="hero-subtext text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Secure, scalable and modern dashboard management solution
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="cta-button flex items-center space-x-3 bg-white text-gray-700 px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              <Chrome className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Continue with Google</span>
            </Link>
            <Link
              to="/login"
              className="cta-button bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              <span className="font-semibold">Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies for the best user experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <FeatureCard
                icon={Shield}
                title="Google Auth Login"
                description="Secure authentication with Google OAuth integration for seamless user experience"
              />
            </div>
            <div className="feature-card">
              <FeatureCard
                icon={Settings}
                title="Dynamic Admin Dashboard"
                description="Fully customizable dashboard with real-time data and intuitive management tools"
              />
            </div>
            <div className="feature-card">
              <FeatureCard
                icon={BarChart3}
                title="Responsive & Animated UI"
                description="Beautiful animations and responsive design that works perfectly on all devices"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;