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
  const [seleectID, setSeleectID] = useState(true);

  const handleAddButton = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleAddFriend = (value) => {
    setFriends((friends) => [...friends, value]);
  };

  const handleSelectbutton = (friend) => {
    setSeleectID((selected) => selected?.id === friend?.id ? null : friend)
    
  };

  const handleSplit = (value) => {
setFriends((friends) => friends.map((friend) => friend.id === seleectID.id ? { ...friend, balance: friend.balance + value } : friend))
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends}  seleectID={seleectID} onHandleSelect={handleSelectbutton}/>
        {isOpen && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleAddButton}>
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>

      {seleectID && <FormSplitBill onSplit={handleSplit} seleectID= {seleectID} key={seleectID?.id}/>}
    </div>
  );
};

export default App;

const FriendsList = ({ friends, seleectID, onHandleSelect }) => {
  return (
    <div>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} seleectID={seleectID} onHandleSelect={onHandleSelect} />
      ))}
    </div>
  );
};

const Friend = ({ friend, seleectID, onHandleSelect }) => {
const isSelected = friend.id === seleectID?.id

  return (
    <li key={friend.id}>
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
      <Button onClick={() => onHandleSelect(friend)}>{isSelected ? "close" : "select"}</Button>
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
    onAddFriend(newFriend);
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

const FormSplitBill = ({ seleectID, onSplit }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = paidByUser > bill ? bill : bill - paidByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const newpay = whoIsPaying === "user" ? paidByFriend : -paidByUser



  const handleSubmit = (e) => {
    e.preventDefault();
    if(!bill || !paidByFriend || !whoIsPaying) return
    onSplit(newpay)
 console.log(newpay);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit} >
      <h2>SPLIT A BILL WITH {seleectID.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? bill : Number(e.target.value)
          )
        }
      />
      <label>Sarah's expense</label>
      <input type="text" disabled value={Number(paidByFriend)} />
      <label>Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{seleectID.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
