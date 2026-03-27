import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function VyntaSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/testers/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || `Server error: ${res.status}`);
      }
    } catch (err: any) {
      console.error("Signup fetch error:", err);
      setStatus('error');
      setMessage(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Mail className="text-blue-500" size={24} />
          Become a Tester
        </h3>
        <p className="text-gray-400 text-sm mb-8">
          Enter your Gmail to get direct access to the Vynta beta and help me squash bugs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              status === 'success' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
            }`}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Joining...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={20} />
                You're in!
              </>
            ) : (
              'Join Beta Directly'
            )}
          </button>
        </form>

        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-500/20"
          >
            <AlertCircle size={16} />
            {message}
          </motion.div>
        )}

        {status === 'success' && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-emerald-400 text-sm font-medium"
          >
            I'll send you an invite to your Gmail shortly.
          </motion.p>
        )}
      </div>
    </div>
  );
}
