function getRealTimeConfig() {
  const now = new Date();
  const month = now.getMonth();
  const hours = now.getHours();

  let season = "summer";

  switch (month) {
    case 11:
    case 0:
    case 1:
      season = "winter";
      break;

    case 2:
    case 3:
    case 4:
      season = "spring";
      break;

    case 5:
    case 6:
    case 7:
      season = "summer";
      break;

    case 8:
    case 9:
    case 10:
      season = "autumn";
      break;
  }

  const time = hours >= 6 && hours < 18 ? "day" : "night";

  return { season, time };
}

export default getRealTimeConfig;