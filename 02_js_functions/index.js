// ✅ Declaring, Referencing, and Invoking Functions

  // function playSong() {
  //   return "playing some song";
  // }

  // print a reference to the 'playSong' function

    // console.log(playSong);

  // call function and evaluate logic
  
    // console.log(playSong());

// ✅ Parameters vs. Arguments

  // Parameters go with function definitions, arguments go with function invocations

  // using the playSong function again, let's define a parameter 'song'

    // function playSong(song) {
    //   return "playing some song";
    // }

  // how can we use the paramater to make our code more dynamic?

    // function playSong(song) {
    //   return `playing: ${song}`;
    // }

  // now invoke the function and pass in an argument

    // console.log(
    //   playSong("Sweet Dreams")
    // );

// ✅ Arrow Functions

// const squareMe = (n) => n*n;

// const squareMe = (n) => {
//   return n*n;
// }

// console.log(squareMe(2))

// debugging function

function log(obj) {
  console.log(obj);
  return obj;
}

// ✅ First Class / Higher Order Functions

  // regular first class function => can treated like any other JS object

  // higher order function => accepts another function as a parameter or returns a function
  // https://www.codecademy.com/learn/game-dev-learn-javascript-higher-order-functions-and-iterators/modules/game-dev-learn-javascript-iterators/cheatsheet

// console.log('starting now');
// window.setTimeout(() => {
//   console.log('2 seconds later')
// }, 2000);

// Alternatively

// function callback() {
//   console.log('2 seconds later')
// }
// console.log('starting now');
// window.setTimeout(callback, 2000);



// ✅ Scope

// function outerFunction() {
//   let name = "outer";
//   let outer = "outer";
//   console.log("name", name);
//   console.log("outer", outer);
//   // console.log("child", child); // throws an error
//   // console.log("grandChild", grandChild); // throws an error
//   return function childFunction() {
//     let name = "child";
//     let child = "child";
//     console.log("name", name);
//     console.log("outer", outer);
//     console.log("child", child);
//     // console.log("grandChild", grandChild); // throws an error
//     return function grandChild() {
//       let name = "grandChild";
//       let grandChild = "grandChild";
//       console.log("name", name);
//       console.log("outer", outer);
//       console.log("child", child);
//       console.log("grandChild", grandChild);
//     }
//   }
// }

// outerFunction()()();

// -------------------------------------------

// ✅ Defining Variables

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
1. Declare a variable called `currentSong` that will hold the current song.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// CODE HERE

// ✅ Defining Functions

/* 
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
2. Create a function called `formatDuration` that will take a number of seconds as an argument and return a string containing minutes and seconds.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// CODE HERE

// uncomment the below to test it out
// formatDuration(216) // should return '3:36'


/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
3. Create a function called `formattedDurationToSeconds` that will take a string describing the duration of a song as an argument and return the number of seconds that string duration represents.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 

// CODE HERE

// uncomment the below to test it out
// formattedDurationToSeconds('3:36') // should return 216

🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/


/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
4. Create a function called `playSong` that will take a song as an argument and set `currentSong` to the argument passed.
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 

// CODE HERE

🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

console.log("------------------------");
console.log("⬇️ Activities ⬇️");
console.log("🚨 Comment Out Lecture Code Above Before Starting 🚨");
console.log("📌 Follow instructions in the EXERCISE.md file")
console.log("💡 Use console.log() To Check Answers 💡");
console.log("------------------------");

// 🚧 Activity Step 1: 
// Declare a function called `reward` that takes 0 parameters and logs 
// the following to the console:
// Congratulations! For dinner tonight, you'll be feasting on: {insert your favorite food here}

// CODE HERE


// 🚧 Activity Step 2: Utilizing Callbacks with `setTimeout`

// Declare a function called `delayedGratification` that takes 2 parameters
// 1. A `reward` function that will be called after the delay
// 2. a `delay` number representing the number of milliseconds we'll have to wait before we see our reward
// The `delayedGratification` function should invoke the `reward` function after `delay` milliseconds have passed.

function reward() {
	console.log(`For dinner tonight, you'll be feasting on macarooni`);
}

function delayedGratification(reward, delay) {
	setTimeout(reward, delay);
}

console.log(delayedGratification(reward, 3000));

// When you uncomment the code above, you should see your reward message appear in the browser console after 3 seconds have elapsed.