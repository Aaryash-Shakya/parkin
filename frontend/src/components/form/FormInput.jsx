import "../../index.css";

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
      className={`relative mb-5 ${style} min-w-[300px] xl:min-w-[400px] flex flex-col-reverse`}
    >
      <input
        className="relative w-full rounded-[36px] mt-2 bg-white px-4 font-medium py-5 outline-none placeholder:text-md placeholder:tracking-wider transition tracking-wider text-md peer"
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        autoComplete="off"
        onWheel={(e) => e.target.blur()} // Disable number scroll increment
        {...rest}
      />
      <label
        htmlFor={name}
        className="form__label peer-focus:text-primary transition font-semibold ml-2"
      >
        {label || name}
      </label>
    </div>
  );
};

export default FormInput;
