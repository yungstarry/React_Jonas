import React, { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

const App = () => {
  return (
    <>
      {/* <Logo />
      <Form />
      <PackingList />
      <Stat /> */}
      <FlashCards />
    </>
  );
};

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id !== selectedId ? id : null);
  };

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div key={question.id} onClick={() => handleClick(question.id)} className={selectedId === question.id? "selected": ''}>
          <p>
            {question.id !== selectedId ? question.question : question.answer}
          </p>
        </div>
      ))}
    </div>
  );
}

const Logo = () => {
  return (
    <>
      <h1>🌴Far Away 💼</h1>
    </>
  );
};
const Form = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  };
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((cur, i) => (
            <option value={cur} key={i}>
              {cur}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Items ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>ADD</button>
      </form>
    </>
  );
};
const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stat = () => {
  return (
    <>
      <footer className="stats">
        You have X items on your list and you already packed x (x%)
      </footer>
    </>
  );
};

export default App;

////////////////////

//////////////////////////

/////////////////////////

////////////

//////////////////////////////////////////////

/**const App = () => {
  return (
    <>
      <Logo />
      <Form />
      <PackingList />
      <Stat />
    </>
  );
};

const Logo = () => {
  return (
    <>
      <h1>🌴Far Away 💼</h1>
    </>
  );
};
const Form = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setDescription('')
    setQuantity(1)
  };
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((cur, i) => (
            <option value={cur} key={i}>
              {cur}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Items ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>ADD</button>
      </form>
    </>
  );
};
const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stat = () => {
  return (
    <>
      <footer className="stats">
        You have X items on your list and you already packed x (x%)
      </footer>
    </>
  );
};

export default App; */
