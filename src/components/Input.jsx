import React from "react";

function Input(props) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{props.legend}</legend>
      <input type="text" className="input" placeholder={props.placeholder} />
      <p className="label"></p>
    </fieldset>
  );
}

export default Input;
