
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { GoogleGenAI } from "@google/genai";

interface InspirationDetailPageProps {
  user?: any;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
}

const InspirationDetailPage: React.FC<InspirationDetailPageProps> = ({ user, onLogout, onLogin }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!item) {
      navigate('/dashboard');
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Write a beautiful, empowering, and high-quality mini-article (about 3 paragraphs) titled "${item.title}" for a women's empowerment platform called kuzaBabygirl. The topic is ${item.tag}. Include a powerful closing quote.`,
        });
        setContent(response.text || "Inspiration is everywhere. Keep moving forward.");
      } catch (error) {
        console.error("AI Content generation failed", error);
        setContent(`
          In the journey of empowerment, ${item.title} stands as a testament to resilience and vision. 
          When we embrace our strength as women, we redefine the boundaries of what is possible. 
          This isn't just about professional success; it's about the holistic growth of the feminine spirit.

          Every barrier broken is a path created for the next generation. As we navigate the complexities of 
          the modern world, remember that your voice is your most powerful asset. Use it with clarity, 
          purpose, and compassion.

          "The most courageous act is still to think for yourself. Aloud." — Coco Chanel
        `);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [item, navigate]);

  if (!item) return null;

  return (
    <div className="min-h-screen bg-soft-pink">
      <Header user={user} onLogout={onLogout} onLogin={onLogin} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="text-wine font-bold flex items-center mb-8 hover:opacity-70 transition"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Sanctuary
        </button>

        <article className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-pink-100">
           <div className="relative h-[400px]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div className="absolute top-8 left-8">
                 <span className="bg-wine text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {item.tag}
                 </span>
              </div>
           </div>

           <div className="p-10 lg:p-16 -mt-20 relative z-10">
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-wine mb-8 leading-tight">
                {item.title}
              </h1>

              {loading ? (
                <div className="space-y-6 animate-pulse">
                   <div className="h-4 bg-pink-50 rounded w-3/4"></div>
                   <div className="h-4 bg-pink-50 rounded w-full"></div>
                   <div className="h-4 bg-pink-50 rounded w-5/6"></div>
                   <div className="h-4 bg-pink-50 rounded w-2/3 mt-12"></div>
                </div>
              ) : (
                <div className="prose prose-pink max-w-none">
                  {content.split('\n').map((para, i) => para.trim() && (
                    <p key={i} className="text-xl text-gray-700 leading-relaxed mb-8 font-light italic first-letter:text-5xl first-letter:font-bold first-letter:text-wine first-letter:mr-3 first-letter:float-left">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-16 pt-12 border-t border-pink-50 flex flex-col md:flex-row items-center justify-between">
                 <div className="flex items-center space-x-4 mb-6 md:mb-0">
                    <img src="https://i.pravatar.cc/100?img=32" className="w-12 h-12 rounded-full border-2 border-wine" alt="Curator" />
                    <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Curated by</p>
                       <p className="font-serif font-bold text-wine">The Babygirl Collective</p>
                    </div>
                 </div>
                 <div className="flex space-x-4">
                    <button className="w-12 h-12 rounded-full bg-pink-50 text-wine flex items-center justify-center hover:bg-wine hover:text-white transition shadow-sm">
                       <i className="fas fa-share-alt"></i>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-pink-50 text-wine flex items-center justify-center hover:bg-wine hover:text-white transition shadow-sm">
                       <i className="fas fa-bookmark"></i>
                    </button>
                 </div>
              </div>
           </div>
        </article>

        <section className="mt-20 text-center">
           <h3 className="text-wine font-serif font-bold text-2xl mb-8 italic">More like this</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white p-4 rounded-3xl shadow-md border border-pink-50 hover:scale-105 transition cursor-pointer">
                   <img src={`https://picsum.photos/seed/related-${i}/200/200`} className="w-full aspect-square object-cover rounded-2xl mb-3" alt="Related" />
                   <p className="text-[10px] font-bold text-wine uppercase">Discovery</p>
                </div>
              ))}
           </div>
        </section>
      </main>
      
      <footer className="bg-white py-12 px-4 border-t border-pink-100 mt-20">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-gray-500 text-sm italic">"Your journey is valid. Your growth is inevitable."</p>
        </div>
      </footer>
    </div>
  );
};

export default InspirationDetailPage;
