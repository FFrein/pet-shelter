import "./styles.css";

export const CategoryExampleLine = () => {
  return (
    <div className="CategoryExampleLine__wrapper">
      <div className="CategoryExampleLine">
        <div className="flex mt-2 space-x-2">
          <div className="bg-[#ebe3cc] rounded-lg p-2 flex justify-center items-center">
            <img
              className="w-[200px] rounded"
              src="./images/cat.png"
              alt="cat"
            />
          </div>
          <div className="bg-[#ebe3cc] rounded-lg p-2 flex justify-center items-center">
            <img
              className="w-[200px] rounded"
              src="./images/dog.png"
              alt="dog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
