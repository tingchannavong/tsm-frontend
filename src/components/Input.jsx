import React from "react";

function Input({ register, name, placeholder, label, type }) {
  return (
    <>
      <legend className="fieldset-legend">{label}</legend>
      <input {...register(name)} type={type} className="input" placeholder={placeholder} />
      <p className="label"></p>
    </>
  );
}

export default Input;
