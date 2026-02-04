
import React from 'react';
import Header from '../components/Header';

interface AboutPageProps {
  user?: any;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ user, onLogout, onLogin }) => {
  return (
    <div className="min-h-screen bg-soft-pink">
      <Header user={user} onLogout={onLogout} onLogin={onLogin} />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-wine mb-6">Our Sanctuary</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
            "Every woman is a master of her own destiny. kuzaBabygirl is the platform where she finds her tools."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-serif font-bold text-wine mb-6">The Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2024, kuzaBabygirl was born from a simple observation: women excel when they have access to 
              specialized knowledge, a supportive community, and incentives that reward their dedication.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We provide a sanctuary for feminine growth, focusing on the three pillars of empowerment: 
              Economic Power, Social Rights, and Personal Mastery.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <p className="text-3xl font-bold text-wine mb-1">50k+</p>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Global Members</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <p className="text-3xl font-bold text-wine mb-1">100x</p>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">Reward Multiplier</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-wine/10 rounded-3xl -rotate-2"></div>
              <img 
                src="https://picsum.photos/seed/about-sanctuary/800/600" 
                alt="Sanctuary" 
                className="relative rounded-2xl shadow-2xl object-cover w-full aspect-[4/3] border-4 border-white"
              />
            </div>
          </div>
        </div>

        <section className="bg-wine text-white rounded-[3rem] p-12 lg:p-20 mb-24 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Building the Matriarchy of Success</h2>
            <p className="text-xl text-pink-100 mb-10 leading-relaxed">
              We aren't just a learning platform; we are an ecosystem. By combining high-stakes challenges with 
              world-class curriculum, we ensure that every 'Babygirl' on our platform is equipped for the 
              boardroom, the ballot box, and her best life.
            </p>
            <button 
              onClick={() => onLogin?.({})}
              className="bg-white text-wine px-12 py-4 rounded-full font-bold text-lg hover:bg-pink-100 transition shadow-xl"
            >
              Join the Legacy
            </button>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
            <img 
              src="https://picsum.photos/seed/texture/800/800" 
              alt="Pattern" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
        </section>

        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-wine mb-12">The Pillars</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto text-wine text-2xl">
                <i className="fas fa-gem"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine">Excellence</h3>
              <p className="text-gray-600 italic">We settle for nothing less than the best in content and community.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto text-wine text-2xl">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine">Empathy</h3>
              <p className="text-gray-600 italic">Lifting as we climb is the core of our sisterhood.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto text-wine text-2xl">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="text-2xl font-bold text-wine">Empowerment</h3>
              <p className="text-gray-600 italic">Providing the financial and social keys to unlock every door.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-12 px-4 border-t border-pink-100 mt-20">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-gray-500 text-sm">© 2024 kuzaBabygirl. The future is feminine.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
