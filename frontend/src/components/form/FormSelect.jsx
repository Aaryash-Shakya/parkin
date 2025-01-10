import "../../index.css";

const FormSelect = ({ options, label, name, value, style, ...rest }) => {
  return (
    <div
      className={`relative mb-5 ${style} min-w-[350px] xl:min-w-[400px] flex flex-col-reverse`}
    >
      <select
        className="relative w-full rounded-[36px] mt-2 bg-white px-4 font-medium py-5 outline-none placeholder:text-md placeholder:tracking-wider transition tracking-wider text-md peer"
        value={value}
        name={name}
        id={name}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.displayName}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="form__label peer-focus:text-primary transition font-semibold ml-2"
      >
        {label || name}
      </label>
    </div>
  );
};

export default FormSelect;
