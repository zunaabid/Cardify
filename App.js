import React, { useEffect, useRef, useState, useCallback } from "react";
import * as fabric from "fabric";
import "./index.css";

const BusinessCardEditor = () => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fillColor, setFillColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [opacity, setOpacity] = useState(1);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");


  // Function to update properties when an object is selected
  const updateProperties = useCallback((object) => {
    if (object) {
      setFillColor(object.fill || "#000000");
      setStrokeColor(object.stroke || "#000000");
      setOpacity(object.fill ? getAlpha(object.fill) : 1);
      setStrokeOpacity(object.stroke ? getAlpha(object.stroke) : 1);
  
      if (object.type === "textbox") {
        setFontSize(object.fontSize || 20);
        setFontFamily(object.fontFamily || "Arial");
      }
    } else {
      setFillColor("#000000");
      setStrokeColor("#000000");
      setOpacity(1);
      setStrokeOpacity(1);
      setFontSize(20);
      setFontFamily("Arial");
    }
  }, []);
  

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#f9f9f9",
    });
    canvasInstance.current = canvas;

    const handleSelection = (e) => {
      setSelectedObject(e.selected[0]);
      updateProperties(e.selected[0]);
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", () => setSelectedObject(null));

    return () => {
      canvas.dispose();
    };
  }, [updateProperties]);

  // Function to add shapes
  const addShape = (type) => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    let shape;
    switch (type) {
      case "square":
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 2,
          width: 100,
          height: 100,
          selectable: true,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 2,
          width: 150,
          height: 100,
          selectable: true,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: 2,
          radius: 50,
          selectable: true,
        });
        break;
      case "star":
        shape = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 61, y: 35 },
            { x: 98, y: 35 },
            { x: 68, y: 57 },
            { x: 79, y: 91 },
            { x: 50, y: 70 },
            { x: 21, y: 91 },
            { x: 32, y: 57 },
            { x: 2, y: 35 },
            { x: 39, y: 35 },
          ],
          { left: 100, top: 100, fill: fillColor, selectable: true }
        );
        break;
      case "heart":
        shape = new fabric.Path(
          "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z",
          { left: 100, top: 100, fill: fillColor, selectable: true }
        );
        break;
      case "trapezium":
        shape = new fabric.Polygon(
          [
            { x: 30, y: 0 },
            { x: 100, y: 0 },
            { x: 130, y: 50 },
            { x: 0, y: 50 },
          ],
          { left: 100, top: 100, fill: fillColor, selectable: true }
        );
        break;
      case "line":
        shape = new fabric.Line([50, 50, 200, 50], {
          stroke: strokeColor,
          strokeWidth: 3,
          selectable: true,
        });
        break;
      case "curved-line":
        shape = new fabric.Path("M 50 100 Q 150 0 250 100", {
          stroke: strokeColor,
          strokeWidth: 3,
          fill: "transparent",
          selectable: true,
        });
        break;
        case "text":
          shape = new fabric.Textbox("Edit Me", {
            left: 100,
            top: 100,
            fontSize: 20,
            fill: fillColor, // Keep only text color
            fontFamily: "Arial",
            selectable: true,
            editingBorderColor: "gray",
            stroke: null, // Remove stroke
            backgroundColor: "transparent", // Ensure no fill
          });
          break;
      default:
        return;
    }

    shape.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: 10,
      offsetY: -10,
      cursorStyle: "pointer",
      mouseUpHandler: (_, transform) => {
        const target = transform.target;
        canvas.remove(target);
        canvas.renderAll();
      },
      render: (ctx, left, top) => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(left, top, 10, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left - 4, top - 4);
        ctx.lineTo(left + 4, top + 4);
        ctx.moveTo(left + 4, top - 4);
        ctx.lineTo(left - 4, top + 4);
        ctx.stroke();
      },
    });

    

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  // Utility functions for color and transparency
  const hexToRgba = (hex, alpha) => {
    let bigint = parseInt(hex.replace(/^#/, ""), 16);
    return `rgba(${(bigint >> 16) & 255},${(bigint >> 8) & 255},${
      bigint & 255
    },${alpha})`;
  };

  const getAlpha = (color) => {
    if (!color) return 1;
    if (color.startsWith("rgba")) {
      return parseFloat(color.split(",")[3]) || 1;
    }
    return 1;
  };

  const updateFillColor = (color) => {
    if (!selectedObject) return;
    setFillColor(color);
    selectedObject.set("fill", hexToRgba(color, opacity));
    canvasInstance.current.renderAll();
  };

  const updateStrokeColor = (color) => {
    if (!selectedObject) return;
    setStrokeColor(color);
    selectedObject.set("stroke", hexToRgba(color, strokeOpacity));
    canvasInstance.current.renderAll();
  };

  const updateFillTransparency = (value) => {
    if (!selectedObject) return;
    setOpacity(value);
    selectedObject.set("fill", hexToRgba(fillColor, value));
    canvasInstance.current.renderAll();
  };

  // Update Stroke Transparency
  const updateStrokeTransparency = (value) => {
    if (!selectedObject) return;
    setStrokeOpacity(value);
    selectedObject.set("stroke", hexToRgba(strokeColor, value));
    canvasInstance.current.renderAll();
  };

  const updateFontSize = (size) => {
    if (!selectedObject || selectedObject.type !== "textbox") return;
    setFontSize(size);
    selectedObject.set("fontSize", size);
    canvasInstance.current.renderAll();
  };
  
  const updateFontFamily = (family) => {
    if (!selectedObject || selectedObject.type !== "textbox") return;
    setFontFamily(family);
    selectedObject.set("fontFamily", family);
    canvasInstance.current.renderAll();
  };
  

  return (
    <div className="container">
      {/* Toolbox for adding shapes */}
      <div className="toolbox">
        {[
          "square",
          "rectangle",
          "circle",
          "star",
          "heart",
          "trapezium",
          "line",
          "curved-line",
          "text",
        ].map((shape) => (
          <button key={shape} onClick={() => addShape(shape)}>
            {shape}
          </button>
        ))}
      </div>
  
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        <canvas ref={canvasRef} width={500} height={300}></canvas>
  
        {selectedObject && (
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              background: "#fff",
              minWidth: "200px",
            }}
          >
            {selectedObject.type === "textbox" ? (
              <>
                <label>Font Size</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => updateFontSize(parseInt(e.target.value, 10))}
                />
  
                <label>Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => updateFontFamily(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
  
                <label>Text Color</label>
                <input
                  type="color"
                  value={fillColor}
                  onChange={(e) => updateFillColor(e.target.value)}
                />
              </>
            ) : (
              <>
                {/* Conditionally Render Fill Color and Transparency */}
                {selectedObject.type !== "path"  && selectedObject.type !== "line"  && (
                  <>
                    <label>Fill Color</label>
                    <input
                      type="color"
                      value={fillColor}
                      onChange={(e) => updateFillColor(e.target.value)}
                    />
  
                    <label>Fill Transparency</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={opacity}
                      onChange={(e) => updateFillTransparency(parseFloat(e.target.value))}
                    />
                  </>
                )}
  
                <label>Stroke Color</label>
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => updateStrokeColor(e.target.value)}
                />
  
                <label>Stroke Transparency</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={strokeOpacity}
                  onChange={(e) =>
                    updateStrokeTransparency(parseFloat(e.target.value))
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  
  
};

export default BusinessCardEditor;
