let deck = [];
let player = [];
let dealer = [];
let gameOver = false;

function newGame() {
  deck = createDeck();
  shuffle(deck);
  player = [draw(), draw()];
  dealer = [draw(), draw()];
  gameOver = false;
  document.getElementById("message").textContent = "";
  render();
}

function createDeck() {
  const suits = ["♠","♥","♦","♣"];
  const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  let d = [];
  for (let s of suits)
    for (let v of values)
      d.push({v,s});
  return d;
}

function shuffle(d) {
  for (let i = d.length-1; i>0; i--) {
    let j = Math.floor(Math.random()*(i+1));
    [d[i], d[j]] = [d[j], d[i]];
  }
}

function draw() { return deck.pop(); }

function value(hand) {
  let sum = 0, aces = 0;
  for (let c of hand) {
    if (c.v === "A") { sum += 11; aces++; }
    else if (["K","Q","J"].includes(c.v)) sum += 10;
    else sum += parseInt(c.v);
  }
  while (sum > 21 && aces) { sum -= 10; aces--; }
  return sum;
}

function hit() {
  if (gameOver) return;
  player.push(draw());
  if (value(player) > 21) endGame();
  render();
}

function stand() {
  if (gameOver) return;
  while (value(dealer) < 17) dealer.push(draw());
  endGame();
}

function endGame() {
  gameOver = true;
  let p = value(player), d = value(dealer);
  let msg = "";
  if (p > 21) msg = "Перебор!";
  else if (d > 21) msg = "Дилер перебрал! Победа!";
  else if (p > d) msg = "Ты выиграл!";
  else if (p < d) msg = "Ты проиграл.";
  else msg = "Ничья.";
  document.getElementById("message").textContent = msg;
  render();
}

function render() {
  document.getElementById("playerCards").textContent =
    player.map(c=>c.v+c.s).join(" ");
  document.getElementById("dealerCards").textContent =
    gameOver ? dealer.map(c=>c.v+c.s).join(" ") : dealer[0].v+dealer[0].s+" ?";
  document.getElementById("playerSum").textContent = value(player);
  document.getElementById("dealerSum").textContent =
    gameOver ? value(dealer) : "?";
}

newGame();
