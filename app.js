var express = require("express"),
  path = require("path"),
  app = express(),
  bodyParser = require("body-parser");
var rp = require('request-promise');

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "public")));

app.post("/signup", async function(req, res) {
  var user = req.body;

  console.log(user);

  var options = {
    method: 'POST',
    uri: 'https://api.mailerlite.com/api/v2/subscribers',
    headers: {
      'content-type': "application/json",
      'x-mailerlite-apikey': "60a10089521e030cd6d175836e8e571a"
  },
    body: {
        email: user.email,
        fields: {
          company: "Investing For Devs"
      }
    },
    json: true
};
 await rp(options);

res.send("Signed up successfully!");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/sitemap", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

var server = app.listen(PORT, HOST, function() {
  console.log("The server is running on http://localhost:" + PORT);
});
