const MarkerPopUp = (props) => {
  const { selectPosition } = props;
  console.log(selectPosition);
  return (
    <div className="relative w-full h-full">
      <div className="rounded-lg bg-white w-full mx-auto text-start absolute bottom-1/2 left-1/2 h-[700px]">
        i am here
      </div>
    </div>
  );
};

export default MarkerPopUp;
