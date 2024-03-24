// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
import { useEffect } from "react";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


function Form() {
  const [lat, lng] = UseUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geocodingError, setGeocodingError] = useState('')

  
  
const [emoji, setEmoji] = useState('')
  const navigate = useNavigate();
  const BASE_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    async function fetchCitydate(){
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json()
        // console.log(data);
        if(!data.countryCode) throw new Error("that does not seem to be a coountry")
        setCityName(data.city ||data.locality||  "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
        console.log(emoji);

      } catch (err) {
        setGeocodingError(err.message)
      } finally{
        setIsLoadingGeocoding(false)
      }
    }
  fetchCitydate()
  }, [lat, lng])
  if(isLoadingGeocoding) return <Spinner />
if(geocodingError) return <Message message={geocodingError} />
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
