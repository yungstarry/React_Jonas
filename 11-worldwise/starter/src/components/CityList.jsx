import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

const CityList = () => {
  const {cities, isLoading}= useCities()
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message={"Add your first city from the map"} />
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
