import React, { useState } from "react";
import "../Grid.css";
import "../App.css";
import houseIcon from "../icons/house.png";
import gymIcon from "../icons/gym.png";
import restaurantIcon from "../icons/restaurant.png";
import hospitalIcon from "../icons/hospital.png";

const Grid = ({ gridSize }) => {
  const [grid, setGrid] = useState([]);
  const [recommendedHouse, setRecommendedHouse] = useState(null);

  React.useEffect(() => {
    const gridSizeArray = gridSize.split("x");
    const rows = parseInt(gridSizeArray[0], 10);
    const cols = parseInt(gridSizeArray[1], 10);

    const newGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill(""));
    setGrid(newGrid);
  }, [gridSize]);

  const handleGridInput = (rowIndex, colIndex, option) => {
    const updatedGrid = [...grid];
    const currentOptions = updatedGrid[rowIndex][colIndex].split(",");

    if (option === "House") {
      const otherAmenitiesSelected = currentOptions.some(
        (item) => item !== "House" && item !== ""
      );

      if (otherAmenitiesSelected) {
        return;
      }
    } else {
      const houseSelected = currentOptions.includes("House");

      if (houseSelected) {
        return;
      }
    }

    if (currentOptions.includes(option)) {
      const updatedOptions = currentOptions.filter((item) => item !== option);
      updatedGrid[rowIndex][colIndex] = updatedOptions.join(",");
    } else {
      const updatedOptions = [...currentOptions, option];
      updatedGrid[rowIndex][colIndex] = updatedOptions.join(",");
    }

    setGrid(updatedGrid);
  };

  const handleRecommendHouse = () => {
    const amenities = ["Restaurant", "Gym", "Hospital"];
    let bestHouse = null;
    let bestScore = Infinity;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cellOptions = grid[i][j].split(",");
        let score = 0;

        if (cellOptions.includes("House")) {
          for (let k = 0; k < grid.length; k++) {
            for (let l = 0; l < grid[k].length; l++) {
              const otherCellOptions = grid[k][l].split(",");
              amenities.forEach((amenity) => {
                if (otherCellOptions.includes(amenity)) {
                  const distance = Math.abs(i - k) + Math.abs(j - l);
                  score += distance;
                }
              });
            }
          }

          if (score < bestScore) {
            bestScore = score;
            bestHouse = { row: j + 1, col: i + 1 };
          }
        }
      }
    }
    console.log("Best House:", bestHouse);
    setRecommendedHouse(bestHouse);
  };
  const renderGrid = () => {
    const amenities = [
      { name: "House", icon: houseIcon },
      { name: "Gym", icon: gymIcon },
      { name: "Restaurant", icon: restaurantIcon },
      { name: "Hospital", icon: hospitalIcon }
    ];

    return grid.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((value, colIndex) => {
          const cellId = `${rowIndex}${colIndex}`;
          const selectedAmenities = value;

          return (
            <div
              className={`grid-cell${
                recommendedHouse &&
                colIndex + 1 === recommendedHouse.row &&
                rowIndex + 1 === recommendedHouse.col
                  ? " recommended-house"
                  : ""
              }`}
              key={cellId}
            >
              <div className="grid-icons">
                <div className="grid-icons-row">
                  {amenities.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.name);
                    const isHouse = amenity.name === "House";
                    const amenityClassName = `amenity-icon${
                      isSelected ? " selected" : ""
                    }${isHouse && isSelected ? " centered" : ""}${
                      value.includes("House") && amenity.name !== "House"
                        ? " disabled"
                        : ""
                    }`;

                    return (
                      <div
                        className={amenityClassName}
                        key={amenity.name}
                        onClick={() =>
                          handleGridInput(rowIndex, colIndex, amenity.name)
                        }
                      >
                        <img src={amenity.icon} alt={amenity.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="grid-container">{renderGrid()}</div>
      <div className="button-container">
        <button className="button-down" onClick={handleRecommendHouse}>
          Recommend House
        </button>
      </div>
    </>
  );
};

export default Grid;
