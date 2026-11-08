import backgrounds from "../data/backgrounds.js";

function findActiveBackground({ activeSeason, activeTime }) {
  return backgrounds.find(
    (bg) => bg.season === activeSeason && bg.time === activeTime,
  );
}

export default findActiveBackground;
