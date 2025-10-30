import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase, type ContactMessage } from '../lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    if (!error) {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }

    setSending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-transparent"></div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 mb-6 tracking-wider">
            THE RAVEN'S CALL
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Send forth your message across the realms. The raven carries words through
            ice and snow, delivering your call to the warrior who awaits.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-cyan-500/30 rounded-sm p-8 md:p-12 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

            {sent ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center">
                  <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)] animate-scaleIn">
                    <CheckCircle className="w-16 h-16 text-cyan-400" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-cyan-300 tracking-wide">
                  Message Sent!
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  The raven has taken flight into the aurora skies. Your message journeys
                  through Jötunheim and will reach its destination soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-cyan-300 font-bold tracking-wide">
                    <User className="w-5 h-5" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 text-slate-100 rounded-sm focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-cyan-300 font-bold tracking-wide">
                    <Mail className="w-5 h-5" />
                    <span>Your Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 text-slate-100 rounded-sm focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-cyan-300 font-bold tracking-wide">
                    <MessageSquare className="w-5 h-5" />
                    <span>Your Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 text-slate-100 rounded-sm focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 resize-none"
                    placeholder="Share your thoughts, proposals, or inquiries..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold text-lg tracking-wider rounded-sm border-2 border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {sending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>SENDING RAVEN...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND RAVEN</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <a
              href="https://github.com/rishabhsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/rishabhsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="mailto:rishabh@example.com"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 flex items-center justify-center transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}
