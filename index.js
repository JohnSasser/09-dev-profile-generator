const fs = require("fs");
const axios = require("axios");
// const input = process.argv[2];
// const color = process.argv[3];
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

	inquirer
		.prompt(questions)
		.then(answers => {
			let gitUsers = `https://api.github.com/users/${answers.username}`;
			let gitStars = `https://api.github.com/users/${answers.username}/starred`;

			const requestGitUsers = axios.get(gitUsers);
			const requestGitStars = axios.get(gitStars);

			data.color = answers.color.toLowerCase();
			data.username = answers.username;

			return axios.all([requestGitUsers, requestGitStars]).then(
				axios.spread((...res) => {
					const responseGitUsers = res[0];
					const responseGitStars = res[1];

					// res from res[0]
					data.profileImg = responseGitUsers.data.avatar_url;
					data.location = responseGitUsers.data.location;
					data.profile = responseGitUsers.data.html_url;
					data.blog = responseGitUsers.data.blog;
					data.username = responseGitUsers.data.name;
					data.userBio = responseGitUsers.data.bio;
					data.repos = responseGitUsers.data.public_repos;
					data.followers = responseGitUsers.data.followers;
					data.following = responseGitUsers.data.following;
					// res from res[1]
					console.log(responseGitStars.data.length);
					data.stars = responseGitStars.data.length;

					// calling the html function from generatedHtml.js,
					// putting the data obj into the html,
					// needs the template literal keys in html to know where to go;
					const html = generatedHtml(data);
					console.log(html);
				})
			);
		})
		.catch(error => {
			throw error;
		});
}

init();

function writeToFile(fileName, data) {
	// the return is an object and we need to JSON.stringify it to work with it.
	fs.writeFile("index.html", data, "utf8", (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Write file completed!");
		}
	});
}

init();
