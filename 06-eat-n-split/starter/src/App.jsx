import React from "react";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);

  const handleformhide = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {isOpen && <FormAddFriend />}

        <Button onClick={handleformhide}>
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
};

export default App;

const FriendsList = ({ friends }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <>
      <li>
        <img src={friend.image} />
        <h4>{friend.name}</h4>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} $ {Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owe's you ${friend.balance}
          </p>
        )}
        {friend.balance === 0 && (
          <p className="green">you and your {friend.name} are Even</p>
        )}
        <Button>Select</Button>
      </li>
    </>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FormAddFriend = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  const handleFormSubmit = () => {
    e.preventDefault();
  };
  return (
    <form className="form-add-friend" onSubmit={handleFormSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with X</h2>
      <label>Bill Value</label>
      <input type="text" />
      <label>Your Expense</label>
      <input type="text" />
      <label>X's Expense</label>
      <input type="text" disabled />
      <label >Who is paying the bill</label>
      <select >
        <option value="You">YOu</option>
        <option value="X">X</option>
      </select>
    </form>
  );
};
