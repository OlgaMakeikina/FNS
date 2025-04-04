import React from "react";
import FormComponent from "./FormComponent"; // ✅ импорт своего компонента
import "./App.css";

const AddContact = () => {
  return (
    <div>
      <FormComponent />
    </div>
  );
};

export default AddContact;