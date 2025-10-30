import { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export default function EnhancedContactSection() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [ravenFlying, setRavenFlying] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send email using a service like EmailJS or Formspree
      // For now, we'll simulate sending an email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setRavenFlying(true);
      setTimeout(() => {
        setSent(true);
        setRavenFlying(false);
      }, 3000);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (you might want to show an error message to the user)
    }

    setSending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const themeGradient = theme === 'aurora' ? 'aurora-veil' : 'ember-forge';

  return (
    <section id="raven" className="relative min-h-screen w-full py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/raven.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gow-deep-gray/20 via-gow-near-black/10 to-gow-black/20"></div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-${themeColor} rounded-full animate-twinkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-${themeColor}/10 rounded-full animate-pulse-slow`}></div>

      {ravenFlying && (
        <div className="fixed top-1/2 left-1/4 z-40 animate-raven-flight pointer-events-none">
          <svg width="80" height="80" viewBox="0 0 80 80" className={`text-${themeColor}`}>
            <path d="M 20,40 L 30,30 L 50,35 L 60,25 L 50,40 L 60,55 L 50,45 L 30,50 L 20,40 Z" fill="currentColor" opacity="0.8" />
            <circle cx="55" cy="32" r="2" fill="white" />
            <path d="M 50,40 L 70,40" stroke={theme === 'aurora' ? '#9fd9ff' : '#ff6a3d'} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
          </svg>
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-${themeGradient} mb-6 tracking-wider`}>
            THE RAVEN'S CALL
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gow-gold to-transparent mb-6"></div>
          <p className="text-xl text-gow-silver max-w-2xl mx-auto leading-relaxed">
            Send forth your message across the realms. The raven carries words through
            ice and snow, delivering your call to the warrior who awaits.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className={`relative bg-gradient-to-br from-gow-near-black/50 to-gow-black/50 backdrop-blur-sm border-2 border-${themeColor}/30 rounded-sm p-8 md:p-12 shadow-[0_0_40px_${theme === 'aurora' ? 'rgba(79,176,255,0.2)' : 'rgba(212,63,47,0.2)'}]`}>
            <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-${themeColor} to-transparent`}></div>
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-${themeColor} to-transparent`}></div>

            {sent ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="flex justify-center">
                  <div className={`p-6 bg-gradient-to-br from-${themeColor}/20 to-${themeColor}/10 border-2 border-${themeColor} rounded-full shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.5)' : 'rgba(212,63,47,0.5)'}] animate-scaleIn`}>
                    <CheckCircle className={`w-16 h-16 text-${themeColor}`} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gow-gold tracking-wide">
                  Message Sent!
                </h3>
                <p className="text-gow-silver text-lg leading-relaxed">
                  The raven has taken flight into the aurora skies. Your message journeys
                  through Jötunheim and will reach its destination soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className={`flex items-center gap-2 text-${themeColor} font-bold tracking-wide`}>
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
                    className={`w-full px-4 py-3 bg-gow-black/80 border-2 border-gow-deep-gray text-gow-silver rounded-sm focus:border-${themeColor} focus:outline-none focus:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.3)' : 'rgba(212,63,47,0.3)'}] transition-all duration-300`}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className={`flex items-center gap-2 text-${themeColor} font-bold tracking-wide`}>
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
                    className={`w-full px-4 py-3 bg-gow-black/80 border-2 border-gow-deep-gray text-gow-silver rounded-sm focus:border-${themeColor} focus:outline-none focus:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.3)' : 'rgba(212,63,47,0.3)'}] transition-all duration-300`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className={`flex items-center gap-2 text-${themeColor} font-bold tracking-wide`}>
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
                    className={`w-full px-4 py-3 bg-gow-black/80 border-2 border-gow-deep-gray text-gow-silver rounded-sm focus:border-${themeColor} focus:outline-none focus:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.3)' : 'rgba(212,63,47,0.3)'}] transition-all duration-300 resize-none`}
                    placeholder="Share your thoughts, proposals, or inquiries..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`group relative w-full px-8 py-4 bg-${themeGradient} text-white font-bold text-lg tracking-wider rounded-sm border-2 border-${themeColor} hover:shadow-[0_0_40px_${theme === 'aurora' ? 'rgba(79,176,255,0.6)' : 'rgba(212,63,47,0.6)'}] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden focus:outline-none focus:ring-2 focus:ring-gow-gold`}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-gow-gold/50 to-gow-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gow-silver">
            <a
              href="https://github.com/enigma2210"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 hover:text-${themeColor} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm`}
              aria-label="GitHub Profile"
            >
              <div className={`w-10 h-10 rounded-full bg-gow-near-black border-2 border-gow-deep-gray hover:border-${themeColor} flex items-center justify-center transition-all duration-300`}>
                <Github className="w-5 h-5" />
              </div>
              <span className="font-medium">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rishabh-sanjeev-singh-4084b21b6"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 hover:text-${themeColor} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm`}
              aria-label="LinkedIn Profile"
            >
              <div className={`w-10 h-10 rounded-full bg-gow-near-black border-2 border-gow-deep-gray hover:border-${themeColor} flex items-center justify-center transition-all duration-300`}>
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="mailto:21cs2016@rgipt.ac.in"
              className={`flex items-center gap-2 hover:text-${themeColor} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm`}
              aria-label="Email Address"
            >
              <div className={`w-10 h-10 rounded-full bg-gow-near-black border-2 border-gow-deep-gray hover:border-${themeColor} flex items-center justify-center transition-all duration-300`}>
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-black to-transparent"></div>
    </section>
  );
}
