import React, { useState } from "react";

const AccordionItem = ({ num, title, children, curOpen, onOpen }) => {
  const isOpen = num === curOpen 

  const handleToggle = () => {
    onOpen(isOpen ? null : num);
  };
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
};

const Accordion = ({ faqs }) => {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          num={i}
          title={faq.title}
          curOpen={curOpen}
          onOpen={setCurOpen}
        >
        {faq.text}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
