"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import "./Editor.css"
import EditorSidebar from "./EditorSidebar"
import EditorToolbar from "./EditorToolbar"
import EditorCanvas from "./EditorCanvas"
import EditorTopbar from "./EditorTopbar"
import { addProject } from "../../redux/projectsSlice"

function Editor({ template, project, onBack, onLogout }) {
  const [activeTool, setActiveTool] = useState("elements")
  const [activeSubTool, setActiveSubTool] = useState(null)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [selectedElement, setSelectedElement] = useState(null)
  const [elements, setElements] = useState([])
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 350 })
  const [zoom, setZoom] = useState(100)
  const [projectName, setProjectName] = useState("Untitled Design")
  const [isEditing, setIsEditing] = useState(false)
  const [fonts, setFonts] = useState([
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Comic Sans MS",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Raleway",
  ])

  const dispatch = useDispatch()
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Initialize canvas with template or project data
  useEffect(() => {
    if (template) {
      // Load template data
      setElements(template.elements || [])
      setProjectName(`${template.name} Copy`)
    } else if (project) {
      // Load project data
      setElements(project.elements || [])
      setProjectName(project.name || "Untitled Design")
    } else {
      // Start with empty canvas
      setElements([
        {
          id: 1,
          type: "rectangle",
          x: 0,
          y: 0,
          width: 600,
          height: 350,
          fill: "#ffffff",
          opacity: 1,
          rotation: 0,
        },
      ])
    }
  }, [template, project])

  const handleToolChange = (tool, subTool = null) => {
    setActiveTool(tool)
    setActiveSubTool(subTool)
    setSidebarExpanded(true)
  }

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  const handleAddElement = (element) => {
    const newElement = {
      ...element,
      id: Date.now(),
      x: canvasSize.width / 2 - (element.width || 100) / 2,
      y: canvasSize.height / 2 - (element.height || 100) / 2,
    }

    setElements([...elements, newElement])
    setSelectedElement(newElement)
  }

  const handleElementSelect = (element) => {
    setSelectedElement(element)
  }

  const handleElementUpdate = (updatedElement) => {
    const updatedElements = elements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    setElements(updatedElements)
  }

  const handleElementDelete = (elementId) => {
    const updatedElements = elements.filter((el) => el.id !== elementId)
    setElements(updatedElements)
    setSelectedElement(null)
  }

  const handleElementDuplicate = (element) => {
    const newElement = {
      ...element,
      id: Date.now(),
      x: element.x + 20,
      y: element.y + 20,
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement)
  }

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom)
  }

  const handleSaveProject = () => {
    // Create a thumbnail from the canvas
    const thumbnail = "https://via.placeholder.com/320x200/e2e8f0/475569?text=Saved+Design"

    // Create project object
    const newProject = {
      id: project?.id || Date.now(),
      name: projectName,
      lastEdited: "Just now",
      thumbnail,
      elements,
    }

    // Save to Redux store
    dispatch(addProject(newProject))

    // Show success message
    alert("Project saved successfully!")
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const newElement = {
          id: Date.now(),
          type: "image",
          x: canvasSize.width / 2 - 100,
          y: canvasSize.height / 2 - 100,
          width: 200,
          height: 200 * (img.height / img.width),
          src: event.target.result,
          opacity: 1,
          rotation: 0,
        }
        setElements([...elements, newElement])
        setSelectedElement(newElement)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="editor-container">
      <EditorTopbar
        projectName={projectName}
        setProjectName={setProjectName}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSaveProject}
        onBack={onBack}
        onLogout={onLogout}
      />

      <div className="editor-main">
        <EditorSidebar
          activeTool={activeTool}
          activeSubTool={activeSubTool}
          expanded={sidebarExpanded}
          onToggle={toggleSidebar}
          onToolChange={handleToolChange}
          onAddElement={handleAddElement}
          onUpload={triggerFileInput}
          fonts={fonts}
        />

        <div className="editor-workspace">
          <EditorToolbar
            zoom={zoom}
            onZoomChange={handleZoomChange}
            selectedElement={selectedElement}
            onDelete={handleElementDelete}
            onDuplicate={handleElementDuplicate}
          />

          <EditorCanvas
            ref={canvasRef}
            elements={elements}
            selectedElement={selectedElement}
            onSelectElement={handleElementSelect}
            onUpdateElement={handleElementUpdate}
            canvasSize={canvasSize}
            zoom={zoom}
          />
        </div>
      </div>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileUpload} />
    </div>
  )
}

export default Editor
