import express from "express";
import generator from 'generate-password';
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    var error = false;

    let lengthVal = 10;
    (req.body["length"]) ? lengthVal = req.body["length"] : lengthVal = 10;

    let numbersVal = true;
    (req.body["numbers"]) ? numbersVal = true : numbersVal = false;

    let symbolsVal = false;
    (req.body["symbols"]) ? symbolsVal = true : symbolsVal = false;

    let lowercaseVal = true;
    (req.body["lowercase"]) ? lowercaseVal = true : lowercaseVal = false;
 
    let uppercaseVal = true;
    (req.body["uppercase"]) ? uppercaseVal = true : uppercaseVal = false;

    if(numbersVal == false && symbolsVal == false && lowercaseVal == false && uppercaseVal == false){
        error = true;

    }else{
        var password = generator.generate({
            length: lengthVal,
            numbers: numbersVal,
            symbols: symbolsVal,
            lowercase: lowercaseVal,
            uppercase: uppercaseVal
        });
    }

  res.render("index.ejs", { 
    generated_password: password, 
    password_error: error 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

