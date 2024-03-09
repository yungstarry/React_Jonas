import { useEffect } from "react";
import { useState } from "react";

const KEY = "ca52333"; 
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    // callback?.()


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
    // hadlecloseMovid();
    
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, loading, error };
}
