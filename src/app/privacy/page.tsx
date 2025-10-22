// src/app/privacy/page.tsx
"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Database, Eye, Trash2, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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

  const dataTypes = [
    {
      icon: User,
      title: "Персональные данные",
      description: "Имя, email и другая информация, которую вы добровольно предоставляете",
      color: "orange"
    },
    {
      icon: Eye,
      title: "Данные использования",
      description: "Информация о том, как вы взаимодействуете с нашим сайтом",
      color: "purple"
    },
    {
      icon: Database,
      title: "Технические данные",
      description: "IP-адрес, тип браузера, cookies и аналогичная информация",
      color: "cyan"
    }
  ];

  const rights = [
    {
      icon: Eye,
      title: "Право на доступ",
      description: "Вы можете запросить информацию о том, какие ваши данные мы храним",
      color: "green"
    },
    {
      icon: Trash2,
      title: "Право на удаление",
      description: "Вы можете потребовать удалить ваши персональные данные",
      color: "red"
    },
    {
      icon: Mail,
      title: "Право на отзыв согласия",
      description: "Вы можете отозвать согласие на обработку данных в любой момент",
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-500/20 to-orange-500/10 border-orange-500/30 text-orange-400',
      purple: 'from-purple-500/20 to-purple-500/10 border-purple-500/30 text-purple-400',
      cyan: 'from-cyan-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400',
      green: 'from-green-500/20 to-green-500/10 border-green-500/30 text-green-400',
      red: 'from-red-500/20 to-red-500/10 border-red-500/30 text-red-400',
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
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border-2 border-cyan-500/30">
                <Shield className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                Конфиденциальность
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Как мы защищаем и используем ваши персональные данные
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
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-cyan-500/20">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-cyan-400" />
                Ваша конфиденциальность важна для нас
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Мы серьезно относимся к защите ваших персональных данных. Эта политика объясняет, 
                какие данные мы собираем, как их используем и как защищаем. Используя наш сайт, 
                вы доверяете нам свою информацию, и мы делаем всё возможное для её защиты.
              </p>
            </div>
          </motion.div>

          {/* Какие данные собираем */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                Какие данные мы собираем
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  variants={fadeUp}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div className={`p-6 rounded-3xl border-2 bg-gradient-to-br ${getColorClasses(type.color)} backdrop-blur-xl h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <type.icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{type.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Как используем данные */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-purple-400" />
                Как мы используем ваши данные
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Улучшение сервиса</h4>
                      <p className="text-slate-300 text-sm">Анализируем использование сайта для улучшения пользовательского опыта</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Обратная связь</h4>
                      <p className="text-slate-300 text-sm">Отвечаем на ваши вопросы и сообщения через форму контактов</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Безопасность</h4>
                      <p className="text-slate-300 text-sm">Обнаруживаем и предотвращаем потенциальные нарушения безопасности</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Персонализация</h4>
                      <p className="text-slate-300 text-sm">Настраиваем контент под ваши интересы (если предоставлено согласие)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ваши права */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                Ваши права
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rights.map((right, index) => (
                <motion.div
                  key={right.title}
                  variants={fadeUp}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <div className={`p-6 rounded-3xl border-2 bg-gradient-to-br ${getColorClasses(right.color)} backdrop-blur-xl h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <right.icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{right.title}</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {right.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cookies и третьи стороны */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-orange-400" />
                Файлы Cookies
              </h3>
              <div className="text-slate-300 space-y-3">
                <p>Мы используем cookies для:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    Запоминания ваших предпочтений
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    Аналитики использования сайта
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    Улучшения производительности
                  </li>
                </ul>
                <p className="text-sm text-slate-400 mt-4">
                  Вы можете отключить cookies в настройках браузера, но это может повлиять на функциональность сайта.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-purple-400" />
                Третьи стороны
              </h3>
              <div className="text-slate-300 space-y-3">
                <p>Мы не продаем и не передаем ваши данные третьим лицам, кроме случаев:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    Когда это требуется по закону
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    Для защиты наших прав и безопасности
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    При использовании доверенных сервисов-партнеров
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Контакты и действия */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.9 }}
            className="p-8 rounded-3xl border-2 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-orange-500/10 backdrop-blur-xl border-cyan-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Вопросы и действия</h3>
            <p className="text-slate-300 mb-6">
              Если у вас есть вопросы о нашей политике конфиденциальности или вы хотите 
              воспользоваться своими правами, свяжитесь с нами:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Связаться с нами
              </Link>
              <a 
                href="mailto:privacy@sozaymuzyku.ru"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-slate-300 font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 border border-cyan-500/20"
              >
                <Shield className="w-4 h-4" />
                privacy@sozaymuzyku.ru
              </a>
            </div>
          </motion.div>

          {/* Футер страницы */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.0 }}
            className="text-center mt-16 pt-8 border-t border-cyan-500/20"
          >
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} СоздайМузыку. Ваша конфиденциальность защищена.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}