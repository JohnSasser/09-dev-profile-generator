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

function init() {
	// data obj holds value returns form axios.
	const data = {};

	inquirer.prompt(questions).then(answers => {
		// define api url's in var;
		let gitUsers = `https://api.github.com/users/${answers.username}`;
		let gitStars = `https://api.github.com/users/${answers.username}/starred`;
		// give url vars' an axios.get request call;
		const requestGitUsers = axios.get(gitUsers);
		const requestGitStars = axios.get(gitStars);

		data.color = answers.color.toLowerCase();
		data.username = answers.username;

		return axios
			.all([requestGitUsers])
			.then(() => {
				// request both calls simultaneously;
				return axios.all([requestGitUsers, requestGitStars]).then(
					axios.spread((...res) => {
						const responseGitUsers = res[0];
						const responseGitStars = res[1];

						// res from res[0];
						data.profileImg = responseGitUsers.data.avatar_url;
						data.hireable = responseGitUsers.data.hireable;

						data.location = responseGitUsers.data.location;
						data.profile = responseGitUsers.data.html_url;
						data.blog = responseGitUsers.data.blog;

						data.username = responseGitUsers.data.name;
						data.userBio = responseGitUsers.data.bio;

						data.repos = responseGitUsers.data.public_repos;
						data.followers = responseGitUsers.data.followers;
						data.following = responseGitUsers.data.following;

						// res from res[1];
						data.stars = responseGitStars.data.length;
						// console.log(data);

						// send generatedHtml.js the data obj values.
						const html = generatedHtml.generatedHTML(data);

						// createHtml(html);
						createPdf(html);
					})
				);
			})
			.catch(error => {
				throw error;
			});
	});
}
// using html-pdf to create the new .pdf file;
function createPdf(html) {
	const pdfOptions = { format: "Letter", orientation: "portrait" };
	pdf.create(html, pdfOptions).toFile("./profile.pdf", function(err, res) {
		if (err) return console.log(err);
		console.log(res);
	});
	console.log(".PDF CREATED!");
}

// function createHtml(html) {
// 	fs.writeFile("index.html", html, "utf8", err => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Write file completed!");
// 		}
// 	});
// }

init();
