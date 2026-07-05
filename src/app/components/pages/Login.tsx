import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white text-[20px] font-bold mb-4">M</div>
          <h1 className="text-[24px] font-bold text-gray-900">Meridian Banking</h1>
          <p className="mt-1 text-[14px] text-gray-500">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_1px_3px_rgba(16,24,40,0.08)] p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-[3px] focus:ring-blue-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-medium text-gray-700">Password</label>
                <button type="button" className="text-[13px] text-blue-600 hover:underline">Forgot password?</button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-[3px] focus:ring-blue-50"
              />
            </div>

            {error && (
              <div className="px-3 py-2.5 rounded-md bg-red-50 border border-red-200 text-[13px] text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-[14px] font-semibold rounded-md transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[12px] text-gray-500">
          Secured by 256-bit encryption · Rudimax Fintech
        </p>
      </div>
    </div>
  )
}
