import React, { useState } from "react";
import "../Grid.css";
import "../App.css";
const GridCreation = ({ onGridSizeSubmit }) => {
  const [gridSize, setGridSize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGridSizeSubmit(gridSize);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter grid size (e.g., MxN):
          <input
            type="text"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
          />
        </label>
        <button className="button-down" type="submit">
          Create Grid
        </button>
      </form>
    </>
  );
};

export default GridCreation;
