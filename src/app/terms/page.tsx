// src/app/terms/page.tsx
"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, UserCheck, AlertTriangle, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  const sections = [
    {
      icon: BookOpen,
      title: "Использование материалов",
      color: "orange",
      items: [
        "Все материалы сайта защищены авторским правом",
        "Разрешено некоммерческое использование с указанием источника",
        "Запрещено копирование и распространение без разрешения",
        "Цитирование допускается с активной ссылкой на источник"
      ]
    },
    {
      icon: UserCheck,
      title: "Обязанности пользователей",
      color: "purple",
      items: [
        "Соблюдать авторские права и лицензии",
        "Не распространять вредоносный контент",
        "Не нарушать законодательство РФ",
        "Уважать права других пользователей"
      ]
    },
    {
      icon: Shield,
      title: "Конфиденциальность",
      color: "cyan",
      items: [
        "Мы защищаем ваши персональные данные",
        "Не передаем информацию третьим лицам",
        "Используем cookies для улучшения сервиса",
        "Вы можете отозвать согласие на обработку данных"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Ограничения ответственности",
      color: "yellow",
      items: [
        "Материалы предоставляются «как есть»",
        "Не несем ответственности за ошибки в статьях",
        "Пользователь использует информацию на свой риск",
        "Можем изменять условия без предварительного уведомления"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-500/20 to-orange-500/10 border-orange-500/30 text-orange-400',
      purple: 'from-purple-500/20 to-purple-500/10 border-purple-500/30 text-purple-400',
      cyan: 'from-cyan-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400',
      yellow: 'from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.orange;
  };

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
          {/* Заголовок */}
          <motion.div
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border-2 border-orange-500/30">
                <FileText className="w-10 h-10 text-orange-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Условия
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Пользовательское соглашение и правила использования нашего образовательного журнала
            </p>
            <div className="mt-6 text-slate-400 text-sm">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </div>
          </motion.div>

          {/* Введение */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Добро пожаловать!</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                Используя сайт «СоздайМузыку», вы соглашаетесь с настоящими условиями. 
                Мы создали этот журнал чтобы делиться знаниями о создании музыки, и хотим, 
                чтобы использование наших материалов было удобным и безопасным для всех.
              </p>
              <p className="text-slate-400 text-sm">
                Если у вас есть вопросы по этим условиям, свяжитесь с нами через страницу контактов.
              </p>
            </div>
          </motion.div>

          {/* Основные разделы */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={fadeUp}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className={`p-8 rounded-3xl border-2 bg-gradient-to-br ${getColorClasses(section.color)} backdrop-blur-xl h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Дополнительная информация */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Интеллектуальная собственность
              </h3>
              <div className="text-slate-300 space-y-4">
                <p>
                  Все тексты, изображения, видео и другие материалы на сайте являются интеллектуальной 
                  собственностью «СоздайМузыку» или используются с разрешения правообладателей.
                </p>
                <p>
                  При цитировании материалов обязательна активная ссылка на источник. Коммерческое 
                  использование материалов возможно только с письменного разрешения администрации.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                Изменения условий
              </h3>
              <div className="text-slate-300 space-y-4">
                <p>
                  Мы можем периодически обновлять эти условия использования. Продолжая использовать 
                  сайт после внесения изменений, вы соглашаетесь с обновленными условиями.
                </p>
                <p>
                  О существенных изменениях мы уведомим пользователей через сайт или по электронной 
                  почте (если вы подписаны на рассылку).
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Контакты для вопросов</h3>
              <p className="text-slate-300 mb-4">
                Если у вас есть вопросы об этих условиях использования, пожалуйста, свяжитесь с нами:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <FileText className="w-4 h-4" />
                  Написать нам
                </Link>
                <a 
                  href="mailto:support@sozaymuzyku.ru"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-slate-300 font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 border border-orange-500/20"
                >
                  <FileText className="w-4 h-4" />
                  support@sozaymuzyku.ru
                </a>
              </div>
            </div>
          </motion.div>

          {/* Футер страницы */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 pt-8 border-t border-orange-500/20"
          >
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} СоздайМузыку. Все права защищены.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}