import React from "react";
import { useGeolocation } from "./useGeolocation";
import { useState } from "react";

const Geolocation = () => {
  const {
    position: { lat, lon },
    error,
    isLoading,
    getPosition,
  } = useGeolocation();
  const [count, setCount] = useState(0);

  function handleclick() {
        setCount((count) => count + 1);
        getPosition();
    }

  return (
    <div>
      <button onClick={handleclick} value={count} style={{ padding: "5px" }}>
        Get my positions
      </button>
      {isLoading && <p>loading</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lon && lat && (
        <>
          <div>
            <h1>
              Your Gps position:
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.openstreetmap.org/#map=16/${lat}/${lon}`}
                style={{ color: "white", fontSize: "20px" }}
              >
                {lat},{lon}
              </a>
            </h1>
          </div>
        </>
      )}
      <h3>You requested position {count} times </h3>
    </div>
  );
};

export default Geolocation;

// import { useState } from "react";

// function useGeolocation() {}

// export default function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [countClicks, setCountClicks] = useState(0);
//   const [position, setPosition] = useState({});
//   const [error, setError] = useState(null);

//   const { lat, lng } = position;
//   console.log(lat, lng);

//   function getPosition() {
//     setCountClicks((count) => count + 1);

//     if (!navigator.geolocation)
//       return setError("Your browser does not support geolocation");

//     setIsLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude
//         });
//         setIsLoading(false);
//       },
//       (error) => {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     );
//   }

//   return (
//     <div>
//       <button onClick={getPosition} disabled={isLoading}>
//         Get my position
//       </button>

//       {isLoading && <p>Loading position...</p>}
//       {error && <p>{error}</p>}
//       {!isLoading && !error && lat && lng && (
//         <p>
//           Your GPS position:{" "}
//           <a
//             target="_blank"
//             rel="noreferrer"
//             href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
//             style={{color: "white", fontSize: "20px"} }
//           >
//             {lat}, {lng}
//           </a>
//         </p>
//       )}

//       <p>You requested position {countClicks} times</p>
//     </div>
//   );
// }
