import "./Background.css";
import findActiveBackground from "../../utils/findActiveBackground";
import backgrounds from "../../data/backgrounds";

function Background({ activeSeason, activeTime, isStarted }) {
  const activeBackground = findActiveBackground({ activeSeason, activeTime });

  const visibleBackgrounds = isStarted
    ? backgrounds
    : activeBackground
      ? [activeBackground]
      : [];

  return (
    <>
      {visibleBackgrounds.map((bg) => {
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
