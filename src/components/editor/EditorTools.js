"use client"

import { useState } from "react"
import "./EditorTools.css"

function EditorTools({ onAddElement }) {
  const [activeTab, setActiveTab] = useState("shapes")
  const [colorPickerValue, setColorPickerValue] = useState("#3b82f6")

  const handleColorChange = (e) => {
    setColorPickerValue(e.target.value)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "shapes":
        return (
          <div className="tools-shapes">
            <div className="shapes-grid">
              <button
                className="shape-button"
                onClick={() =>
                  onAddElement({
                    type: "rectangle",
                    width: 100,
                    height: 100,
                    fill: colorPickerValue,
                    opacity: 1,
                  })
                }
              >
                <div className="shape-preview rectangle" style={{ backgroundColor: colorPickerValue }}></div>
              </button>
              <button
                className="shape-button"
                onClick={() =>
                  onAddElement({
                    type: "circle",
                    width: 100,
                    height: 100,
                    fill: colorPickerValue,
                    opacity: 1,
                  })
                }
              >
                <div className="shape-preview circle" style={{ backgroundColor: colorPickerValue }}></div>
              </button>
              <button
                className="shape-button"
                onClick={() =>
                  onAddElement({
                    type: "triangle",
                    width: 100,
                    height: 100,
                    fill: colorPickerValue,
                    opacity: 1,
                  })
                }
              >
                <div className="shape-preview triangle" style={{ borderBottomColor: colorPickerValue }}></div>
              </button>
              <button
                className="shape-button"
                onClick={() =>
                  onAddElement({
                    type: "diamond",
                    width: 100,
                    height: 100,
                    fill: colorPickerValue,
                    opacity: 1,
                  })
                }
              >
                <div className="shape-preview diamond" style={{ backgroundColor: colorPickerValue }}></div>
              </button>
              <button
                className="shape-button"
                onClick={() =>
                  onAddElement({
                    type: "pentagon",
                    width: 100,
                    height: 100,
                    fill: colorPickerValue,
                    opacity: 1,
                  })
                }
              >
                <div className="shape-preview pentagon" style={{ backgroundColor: colorPickerValue }}></div>
              </button>
            </div>
          </div>
        )
      case "draw":
        return (
          <div className="tools-draw">
            <div className="draw-tools">
              <button className="draw-tool-button">
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
              </button>
              <button className="draw-tool-button">
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
                  <path d="M3 3h18v18H3z"></path>
                </svg>
              </button>
              <button className="draw-tool-button">
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
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </button>
              <button className="draw-tool-button">
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
              </button>
            </div>
            <div className="draw-options">
              <div className="draw-option">
                <label>Stroke Width</label>
                <input type="range" min="1" max="20" defaultValue="2" />
              </div>
              <div className="draw-option">
                <label>Color</label>
                <input type="color" value={colorPickerValue} onChange={handleColorChange} />
              </div>
            </div>
          </div>
        )
      case "tables":
        return (
          <div className="tools-tables">
            <div className="tables-grid">
              <button
                className="table-button"
                onClick={() =>
                  onAddElement({
                    type: "table",
                    width: 300,
                    height: 200,
                    rows: 2,
                    columns: 2,
                    fill: "#ffffff",
                    borderColor: "#000000",
                    opacity: 1,
                  })
                }
              >
                <div className="table-preview table-2x2"></div>
                <span>2×2</span>
              </button>
              <button
                className="table-button"
                onClick={() =>
                  onAddElement({
                    type: "table",
                    width: 300,
                    height: 200,
                    rows: 3,
                    columns: 3,
                    fill: "#ffffff",
                    borderColor: "#000000",
                    opacity: 1,
                  })
                }
              >
                <div className="table-preview table-3x3"></div>
                <span>3×3</span>
              </button>
              <button
                className="table-button"
                onClick={() =>
                  onAddElement({
                    type: "table",
                    width: 300,
                    height: 200,
                    rows: 2,
                    columns: 3,
                    fill: "#ffffff",
                    borderColor: "#000000",
                    opacity: 1,
                  })
                }
              >
                <div className="table-preview table-2x3"></div>
                <span>2×3</span>
              </button>
              <button
                className="table-button"
                onClick={() =>
                  onAddElement({
                    type: "table",
                    width: 300,
                    height: 200,
                    rows: 3,
                    columns: 2,
                    fill: "#ffffff",
                    borderColor: "#000000",
                    opacity: 1,
                  })
                }
              >
                <div className="table-preview table-3x2"></div>
                <span>3×2</span>
              </button>
            </div>
          </div>
        )
      case "lines":
        return (
          <div className="tools-lines">
            <div className="lines-grid">
              <button
                className="line-button"
                onClick={() =>
                  onAddElement({
                    type: "line",
                    width: 100,
                    height: 2,
                    stroke: colorPickerValue,
                    strokeWidth: 2,
                    opacity: 1,
                  })
                }
              >
                <div className="line-preview horizontal-line" style={{ backgroundColor: colorPickerValue }}></div>
                <span>Horizontal</span>
              </button>
              <button
                className="line-button"
                onClick={() =>
                  onAddElement({
                    type: "line",
                    width: 2,
                    height: 100,
                    stroke: colorPickerValue,
                    strokeWidth: 2,
                    opacity: 1,
                  })
                }
              >
                <div className="line-preview vertical-line" style={{ backgroundColor: colorPickerValue }}></div>
                <span>Vertical</span>
              </button>
              <button
                className="line-button"
                onClick={() =>
                  onAddElement({
                    type: "line",
                    width: 100,
                    height: 100,
                    stroke: colorPickerValue,
                    strokeWidth: 2,
                    opacity: 1,
                    points: [
                      { x: 0, y: 0 },
                      { x: 100, y: 100 },
                    ],
                  })
                }
              >
                <div className="line-preview diagonal-line" style={{ borderColor: colorPickerValue }}></div>
                <span>Diagonal</span>
              </button>
              <button
                className="line-button"
                onClick={() =>
                  onAddElement({
                    type: "line",
                    width: 100,
                    height: 100,
                    stroke: colorPickerValue,
                    strokeWidth: 2,
                    opacity: 1,
                    points: [
                      { x: 0, y: 100 },
                      { x: 100, y: 0 },
                    ],
                  })
                }
              >
                <div className="line-preview diagonal-line-reverse" style={{ borderColor: colorPickerValue }}></div>
                <span>Diagonal</span>
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="editor-tools">
      <div className="tools-tabs">
        <button
          className={`tools-tab ${activeTab === "shapes" ? "active" : ""}`}
          onClick={() => setActiveTab("shapes")}
        >
          Shapes
        </button>
        <button className={`tools-tab ${activeTab === "draw" ? "active" : ""}`} onClick={() => setActiveTab("draw")}>
          Draw
        </button>
        <button
          className={`tools-tab ${activeTab === "tables" ? "active" : ""}`}
          onClick={() => setActiveTab("tables")}
        >
          Tables
        </button>
        <button className={`tools-tab ${activeTab === "lines" ? "active" : ""}`} onClick={() => setActiveTab("lines")}>
          Lines
        </button>
      </div>
      <div className="tools-content">{renderTabContent()}</div>
    </div>
  )
}

export default EditorTools
