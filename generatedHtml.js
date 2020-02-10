const colors = {
	green: {
		wrapperBackground: "#E6E1C3",
		headerBackground: "#C1C72C",
		headerColor: "black",
		photoBorderColor: "black"
	},
	blue: {
		wrapperBackground: "#5F64D3",
		headerBackground: "#26175A",
		headerColor: "white",
		photoBorderColor: "#73448C"
	},
	pink: {
		wrapperBackground: "#879CDF",
		headerBackground: "#FF8374",
		headerColor: "white",
		photoBorderColor: "#FEE24C"
	},
	red: {
		wrapperBackground: "#DE9967",
		headerBackground: "#870603",
		headerColor: "white",
		photoBorderColor: "white"
	}
};

function generatedHTML(data) {
	return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">

      <title>GitHub Profile Aggregator</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }

         html, body {
         padding: 0;
         margin: 0;
         }

         html, body, .wrapper {
         height: 100%;
         }

         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }

         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }

         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }

         h1 {
         font-size: 3em;
         } 
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }

         
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: block;
         text-align: center;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }

         .photo-header img {
         margin: 0 auto;
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }

         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }

         .photo-header h1 {
         margin-top: 10px;
         }

         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }

         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }

         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }

         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           margin: 0 auto;
           text-align: center;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           position: relative;
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         text-align: center;
         }

         .left {
           float: left;
         }

         .stamp-left {
           position: relative;
           display: inline-block;
           margin: 0 auto;
           width: 40%;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }

      </style>
      <body> 
        <div class='wrapper'>

          <div class="photo-header img">
            <img class="img" src='${data.profileImg}' alt='Profile Photo'>

              <h1>Howdy,</h1>
                 <br>
              <h2>My name is ${data.username}!</h2>
              <h4 class="col">Am I currently hireable, you ask? ${
								data.hireable
							};</h4>
         
              <br>
              <br>

            <div class="nav links-nav">
              <a class="nav-link btn-social-icon btn-twitter" href="https://www.google.com/maps/place/${
								data.location
							}" ${data.location}><i class="fas fa-map-marker-alt"></i></a>

              <a class="nav-link btn-social-icon btn-twitter" href="${
								data.profile
							}"><i class="fab fa-github fa-lg"></i></a>

              <a class="nav-link" href="${
								data.blog
							}"><i class="fas fa-blog"></i></a>
        
            </div>
          </div>

          <div class="container">
            <div class="row">
              <h5 class="col">
                ${data.userBio}
              </h5>
            </div>

            <div class="row left">

              <div class="card col">
                <h4>
                  Public Repos: ${data.repos}
                </h4>
              </div>
              <div class="card col">
                <h4>
                  GitHub Stars: ${data.stars}
                </h4>
                </div>

            </div>

            <div class="row left">

              <div class="card col">
                <h4>
                  Following: ${data.following}
                </h4>
              </div>
              <div class="card col">
                <h4>
                  Followers: ${data.followers}
                </h4>
              </div>

            </div>

        </div>

      </div>
      <script src="https://kit.fontawesome.com/5f4b0fb1a5.js" crossorigin="anonymous"></script>
      </body>`;
}
// export generateHtml.js to be required in the index.js
module.exports = {
	generatedHTML: generatedHTML
};
