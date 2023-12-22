export const getBudgetAdvice = (category, delta) => {
  const isOverBudget = delta < 0;
  const isUnderBudget = delta > 0;

  if (isOverBudget) {
    switch (category) {
      case "Necessities":
        return "Consider reviewing your essential expenses.";
      case "Play":
        return "Why not try to find a cheaper alternative for your entertainment?";
      case "Education":
        return "Consider reviewing your education expenses.";
      case "LongTermSavings":
        return "Ensure your debt are paid off before saving.";
      case "Give":
        return "Consider reviewing your giving expenses.";
      case "FinancialFreedom":
        return "Consider reviewing your financial freedom expenses.";
      default:
        return "You are over your budget. Consider adjusting your expenses.";
    }
  } else if (isUnderBudget) {
    switch (category) {
      case "Necessities":
        return "Amazing! Maintain your essential expenses.";
      case "Play":
        return "Life is for living, make sure you enjoy it!";
      case "Education":
        return "Investing in yourself is always a good idea.";
      case "LongTermSavings":
        return "Try to reach the minimum of 10% of your income in savings.";
      case "Give":
        return "Have you considered a one off donation to a cause you care about? Or maybe treat a family member or friend to a coffee";
      case "FinancialFreedom":
        return "You have some room to invest more in your financial freedom.";

      default:
        return "You are under your budget. Great job!";
    }
  } else {
    return "You are exactly on budget. Well done maintaining your finances!";
  }
};
