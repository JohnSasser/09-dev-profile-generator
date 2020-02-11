// require fs to write file;
const fs = require("fs");
// require axios to make the api call;
const axios = require("axios");
// require html-pdf to convert generatedHTML function directly to pdf format;
const pdf = require("html-pdf");
// require inquirer to prompt the command line user;
const inquirer = require("inquirer");
// require the generatedHtml.js file for the html;
const generatedHtml = require("./generatedHtml");
// data obj that will hold return values from API calls.
const data = {};

// command line input questions called in the prompt.
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

inquirer
	.prompt(questions)
	// AXIOS request exists in the answers callback;
	.then(async answers => {
		let gitUsers = `https://api.github.com/users/${answers.username}`;
		let gitStars = `https://api.github.com/users/${answers.username}/starred`;

		// Await the response from the axios calls before continuing to read code inside code block;
		const responseGitUsers = await axios.get(gitUsers);
		const responseGitStars = await axios.get(gitStars);
		// user input for color & username;
		data.color = answers.color.toLowerCase();
		// * gitUsers responses;

		// profile picture.
		data.profileImg = responseGitUsers.data.avatar_url;
		// hireable boolean.
		data.hireable = responseGitUsers.data.hireable;
		// current location.
		data.location = responseGitUsers.data.location;
		// profile url.
		data.profile = responseGitUsers.data.html_url;
		// blog link.
		data.blog = responseGitUsers.data.blog;
		// bio in profile.
		data.userBio = responseGitUsers.data.bio;
		// # of public repositories.
		data.repos = responseGitUsers.data.public_repos;
		// # of followers.
		data.followers = responseGitUsers.data.followers;
		// # of following.
		data.following = responseGitUsers.data.following;
		// * gitStars response;

		// # of stared repos from page.
		data.stars = responseGitStars.data.length;

		const html = generatedHtml.generatedHTML(data);
		createHtml(html);
		console.log(data);
	})
	.catch(err => {
		throw err;
	});

function createHtml(html) {
	const pdfOption = { format: "Letter", orientation: "portrait" };
	pdf.create(html, pdfOption).toFile("./pdf/gitProfile.pdf", (err, res) => {
		if (err) return console.log(err);
	});
	console.log(".pdf created successfully!");
}
