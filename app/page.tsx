'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-20 bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-neutral-900 grid grid-rows-[80px_1fr_80px] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      
      {/* Header */}
      <motion.header 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="row-start-1 flex items-center gap-3 text-center"
      >
        {/* <Image src="/shield.svg" alt="Shield icon" width={40} height={40} className="dark:invert" /> */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          CSS Security Assignment Demo
        </h1>
      </motion.header>

      {/* Main */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col items-center text-center gap-6 row-start-2 max-w-2xl w-full"
      >
        <Image
          className="dark:invert mx-auto"
          src="/apuLogo.png"
          alt="Apu logo"
          width={180}
          height={38}
          priority
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          This demo showcases a secure full-stack application built using <strong>Next.js</strong>, 
          <strong> MongoDB</strong>, and <strong>ReCAPTCHA</strong> with form validation and 
          secure authentication practices for a Computer System Security course.
        </motion.p>

        <motion.div 
          className="grid sm:grid-cols-2 gap-4 w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            className="rounded-xl border border-transparent bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition px-6 py-3 flex items-center justify-center gap-2"
            href="/register"
          >
            {/* <Image src="/lock.svg" alt="Register icon" width={18} height={18} className="dark:invert" /> */}
            Register
          </a>
          <a
            className="rounded-xl border border-black/[.08] dark:border-white/[.15] hover:bg-gray-100 dark:hover:bg-neutral-800 transition px-6 py-3 flex items-center justify-center gap-2"
            href="/login"
          >
            {/* <Image src="/login.svg" alt="Login icon" width={18} height={18} className="dark:invert" /> */}
            Login
          </a>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="row-start-3 text-sm text-gray-500 dark:text-gray-400 flex gap-6 flex-wrap justify-center items-center"
      >
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          Built with Next.js
        </a>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4"
        >
          Deployed on Vercel
        </a>
      </motion.footer>
    </div>
  )
}
