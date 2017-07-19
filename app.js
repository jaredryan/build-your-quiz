// // Things that need to be done.

// First, hide everything.
// Upon click of started button...
// 	1. Unhide form.
// 	2. Hide started button
// Populate the screen with the correct values:
// 	1. What question we are on
// 	2. Current score
// 	3. Question
// 	4. Answers
// Upon hitting the next button:
// 	1. Give out the correct answer
// 	2. Repopulate the screen.

// // Later
// On the last question, make the options different:
// 	1. Display the final score
// 	2. Maybe some stupid paragraph instead of the question.
// 	3. A restart button


// State
var state = {
	started : true,
	inProgress : false,
	question: null,
	finished : false, 
	current : 0, 
	correct : 0,
	random : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	MAX : 10 
};

// Modifiers
function toggleStarted(state) {
	if (state.started === true) {
		$(".js-start").addClass("hidden");
		state.started = false;
	} else {
		$(".js-start").removeClass("hidden");
		state.started = true;
	}
}

function toggleInProgress(state) {
	if (state.inProgress === true) {
		$(".js-in-progress").addClass("hidden");
		state.inProgress = false;
	} else {
		$(".js-in-progress").removeClass("hidden");
		state.inProgress = true;
	}
}

function restart(state) {
	state = {
		started : true,
		inProgress : false,
		question : null,
		finished : false, 
		current : 0, 
		correct : 0,
		random : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		MAX : 10 
	};
}

function insertNextQuestion(state, questions) {
	state.current += 1;
	var randomIndex = Math.floor(Math.random() * state.random.length)
	var randomQuestion = state.random[randomIndex];
	state.question = questions[randomQuestion];
	state.random.splice(randomIndex, 1);
}

function correctAnswer(state) {
	state.correct += 1;
}

// function showAnswer(state) {

// }





// Render
function renderProgress(state) {
	// Change the text
	var totalScore = "Question " + state.current + " out of " + state.MAX;
	var numQuestionsAnswered = state.current - 1;
	var currentScore = "Current Score: " + state.correct + " out of " + 
						numQuestionsAnswered;
	$(".js-total-progress-display").text(totalScore);
	$(".js-current-score-display").text(currentScore);
	// Change the bars
	$(".js-total-progress").attr("value", state.current);
	$(".js-total-progress").attr("max", state.MAX);
	$(".js-current-score").attr("value", state.correct);
	$(".js-current-score").attr("max", numQuestionsAnswered);
}

function renderQuestion(state) {
	// Choose the question and answers
	$(".js-question").text(state.question.question);
	var randomArray = [];
	var length = state.question.answers.length;
	for (var i = 0; i < length; i++) {
		var randomAnswer = state.question.answers[Math.floor(Math.random() * length)];
		randomArray.push(randomAnswer);
	}
	$(".js-ans-0").text(randomArray[0]);
	$(".js-ans-1").text(randomArray[1]);
	$(".js-ans-2").text(randomArray[2]);
	$(".js-ans-3").text(randomArray[3]);
	$(".js-ans-4").text(randomArray[4]);
}





// Event Listeners
function handleStart(state, questions) {
	$(".js-start-button").click(function(event) {
		toggleStarted(state);
		toggleInProgress(state);
		insertNextQuestion(state, questions);
		renderProgress(state);
		renderQuestion(state);
	});
}

function handleNext(state, questions) {
	$(".js-in-progress").submit(function(event) {
		event.preventDefault();
		// DO SOMETHING TO DETECT THE CORRECT ANSWER
		// DO SOMETHING DIFFERENT FOR THE FINAL RESULTS SCREEN
		insertNextQuestion(state, questions);
		renderProgress(state);
		renderQuestion(state);
	});
}





$(function() {
	// Create question objects.
	var q1 = {
		question : "Which tennis player holds the most grand slam titles?",
		answer : "Margaret Court",
		answers : ["Margaret Court", "Roger Federer", "Serena Williams", "Steffi Graf", "Pete Sampras"]
	};
	var q2 = {
		question : "Of the following notable players, which player’s forehand has the most RPMs?",
		answer : "Rafael Nadal",
		answers : ["Rafael Nadal", "Roger Federer", "Novak Djokovic", "Juan Martin Del Potro", "Andy Murray"]
	};
	var q3 = {
		question : "Which player has the largest gap between first grand slam won and last grand slam won?",
		answer : "Ken Rosewall",
		answers : ["Ken Rosewall", "Roger Federer", "Serena Williams", "Boris Becker", "Helen Wills"]
	};
	var q4 = {
		question : "Who is considered the greatest tennis player of all time, according the program 100 Greatest of All Time, which aired on the Tennis Channel? (It is a male player.)",
		answer : "Roger Federer",
		answers : ["Roger Federer", "Rod Laver", "Pete Sampras", "Rafael Nadal", "Bjorn Borg"]
	};
	var q5 = {
		question : "Who is considered the greatest women’s tennis player of all time (and 3rd overall, according to the same program)?",
		answer : "Steffi Graf",
		answers : ["Steffi Graf", "Serena Williams", "Martina Navratilova", "Margaret Court", "Chris Evert"]
	};
	var q6 = {
		question : "Of men’s tennis players who have been in 10 or more grand slam finals, who has the highest winning percentage in the final?",
		answer : "Pete Sampras",
		answers : ["Pete Sampras", "Roger Federer", "Rafael Nadal", "Bjorn Borg", "John McEnroe"]
	};
	var q7 = {
		question : "In both men’s and women’s tennis, the player with the most combined titles (singles, doubles, and mixed doubles) are from the same country. What country is it?",
		answer : "Australia",
		answers : ["Australia", "America", "Switzerland", "France", "Germany"]
	};
	var q8 = {
		question : "Which player(s) has the most doubles grand slam titles?",
		answer : "Martina Navratilova",
		answers : ["Martina Navratilova", "John Newcombe", "Margaret Osborne duPont", "Pam Shriver", "Bob and Mike Bryan"]
	};
	var q9 = {
		question : "Which player has the most mixed doubles grand slam titles?",
		answer : "Margaret Court",
		answers : ["Margaret Court", "Ken Fletcher", "Owen Davidson", "Doris Hart", "Billie Jean King"]
	};
	var q10 = {
		question : "Who has the fastest recorded serve? (including Challenger Tournaments)",
		answer : "Sam Groth",
		answers : ["Sam Groth", "Andy Roddick", "Ivo Karlovic", "Milos Raonic", "John Isner"]
	};
	// Create question array
	var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
	// Handle clicks and stuff
	handleStart(state, questions);
	handleNext(state, questions);
	
	
});
