"use client"

import { useState, useEffect, useRef, forwardRef } from "react"
import EditorTextToolbar from "./EditorTextToolbar"

const EditorCanvas = forwardRef(
  ({ elements, selectedElement, onSelectElement, onUpdateElement, canvasSize, zoom }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingText, setEditingText] = useState("")
    const [resizeDirection, setResizeDirection] = useState(null)
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
    const [elementStartProps, setElementStartProps] = useState(null)

    const canvasRef = useRef(null)
    const textEditRef = useRef(null)

    // Set forwarded ref to canvasRef
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(canvasRef.current)
        } else {
          ref.current = canvasRef.current
        }
      }
    }, [ref])

    // Handle canvas click
    const handleCanvasClick = (e) => {
      if (e.target === canvasRef.current) {
        onSelectElement(null)
        setIsEditing(false)
      }
    }

    // Handle element click
    const handleElementClick = (e, element) => {
      e.stopPropagation()

      if (isEditing && selectedElement && selectedElement.id === element.id && element.type === "text") {
        return // Don't deselect if we're editing text
      }

      onSelectElement(element)
      setIsEditing(false)
    }

    // Handle element double click for text editing
    const handleElementDoubleClick = (e, element) => {
      e.stopPropagation()

      if (element.type === "text") {
        setIsEditing(true)
        setEditingText(element.text)
        onSelectElement(element)
      }
    }

    // Handle text editing
    const handleTextChange = (e) => {
      setEditingText(e.target.value)
    }

    const handleTextBlur = () => {
      if (isEditing && selectedElement) {
        onUpdateElement({ ...selectedElement, text: editingText })
        setIsEditing(false)
      }
    }

    const handleTextKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleTextBlur()
      }
    }

    // Handle element drag start
    const handleElementDragStart = (e, element) => {
      e.stopPropagation()

      if (isEditing) return

      setIsDragging(true)
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      })
      setElementStartProps({
        x: element.x,
        y: element.y,
      })
      onSelectElement(element)
    }

    // Handle element resize start
    const handleElementResizeStart = (e, element, direction) => {
      e.stopPropagation()

      setIsResizing(true)
      setResizeDirection(direction)
      setStartPoint({
        x: e.clientX,
        y: e.clientY,
      })
      setElementStartProps({
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
      })
      onSelectElement(element)
    }

    // Handle element rotation start
    const handleElementRotationStart = (e, element) => {
      e.stopPropagation()

      setIsRotating(true)
      const rect = canvasRef.current.getBoundingClientRect()
      const centerX = rect.left + element.x + element.width / 2
      const centerY = rect.top + element.y + element.height / 2

      setStartPoint({
        x: e.clientX,
        y: e.clientY,
        centerX,
        centerY,
        startAngle: element.rotation || 0,
      })

      onSelectElement(element)
    }

    // Handle mouse move for drag, resize, and rotation
    const handleMouseMove = (e) => {
      if (!selectedElement) return

      if (isDragging && elementStartProps) {
        const dx = e.clientX - startPoint.x
        const dy = e.clientY - startPoint.y

        onUpdateElement({
          ...selectedElement,
          x: elementStartProps.x + dx / (zoom / 100),
          y: elementStartProps.y + dy / (zoom / 100),
        })
      } else if (isResizing && elementStartProps) {
        const dx = (e.clientX - startPoint.x) / (zoom / 100)
        const dy = (e.clientY - startPoint.y) / (zoom / 100)

        let newWidth = elementStartProps.width
        let newHeight = elementStartProps.height
        let newX = elementStartProps.x
        let newY = elementStartProps.y

        switch (resizeDirection) {
          case "se":
            newWidth = Math.max(20, elementStartProps.width + dx)
            newHeight = Math.max(20, elementStartProps.height + dy)
            break
          case "sw":
            newWidth = Math.max(20, elementStartProps.width - dx)
            newHeight = Math.max(20, elementStartProps.height + dy)
            newX = elementStartProps.x + dx
            break
          case "ne":
            newWidth = Math.max(20, elementStartProps.width + dx)
            newHeight = Math.max(20, elementStartProps.height - dy)
            newY = elementStartProps.y + dy
            break
          case "nw":
            newWidth = Math.max(20, elementStartProps.width - dx)
            newHeight = Math.max(20, elementStartProps.height - dy)
            newX = elementStartProps.x + dx
            newY = elementStartProps.y + dy
            break
          default:
            break
        }

        onUpdateElement({
          ...selectedElement,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
        })
      } else if (isRotating && startPoint) {
        const rect = canvasRef.current.getBoundingClientRect()
        const centerX = rect.left + selectedElement.x + selectedElement.width / 2
        const centerY = rect.top + selectedElement.y + selectedElement.height / 2

        // Calculate angle
        const startAngle = Math.atan2(startPoint.y - startPoint.centerY, startPoint.x - startPoint.centerX)
        const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)

        let rotation = startPoint.startAngle + (currentAngle - startAngle) * (180 / Math.PI)

        // Normalize rotation to 0-360
        rotation = (rotation + 360) % 360

        onUpdateElement({
          ...selectedElement,
          rotation,
        })
      }
    }

    // Handle mouse up to end drag, resize, and rotation
    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setIsRotating(false)
      setResizeDirection(null)
      setElementStartProps(null)
    }

    // Add and remove event listeners
    useEffect(() => {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [isDragging, isResizing, isRotating, selectedElement, startPoint, elementStartProps, zoom])

    // Focus text input when editing starts
    useEffect(() => {
      if (isEditing && textEditRef.current) {
        textEditRef.current.focus()
      }
    }, [isEditing])

    // Render element based on type
    const renderElement = (element) => {
      const isSelected = selectedElement && selectedElement.id === element.id

      switch (element.type) {
        case "rectangle":
          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                backgroundColor: element.fill,
                opacity: element.opacity,
                borderRadius: element.borderRadius ? `${element.borderRadius}px` : "0",
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={(e) => handleElementClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              {isSelected && renderElementControls(element)}
            </div>
          )

        case "circle":
          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                backgroundColor: element.fill,
                opacity: element.opacity,
                borderRadius: "50%",
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={(e) => handleElementClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              {isSelected && renderElementControls(element)}
            </div>
          )

        case "triangle":
          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                opacity: element.opacity,
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
                overflow: "hidden",
              }}
              onClick={(e) => handleElementClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: `${element.width / 2}px solid transparent`,
                  borderRight: `${element.width / 2}px solid transparent`,
                  borderBottom: `${element.height}px solid ${element.fill}`,
                }}
              ></div>
              {isSelected && renderElementControls(element)}
            </div>
          )

        case "text":
          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                minHeight: `${element.height}px`,
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={(e) => handleElementClick(e, element)}
              onDoubleClick={(e) => handleElementDoubleClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              {isEditing && isSelected ? (
                <textarea
                  ref={textEditRef}
                  className="text-element-edit"
                  value={editingText}
                  onChange={handleTextChange}
                  onBlur={handleTextBlur}
                  onKeyDown={handleTextKeyDown}
                  style={{
                    color: element.color,
                    fontSize: `${element.fontSize}px`,
                    fontFamily: element.fontFamily,
                    fontWeight: element.fontWeight || "normal",
                    fontStyle: element.fontStyle || "normal",
                    textDecoration: element.textDecoration || "none",
                    textAlign: element.textAlign || "left",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    background: "transparent",
                    resize: "none",
                    outline: "none",
                    overflow: "hidden",
                  }}
                />
              ) : (
                <div
                  className="text-element"
                  style={{
                    color: element.color,
                    fontSize: `${element.fontSize}px`,
                    fontFamily: element.fontFamily,
                    fontWeight: element.fontWeight || "normal",
                    fontStyle: element.fontStyle || "normal",
                    textDecoration: element.textDecoration || "none",
                    textAlign: element.textAlign || "left",
                    width: "100%",
                    height: "100%",
                    userSelect: "none",
                  }}
                >
                  {element.text}
                </div>
              )}
              {isSelected && !isEditing && renderElementControls(element)}
            </div>
          )

        case "image":
          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                opacity: element.opacity,
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={(e) => handleElementClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              <img src={element.src || "/placeholder.svg"} alt="Uploaded" className="image-element" draggable="false" />
              {isSelected && renderElementControls(element)}
            </div>
          )

        case "table":
          // Create table cells
          const rows = element.rows || 3
          const columns = element.columns || 3
          const cellWidth = element.width / columns
          const cellHeight = element.height / rows

          const cells = []
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              cells.push(
                <div
                  key={`${i}-${j}`}
                  style={{
                    position: "absolute",
                    left: j * cellWidth,
                    top: i * cellHeight,
                    width: cellWidth,
                    height: cellHeight,
                    border: `1px solid ${element.borderColor || "#cccccc"}`,
                    backgroundColor: element.fill || "#ffffff",
                  }}
                ></div>,
              )
            }
          }

          return (
            <div
              className={`canvas-element ${isSelected ? "selected" : ""}`}
              style={{
                left: `${element.x}px`,
                top: `${element.y}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                opacity: element.opacity,
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={(e) => handleElementClick(e, element)}
              onMouseDown={(e) => handleElementDragStart(e, element)}
            >
              {cells}
              {isSelected && renderElementControls(element)}
            </div>
          )

        default:
          return null
      }
    }

    // Render element controls (resize handles, rotation handle)
    const renderElementControls = (element) => {
      return (
        <>
          <div className="resize-handle se" onMouseDown={(e) => handleElementResizeStart(e, element, "se")}></div>
          <div className="resize-handle sw" onMouseDown={(e) => handleElementResizeStart(e, element, "sw")}></div>
          <div className="resize-handle ne" onMouseDown={(e) => handleElementResizeStart(e, element, "ne")}></div>
          <div className="resize-handle nw" onMouseDown={(e) => handleElementResizeStart(e, element, "nw")}></div>
          <div className="rotation-handle" onMouseDown={(e) => handleElementRotationStart(e, element)}></div>
        </>
      )
    }

    return (
      <div className="canvas-container">
        {selectedElement && selectedElement.type === "text" && (
          <EditorTextToolbar
            element={selectedElement}
            onPropertyChange={(property, value) => {
              onUpdateElement({ ...selectedElement, [property]: value })
            }}
          />
        )}

        <div className="canvas-wrapper" style={{ transform: `scale(${zoom / 100})` }}>
          <div
            ref={canvasRef}
            className="canvas"
            style={{
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
            }}
            onClick={handleCanvasClick}
          >
            {elements.map((element) => (
              <div key={element.id}>{renderElement(element)}</div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

EditorCanvas.displayName = "EditorCanvas"

export default EditorCanvas
