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

  const handleAddButton = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleAddFriend = (value) => {
setFriends((friends) => [...friends, value])
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {isOpen && <FormAddFriend  onAddFriend={handleAddFriend}/>}

        <Button onClick={handleAddButton} >
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
    <div>
      {friends.map((friend) => (
        <Friend friend={friend} />
      ))}
    </div>
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

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();

  const handleAddFriend = (e) => {
    e.preventDefault();
    const newFriend = { id, name, image: `${image}?u=${id}`, balance: 0 };
    onAddFriend(newFriend)
  };
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
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
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FormSplitBill = () => {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const [paidByFriend, setpaidByFriend] = useState('')
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH X</h2>
      <label>Bill value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>Sarah's expense</label>
      <input type="text" disabled />
      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
