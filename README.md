# StopWatch


Goal:

Professor Higginbotham has challenged you to a race around the world in a steam-powered zeppelin of your own invention.
In order to verify your time at each leg of the race, you will need to create a stopwatch web application consisting
of a start/stop button and a history table. Each time you start the stopwatch, the application inserts a new row into
the history table that records the start time, and the current latitude and longitude. When you stop the stopwatch,
the application will record the time, latitude, and longitude, as well as the amount of time that has elapsed.

Stretch Goal 1

Add a reset button that clears the time entry history table.

Stretch Goal 2

Your journey may be a long one, and you may pass more than one timezone. Record the timezone when you start and stop
the watch, and correctly display the elapsed time.

Your wi-fi will be spotty in the zeppelin, so you will need to ensure the history table is viewable offline as you marvel
at your record-setting speed. You can use HTML5 geolocation and localStorage to help in your task. Good luck!


RREADME & INSTRUCTIONS:


I have implemented all the features asked for including the stretch goals too.


One of the assumption which I made is that I don't have to store the stop watch
history in a back-end DB, instead I would use browser local storage.


Steps to run the project:

1. Do `npm install` in the root directory.
2. Run `npm start` in the root directory.
3. Goto localhost:3000 url in your browser.
