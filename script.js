const denominations = [
  { inputId: "pen", centsValue: 1, currentCellId: "pen-current", depositCellId: "pen-deposit", EODCellId: "pen-drawer"},
  { inputId: "nick", centsValue: 5, currentCellId: "nick-current", depositCellId: "nick-deposit", EODCellId: "nick-drawer" },
  { inputId: "dime", centsValue: 10, currentCellId: "dime-current", depositCellId: "dime-deposit", EODCellId: "dime-drawer" },
  { inputId: "quart", centsValue: 25, currentCellId: "quart-current", depositCellId: "quart-deposit", EODCellId: "quart-drawer" },
  { inputId: "one", centsValue: 100, currentCellId: "one-current", depositCellId: "one-deposit", EODCellId: "one-drawer" },
  { inputId: "five", centsValue: 500, currentCellId: "five-current", depositCellId: "five-deposit", EODCellId: "five-drawer" },
  { inputId: "ten", centsValue: 1000, currentCellId: "ten-current", depositCellId: "ten-deposit", EODCellId: "ten-drawer" },
  { inputId: "twenty", centsValue: 2000, currentCellId: "twenty-current", depositCellId: "twenty-deposit", EODCellId: "twenty-drawer" },
  { inputId: "fifty", centsValue: 5000, currentCellId: "fifty-current", depositCellId: "fifty-deposit", EODCellId: "fifty-drawer" },
  { inputId: "hundred", centsValue: 10000, currentCellId: "hundred-current", depositCellId: "hundred-deposit", EODCellId: "hundred-drawer" }
];

function compute() {
  let drawerTotal = 10000;
  denominations.forEach(function(item) {
    const count = Number(document.getElementById(item.inputId).value) || 0;
    document.getElementById(item.currentCellId).textContent = count;
    drawerTotal += count * item.centsValue;
  }) 
  const deposit = depositSummary(drawerTotal);
  depositBreakdown(deposit);
  drawerBreakdown();
  document.getElementById("Summary-panel").classList.remove('hidden');
  document.getElementById("Breakdown-panel").classList.remove('hidden');
}

function depositSummary(drawerTotal) {
  let drawerTotalDollars = drawerTotal / 100;
  document.getElementById("drawerTotal").textContent = `$ ${drawerTotalDollars.toFixed(2)}`
  let truncDrawerTotalDollars = Math.floor(drawerTotalDollars / 10) * 10;
  let deposit = truncDrawerTotalDollars - 400;
  document.getElementById("depositAmount").textContent = `$ ${deposit.toFixed(2)}`;
  let inDrawer = drawerTotalDollars - deposit;
  document.getElementById("leftInDrawer").textContent = `$ ${inDrawer.toFixed(2)}`;
  let expected = Number(document.getElementById("exp").value);
  document.getElementById("expectedSum").textContent = `$ ${expected.toFixed(2)}`;
  let drawerDiff = drawerTotalDollars - expected;
  document.getElementById("drawerDiff").textContent = drawerDiff.toFixed(2);
  return deposit;
}

function depositBreakdown(remaining) {
  let hundredDepoCount = 0, fiftyDepoCount = 0, twentyDepoCount = 0, tenDepoCount = 0;
  let hundreds = Number(document.getElementById("hundred").value);
  while (remaining >= 100 && hundreds > 0)  {
    remaining -= 100;
    hundreds -= 1;
    hundredDepoCount += 1;
  }

  let fifties = Number(document.getElementById("fifty").value);
  while (remaining >= 50 && fifties > 0) {
    remaining -= 50;
    fifties -= 1;
    fiftyDepoCount += 1;
  }

  let twenties = Number(document.getElementById("twenty").value);
  while (remaining >= 20 && twenties > 0) {
    remaining -= 20;
    twenties -= 1;
    twentyDepoCount += 1;
  }

  let tens = Number(document.getElementById("ten").value);
  while (remaining >= 10 && tens > 0) {
    remaining -= 10;
    tens -= 1;
    tenDepoCount += 1;
  }
  document.getElementById("hundred-deposit").textContent = hundredDepoCount;
  document.getElementById("fifty-deposit").textContent = fiftyDepoCount;
  document.getElementById("twenty-deposit").textContent = twentyDepoCount;
  document.getElementById("ten-deposit").textContent = tenDepoCount;
  document.getElementById("five-deposit").textContent = 0;
  document.getElementById("one-deposit").textContent = 0;
  document.getElementById("quart-deposit").textContent = 0;
  document.getElementById("dime-deposit").textContent = 0;
  document.getElementById("nick-deposit").textContent = 0;
  document.getElementById("pen-deposit").textContent = 0;
}

function drawerBreakdown () {
    denominations.forEach(function(item) {
    const count = Number(document.getElementById(item.inputId).value) || 0;
    let drawerCount = count - Number(document.getElementById(item.depositCellId).textContent);
    document.getElementById(item.EODCellId).textContent = drawerCount;
  }) 
}

function EODView() {
  document.getElementById("Summary-panel").classList.remove('hidden');
  document.getElementById("Breakdown-panel").classList.remove('hidden');
  document.getElementById("form").classList.add('hidden');
}

function clearInputs() {
  denominations.forEach(function(item) {
    document.getElementById(item.inputId).value = "";
  });
  document.getElementById("exp").textContent = "";
  document.getElementById("expectedSum").textContent = "";
  document.getElementById("drawerTotal").textContent = "";
  document.getElementById("depositAmount").textContent = "";
  document.getElementById("leftInDrawer").textContent = "";
  document.getElementById("drawerDiff").textContent = "";
  document.getElementById("form").classList.remove('hidden');
  document.getElementById("Breakdown-panel").classList.add('hidden');
  document.getElementById("Summary-panel").classList.add('hidden');
}