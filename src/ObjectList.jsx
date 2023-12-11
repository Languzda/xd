import React from "react";

const ObjectList = ({ obj }) => {
  const renderObject = (obj) => {
    const objectList = [];
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Rekurencyjnie renderuj zagnieżdżone obiekty
        const nestedList = renderObject(obj[key]);
        objectList.push(
          <React.Fragment key={key}>
            <li>{key}:</li>
            <ul style={{ marginLeft: "20px" }}>{nestedList}</ul>
          </React.Fragment>
        );
      } else {
        objectList.push(
          <React.Fragment key={key}>
            <li>{`${key} : ${obj[key]}`}</li>
          </React.Fragment>
        );
      }
    }
    return objectList;
  };

  return <ul>{renderObject(obj)}</ul>;
};

export default ObjectList;
