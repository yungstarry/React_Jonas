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

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null)
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && (
          <FormAddFriend
            onShowAddFriend={handleShowAddFriend}
            onAddFriend={handleAddFriend}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

export default App;

const FriendList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friend = ({ selectedFriend, friend, onSelection }) => {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {" "}
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFried = {
      id,
      name,
      image: ` ${image}?=${id} `,
      balance: 0,
    };
    onAddFriend(newFried);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSumbit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add Friend</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByFriend) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label> Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label> Your Expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill
              ? paidByFriend
              : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="number" disabled value={paidByFriend} />

      <label>who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
