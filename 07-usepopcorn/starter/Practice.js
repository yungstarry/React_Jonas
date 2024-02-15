function WatchedBox() {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);
    
    return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}

const ListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
};

const Box = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

import React from "react";
const [watched, setWatched] = useState(tempWatchedData);

const App = () => {
    return (
        <div>
      <Box>
        <MovieList movies={movies} />
      </Box>
      <Box>
        <WatchedSummary watched={watched} />
        <WatchedMoviesList watched={watched} />
      </Box>
    </div>
  );
};

export default App;
