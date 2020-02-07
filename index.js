const fs = require("fs");
const axios = require("axios");
const pdf = require("html-pdf");
const inquirer = require("inquirer");
const generatedHtml = require("./generatedHtml");

var htmlSTR = fs.readFileSync("./index.html", "utf8");
console.log(typeof htmlSTR);

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

	inquirer.prompt(questions).then(answers => {
		let gitUsers = `https://api.github.com/users/${answers.username}`;
		let gitStars = `https://api.github.com/users/${answers.username}/starred`;

		const requestGitUsers = axios.get(gitUsers);
		const requestGitStars = axios.get(gitStars);

		data.color = answers.color.toLowerCase();
		data.username = answers.username;

		return axios
			.all([requestGitUsers])
			.then(() => {
				return axios.all([requestGitUsers, requestGitStars]).then(
					axios.spread((...res) => {
						const responseGitUsers = res[0];
						const responseGitStars = res[1];

						// res from res[0]
						data.profileImg = responseGitUsers.data.avatar_url;
						data.hireable = responseGitUsers.data.hireable;
						// if (data.hireable == true) {
						// 	return "yes";
						// } else return "no";

						data.location = responseGitUsers.data.location;
						data.profile = responseGitUsers.data.html_url;
						data.blog = responseGitUsers.data.blog;

						data.username = responseGitUsers.data.name;
						data.userBio = responseGitUsers.data.bio;
						console.log(responseGitUsers.data.bio);

						data.repos = responseGitUsers.data.public_repos;
						data.followers = responseGitUsers.data.followers;
						data.following = responseGitUsers.data.following;

						// res from res[1]
						data.stars = responseGitStars.data.length;

						// responseGitStars.data.stargazers_count.forEach();

						console.log(data);

						// calling the html function from generatedHtml.js,
						// putting the data obj into the html,
						// needs the template literal keys in html to know where to go;

						const html = generatedHtml.generatedHTML(data);

						// fs.writeFile("index.html", html, "utf8", err => {
						// 	if (err) {
						// 		console.log(err);
						// 	} else {
						// 		console.log("Write file completed!");
						// 	}
						// });

						const pdfOptions = { format: "Letter", orientation: "portrait" };
						pdf
							.create(html, pdfOptions)
							.toFile("./profile.pdf", function(err, res) {
								if (err) return console.log(err);
								console.log(res); // { filename: '/app/businesscard.pdf' }
							});
					})
				);
			})
			.catch(error => {
				throw error;
			});
	});
}
init();

// not working, don't know why.  No-one knows why;

// function writeToFile(fileName, data) {
// 	// the return is an object and we need to JSON.stringify it to work with it.
// 	// const fileName = "generatedIndex.html";
// 	fs.writeFile("index.html", html, "utf8", (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("Write file completed!");
// 		}
// 	});
// }
