"use client"
import "./EditorProperties.css"

function EditorProperties({ element, onPropertyChange }) {
  if (!element) return null

  const handleOpacityChange = (e) => {
    onPropertyChange("opacity", Number.parseFloat(e.target.value))
  }

  const handleRotationChange = (e) => {
    onPropertyChange("rotation", Number.parseInt(e.target.value))
  }

  const handleColorChange = (e) => {
    if (element.type === "text") {
      onPropertyChange("color", e.target.value)
    } else {
      onPropertyChange("fill", e.target.value)
    }
  }

  const handleFontSizeChange = (e) => {
    onPropertyChange("fontSize", Number.parseInt(e.target.value))
  }

  const handleFontFamilyChange = (e) => {
    onPropertyChange("fontFamily", e.target.value)
  }

  const handleTextAlignChange = (align) => {
    onPropertyChange("textAlign", align)
  }

  const handleTextChange = (e) => {
    onPropertyChange("text", e.target.value)
  }

  const handleBorderRadiusChange = (e) => {
    onPropertyChange("borderRadius", Number.parseInt(e.target.value))
  }

  return (
    <div className="properties-panel">
      <h3>Properties</h3>

      <div className="property-group">
        <label>Opacity</label>
        <div className="range-with-value">
          <input type="range" min="0" max="1" step="0.1" value={element.opacity} onChange={handleOpacityChange} />
          <span>{Math.round(element.opacity * 100)}%</span>
        </div>
      </div>

      <div className="property-group">
        <label>Rotation</label>
        <div className="range-with-value">
          <input type="range" min="0" max="360" value={element.rotation || 0} onChange={handleRotationChange} />
          <span>{element.rotation || 0}°</span>
        </div>
      </div>

      {(element.type === "rectangle" || element.type === "circle") && (
        <>
          <div className="property-group">
            <label>Fill Color</label>
            <input type="color" value={element.fill} onChange={handleColorChange} />
          </div>

          {element.type === "rectangle" && (
            <div className="property-group">
              <label>Border Radius</label>
              <div className="range-with-value">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={element.borderRadius || 0}
                  onChange={handleBorderRadiusChange}
                />
                <span>{element.borderRadius || 0}px</span>
              </div>
            </div>
          )}
        </>
      )}

      {element.type === "text" && (
        <>
          <div className="property-group">
            <label>Text</label>
            <input type="text" value={element.text} onChange={handleTextChange} />
          </div>

          <div className="property-group">
            <label>Color</label>
            <input type="color" value={element.color} onChange={handleColorChange} />
          </div>

          <div className="property-group">
            <label>Font Size</label>
            <div className="range-with-value">
              <input type="range" min="8" max="72" value={element.fontSize} onChange={handleFontSizeChange} />
              <span>{element.fontSize}px</span>
            </div>
          </div>

          <div className="property-group">
            <label>Font Family</label>
            <select value={element.fontFamily} onChange={handleFontFamilyChange}>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          <div className="property-group">
            <label>Text Align</label>
            <div className="text-align-buttons">
              <button
                className={`align-button ${element.textAlign === "left" ? "active" : ""}`}
                onClick={() => handleTextAlignChange("left")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
              <button
                className={`align-button ${element.textAlign === "center" ? "active" : ""}`}
                onClick={() => handleTextAlignChange("center")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="10" x2="6" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
              </button>
              <button
                className={`align-button ${element.textAlign === "right" ? "active" : ""}`}
                onClick={() => handleTextAlignChange("right")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="21" y1="10" x2="7" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="7" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EditorProperties
