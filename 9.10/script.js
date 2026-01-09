/* 
const cars = {
  mercedes: {
    name: "Mercedes",
    doors: 4,
    wheel: 4,
    hp: 220,
    isStarted: false,
  },
  bmw: {
    name: "BMW",
    doors: 4,
    wheel: 4,
    hp: 330,
    isStarted: false,
  },
  audi: {
    name: "AUDI",
    doors: 4,
    wheel: 4,
    hp: 267,
    isStarted: false,
  },
};
*/

function getCar(carName) {
    if (cars[carName]) {
        console.log(cars[carName]);
    } else {
        console.log("Авто не найдено");
    }
}