'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div 
        style={{ opacity }}
        className="h-24 flex items-center justify-center px-6"
      >
        <div className="w-full max-w-[1200px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md rounded-2xl" />
          
          <div className="relative h-16 flex items-center px-8 rounded-2xl border border-zinc-800/50">
            <div className="flex-1">
              <a href="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Security QARA
              </a>
            </div>
            <nav className="flex-1 hidden md:block">
              <ul className="flex justify-center gap-12">
                {[
                  { name: 'Уязвимости', href: '/vulnerabilities' },
                  { name: 'Чат', href: '/chat' },
                  { name: 'Уязвимость IP', href: '/scan' }
                ].map((item) => (
                  <NavItem key={item.name} href={item.href}>{item.name}</NavItem>
                ))}
              </ul>
            </nav>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden rounded-xl p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
            }}
            className="absolute w-full mt-2 overflow-hidden md:hidden"
          >
            <div className="bg-black/80 backdrop-blur-lg rounded-xl border border-zinc-800/50 p-3">
              {[
                { name: 'Уязвимости', href: '/vulnerabilities' },
                { name: 'Чат', href: '/chat' },
                { name: 'Уязвимость IP', href: '/scan' }
              ].map((item) => (
                <MobileNavItem key={item.name} href={item.href}>{item.name}</MobileNavItem>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const NavItem = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.li
    className="list-none"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <a
      href={href}
      className="block py-2 text-sm font-medium text-zinc-400 hover:text-green-400 transition-all duration-200"
    >
      {children}
    </a>
  </motion.li>
)

const MobileNavItem = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
  >
    <a
      href={href}
      className="block w-full px-4 py-2.5 text-[15px] text-zinc-400 hover:text-green-400 rounded-lg hover:bg-zinc-800/50 transition-all"
    >
      {children}
    </a>
  </motion.div>
) 