import { abilities } from "../constants";

const FeatureCards = () => (
  <div id="features" className="w-full padding-x-lg py-30 mt-20">
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-white-50 p-3">
            <img
              src={imgPath}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-black-100 text-2xl font-semibold mt-2">
            {title}
          </h3>
          <p className="text-black-200 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
