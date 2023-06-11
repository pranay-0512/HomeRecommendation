import React, { useState } from "react";
import GridCreation from "./components/GridCreation";
import Grid from "./components/Grid";
import "./App.css";
import "./Grid.css";
import Instructions from "./components/Instruction";

const App = () => {
  const [gridSize, setGridSize] = useState(null);
  const handleGridSizeSubmit = (size) => {
    setGridSize(size);
    setShowInstructions(false);
  };
  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <div className="app-container">
      {!gridSize ? (
        <GridCreation onGridSizeSubmit={handleGridSizeSubmit} />
      ) : (
        <Grid gridSize={gridSize} />
      )}
      <Instructions showInstructions={showInstructions} />
    </div>
  );
};

export default App;
