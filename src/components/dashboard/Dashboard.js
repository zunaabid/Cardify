"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import CreateNewModal from "../modals/CreateNewModal"
import { addProject } from "../../redux/projectsSlice"

function Dashboard({ onLogout, onStartDesign, onEditProject }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const dispatch = useDispatch()
  const { projects, templates } = useSelector((state) => state.projects)
  const user = useSelector((state) => state.user.currentUser)

  const handleCreateNew = () => {
    setShowCreateModal(true)
  }

  const handleStartDesign = (useTemplate, template = null) => {
    setShowCreateModal(false)

    if (useTemplate && template) {
      onStartDesign(template)
    } else {
      onStartDesign(null)
    }
  }

  const handleSaveProject = (project) => {
    // In a real app, you would save to a database
    const newProject = {
      id: Date.now(),
      name: project.name || "Untitled Design",
      lastEdited: "Just now",
      thumbnail: project.thumbnail || "https://via.placeholder.com/320x200/e2e8f0/475569?text=New+Design",
      elements: project.elements || [],
      createdBy: user?.name || "Anonymous",
    }

    dispatch(addProject(newProject))
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onCreateNew={handleCreateNew} />

      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "templates" && "Templates"}
            {activeTab === "projects" && "Projects"}
            {activeTab === "settings" && "Settings"}
          </h1>
          <div className="dashboard-actions">
            <button className="btn btn-primary" onClick={handleCreateNew}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create New
            </button>
            <button className="btn btn-outline" onClick={onLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          {activeTab === "dashboard" && (
            <>
              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Recently Created Cards</h2>
                  <button className="btn btn-outline btn-sm" onClick={handleCreateNew}>
                    Create New Card
                  </button>
                </div>

                {projects.length > 0 ? (
                  <div className="card-grid">
                    {projects.map((card) => (
                      <div key={card.id} className="card card-item">
                        <div className="card-thumbnail">
                          <img src={card.thumbnail || "/placeholder.svg"} alt={card.name} />
                        </div>
                        <div className="card-info">
                          <h3>{card.name}</h3>
                          <p>Last edited {card.lastEdited}</p>
                          <div className="card-actions">
                            <button className="btn-link" onClick={() => onEditProject(card)}>
                              Edit
                            </button>
                            <button className="btn-link">Share</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </div>
                    <h3>No cards yet</h3>
                    <p>Create your first business card design</p>
                    <button className="btn btn-primary" onClick={handleCreateNew}>
                      Create New Card
                    </button>
                  </div>
                )}
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h2>Templates</h2>
                  <button className="btn btn-outline btn-sm" onClick={() => setActiveTab("templates")}>
                    View All
                  </button>
                </div>
                <div className="card-grid">
                  {templates.slice(0, 4).map((template) => (
                    <div key={template.id} className="card card-item">
                      <div className="card-thumbnail">
                        <img src={template.thumbnail || "/placeholder.svg"} alt={template.name} />
                      </div>
                      <div className="card-info">
                        <h3>{template.name}</h3>
                        <p>{template.category}</p>
                        <button className="btn btn-primary btn-sm" onClick={() => handleStartDesign(true, template)}>
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "templates" && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>All Templates</h2>
              </div>
              <div className="card-grid">
                {templates.map((template) => (
                  <div key={template.id} className="card card-item">
                    <div className="card-thumbnail">
                      <img src={template.thumbnail || "/placeholder.svg"} alt={template.name} />
                    </div>
                    <div className="card-info">
                      <h3>{template.name}</h3>
                      <p>{template.category}</p>
                      <button className="btn btn-primary btn-sm" onClick={() => handleStartDesign(true, template)}>
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "projects" && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Your Projects</h2>
                <button className="btn btn-primary btn-sm" onClick={handleCreateNew}>
                  Create New Project
                </button>
              </div>

              {projects.length > 0 ? (
                <div className="card-grid">
                  {projects.map((card) => (
                    <div key={card.id} className="card card-item">
                      <div className="card-thumbnail">
                        <img src={card.thumbnail || "/placeholder.svg"} alt={card.name} />
                      </div>
                      <div className="card-info">
                        <h3>{card.name}</h3>
                        <p>Last edited {card.lastEdited}</p>
                        <div className="card-actions">
                          <button className="btn-link" onClick={() => onEditProject(card)}>
                            Edit
                          </button>
                          <button className="btn-link">Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3>No projects yet</h3>
                  <p>Create your first project</p>
                  <button className="btn btn-primary" onClick={handleCreateNew}>
                    Create New Project
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === "settings" && (
            <section className="dashboard-section">
              <div className="card settings-card">
                <div className="card-header">
                  <h2>Account Settings</h2>
                </div>
                <div className="card-body">
                  <form className="settings-form">
                    <div className="form-group">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input id="username" type="text" className="form-input" defaultValue={user?.name || ""} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input id="email" type="email" className="form-input" defaultValue={user?.email || ""} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Change Password
                      </label>
                      <input id="password" type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="settings-actions">
                      <button type="button" className="btn btn-danger">
                        Delete Account
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {showCreateModal && (
        <CreateNewModal onClose={() => setShowCreateModal(false)} onStartDesign={handleStartDesign} />
      )}
    </div>
  )
}

export default Dashboard
