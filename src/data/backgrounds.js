import summerNight from "../assets/summerNight.png";
import summerDay from "../assets/summerDay.png";
import autumnNight from "../assets/autumnNight.png";
import autumnDay from "../assets/autumnDay.png";
import springNight from "../assets/springNight.png";
import springDay from "../assets/springDay.png";
import winterNight from "../assets/winterNight.png";
import winterDay from "../assets/winterDay.png";

const backgrounds = [
  {
    name: "Летний день",
    image: summerDay,
    season: "summer",
    time: "day",
  },
  {
    name: "Летняя ночь",
    image: summerNight,
    season: "summer",
    time: "night",
  },
  {
    name: "Осенний день",
    image: autumnDay,
    season: "autumn",
    time: "day",
  },
  {
    name: "Осенняя ночь",
    image: autumnNight,
    season: "autumn",
    time: "night",
  },
  {
    name: "Весенний день",
    image: springDay,
    season: "spring",
    time: "day",
  },
  {
    name: "Весенняя ночь",
    image: springNight,
    season: "spring",
    time: "night",
  },
  {
    name: "Зимний день",
    image: winterDay,
    season: "winter",
    time: "day",
  },
  {
    name: "Зимняя ночь",
    image: winterNight,
    season: "winter",
    time: "night",
  },
];

export default backgrounds;
