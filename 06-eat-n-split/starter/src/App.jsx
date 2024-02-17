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
  const [isOpen, setIsOpen] = useState(false);
  const [Friends, setFriends] = useState(initialFriends)

  const handleShowAddFriend = () => {
    setIsOpen((open) => !open);
  };

  const handleAddFriend = ({friend}) => {
    onSetFriends((Friends) => [...Friends, friend]);
  }

  onSetFriends([...initialFriends, newFriend]);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList Friends={Friends} />
        {isOpen && <FormAddFriend onSetFriends={setFriends} />}
        <Button onClick={handleShowAddFriend}>
          {!isOpen ? "Add Friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
};

export default App;

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FriendList = ({Friends}) => {
  
  return (
    <ul>
      {Friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">you and {friend.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
};

const FormAddFriend = ({ onSetFriends }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();


  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = {
      name,
      image: `${image}?=4${id}`,
      id,
      balance: 0,
    };
    
  

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
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

      <Button> Add</Button>
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
      <label>X's expense</label>
      <input type="text" disabled />

      <label>Who is payingthe bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
