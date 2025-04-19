'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'
import { registerSchema } from '@/lib/validation'
import { z } from 'zod'


export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
  
    if (!captchaToken) {
      setError('Please complete the CAPTCHA')
      setLoading(false)
      return
    }
  
    // ✅ Run Zod validation
    try {
      const validated = registerSchema.parse({
        email,
        password,
        captcha: captchaToken,
      })
  
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      })
  
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Registration failed')
        recaptchaRef.current?.reset()
        setCaptchaToken('')
      } else {
        setSuccess('Registration successful! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      }
    } catch (err) {
      // ✅ Zod error handling
      if (err instanceof z.ZodError) {
        const fieldError = err.errors[0]?.message || 'Invalid input'
        setError(fieldError)
      } else {
        setError('Something went wrong')
      }
      recaptchaRef.current?.reset()
      setCaptchaToken('')
    }
  
    setLoading(false)
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold">Register</h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-600 bg-green-100 px-3 py-2 rounded">
            {success}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded"
        />

        {/* ✅ Visible reCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => setCaptchaToken(token || '')}
          ref={recaptchaRef}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
