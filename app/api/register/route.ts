import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
import rateLimiter from '@/lib/rateLimiter'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous'

  // ✅ Apply rate limiting
  try {
    await rateLimiter.consume(ip)
  } catch {
    return NextResponse.json(
      { message: 'Too many requests. Please slow down.' },
      { status: 429 }
    )
  }

  const { email, password, captcha } = await req.json()

  if (!email || !password || !captcha) {
    return NextResponse.json({ message: 'Missing fields or CAPTCHA' }, { status: 400 })
  }

  // ✅ Verify reCAPTCHA token with Google
  const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`
  const params = new URLSearchParams()
  params.append('secret', process.env.RECAPTCHA_SECRET_KEY!)
  params.append('response', captcha)

  const captchaRes = await fetch(captchaVerifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const captchaData = await captchaRes.json()

  if (!captchaData.success) {
    return NextResponse.json({ message: 'CAPTCHA verification failed' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('css_demo')
    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await usersCollection.insertOne({
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
