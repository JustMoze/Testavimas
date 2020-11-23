import React from 'react';
import styled from 'styled-components';

const InputField = styled.div`
margin-bottom: 20px;
div {
    font-weight: bold;
    font-family: "Montserrat", sans-serif;
}
div span {
    font-size: 0.8rem;
  color: #595959;
  text-decoration: underline;
  cursor: pointer;
}
input {
    width: 100%;
  margin-top: 3px !important;
  border: 1px solid #595959;
  line-height: 40px !important;
  border-radius: 10px;
  background-color: #f5efef;
  padding-left: 10px;
}
input:focus {
    border-radius: 10px;
    outline: none;
    border: 2px solid #595959;
  }
 div.alert-danger {
    margin-top: 0.2%;
    padding: 3px;
    border-radius: 15px;
 }
`;
export default function Input(props) {
    let {label, name, error, spanLink, handleSpanClick, spanLabel, ...rest} = props;
    return (
        <InputField>
            <div>{label} {spanLink && <span onClick={handleSpanClick}>{spanLabel}</span>}</div>
            <input {...rest} name={name} id={name}></input>
            {error && <div className="alert alert-danger">{error}</div>}
        </InputField>
    )
}
