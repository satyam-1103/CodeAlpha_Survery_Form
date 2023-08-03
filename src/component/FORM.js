import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASCceA_aqb7f9QR9zoGBkIUQU22jbgJKo",
  authDomain: "survey-50b38.firebaseapp.com",
  databaseURL: "https://survey-50b38-default-rtdb.firebaseio.com",
  projectId: "survey-50b38",
  storageBucket: "survey-50b38.appspot.com",
  messagingSenderId: "1023999963277",
  appId: "1:1023999963277:web:6d6e0b7427d20fe4e432c4",
};

firebase.initializeApp(firebaseConfig);

const initialState = {
  name: "",
  email: "",
  contact: "",
  age: "",
  course: "",
  city: "",
  country: "",
};

function Form() {
  const [formData, setFormData] = useState(initialState);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, contact, age, course, city, country } = formData;
    const db = firebase.firestore();
    db.collection("survey").add({
      name,
      email,
      contact,
      age,
      course,
      city,
      country,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormData(initialState);
    setFormSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="off"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          autoComplete="off"
          required
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Your course"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Your city"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Your country"
          autoComplete="off"
          required
        />

        <button type="submit">Submit</button>
      </form>
      {formSubmitted && <p>Form submitted!</p>}
    </div>
  );
}

export default Form;
