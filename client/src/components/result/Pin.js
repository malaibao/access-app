import React from "react";
import styled from "styled-components";
import "./Result.scss";

const Tag = styled.button`
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #fff;
  color: white;
  background-color: rgb(17, 82, 147);
  margin: 5px 0;
`;

const Pin = ({ pin }) => {
  return (
    <>
      <div className="tags-container">
        {pin && (
          <>
            <h1>{pin.name}</h1>
            <h3>{pin.address}</h3>
            <p>Accessibility Options:</p>
          </>
        )}
        {pin &&
          pin.tags.map((tag) => {
            const tagRename = tag.replace(/_/g, " ");
            return <Tag>{tagRename}</Tag>;
          })}
      </div>
    </>
  );
};

export default Pin;
