import DateTimePicker from "react-datetime-picker";

const CustomDateTimePicker = ({ onChange, value, label }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="form__label peer-focus:text-primary transition font-semibold ml-2"
      >
        {label}
      </label>
      <div>
        <DateTimePicker
          className="relative w-full rounded-[36px] mt-2 bg-white px-4 font-medium py-5 outline-none placeholder:text-md placeholder:tracking-wider transition tracking-wider text-md peer"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default CustomDateTimePicker;
