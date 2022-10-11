import React, { useState } from "react";
export const Form = ({ album }) => {
  const [form, setForm] = useState({
    id: album.id,
    user: localStorage.getItem("user"),
    status: "completed",
    rating: 0,
    date: "",
    fav: false,
    notes: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleSubmit = async function (e) {
    e.preventDefault();

    const newRating = { ...form };
    console.log(JSON.stringify(newRating));
    await fetch("http://localhost:4000/users/ratings/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRating),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    let updatedScore =
      (album.rating * album.users + newRating.rating) / (album.users + 1);
    const update = {
      id: album.id,
      rating: updatedScore,
      users: album.users + 1,
    };
    await fetch("http://localhost:4000/albums/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    
    setForm({
      id: album.id,
      username: localStorage.getItem("user"),
      status: "completed",
      rating: 0,
      date: "",
      fav: false,
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <select
          value={form.status}
          id="status"
          name="status"
          onChange={(e) => updateForm({ status: e.target.value })}
        >
          <option value="completed">Completed</option>
          <option value="planning">Plan to Listen</option>
        </select>
        <input
          value={form.rating}
          id="rating"
          name="rating"
          type="number"
          onChange={(e) => updateForm({ rating: e.target.value })}
        ></input>
        <input
          value={form.date}
          id="date"
          name="date"
          type="date"
          onChange={(e) => updateForm({ date: e.target.value })}
        ></input>
        <input
          value={form.fav}
          id="fav"
          name="fav"
          type="checkbox"
          onChange={(e) => updateForm({ fav: e.target.value })}
        ></input>
        <input
          value={form.notes}
          id="notes"
          name="notes"
          type="textarea"
          onChange={(e) => updateForm({ notes: e.target.value })}
        ></input>
        <input type="submit" value="Save"></input>
      </div>
    </form>
  );
};
export default Form;
