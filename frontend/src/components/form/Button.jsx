const Button = ({ title, styles }) => {
  return (
    <button
      className={`px-8 py-4 rounded-[36px] font-semibold  w-full mt-6 ${styles} custom_primary_button`}
    >
      <div className="button_text">{title}</div>
    </button>
  );
};

export default Button;
