"use client"

import { useState } from "react"
import "./EditorSidebar.css"

function EditorSidebar({ activeTool, activeSubTool, expanded, onToggle, onToolChange, onAddElement, onUpload, fonts }) {
  const [colorPickerValue, setColorPickerValue] = useState("#00c4cc")
  const [shapesExpanded, setShapesExpanded] = useState(false)
  const [linesExpanded, setLinesExpanded] = useState(false)
  const [drawingExpanded, setDrawingExpanded] = useState(false)
  const [tablesExpanded, setTablesExpanded] = useState(false)

  const handleColorChange = (e) => {
    setColorPickerValue(e.target.value)
  }

  const renderToolContent = () => {
    switch (activeTool) {
      case "elements":
        return (
          <div className="sidebar-tool-content">
            <div className="tool-header">
              <h3>Elements</h3>
            </div>

            <div className="tool-section">
              <div className="color-picker">
                <label>Color</label>
                <input type="color" value={colorPickerValue} onChange={handleColorChange} />
              </div>

              <div className="tool-section-header" onClick={() => setShapesExpanded(!shapesExpanded)}>
                <h4>Shapes</h4>
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
                  className={`chevron ${shapesExpanded ? "expanded" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {shapesExpanded && (
                <div className="elements-grid">
                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "rectangle",
                        width: 100,
                        height: 100,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview rectangle" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Square</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "circle",
                        width: 100,
                        height: 100,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview circle" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Circle</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "triangle",
                        width: 100,
                        height: 100,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview triangle" style={{ borderBottomColor: colorPickerValue }}></div>
                    <span>Triangle</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "polygon",
                        width: 100,
                        height: 100,
                        sides: 5,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview polygon" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Pentagon</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "star",
                        width: 100,
                        height: 100,
                        points: 5,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview star" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Star</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "rectangle",
                        width: 100,
                        height: 100,
                        fill: colorPickerValue,
                        opacity: 1,
                        rotation: 0,
                        borderRadius: 20,
                      })
                    }
                  >
                    <div
                      className="element-preview rounded-rectangle"
                      style={{ backgroundColor: colorPickerValue }}
                    ></div>
                    <span>Rounded</span>
                  </button>
                </div>
              )}

              <div className="tool-section-header" onClick={() => setLinesExpanded(!linesExpanded)}>
                <h4>Lines</h4>
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
                  className={`chevron ${linesExpanded ? "expanded" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {linesExpanded && (
                <div className="elements-grid">
                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 100,
                        y2: 0,
                        stroke: colorPickerValue,
                        strokeWidth: 2,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview line" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Straight</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 100,
                        y2: 0,
                        stroke: colorPickerValue,
                        strokeWidth: 2,
                        strokeDasharray: "5,5",
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview dashed-line" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Dashed</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "arrow",
                        x1: 0,
                        y1: 0,
                        x2: 100,
                        y2: 0,
                        stroke: colorPickerValue,
                        strokeWidth: 2,
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview arrow" style={{ backgroundColor: colorPickerValue }}></div>
                    <span>Arrow</span>
                  </button>
                </div>
              )}

              <div className="tool-section-header" onClick={() => setTablesExpanded(!tablesExpanded)}>
                <h4>Tables</h4>
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
                  className={`chevron ${tablesExpanded ? "expanded" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {tablesExpanded && (
                <div className="elements-grid">
                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "table",
                        width: 300,
                        height: 200,
                        rows: 3,
                        columns: 3,
                        borderColor: "#cccccc",
                        fill: "#ffffff",
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview table-preview"></div>
                    <span>3x3 Table</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "table",
                        width: 300,
                        height: 200,
                        rows: 2,
                        columns: 2,
                        borderColor: "#cccccc",
                        fill: "#ffffff",
                        opacity: 1,
                        rotation: 0,
                      })
                    }
                  >
                    <div className="element-preview table-preview-2x2"></div>
                    <span>2x2 Table</span>
                  </button>
                </div>
              )}

              <div className="tool-section-header" onClick={() => setDrawingExpanded(!drawingExpanded)}>
                <h4>Drawing</h4>
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
                  className={`chevron ${drawingExpanded ? "expanded" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {drawingExpanded && (
                <div className="elements-grid">
                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "drawing",
                        width: 100,
                        height: 100,
                        stroke: colorPickerValue,
                        strokeWidth: 2,
                        opacity: 1,
                        rotation: 0,
                        points: [],
                      })
                    }
                  >
                    <div className="element-preview drawing-preview" style={{ borderColor: colorPickerValue }}></div>
                    <span>Freehand</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "drawing",
                        width: 100,
                        height: 100,
                        stroke: colorPickerValue,
                        strokeWidth: 5,
                        opacity: 1,
                        rotation: 0,
                        points: [],
                      })
                    }
                  >
                    <div
                      className="element-preview drawing-preview-thick"
                      style={{ borderColor: colorPickerValue }}
                    ></div>
                    <span>Thick</span>
                  </button>

                  <button
                    className="element-button"
                    onClick={() =>
                      onAddElement({
                        type: "drawing",
                        width: 100,
                        height: 100,
                        stroke: colorPickerValue,
                        strokeWidth: 2,
                        strokeDasharray: "5,5",
                        opacity: 1,
                        rotation: 0,
                        points: [],
                      })
                    }
                  >
                    <div
                      className="element-preview drawing-preview-dashed"
                      style={{ borderColor: colorPickerValue }}
                    ></div>
                    <span>Dashed</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case "text":
        return (
          <div className="sidebar-tool-content">
            <div className="tool-header">
              <h3>Text</h3>
            </div>

            <div className="text-styles">
              <button
                className="text-style-button"
                onClick={() =>
                  onAddElement({
                    type: "text",
                    width: 300,
                    height: 40,
                    text: "Add a heading",
                    fontSize: 28,
                    fontFamily: "Arial",
                    color: "#000000",
                    opacity: 1,
                    rotation: 0,
                    textAlign: "left",
                  })
                }
              >
                <span className="text-preview heading">Add a heading</span>
              </button>

              <button
                className="text-style-button"
                onClick={() =>
                  onAddElement({
                    type: "text",
                    width: 300,
                    height: 30,
                    text: "Add a subheading",
                    fontSize: 20,
                    fontFamily: "Arial",
                    color: "#333333",
                    opacity: 1,
                    rotation: 0,
                    textAlign: "left",
                  })
                }
              >
                <span className="text-preview subheading">Add a subheading</span>
              </button>

              <button
                className="text-style-button"
                onClick={() =>
                  onAddElement({
                    type: "text",
                    width: 300,
                    height: 24,
                    text: "Add body text",
                    fontSize: 16,
                    fontFamily: "Arial",
                    color: "#666666",
                    opacity: 1,
                    rotation: 0,
                    textAlign: "left",
                  })
                }
              >
                <span className="text-preview body">Add body text</span>
              </button>
            </div>

            <div className="font-selector">
              <label>Font Family</label>
              <select>
                {fonts.map((font, index) => (
                  <option key={index} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case "uploads":
        return (
          <div className="sidebar-tool-content">
            <div className="tool-header">
              <h3>Uploads</h3>
            </div>

            <div className="upload-area">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p>Drag and drop files here</p>
              <button className="btn btn-primary" onClick={onUpload}>
                Upload Files
              </button>
            </div>

            <div className="uploads-list">
              <h4>Recent Uploads</h4>
              <p className="no-uploads">No uploads yet</p>
            </div>
          </div>
        )

      case "tools":
        if (activeSubTool === "shapes") {
          return (
            <div className="sidebar-tool-content">
              <div className="tool-header">
                <h3>Shapes</h3>
              </div>

              <div className="elements-grid">
                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "rectangle",
                      width: 100,
                      height: 100,
                      fill: "#000000",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview rectangle" style={{ backgroundColor: "#000000" }}></div>
                  <span>Square</span>
                </button>

                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "circle",
                      width: 100,
                      height: 100,
                      fill: "#000000",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview circle" style={{ backgroundColor: "#000000" }}></div>
                  <span>Circle</span>
                </button>

                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "triangle",
                      width: 100,
                      height: 100,
                      fill: "#000000",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview triangle" style={{ borderBottomColor: "#000000" }}></div>
                  <span>Triangle</span>
                </button>

                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "polygon",
                      width: 100,
                      height: 100,
                      sides: 5,
                      fill: "#000000",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview polygon" style={{ backgroundColor: "#000000" }}></div>
                  <span>Pentagon</span>
                </button>
              </div>
            </div>
          )
        } else if (activeSubTool === "draw") {
          return (
            <div className="sidebar-tool-content">
              <div className="tool-header">
                <h3>Draw</h3>
              </div>

              <div className="drawing-tools">
                <div className="drawing-tool">
                  <div className="drawing-tool-preview red"></div>
                  <span>Red</span>
                </div>
                <div className="drawing-tool">
                  <div className="drawing-tool-preview yellow"></div>
                  <span>Yellow</span>
                </div>
                <div className="drawing-tool">
                  <div className="drawing-tool-preview line"></div>
                  <span>Line</span>
                </div>
              </div>
            </div>
          )
        } else if (activeSubTool === "tables") {
          return (
            <div className="sidebar-tool-content">
              <div className="tool-header">
                <h3>Tables</h3>
              </div>

              <div className="elements-grid">
                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "table",
                      width: 300,
                      height: 200,
                      rows: 3,
                      columns: 3,
                      borderColor: "#cccccc",
                      fill: "#ffffff",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview table-preview"></div>
                  <span>3x3 Table</span>
                </button>

                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "table",
                      width: 300,
                      height: 200,
                      rows: 2,
                      columns: 2,
                      borderColor: "#cccccc",
                      fill: "#ffffff",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview table-preview-2x2"></div>
                  <span>2x2 Table</span>
                </button>
              </div>
            </div>
          )
        } else if (activeSubTool === "lines") {
          return (
            <div className="sidebar-tool-content">
              <div className="tool-header">
                <h3>Lines</h3>
              </div>

              <div className="elements-grid">
                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: 100,
                      y2: 0,
                      stroke: "#000000",
                      strokeWidth: 2,
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview line"></div>
                  <span>Straight</span>
                </button>

                <button
                  className="element-button"
                  onClick={() =>
                    onAddElement({
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: 100,
                      y2: 0,
                      stroke: "#000000",
                      strokeWidth: 2,
                      strokeDasharray: "5,5",
                      opacity: 1,
                      rotation: 0,
                    })
                  }
                >
                  <div className="element-preview dashed-line"></div>
                  <span>Dashed</span>
                </button>
              </div>
            </div>
          )
        }
        return (
          <div className="sidebar-tool-content">
            <div className="tool-header">
              <h3>Tools</h3>
            </div>

            <div className="tools-grid">
              <button className="tool-button" onClick={() => onToolChange("tools", "shapes")}>
                <div className="tool-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <span>Shapes</span>
              </button>

              <button className="tool-button" onClick={() => onToolChange("tools", "draw")}>
                <div className="tool-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                </div>
                <span>Draw</span>
              </button>

              <button className="tool-button" onClick={() => onToolChange("tools", "tables")}>
                <div className="tool-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                  </svg>
                </div>
                <span>Tables</span>
              </button>

              <button className="tool-button" onClick={() => onToolChange("tools", "lines")}>
                <div className="tool-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <span>Lines</span>
              </button>
            </div>
          </div>
        )

      case "save":
        return (
          <div className="sidebar-tool-content">
            <div className="tool-header">
              <h3>Save & Download</h3>
            </div>

            <button className="btn btn-primary save-button">
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Design
            </button>

            <div className="download-options">
              <h4>Download Format</h4>
              <select>
                <option>PNG</option>
                <option>JPEG</option>
                <option>PDF</option>
              </select>
              <button className="btn btn-secondary download-button">
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>

            <div className="qr-code-section">
              <h4>Generate QR Code</h4>
              <button className="btn btn-secondary qr-button">Generate QR Code</button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`editor-sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-tools">
        <button
          className={`sidebar-tool-button ${activeTool === "elements" ? "active" : ""}`}
          onClick={() => onToolChange("elements")}
          title="Elements"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
          <span className="tool-label">Elements</span>
        </button>

        <button
          className={`sidebar-tool-button ${activeTool === "text" ? "active" : ""}`}
          onClick={() => onToolChange("text")}
          title="Text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          <span className="tool-label">Text</span>
        </button>

        <button
          className={`sidebar-tool-button ${activeTool === "uploads" ? "active" : ""}`}
          onClick={() => onToolChange("uploads")}
          title="Uploads"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <span className="tool-label">Uploads</span>
        </button>

        <button
          className={`sidebar-tool-button ${activeTool === "tools" ? "active" : ""}`}
          onClick={() => onToolChange("tools")}
          title="Tools"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <span className="tool-label">Tools</span>
        </button>

        <button
          className={`sidebar-tool-button ${activeTool === "save" ? "active" : ""}`}
          onClick={() => onToolChange("save")}
          title="Save"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <span className="tool-label">Save</span>
        </button>

        <button className="sidebar-toggle" onClick={onToggle} title={expanded ? "Collapse Sidebar" : "Expand Sidebar"}>
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )}
        </button>
      </div>

      {expanded && <div className="sidebar-content">{renderToolContent()}</div>}
    </div>
  )
}

export default EditorSidebar
