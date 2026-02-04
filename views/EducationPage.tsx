
import React, { useState } from 'react';
import Header from '../components/Header';
import { EDUCATIONAL_TOPICS } from '../constants';

interface EducationPageProps {
  user?: any;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
}

const EducationPage: React.FC<EducationPageProps> = ({ user, onLogout, onLogin }) => {
  const [activeCategory, setActiveCategory] = useState(EDUCATIONAL_TOPICS[0].category);

  return (
    <div className="min-h-screen bg-soft-pink">
      <Header user={user} onLogout={onLogout} onLogin={onLogin} />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <div className="sticky top-28 space-y-2">
              <h1 className="text-4xl font-serif font-bold text-wine mb-8">Empowerment Pillars</h1>
              {EDUCATIONAL_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(topic.category)}
                  className={`w-full text-left px-6 py-4 rounded-2xl transition-all font-bold ${
                    activeCategory === topic.category 
                    ? 'bg-wine text-white shadow-xl translate-x-2' 
                    : 'bg-white text-gray-500 hover:bg-pink-50 border border-pink-100'
                  }`}
                >
                  <span className="block text-[10px] uppercase opacity-60 mb-1 tracking-widest">Pillar 0{i+1}</span>
                  {topic.category}
                </button>
              ))}
              
              <div className="mt-12 p-8 bg-wine/5 rounded-[2rem] border border-wine/10 text-center">
                 <p className="text-sm font-medium text-wine mb-4">Want specialized 1-on-1 coaching?</p>
                 <button className="bg-wine text-white w-full py-3 rounded-xl font-bold text-sm hover:opacity-90 transition">
                   Apply for Mentorship
                 </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
             {EDUCATIONAL_TOPICS.filter(t => t.category === activeCategory).map((topic, i) => (
               <div key={i} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="relative mb-12 rounded-[3rem] overflow-hidden h-[400px] shadow-2xl">
                     <img 
                       src={`https://picsum.photos/seed/${topic.category}/1200/600`} 
                       alt={topic.category} 
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/20 to-transparent"></div>
                     <div className="absolute bottom-12 left-12 right-12">
                        <h2 className="text-5xl font-serif font-bold text-white mb-4">{topic.category}</h2>
                        <p className="text-pink-100 text-lg max-w-xl">Comprehensive guides, masterclasses, and exercises designed to build your foundation in {topic.category.toLowerCase()}.</p>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     {topic.items.map((item, j) => (
                       <div key={j} className="bg-white p-8 rounded-[2rem] shadow-sm border border-pink-100 hover:shadow-lg transition group cursor-pointer">
                          <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-wine group-hover:bg-wine group-hover:text-white transition-colors">
                                <i className="fas fa-book-open"></i>
                             </div>
                             <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">8 min read</span>
                          </div>
                          <h3 className="text-2xl font-bold text-wine mb-4 group-hover:underline underline-offset-4 decoration-pink-300">{item}</h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            Dive deep into the strategies and historical context behind {item.toLowerCase()}. Learn how to navigate modern challenges and emerge successful.
                          </p>
                          <div className="flex items-center text-wine font-bold text-sm">
                             Read Masterclass <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                          </div>
                       </div>
                     ))}
                  </div>

                  {/* Newsletter Signup for more content */}
                  <div className="mt-16 bg-white p-12 rounded-[3rem] border-4 border-dashed border-pink-200 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                     <div className="mb-8 md:mb-0">
                        <h4 className="text-2xl font-serif font-bold text-wine mb-2">Join the Weekly Digest</h4>
                        <p className="text-gray-500">Get the latest empowerment tips delivered to your inbox every Monday.</p>
                     </div>
                     <div className="flex w-full md:w-auto space-x-2">
                        <input 
                          type="email" 
                          placeholder="Your email" 
                          className="flex-1 md:w-64 px-6 py-4 rounded-2xl bg-gray-50 border border-pink-100 focus:outline-none focus:border-wine"
                        />
                        <button className="bg-wine text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-wine/20">
                          Join
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      <footer className="bg-white py-12 px-4 border-t border-pink-100 mt-20">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-gray-500 text-sm">© 2024 kuzaBabygirl. Knowledge is our currency.</p>
        </div>
      </footer>
    </div>
  );
};

export default EducationPage;
