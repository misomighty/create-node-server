const express = require("express");
const hbs = require("hbs");
// process.env is an object that stores all of our environment key value pairs
// the port is set by heroku
const port = process.env.PORT || 3000;
let app = express();

app.use( (req, res, next) => {
    res.render("maintenance.hbs");
});
// a function whose return value becomes available to all hbs templates
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
// you can also create helpers that take arguments, then pass in those arguments on the hbs template itself
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});
// switches on support for partials, which are in /views/partials dir by default
hbs.registerPartials(__dirname + "/views/partials");
// views/ is the default directory that expresses uses for templates

// app.set allows us to set some express specific configurations
// in this case we're changing out view engine to hbs
app.set("view engine", "hbs");

// express.static allows the user to set the default package for templates (??)
// app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("home.hbs", {
        welcomeMsg: "Welcome to my first Express page!",
        pageTitle: "Homepage"
    });
});
app.get("/about", (req, res) => {
    // res.render() let's you render a page with your current view engine
    res.render("about.hbs", {
        // render's 2nd argument sends params to the page for dynamic content
        pageTitle: 'About Us',
    });
});

app.get("/bad", (req, res) => {
    res.send({
        error: "BAD REQUEST"
    });
});



app.listen(port, () => {
    console.log(`Server is now running on ${port}`);
});