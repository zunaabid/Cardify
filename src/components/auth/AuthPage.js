"use client"

import { useState, useRef } from "react"
import "./AuthPage.css"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

import React from 'react';
import { Link } from 'react-router-dom';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const circleRef = useRef(null)

  const handleSwitchForm = (toLogin) => {
    if (isAnimating) return

    setIsAnimating(true)

    // Start circle animation
    if (circleRef.current) {
      circleRef.current.classList.add(toLogin ? "circle-expand" : "circle-shrink")

      // After animation completes, switch the form and reset animation
      setTimeout(() => {
        setIsLogin(toLogin)
        circleRef.current.classList.remove(toLogin ? "circle-expand" : "circle-shrink")
        setIsAnimating(false)
      }, 800)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-circle top-left" ref={circleRef}></div>
      <div className="auth-circle bottom-right"></div>
      <div className="auth-dots top-right"></div>
      <div className="auth-dots bottom-left"></div>

      <div className="auth-card">
        <div className="auth-logo">
          <h1>Cardify</h1>
        </div>

        <div className="auth-content">
          {isLogin ? (
            <>
              <LoginForm onLogin={onLogin} />
              <div className="auth-switch">
                <p>Don't have an account?</p>
                <button className="btn-link" onClick={() => handleSwitchForm(false)} disabled={isAnimating}>
                  Create an account
                </button>
              </div>
            </>
          ) : (
            <>
              <SignupForm onLogin={onLogin} />
              <div className="auth-switch">
                <p>Already have an account?</p>
                <button className="btn-link" onClick={() => handleSwitchForm(true)} disabled={isAnimating}>
                  Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage