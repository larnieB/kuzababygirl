
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import { ADULT_CAROUSEL_ITEMS } from '../constants';

interface Mastery18PageProps {
  user: any;
  onLogout: () => void;
}

const Mastery18Page: React.FC<Mastery18PageProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const initialTopic = location.state?.initialTopic || ADULT_CAROUSEL_ITEMS[0].title;
  const [selectedModule, setSelectedModule] = useState(initialTopic);

  const modules = [
    {
      title: 'Investment Mastery',
      description: 'Sophisticated wealth management, high-yield portfolios, and global asset allocation for the modern female executive.',
      content: 'Accessing venture capital networks and mastering the stock market. Learn how to leverage debt and scale equity.',
      difficulty: 'Expert',
      time: '45 min'
    },
    {
      title: 'Reproductive Autonomy',
      description: 'Navigating global laws, healthcare rights, and personal agency in the digital age.',
      content: 'A deep dive into constitutional rights, cross-border health access, and the future of feminine policy.',
      difficulty: 'Advanced',
      time: '30 min'
    },
    {
      title: 'Executive Presence',
      description: 'Psychology of power, boardroom negotiation tactics, and elite-level leadership branding.',
      content: 'How to command a room, handle aggressive negotiations, and build a multi-generational legacy.',
      difficulty: 'Elite',
      time: '50 min'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Elite Hero */}
        <div className="relative rounded-[3rem] overflow-hidden mb-16 h-[500px] flex items-center shadow-3xl">
           <img 
             src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
             className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
             alt="Mastery Background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-wine via-wine/60 to-transparent"></div>
           <div className="relative z-10 p-12 lg:p-20 max-w-3xl">
              <span className="inline-block px-4 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl">
                 Exclusive Access (18+)
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                 The Sanctuary of <br />
                 <span className="text-pink-300 italic">Advanced Mastery</span>
              </h1>
              <p className="text-xl text-pink-100/80 leading-relaxed mb-10">
                 Reserved for those ready to navigate the complexities of global influence, financial power, and personal autonomy.
              </p>
              <div className="flex items-center space-x-6">
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-2 border-wine shadow-lg" alt="User" />
                    ))}
                 </div>
                 <span className="text-white text-sm font-bold opacity-80 italic">42 Masters currently online</span>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           {/* Sidebar */}
           <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10">
                 <h3 className="text-white font-serif font-bold text-2xl mb-8 flex items-center">
                    <i className="fas fa-layer-group text-pink-400 mr-4"></i>
                    Core Modules
                 </h3>
                 <div className="space-y-4">
                    {modules.map((mod, i) => (
                       <button
                          key={i}
                          onClick={() => setSelectedModule(mod.title)}
                          className={`w-full text-left p-6 rounded-2xl transition-all ${
                             selectedModule === mod.title 
                             ? 'bg-wine text-white shadow-2xl scale-[1.02] border border-pink-500/30' 
                             : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
                          }`}
                       >
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Level {i+1}</span>
                             <span className="text-[9px] font-bold text-pink-300">{mod.difficulty}</span>
                          </div>
                          <h4 className="font-bold text-lg">{mod.title}</h4>
                       </button>
                    ))}
                 </div>
                 
                 <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="bg-gradient-to-br from-pink-900/40 to-wine/40 p-6 rounded-3xl text-center">
                       <i className="fas fa-crown text-3xl text-yellow-500 mb-4"></i>
                       <h5 className="text-white font-bold mb-2">Executive Lounge</h5>
                       <p className="text-xs text-gray-400 mb-6 italic leading-relaxed">Private forum for high-level strategy and networking.</p>
                       <button className="w-full bg-white text-wine py-3 rounded-xl font-bold text-xs hover:bg-pink-100 transition">
                          Enter Discussion
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Content Area */}
           <div className="lg:col-span-2">
              {modules.filter(m => m.title === selectedModule).map((mod, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                          <i className="fas fa-shield-halved text-[150px] text-wine"></i>
                       </div>
                       
                       <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                          <h2 className="text-4xl font-serif font-bold text-wine mb-4 md:mb-0">{mod.title}</h2>
                          <div className="flex space-x-4">
                             <div className="bg-pink-50 px-4 py-2 rounded-xl text-center border border-pink-100">
                                <p className="text-[9px] font-black text-wine/40 uppercase tracking-tighter">Est. Read</p>
                                <p className="font-bold text-wine">{mod.time}</p>
                             </div>
                             <div className="bg-wine px-4 py-2 rounded-xl text-center shadow-lg">
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-tighter">Status</p>
                                <p className="font-bold text-white">0% Done</p>
                             </div>
                          </div>
                       </div>

                       <p className="text-2xl text-gray-500 font-serif italic mb-12 leading-relaxed border-l-4 border-pink-200 pl-8">
                          "{mod.description}"
                       </p>

                       <div className="prose prose-pink max-w-none text-gray-700 leading-loose space-y-8">
                          <p className="text-lg">
                             The path to mastery is seldom a straight line. It requires the courage to ask difficult questions 
                             and the discipline to follow the answers wherever they lead. In this module, we break down 
                             the structural and psychological frameworks that govern {mod.title.toLowerCase()}.
                          </p>
                          <div className="grid md:grid-cols-2 gap-8">
                             <div className="bg-soft-pink p-8 rounded-3xl border border-pink-100">
                                <h4 className="font-bold text-wine mb-4 flex items-center">
                                   <i className="fas fa-check-double mr-3 text-pink-500"></i> Key Frameworks
                                </h4>
                                <ul className="text-sm space-y-4">
                                   <li className="flex items-start">
                                      <span className="w-5 h-5 bg-wine text-white rounded-full flex items-center justify-center text-[10px] mr-3 mt-1 flex-shrink-0">1</span>
                                      The Governance Principle of Autonomy
                                   </li>
                                   <li className="flex items-start">
                                      <span className="w-5 h-5 bg-wine text-white rounded-full flex items-center justify-center text-[10px] mr-3 mt-1 flex-shrink-0">2</span>
                                      Capital Multipliers in Restricted Markets
                                   </li>
                                   <li className="flex items-start">
                                      <span className="w-5 h-5 bg-wine text-white rounded-full flex items-center justify-center text-[10px] mr-3 mt-1 flex-shrink-0">3</span>
                                      Psychological Resilience in Hostile Systems
                                   </li>
                                </ul>
                             </div>
                             <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                                <img src={`https://picsum.photos/seed/${mod.title}/600/600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Mastery Visual" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer">
                                   <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-2xl group-hover:bg-wine transition-colors shadow-2xl">
                                      <i className="fas fa-play"></i>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="mt-16 flex justify-between items-center pt-10 border-t border-gray-100">
                          <button className="text-wine font-bold flex items-center hover:opacity-70 transition">
                             <i className="fas fa-download mr-3"></i> Download Study Guide
                          </button>
                          <button className="bg-wine text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition active:scale-95">
                             Begin Exercise <i className="fas fa-arrow-right ml-3"></i>
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <section className="mt-24 text-center">
           <h3 className="text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-12">Trusted by Global Leaders</h3>
           <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
              <i className="fab fa-forbes text-5xl text-white"></i>
              <i className="fab fa-hooli text-5xl text-white"></i>
              <i className="fab fa-stripe text-5xl text-white"></i>
              <i className="fab fa-microsoft text-5xl text-white"></i>
           </div>
        </section>
      </main>

      <footer className="bg-black/50 py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-medium">
           <Link to="/dashboard" className="text-wine font-bold hover:text-pink-300 transition mb-4 md:mb-0">
              <i className="fas fa-chevron-left mr-2"></i> Return to Dashboard
           </Link>
           <p>© 2024 kuzaBabygirl Mastery Series. Restricted Access.</p>
           <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms of Power</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Mastery18Page;
