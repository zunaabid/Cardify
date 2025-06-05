"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./styles/App.css"
import AuthPage from "./components/auth/AuthPage"
import Dashboard from "./components/dashboard/Dashboard"
import Editor from "./components/editor/Editor"
import { setUser, clearUser } from "./redux/userSlice"

function App() {
  const [currentView, setCurrentView] = useState("auth")
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentProject, setCurrentProject] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("cardify-user")
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))
      setCurrentView("dashboard")
    }
  }, [dispatch])

  // Handle login
  const handleLogin = (userData) => {
    localStorage.setItem("cardify-user", JSON.stringify(userData))
    dispatch(setUser(userData))
    setCurrentView("dashboard")
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("cardify-user")
    dispatch(clearUser())
    setCurrentView("auth")
  }

  // Navigate to editor with template
  const handleStartDesign = (template = null) => {
    setSelectedTemplate(template)
    setCurrentView("editor")
  }

  // Navigate to editor with existing project
  const handleEditProject = (project) => {
    setCurrentProject(project)
    setCurrentView("editor")
  }

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedTemplate(null)
    setCurrentProject(null)
  }

  // Render the appropriate view
  const renderView = () => {
    if (!user) {
      return <AuthPage onLogin={handleLogin} />
    }

    switch (currentView) {
      case "dashboard":
        return <Dashboard onLogout={handleLogout} onStartDesign={handleStartDesign} onEditProject={handleEditProject} />
      case "editor":
        return (
          <Editor
            template={selectedTemplate}
            project={currentProject}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        )
      default:
        return <Dashboard onLogout={handleLogout} onStartDesign={handleStartDesign} onEditProject={handleEditProject} />
    }
  }

  return <div className="app">{renderView()}</div>
}

export default App
