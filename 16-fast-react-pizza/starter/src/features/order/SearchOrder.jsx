import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSumbit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("")
  }
  return (
    <form onSubmit={handleSumbit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
