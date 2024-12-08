import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-black to-zinc-900 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <h3 className="text-green-400 font-semibold text-lg">Навигация</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Главная</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">О проекте</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Контакты</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-green-400 font-semibold text-lg">Документы</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Условия использования</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-zinc-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Security Qara. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
