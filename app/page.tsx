'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import QaraLogo from '../public/images/qaralogo.svg'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-green-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <motion.section 
        className="relative z-10 text-center pt-32 pb-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src={QaraLogo} alt="Qara Logo" width={300} height={100} className="mx-auto" />
        </motion.div>
        <motion.h1 
          className="text-2xl font-light mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Безопасное и удобное общение
        </motion.h1>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button 
            className="bg-green-500 text-black px-6 py-2 rounded-full hover:bg-green-400 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Открыть Qara Web
          </motion.button>
          <motion.button 
            className="bg-zinc-800 text-white px-6 py-2 rounded-full hover:bg-zinc-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Скачать Qara
          </motion.button>
        </motion.div>
      </motion.section>
      <motion.section 
        className="relative z-10 mb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Почему Qara?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { emoji: '👀', title: 'Удобство', description: 'Простой, интуитивный интерфейс.' },
            { emoji: '🔒', title: 'Шифрование', description: 'Конфиденциальность и удаление данных по таймеру.' },
            { emoji: '🛡️', title: 'Безопасность', description: 'Данные защищены от перехвата и взлома.' },
            { emoji: '⚡', title: 'Скорость', description: 'Сообщения проходят быстрее, чем в любом другом приложении.' },
            { emoji: '💪', title: 'Силушка', description: 'Нет ограничений на размер мультимедиа и чатов.' },
            { emoji: '</>', title: 'Открытость', description: 'Открытый исходный код для разработчи��ов.' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-zinc-900 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)' }}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section 
        className="relative z-10 mb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Функции</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Распад сообщения по частям 📨', description: 'Сообщение исчезает постепенно: первая часть через 5 секунд, вторая через 10 секунд и так далее. Время удалени�� можно настроить.' },
            { title: 'Удаляющиеся чаты 👻', description: 'Чаты автоматически удаляются через заданное время (например, 10 минут). Удаление активируется только после согласия обеих сторон.' },
            { title: 'Невидимые сообщения 🔍', description: 'Сообщение отображается как пустое окно. Для просмотра текста получатель должен ввести заданную комбинацию клавиш.' },
            { title: 'Anti-leak (антислив) 🚫', description: 'При попытке сделать скриншот или запись экрана сообщения автоматически удаляются. Отправитель получает уведомление о попытке.' },
            { title: 'Групповые анонимные чаты 👥', description: 'В анонимных чатах отображаются только ID или псевдонимы участников, обеспечивая полную конфиденциальность.' },
            { title: 'PIN-код для входа 🔑', description: 'Если пользователь неактивен в течение 30-60 минут, то автоматически срабатывает блокировка и потребуется ввод PIN-кода.' },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-zinc-900 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)' }}
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}