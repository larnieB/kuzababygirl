
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { EDUCATIONAL_TOPICS } from '../constants';

interface LandingPageProps {
  onLogin: (data: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-soft-pink">
      <Header onLogin={onLogin} />
      
      {/* Hero Section */}
      <header className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-wine leading-tight mb-6">
              the place to embrace <br />
              <span className="text-pink-600 italic">The inner girl</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0">
              Join kuzaBabygirl, the ultimate platform for women to learn, compete, and grow. Access world-class educational content and participate in daily challenges to multiply your success.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <button 
                onClick={() => onLogin({})}
                className="bg-wine text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition transform shadow-xl"
              >
                Join the Movement
              </button>
              <Link 
                to="/about"
                className="bg-white text-wine border-2 border-wine px-10 py-4 rounded-full text-lg font-bold hover:bg-wine hover:text-white transition flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
             <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <img 
                  src="https://picsum.photos/seed/women-empower/800/800" 
                  alt="Empowered Women" 
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-full border-4 border-white"
                />
             </div>
          </div>
        </div>
      </header>

      {/* Core Values */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-wine mb-4">Why kuzaBabygirl?</h2>
            <div className="w-24 h-1 bg-wine mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Link to="/education" className="bg-soft-pink p-8 rounded-2xl text-center hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-wine text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <i className="fas fa-graduation-cap text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine mb-4">Education</h3>
              <p className="text-gray-600">Expert-led content on gender pay gaps, STEM leadership, and financial literacy.</p>
            </Link>
            
            <Link to="/challenges" className="bg-soft-pink p-8 rounded-2xl text-center hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-wine text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <i className="fas fa-trophy text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine mb-4">Daily Challenges</h3>
              <p className="text-gray-600">Complete tasks and be among the first 100 to win multiplied rewards up to 100x!</p>
            </Link>
            
            <Link to="/about" className="bg-soft-pink p-8 rounded-2xl text-center hover:shadow-lg transition group">
              <div className="w-16 h-16 bg-wine text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine mb-4">Community</h3>
              <p className="text-gray-600">A supportive network of female founders and professionals lifting as they climb.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 bg-wine text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16">
            <div className="lg:w-1/2">
               <h2 className="text-4xl font-serif font-bold mb-4">Empowerment Hub</h2>
               <p className="text-pink-100 text-lg">Knowledge is power. Explore our curated pillars of feminine strength.</p>
            </div>
            <Link 
               to="/education"
               className="mt-6 lg:mt-0 bg-white text-wine px-8 py-3 rounded-full font-bold hover:bg-pink-100 transition"
            >
              Browse All Content
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {EDUCATIONAL_TOPICS.map((topic, i) => (
              <div key={i} className="border border-pink-700 rounded-2xl p-6 hover:bg-pink-900/50 transition">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3 opacity-50">0{i+1}</span>
                  {topic.category}
                </h3>
                <ul className="space-y-3">
                  {topic.items.slice(0, 4).map((item, j) => (
                    <li key={j} className="flex items-center text-pink-100">
                      <i className="fas fa-check-circle mr-3 text-pink-400 text-sm"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 border-t border-pink-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="bg-wine w-10 h-10 rounded-full flex items-center justify-center text-white font-serif text-xl italic">K</div>
            <span className="text-2xl font-serif font-bold text-wine">kuzaBabygirl</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 kuzaBabygirl. Empowering women globally.</p>
          <div className="flex space-x-6 mt-6 md:mt-0">
             <a href="#" className="text-wine hover:text-pink-600"><i className="fab fa-facebook-f"></i></a>
             <a href="#" className="text-wine hover:text-pink-600"><i className="fab fa-twitter"></i></a>
             <a href="#" className="text-wine hover:text-pink-600"><i className="fab fa-instagram"></i></a>
             <a href="#" className="text-wine hover:text-pink-600"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
