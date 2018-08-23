// update tc home wifi (node 8)

// . Press button 1, start one minute timer
// . Press button 2, reset timer, screen showing count down
// . Time's up: LED blink and screen showing "Time's up!"

// Timer: board.loop(100, () => {})

// Collection: accept iterables

const Tessel = require("tessel-io");
const five = require("johnny-five");

const TIMER_SECONDS = 10;

const board = new five.Board({
  io: new Tessel()
});

board.on("ready", function() {
  const led = new five.Led("b7");
  const startBtn = new five.Button("b5");
  const resetBtn = new five.Button("b6");
  const lcd = new five.LCD({
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"]
  });
  let oneSecInterval;

  let seconds = 0;
  function updateTimer() {
      ++seconds;
      console.log(`Seconds left: ${TIMER_SECONDS-seconds}`);
      lcd.clear();
      lcd.cursor(0, 0).print(`${TIMER_SECONDS-seconds} secs left`);
      if (seconds === TIMER_SECONDS) {
          console.log("Times up!");
          lcd.clear();
          lcd.cursor(0, 0).print(`Times up!!`);
          led.blink(250);
          clearInterval(oneSecInterval);
      }
  }


  startBtn.on("press", () => {
    if (oneSecInterval) return;
    console.log("startBtn is pressed!");
    oneSecInterval = setInterval(updateTimer, 1000);
  });

  resetBtn.on("press", () => {
      console.log("resetBtn is pressed!");
      seconds = 0;
  });

});
