import React from "react";

export const Stat = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        {" "}
        <em>Start adding some items to your packing list</em>
      </p>
    );
  const alreadyPacked = items.filter((item) => item.packed).length;
  const numItems = items.length;
  const percentage = Math.round((alreadyPacked / numItems) * 100);
  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You got everything ready!!!  ready to go"
            : `You have ${numItems} items on your list and you already packed ${alreadyPacked} (${percentage}%)`}
        </em>
      </footer>
    </>
  );
};

