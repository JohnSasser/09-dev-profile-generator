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
	// data obj is where we are going to push the inquirer `answers`
	// & axios `res.data` so we can push a single object to generatedHtml to return the completed html doc;
	const data = {};
	// let gitUsers = `https://api.github.com/users/${answers.username}`;
	// let gitStars = `https://api.github.com/users/${login}/reops`;
	inquirer
		.prompt(questions)
		.then(answers => {
			data.color = answers.color.toLowerCase();
			data.username = answers.username;

			return axios.get(`https://api.github.com/users/${answers.username}`);
		})
		.then(res => {
			console.log(res.data);
			// login to be used for second axios call for the github stars;
			const login = res.data.login;
			// pushing `res` key values to the obj data{};
			data.profileImg = res.data.avatar_url;
			data.location = res.data.location;
			data.profile = res.data.html_url;
			data.blog = res.data.blog;
			data.username = res.data.name;
			data.userBio = res.data.bio;
			data.repos = res.data.public_repos;
			data.followers = res.data.followers;
			data.following = res.data.following;
			console.log(data);

			return axios
				.get(`https://api.github.com/users/${login}/starred`)
				.then(res => {
					console.log(res.data);
				});
		})
		.catch(err => {
			throw err;
		});
}

init();
