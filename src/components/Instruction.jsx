import React from "react";
const Instruction = ({ showInstructions }) => {
  if (!showInstructions) {
    return null;
  }

  return (
    <div>
      <div>
        <p>
          Please read the Instructions carefully:{" "}
          <b>(Also read the ReadMe.txt first)</b>
        </p>
        <p>
          Hover and click over a cell to add or remove amenities.
          <br />
          Only one house can be selected in a cell.
          <br />
          Other amenities can be selected in multiple combinations.
          <br />
          When other amenities are selected, a house cannot be selected.
          <br />
          You can deselect amenities.
          <br />
          If the number of amenities are same for two houses, the house that is
          rendered first is recommended (only if there are no better houses).
          <br /> Click the "Recommend House" button to find the best house based
          on amenity distances.
          <br />
          You can see the recommendedHouse in the console.
        </p>
      </div>
    </div>
  );
};

export default Instruction;
