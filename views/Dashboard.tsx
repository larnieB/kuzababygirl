
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { User, Challenge, Competitor, MCQQuestion } from '../types';
import { MOCK_NAMES, EDUCATIONAL_TOPICS, CAROUSEL_ITEMS, ADULT_CAROUSEL_ITEMS } from '../constants';
import { getDailyEmpowerment, getDailyChallengeQuestions } from '../services/geminiService';

interface DashboardProps {
  user: User;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, logout, updateBalance }) => {
  const navigate = useNavigate();
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [dailyMessage, setDailyMessage] = useState<string>("Loading inspiration...");
  const [unlockAmount, setUnlockAmount] = useState<string>('50');

  // Age Verification State
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [pendingAdultItem, setPendingAdultItem] = useState<any>(null);

  // Game State
  const [gameState, setGameState] = useState<'idle' | 'showing_question' | 'showing_options' | 'finished'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      const msg = await getDailyEmpowerment();
      setDailyMessage(msg || "You are stronger than you think. Keep pushing boundaries.");
      
      const mcqs = await getDailyChallengeQuestions();
      setDailyChallenge({
        id: 'daily-01',
        title: 'Empowerment Sprint',
        description: 'Prove your knowledge. Answer 3/3 correctly to win 100x your stake!',
        category: 'Empowerment',
        isUnlocked: false,
        status: 'active',
        questions: mcqs
      });
    };
    init();

    const initialCompetitors = Array.from({ length: 15 }, (_, i) => ({
      rank: i + 1,
      name: MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)],
      phone: `07${Math.floor(Math.random() * 899) + 100}***${Math.floor(Math.random() * 89) + 10}`,
      wins: Math.floor(Math.random() * 50) + 1,
      payout: (100 - i) * 10,
      timestamp: new Date()
    }));
    setCompetitors(initialCompetitors);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleInspirationClick = (item: any) => {
    navigate(`/inspiration/${item.id}`, { state: { item } });
  };

  const handleAdultItemClick = (item: any) => {
    setPendingAdultItem(item);
    setIsAgeModalOpen(true);
  };

  const confirmAge = () => {
    setIsAgeModalOpen(false);
    navigate('/mastery-18', { state: { initialTopic: pendingAdultItem?.title } });
    setPendingAdultItem(null);
  };

  const startChallenge = () => {
    if (!dailyChallenge) return;
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    beginQuestionSequence(0);
  };

  const beginQuestionSequence = (index: number) => {
    setGameState('showing_question');
    setTimeLeft(3);
    
    setTimeout(() => {
      setGameState('showing_options');
      startAnswerTimer();
    }, 2000);
  };

  const startAnswerTimer = () => {
    let seconds = 3;
    setTimeLeft(3);
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      seconds -= 0.1;
      setTimeLeft(seconds);
      if (seconds <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleAnswer(-1);
      }
    }, 100);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const currentQ = dailyChallenge?.questions[currentQuestionIndex];
    if (currentQ && selectedIndex === currentQ.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < (dailyChallenge?.questions.length || 0)) {
      setCurrentQuestionIndex(nextIndex);
      beginQuestionSequence(nextIndex);
    } else {
      setGameState('finished');
      finishChallenge(selectedIndex === currentQ?.correctIndex ? correctCount + 1 : correctCount);
    }
  };

  const finishChallenge = (finalCorrect: number) => {
    const totalQs = dailyChallenge?.questions.length || 3;
    const won = finalCorrect === totalQs;
    const stake = dailyChallenge?.unlockAmount || 50;

    if (won) {
      const winnings = stake * 100;
      updateBalance(winnings);
      const myEntry: Competitor = {
        rank: 1,
        name: user.name,
        phone: user.phone,
        wins: Math.floor(Math.random() * 5),
        payout: winnings,
        timestamp: new Date()
      };
      setCompetitors(prev => [myEntry, ...prev].map((c, i) => ({...c, rank: i + 1})));
      setDailyChallenge(prev => prev ? {...prev, status: 'completed'} : null);
    } else {
      setDailyChallenge(prev => prev ? {...prev, status: 'failed'} : null);
    }
  };

  const handleUnlock = () => {
    const amount = parseFloat(unlockAmount);
    if (isNaN(amount) || amount < 10) {
      alert("Minimum stake is 10 sh");
      return;
    }
    if (amount > user.balance) {
      alert("Insufficient balance!");
      return;
    }
    updateBalance(-amount);
    setDailyChallenge(prev => prev ? { ...prev, isUnlocked: true, unlockAmount: amount } : null);
  };

  const currentQ = dailyChallenge?.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-soft-pink">
      <Header user={user} onLogout={logout} />

      {/* Age Verification Modal */}
      {isAgeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-wine/60 backdrop-blur-md" onClick={() => setIsAgeModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="text-center">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-wine text-3xl font-bold border-4 border-white shadow-lg">
                   18+
                </div>
                <h2 className="text-3xl font-serif font-bold text-wine mb-4">Maturity Check</h2>
                <p className="text-gray-600 mb-10 leading-relaxed">
                   The content you are about to access involves advanced topics in financial autonomy and reproductive rights intended for mature audiences.
                </p>
                
                <div className="space-y-4">
                   <button 
                      onClick={confirmAge}
                      className="w-full bg-wine text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition shadow-xl active:scale-95"
                   >
                      I am 18 or older
                   </button>
                   <button 
                      onClick={() => setIsAgeModalOpen(false)}
                      className="w-full text-gray-400 font-bold py-2 hover:text-wine transition"
                   >
                      Cancel
                   </button>
                </div>
                
                <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                   kuzaBabygirl | Responsible Empowerment
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Daily Inspiration Carousel */}
      <section className="py-6 overflow-hidden bg-white/50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-serif font-bold text-wine">Daily Inspiration</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Growth Stories & Insights</p>
          </div>
          <div className="bg-wine text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
            Balance: {user.balance.toLocaleString()} sh
          </div>
        </div>
        
        <div className="relative px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-6 snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing">
            {CAROUSEL_ITEMS.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="w-[300px] flex-shrink-0 snap-start cursor-pointer group"
                onClick={() => handleInspirationClick(item)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg border border-pink-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <span className="text-[10px] bg-pink-500/80 text-white px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                      {item.tag}
                    </span>
                    <h3 className="text-white font-serif font-bold text-lg mt-1 group-hover:text-pink-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-wine mb-6 flex items-center">
              <i className="fas fa-crown mr-3 text-yellow-500"></i>
              Daily Mega Challenge
            </h3>
            
            {!dailyChallenge ? (
               <div className="bg-white rounded-3xl p-12 text-center animate-pulse border border-pink-100">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">Fetching daily challenge...</p>
               </div>
            ) : dailyChallenge.status === 'completed' || dailyChallenge.status === 'failed' ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-lg border-2 border-dashed border-pink-200">
                <i className={`fas ${dailyChallenge.status === 'completed' ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-400'} text-6xl mb-6`}></i>
                <h4 className="text-3xl font-bold text-wine mb-2">
                  {dailyChallenge.status === 'completed' ? 'You Won!' : 'Challenge Ended'}
                </h4>
                <p className="text-gray-500 mb-8">
                  {dailyChallenge.status === 'completed' 
                    ? `Brilliant performance! You've multiplied your stake by 100x.` 
                    : `Close effort! You need 3/3 to win. Come back tomorrow.`}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-wine text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : gameState === 'idle' ? (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-wine text-white px-6 py-2 rounded-bl-3xl font-bold text-sm">
                  100X MULTIPLIER
                </div>
                <h4 className="text-2xl font-bold text-wine mb-4">{dailyChallenge.title}</h4>
                <p className="text-gray-600 mb-8 text-lg">{dailyChallenge.description}</p>
                
                <div className="bg-soft-pink p-6 rounded-2xl mb-8 flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-bolt text-wine mr-4 text-2xl"></i>
                    <div>
                      <p className="text-xs font-bold text-wine/60 uppercase">Intensity</p>
                      <p className="font-bold">High Speed MCQ</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-wine/60 uppercase">Requirements</p>
                    <p className="font-bold">3/3 Correct</p>
                  </div>
                </div>

                {!dailyChallenge.isUnlocked ? (
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1 relative">
                      <input 
                        type="number" 
                        className="w-full bg-gray-50 border border-pink-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-wine font-bold text-lg"
                        value={unlockAmount}
                        onChange={(e) => setUnlockAmount(e.target.value)}
                        placeholder="Stake Amount"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">sh</span>
                    </div>
                    <button 
                      onClick={handleUnlock}
                      className="bg-wine text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-lg shadow-wine/20 transition-all active:scale-95"
                    >
                      Unlock Challenge
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={startChallenge}
                    className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-green-700 shadow-xl animate-bounce"
                  >
                    Start Now!
                  </button>
                )}
                <p className="text-center text-xs text-gray-400 mt-6 font-medium">
                  Stake to enter. Only the first 100 to complete 3/3 win rewards.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-wine min-h-[400px] flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-center mb-10">
                       <span className="text-wine font-bold text-lg">Question {currentQuestionIndex + 1}/3</span>
                       {gameState === 'showing_options' && (
                          <div className="flex items-center space-x-2">
                            <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                               <div 
                                  className="h-full bg-wine transition-all duration-100" 
                                  style={{ width: `${(timeLeft / 3) * 100}%` }}
                               ></div>
                            </div>
                            <span className="font-bold text-wine w-8">{Math.ceil(timeLeft)}s</span>
                          </div>
                       )}
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {currentQ?.question}
                    </h2>
                 </div>

                 <div className="space-y-4">
                    {gameState === 'showing_options' ? (
                       currentQ?.options.map((opt, i) => (
                          <button
                             key={i}
                             onClick={() => handleAnswer(i)}
                             className="w-full p-5 text-left rounded-2xl border-2 border-pink-100 hover:border-wine hover:bg-pink-50 transition-all font-bold text-lg group animate-in zoom-in-95 duration-300"
                             style={{ animationDelay: `${i * 100}ms` }}
                          >
                             <div className="flex items-center">
                                <span className="w-8 h-8 rounded-full bg-pink-100 text-wine flex items-center justify-center mr-4 group-hover:bg-wine group-hover:text-white transition-colors">
                                   {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                             </div>
                          </button>
                       ))
                    ) : (
                      <div className="py-12 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-wine rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-wine rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-wine rounded-full animate-bounce delay-200"></div>
                      </div>
                    )}
                 </div>
              </div>
            )}

            {/* +18 Mastery Carousel */}
            <div className="mt-12">
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h3 className="text-2xl font-serif font-bold text-wine">+18</h3>
                   <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Advanced Empowerment & Mastery</p>
                 </div>
               </div>
               
               <div className="relative bg-white rounded-3xl border border-pink-100 px-4 py-6">
                 <div className="flex overflow-x-auto no-scrollbar gap-6 snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing">
                   {ADULT_CAROUSEL_ITEMS.map((item, idx) => (
                     <div 
                       key={`${item.id}-${idx}`} 
                       className="w-[260px] flex-shrink-0 snap-start cursor-pointer group"
                       onClick={() => handleAdultItemClick(item)}
                     >
                       <div className="relative aspect-square overflow-hidden rounded-3xl shadow-md border border-pink-50">
                         <img 
                           src={item.image} 
                           alt={item.title} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-wine/90 via-wine/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-5 w-full">
                           <span className="text-[9px] bg-wine text-white px-2 py-0.5 rounded uppercase font-black tracking-widest">
                             {item.tag}
                           </span>
                           <h4 className="text-white font-serif font-bold text-md mt-2 leading-tight">
                             {item.title}
                           </h4>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24">
              <div className="bg-wine p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Today's Winners</h3>
                  <div className="flex items-center space-x-2 bg-pink-900/40 px-3 py-1 rounded-full border border-pink-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
                  </div>
                </div>
                <p className="text-xs text-pink-200 uppercase tracking-widest">Only 3/3 Masters are listed here</p>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {competitors.map((c, idx) => (
                      <tr key={idx} className={`border-b border-gray-50 hover:bg-pink-50 transition ${c.name === user.name ? 'bg-pink-100 animate-pulse' : ''}`}>
                        <td className="px-4 py-4 w-12 text-center">
                           <span className={`font-bold ${idx < 3 ? 'text-wine text-lg' : 'text-gray-400'}`}>{idx + 1}</span>
                        </td>
                        <td className="px-2 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{c.name}</span>
                            <span className="text-[10px] text-gray-400">{c.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-green-600 font-black tracking-tight">+{c.payout} sh</span>
                            <span className="text-[9px] text-gray-400 uppercase">100x Win</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-center">
                 <p className="text-[10px] text-gray-400 uppercase font-bold">Next Payout Cycle in 2h 44m</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
