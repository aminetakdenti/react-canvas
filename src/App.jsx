import { useEffect, useState } from "react";
import roughjs from "roughjs";

const generator = roughjs.generator();

const createElement = (x1, y1, x2, y2) => {
  const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
    fill: "red",
  });
  return { x1, y1, x2, y2, roughElement };
};

function App() {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const roughCanvas = roughjs.canvas(canvas);

    elements.forEach((ele) => roughCanvas.draw(ele.roughElement));
  }, [elements]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;

    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prev) => [...prev, element]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const { clientX, clientY } = e;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY);

    const newElements = [...elements];
    newElements[index] = updatedElement;
    setElements([...newElements]);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
}

export default App;
