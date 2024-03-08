import { useEffect } from "react";
import { useState } from "react";
import StarRating from "./StarRating";



const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "ca52333";

export default function App() {
  const [watched, setWatched] = useState(() => {
    const storedvalue = localStorage.getItem('watched')
    return JSON.parse(storedvalue)
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);
  const [rating, setRating] = useState("");

  const handleSelectedMovid = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };
  const hadlecloseMovid = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    // setSelectedId(null);


  
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };


  useEffect(() => {
      localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong baba mi");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie  not Found");
        setMovies(data.Search);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }
    hadlecloseMovid()
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovid} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={hadlecloseMovid}
              onAddWatced={handleAddWatched}
              onRating={setRating}
              rating={rating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const ErrorMessage = ({ message }) => {
  return <p className="error">{message}</p>;
};
const Loader = () => {
  return <p className="loader">Loading....</p>;
};

const NavBar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">{children}</nav>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {


  
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

// const ListBox = ({ children }) => {
//   const [isOpen1, setIsOpen1] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen1((open) => !open)}
//       >
//         {isOpen1 ? "–" : "+"}
//       </button>
//       {isOpen1 && children}
//     </div>
//   );
// };

// const WatchedBox = () => {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />

//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// };

const Box = ({ children }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && children}
    </div>
  );
};

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const SelectedMovie = ({
  rating,
  selectedId,
  onCloseMovie,
  onAddWatced,
  onRating,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const iswatched = watched.map((movies) => movies.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.rating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

// const [avgRating, setAvgRating] = useState(0)

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      rating,
    };
    onAddWatced(newMovie);

    // setAvgRating( Number(imdbRating))
    // setAvgRating((avgRating) => (avgRating + rating)/2)
  };

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        onCloseMovie()
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = title;

    return () => {
      document.title = "usepopcorn";
    };
  }, [title]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt="" />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating}
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={onRating} />
                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p> you rated this movie : {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

const WatchedMoviesList = ({ watched, onDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
};

const WatchedMovie = ({ movie, onDelete }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
};
