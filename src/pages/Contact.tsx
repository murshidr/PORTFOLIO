import PageLayout from '../components/PageLayout';
import { Mail, MapPin, Phone, Send, Linkedin, Github } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };
  return (
    <PageLayout title="Get in Touch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Let's build something amazing</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm currently available for internships in AI Research, Machine Learning Engineering, or Space Technology.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono">Email</p>
                <p className="font-medium">murshidreyas@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono">Phone</p>
                <p className="font-medium">+91 8939043919</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono">Location</p>
                <p className="font-medium">Chennai, Tamil Nadu</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Linkedin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono">LinkedIn</p>
                <a href="https://www.linkedin.com/in/murshid-r-37088b272" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-400 transition-colors">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
          {status === 'success' && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">
              Failed to send message. Please reach out via email directly.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400 uppercase tracking-wider">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-mono text-gray-400 uppercase tracking-wider">Subject</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            >
              <option>Internship Opportunity</option>
              <option>Research Collaboration</option>
              <option>Project Inquiry</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-mono text-gray-400 uppercase tracking-wider">Message</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/20 resize-none"
              placeholder="Tell me about your opportunity..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
