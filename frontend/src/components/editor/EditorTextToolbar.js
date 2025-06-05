"use client"
import "./EditorTextToolbar.css"

function EditorTextToolbar({ element, onPropertyChange }) {
  if (!element || element.type !== "text") return null

  const handleFontFamilyChange = (e) => {
    onPropertyChange("fontFamily", e.target.value)
  }

  const handleFontSizeChange = (e) => {
    onPropertyChange("fontSize", Number.parseInt(e.target.value))
  }

  const handleColorChange = (e) => {
    onPropertyChange("color", e.target.value)
  }

  const handleBold = () => {
    onPropertyChange("fontWeight", element.fontWeight === "bold" ? "normal" : "bold")
  }

  const handleItalic = () => {
    onPropertyChange("fontStyle", element.fontStyle === "italic" ? "normal" : "italic")
  }

  const handleUnderline = () => {
    onPropertyChange("textDecoration", element.textDecoration === "underline" ? "none" : "underline")
  }

  const handleTextAlignChange = (align) => {
    onPropertyChange("textAlign", align)
  }

  return (
    <div className="editor-text-toolbar">
      <div className="text-toolbar-group">
        <select className="font-family-select" value={element.fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
        </select>
      </div>

      <div className="text-toolbar-group">
        <select className="font-size-select" value={element.fontSize} onChange={handleFontSizeChange}>
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 42, 48, 56, 64, 72].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="text-toolbar-group">
        <button className={`text-toolbar-button ${element.fontWeight === "bold" ? "active" : ""}`} onClick={handleBold}>
          <b>B</b>
        </button>
      </div>

      <div className="text-toolbar-group">
        <button
          className={`text-toolbar-button ${element.fontStyle === "italic" ? "active" : ""}`}
          onClick={handleItalic}
        >
          <i>I</i>
        </button>
      </div>

      <div className="text-toolbar-group">
        <button
          className={`text-toolbar-button ${element.textDecoration === "underline" ? "active" : ""}`}
          onClick={handleUnderline}
        >
          <u>U</u>
        </button>
      </div>

      <div className="text-toolbar-group">
        <button
          className={`text-toolbar-button ${element.textAlign === "left" ? "active" : ""}`}
          onClick={() => handleTextAlignChange("left")}
        >
          Left
        </button>
        <button
          className={`text-toolbar-button ${element.textAlign === "center" ? "active" : ""}`}
          onClick={() => handleTextAlignChange("center")}
        >
          Center
        </button>
        <button
          className={`text-toolbar-button ${element.textAlign === "right" ? "active" : ""}`}
          onClick={() => handleTextAlignChange("right")}
        >
          Right
        </button>
      </div>

      <div className="text-toolbar-group">
        <input type="color" value={element.color} onChange={handleColorChange} />
      </div>
    </div>
  )
}

export default EditorTextToolbar
