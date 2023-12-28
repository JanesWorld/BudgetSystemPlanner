export const getBudgetAdvice = (category, userExpense, systemBudget) => {
  const isOverBudget = userExpense > systemBudget;
  const isUnderBudget = userExpense < systemBudget;
  const noExpensesEntered = userExpense === 0;

  if (noExpensesEntered) {
    return "It looks like you haven't entered any expenses. Please review your expense entries to get accurate budget advice.";
  }

  const positiveCategories = [
    "LongTermSavings",
    "Education",
    "FinancialFreedom",
  ];

  if (isOverBudget) {
    switch (category) {
      case "Necessities":
        return "Consider reviewing your essential expenses.";
      case "Play":
        return "Why not try to find a cheaper alternative for your entertainment? Hiking, maybe?";
      case "Education":
        return "Consider reviewing your education expenses. If this is a one off, you can ignore this message.";
      case "LongTermSavings":
        return "Ensure your debts are paid off before saving. Otherwise, well done on your savings!";
      case "Give":
        return "Consider reviewing your giving expenses.";
      case "FinancialFreedom":
        return "Consider reviewing your financial freedom expenses.";
      default:
        return "You are over your budget. Consider adjusting your expenses.";
    }
  } else if (isUnderBudget) {
    if (positiveCategories.includes(category) && noExpensesEntered) {
      return "No expenses entered. Is this a mistake? If so, please go back and enter some expenses.";
    }
    switch (category) {
      case "Necessities":
        return "Amazing! Maintain your essential expenses.";
      case "Play":
        return "Life is for living, make sure you enjoy it!";
      case "Education":
        return "Consider increasing your investment in education. This can mean upskilling, getting certified, or learning a new skill. All could lead to a higher income later on.";
      case "LongTermSavings":
        return "Consider increasing your savings to at least 10% of your income.";
      case "Give":
        return "Have you considered a one-off donation to a cause you care about? Or maybe treat a family member or friend to a coffee";
      case "FinancialFreedom":
        return "You have some room to invest more in your financial freedom.";
      default:
        return "You are under your budget. Great job!";
    }
  } else {
    return "You are exactly on budget. Well done maintaining your finances!";
  }
};
