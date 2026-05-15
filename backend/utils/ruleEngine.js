const checkRules = (expense, total_Monthly_spend, budget) => {
    let alert =[];

    if (expense.category === "Food" && expense.amount > 5000) {
        alert.push("High Food Expenses!");
    }
    if (total_Monthly_spend > budget) {
        alert.push("Budget Exceeded!");
    }

    return alert;
};

module.exports = checkRules;