import React from "react";
import sy from "./assets/sy.jpg";

export default function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />

        <SkillsList bgred="red" />
      </div>
    </div>
  );
}

function Avatar() {
  return  <img className="avatar" src={sy} alt="" /> 
}

function Intro() {
  return (
    <div className="intro">
      <h1>Jonas Schmedtmansn</h1>
      <p>
        Full-stack web developer and teacher at Udemy, when not coding you can
        find me on the beach, I like to play board games and to cooke or to just
        enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}
function SkillsList() {
  return (
    <ul className="skill-list">
      <Skill name={'Java'} color={"red"}/>
      <Skill name={'Html'} color={"blue"}/>
      <Skill name={'Java'} color={"red"}/>
      <Skill name={'Html'} color={"blue"}/>
      <Skill name={'Java'} color={"red"}/>
      <Skill name={'Html'} color={"blue"}/>
    </ul>
  );

  
}

const Skill = (props) => {
  return (
    <div
      className="skill"
      style={{
        backgroundColor: `${props.color}`,
        padding: "3px",
        borderRadius: "5px",
      }}
    >
      <span>{props.name}👍</span>
    </div>
  );
}

