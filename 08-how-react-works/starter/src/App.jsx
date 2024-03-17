import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab num={1} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab num={2} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab num={3} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={activeTab}/>
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, setActiveTab }) {
  return (
    <button
      className={activeTab === num ? "active tab" : "tab"}
      onClick={() => setActiveTab(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [love, setLove] = useState(0)
  function handleInc() {
    setLove((love) => love +1)
  }
  function tripleleInc() {
        setLove((love) => love + 3);
  }
  function handleUndo() {
  setIsExpanded(false)
  setLove(0)
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {isExpanded && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setIsExpanded((ah) => !ah)}>{isExpanded? "Hide": "Show"} details</button>

        <div className="hearts-counter">
          <span>{love}💝</span>
          <button onClick={handleInc}>+</button>
          <button onClick={tripleleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
