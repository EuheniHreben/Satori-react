import backgrounds from "../../data/backgrounds";
import "./Background.css";

function Background({ activeSeason, activeTime }) {
  return (
    <>
      {backgrounds.map((bg) => {
        const isActive = bg.season === activeSeason && bg.time === activeTime;

        return (
          <div
            key={`${bg.season}_${bg.time}`}
            className="bg-layer"
            style={{
              backgroundImage: `url("${bg.image}")`,
              opacity: isActive ? 1 : 0,
            }}
          />
        );
      })}
    </>
  );
}

export default Background;
