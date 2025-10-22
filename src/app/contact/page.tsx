"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, User, Send, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

  if (!isMounted) {
    return (
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
          <div className="max-w-6xl mx-auto animate-pulse">
            <div className="h-20 bg-white/10 rounded-2xl mb-12"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-96 bg-white/10 rounded-3xl"></div>
                <div className="h-48 bg-white/10 rounded-3xl"></div>
              </div>
              <div className="h-[600px] bg-white/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Общий фон как на главной */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
        {/* Навигация */}
        <nav className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            На главную
          </Link>
        </nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          {/* Заголовок в стиле главной */}
          <motion.div
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Свяжитесь
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Есть вопросы или предложения? Мы всегда рады помочь и сделать наш журнал лучше вместе с вами!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Информация - в стиле карточек главной */}
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 group">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 group-hover:text-orange-400 transition-colors">
                  <MessageSquare className="w-8 h-8 text-orange-400" />
                  Быстрая связь
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-slate-300">support@sozaymuzyku.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Ответим за</p>
                      <p className="text-slate-300">24 часа</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border-orange-500/30">
                <h4 className="text-2xl font-bold text-white mb-4">Частые вопросы</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                    Как предложить тему для статьи?
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                    Хочу стать автором журнала
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                    Нашли ошибку в материале
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                    Предложения по сотрудничеству
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Форма - в стиле главной */}
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Напишите нам
                  </span>
                </h3>
                <p className="text-slate-300 mb-8">Расскажите, чем мы можем вам помочь</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Статус отправки */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Сообщение отправлено! Ответим вам в течение 24 часов.</span>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-400"
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span>Ошибка отправки. Попробуйте еще раз или напишите на email.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-400" />
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 group-hover:border-orange-500/40"
                        placeholder="Как к вам обращаться?"
                        suppressHydrationWarning
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 group-hover:border-orange-500/40"
                        placeholder="your@email.com"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Тема сообщения *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 group-hover:border-orange-500/40"
                      placeholder="О чем вы хотите нам рассказать?"
                      suppressHydrationWarning
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-white mb-3">
                      Сообщение *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 group-hover:border-orange-500/40 resize-none"
                      placeholder="Опишите вашу проблему, вопрос или предложение подробно..."
                      suppressHydrationWarning
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Отправить сообщение
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-slate-400 text-sm">
                    Нажимая кнопку, вы соглашаетесь с нашей{' '}
                    <a href="/privacy" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}