"use client"

import { useState, useEffect } from "react"
import AuthPage from "@/components/auth/auth-page"
import Dashboard from "@/components/dashboard/dashboard"
import Editor from "@/components/editor/editor"
import { useRouter, usePathname } from "next/navigation"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("cardify-user")
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  // Handle login
  const handleLogin = (userData) => {
    localStorage.setItem("cardify-user", JSON.stringify(userData))
    setIsLoggedIn(true)
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("cardify-user")
    setIsLoggedIn(false)
  }

  // If not logged in, show auth page
  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />
  }

  // If path is /editor, show editor
  if (pathname === "/editor") {
    return <Editor onLogout={handleLogout} />
  }

  // Default to dashboard
  return <Dashboard onLogout={handleLogout} />
}
