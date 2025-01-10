const AdditionalFeatures = ({
  features,
  handleFeatureClick,
  selectedFeatures,
}) => {
  return (
    <>
      <label className="form__label peer-focus:text-primary transition font-semibold ml-2">
        Additional Features
      </label>
      <div className="flex w-full gap-4 overflow-x-auto hideScrollBar mt-2">
        {features.map((feature) => (
          <div
            key={feature}
            className={`px-4 py-2 border-2 whitespace-nowrap rounded-full font-semibold ${
              selectedFeatures.includes(feature)
                ? "border-primary bg-primary-light text-primary"
                : "border-gray-400 bg-gray-200 text-gray-400"
            }`}
            onClick={() => handleFeatureClick(feature)}
            style={{ cursor: "pointer" }}
          >
            {feature}
          </div>
        ))}
      </div>
    </>
  );
};

export default AdditionalFeatures;
