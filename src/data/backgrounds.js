import summerDay from "../assets/summerDay.png";
import summerNight from "../assets/summerNight.png";

import autumnDay from "../assets/autumnDay.png";
import autumnNight from "../assets/autumnNight.png";

import springDay from "../assets/springDay.png";
import springNight from "../assets/springNight.png";

import winterDay from "../assets/winterDay.png";
import winterNight from "../assets/winterNight.png";

import summerDaySound from "../assets/audio/wind.mp3";
import summerNightSound from "../assets/audio/crickets.mp3";

import autumnDaySound from "../assets/audio/rain.mp3";
import autumnNightSound from "../assets/audio/roof.mp3";

import springDaySound from "../assets/audio/river.mp3";
import springNightSound from "../assets/audio/frogs.mp3";

import winterDaySound from "../assets/audio/blizzard.mp3";
import winterNightSound from "../assets/audio/fire.mp3";

const backgrounds = [
  {
    name: "Летний день",
    image: summerDay,
    sound: summerDaySound,
    season: "summer",
    time: "day",
  },
  {
    name: "Летняя ночь",
    image: summerNight,
    sound: summerNightSound,
    season: "summer",
    time: "night",
  },
  {
    name: "Осенний день",
    image: autumnDay,
    sound: autumnDaySound,
    season: "autumn",
    time: "day",
  },
  {
    name: "Осенняя ночь",
    image: autumnNight,
    sound: autumnNightSound,
    season: "autumn",
    time: "night",
  },
  {
    name: "Весенний день",
    image: springDay,
    sound: springDaySound,
    season: "spring",
    time: "day",
  },
  {
    name: "Весенняя ночь",
    image: springNight,
    sound: springNightSound,
    season: "spring",
    time: "night",
  },
  {
    name: "Зимний день",
    image: winterDay,
    sound: winterDaySound,
    season: "winter",
    time: "day",
  },
  {
    name: "Зимняя ночь",
    image: winterNight,
    sound: winterNightSound,
    season: "winter",
    time: "night",
  },
];

export default backgrounds;
