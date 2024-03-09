import { useEffect } from "react";

export function useKey(key, callbackfn){

 useEffect(() => {
   const callback = (e) => {
     if (e.code.toLowerCase() === key.toLowerCase()) {
       callbackfn() // onCloseMovie();
     }
   };

   document.addEventListener("keydown", callback);

   return () => {
     document.removeEventListener("keydown", callback);
   };
 }, [key,callbackfn])
}