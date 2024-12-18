const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 100 + 1 );
  let luck = '';
  if (num >= 1 && num <= 10) {
    luck = '大吉';
} else if (num >= 11 && num <= 30) {
    luck = '吉';
} else if (num >= 31 && num <= 50) {
    luck = '中吉';
} else if (num >= 51 && num <= 70) {
    luck = '小吉';
} else if (num >= 71 && num <= 90) {
    luck = '末吉';
} else if (num >= 91 && num <= 100) {
    luck = '凶';
}

  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;

  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }

  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});

app.get("/weather", (req, res) => {
  const city = req.query.city;
  const weatherData = {
    "Tokyo": "晴れ",
    "Osaka": "曇り",
    "Kyoto": "雨",
    "Nagoya": "雪",

  };
  const weather = weatherData[city] || "不明な天気";
  res.render("weather", { city: city, weather: weather });
});


app.get("/dice", (req, res) => {
  const rolls = parseInt(req.query.rolls) || 1;
  const results = [];

  for (let i = 0; i < rolls; i++) {
    results.push(Math.floor(Math.random() * 6) + 1);
  }

  const sum = results.reduce((acc, val) => acc + val, 0);
  const average = sum / rolls;

  res.render("dice", { rolls, results, average });
});

app.get("/gamble", (req, res) => {
  const rolls = parseInt(req.query.rolls) || 1;
  const guess = req.query.guess;
  const results = [];

  for (let i = 0; i < rolls; i++) {
    results.push(Math.floor(Math.random() * 6) + 1);
  }//いつか二人以上でできるようにしてしっかりギャンブルできるようにする(◜◡◝)(◜◡◝)
  const sum = results.reduce((acc, val) => acc + val, 0);
  const outcome = sum % 2 === 0 ? "丁" : "半";
  const judgement = guess === outcome ? "当たり！" : "ハズレ";

  res.render("gamble", { rolls, results, sum, outcome, guess, judgement });
});





app.get("/gacha", (req, res) => {
  const drawGacha = () => {
    const num = Math.floor(Math.random() * 1000 + 1);
    let gacha = '';
    if (num >= 1 && num <= 6) {
      gacha = '星5';//星5だけ色を変えたかったがわからなくて断念
    } else if (num >= 7 && num <= 106) {
      gacha = '星4';
    } else {
      gacha = '星3';
    }
    return { number: num, gacha: gacha };
  };
  const pulls = parseInt(req.query.pulls) || 1; 
  const results = [];


  for (let i = 0; i < pulls; i++) {
    results.push(drawGacha());
  }

  res.render("gacha", { pulls, results });
});






app.listen(8080, () => console.log("Example app listening on port 8080!"));
