
import React from 'react';
import Header from '../components/Header';
import { MOCK_NAMES } from '../constants';

interface ChallengesPageProps {
  user?: any;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
}

const ChallengesPage: React.FC<ChallengesPageProps> = ({ user, onLogout, onLogin }) => {
  return (
    <div className="min-h-screen bg-soft-pink">
      <Header user={user} onLogout={onLogout} onLogin={onLogin} />
      
      <main className="max-w-7xl mx-auto px-4 py-16">
        <header className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-wine mb-6">The Daily Multiplier</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Every day, we release a single, high-stakes knowledge challenge. 
              The fastest 100 members to achieve a perfect 3/3 score multiply their stake by 100x.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 flex flex-col items-center bg-white p-8 rounded-[2.5rem] shadow-xl border border-pink-100">
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Next Challenge In</p>
             <p className="text-4xl font-serif font-bold text-wine tracking-tighter">04 : 22 : 11</p>
             <button 
              onClick={() => onLogin?.({})}
              className="mt-6 bg-wine text-white px-10 py-3 rounded-full font-bold hover:scale-105 transition"
             >
               Set Reminder
             </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-wine text-4xl mb-6"><i className="fas fa-lock-open"></i></div>
              <h3 className="text-2xl font-bold text-wine mb-4">Stake to Play</h3>
              <p className="text-gray-600">Choose your entry amount. From as low as 10 sh to as high as you dare. This stake is your ticket to the 100x multiplier.</p>
           </div>
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-wine text-4xl mb-6"><i className="fas fa-bolt"></i></div>
              <h3 className="text-2xl font-bold text-wine mb-4">Speed & Precision</h3>
              <p className="text-gray-600">You have 3 seconds per question. 3 questions total. One mistake, and you're out for the day. Precision is key.</p>
           </div>
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="text-wine text-4xl mb-6"><i className="fas fa-coins"></i></div>
              <h3 className="text-2xl font-bold text-wine mb-4">Instant Payouts</h3>
              <p className="text-gray-600">Winners are paid directly to their in-app wallet instantly after the challenge ends. Withdraw or restake anytime.</p>
           </div>
        </div>

        <section className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl overflow-hidden relative border border-pink-100">
           <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-wine">Hall of Fame</h2>
              <span className="bg-wine text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Global Ranking</span>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 border border-gray-50 rounded-3xl bg-soft-pink/50">
                   <div className="relative mb-4">
                      <img 
                        src={`https://picsum.photos/seed/winner-${i}/150/150`} 
                        alt="Winner" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                        {i+1}
                      </div>
                   </div>
                   <h4 className="font-bold text-wine text-lg">{MOCK_NAMES[i]}</h4>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mb-2">Master of STEM</p>
                   <p className="text-2xl font-black text-green-600">+5,000 sh</p>
                </div>
              ))}
           </div>
           <div className="mt-10 text-center">
              <button 
                onClick={() => onLogin?.({})}
                className="text-wine font-bold border-b-2 border-wine hover:opacity-70 transition pb-1"
              >
                View Full Leaderboard
              </button>
           </div>
        </section>

        <section className="mt-20 py-20 bg-wine text-white rounded-[3rem] text-center px-4">
           <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8 italic">Ready to grow?</h2>
           <p className="text-xl text-pink-100 mb-12 max-w-2xl mx-auto">
             Challenges go live every day at 12:00 PM GMT. Make sure your wallet is funded and your mind is sharp.
           </p>
           <button 
              onClick={() => onLogin?.({})}
              className="bg-white text-wine px-16 py-5 rounded-full font-bold text-xl hover:scale-110 transition shadow-2xl"
           >
             Go to Dashboard
           </button>
        </section>
      </main>
    </div>
  );
};

export default ChallengesPage;
