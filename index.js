const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generatedHtml = require("./generatedHtml");

const questions = [
	{
		type: "input",
		message: "what is your gitHub username?",
		name: "username"
	},
	{
		type: "list",
		message: "what is your favored color?",
		name: "color",
		choices: ["green", "blue", "pink", "red"]
	}
];

function init() {
	inquirer
		.prompt(questions)
		.then(answers => {
			// const htmlText = htmlHelper.generateHtml(answers);
			console.log(answers);
			axios.get("https://api.github.com");
		})
		.then(res => {
			console.log(res.data);
		});
}

function writeToFile(fileName, data) {
	// the return is an object and we need to JSON.stringify it to work with it.
	fs.writeFile("./answers.json", JSON.stringify(res), err => {
		if (err) {
			console.log(err);
		} else {
			console.log("Write file completed!");
		}
	});
}

init();
