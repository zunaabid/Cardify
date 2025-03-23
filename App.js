import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import "./index.css";

const BusinessCardEditor = () => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); // Store Fabric.js instance

  // Initialize Fabric.js on mount
  useEffect(() => {
    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#f9f9f9",
    });

    return () => {
      canvasInstance.current.dispose(); // Cleanup on unmount
    };
  }, []);

  // Function to add a shape with a delete button
  const addShape = (type) => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    let shape;

    switch (type) {
      case "square":
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "red",
          width: 100,
          height: 100,
          selectable: true,
        });
        break;

      case "rectangle":
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "blue",
          width: 150,
          height: 100,
          selectable: true,
        });
        break;

      case "circle":
        shape = new fabric.Circle({
          left: 100,
          top: 100,
          fill: "green",
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
          {
            left: 100,
            top: 100,
            fill: "yellow",
            selectable: true,
          }
        );
        break;

      case "heart":
        shape = new fabric.Path(
          "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z",
          {
            left: 100,
            top: 100,
            fill: "pink",
            selectable: true,
          }
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
          {
            left: 100,
            top: 100,
            fill: "purple",
            selectable: true,
          }
        );
        break;

      case "line":
        shape = new fabric.Line([50, 50, 200, 50], {
          stroke: "black",
          strokeWidth: 3,
          selectable: true,
        });
        break;

      case "curved-line":
        shape = new fabric.Path("M 50 100 Q 150 0 250 100", {
          stroke: "black",
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
          fill: "black",
          fontFamily: "Arial",
          width: 150,
          selectable: true,
          editingBorderColor: "gray",
        });
        break;

      default:
        return;
    }

    // Add delete control (red "X" button)
    shape.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5, // Position at top-right corner
      offsetX: 10,
      offsetY: -10,
      cursorStyle: "pointer",
      mouseUpHandler: (eventData, transform) => {
        const target = transform.target;
        canvas.remove(target);
        canvas.renderAll();
      },
      render: (ctx, left, top, styleOverride, fabricObject) => {
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

  return (
    <div className="container">
      {/* Toolbox */}
      <div className="toolbox">
        <button onClick={() => addShape("square")}>Square</button>
        <button onClick={() => addShape("rectangle")}>Rectangle</button>
        <button onClick={() => addShape("circle")}>Circle</button>
        <button onClick={() => addShape("star")}>Star</button>
        <button onClick={() => addShape("heart")}>Heart</button>
        <button onClick={() => addShape("trapezium")}>Trapezium</button>
        <button onClick={() => addShape("line")}>Straight Line</button>
        <button onClick={() => addShape("curved-line")}>Curved Line</button>
        <button onClick={() => addShape("text")}>Text</button>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <canvas ref={canvasRef} width={500} height={300}></canvas>
      </div>
    </div>
  );
};

export default BusinessCardEditor;
