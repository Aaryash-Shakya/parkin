import { useState } from "react";
import "../../index.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormInput = ({
  placeholder,
  type,
  label,
  name,
  value,
  style,
  ...rest
}) => {
  return (
    <div
      className={`relative mb-5 ${style}  min-w-[350px] xl:min-w-[400px] flex flex-col-reverse`}
    >
      <input
        className="relative w-full py-3 mt-2  border-b-2 border-primary outline-none placeholder:text-sm placeholder:tracking-wider transition tracking-wider text-sm peer"
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        autoComplete="off"
        {...rest}
        maxLength={name === "Enter OTP" ? 6 : null}
      />
      <label
        htmlFor={name}
        className="form__label peer-focus:text-primary transition"
      >
        {label || name}
      </label>
    </div>
  );
};

export default FormInput;
