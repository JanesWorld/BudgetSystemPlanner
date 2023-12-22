export const categorizeExpenses = (expenses, income) => {
  const categoryMapping = {
    necessities: ["rent", "bills", "groceries", "transportation"],
    financialFreedom: ["debt", "investments"],
    longTermSavings: ["savings"],
    education: ["education"],
    play: ["entertainment", "social", "hobbies"],
    give: ["charity"],
  };

  const categorisedExpenses = {
    necessities: 0,
    financialFreedom: 0,
    longTermSavings: 0,
    education: 0,
    play: 0,
    give: 0,
  };

  Object.keys(expenses).forEach((expenseName) => {
    for (const [category, items] of Object.entries(categoryMapping)) {
      if (items.includes(expenseName.toLowerCase())) {
        categorisedExpenses[category] += parseFloat(expenses[expenseName]);
      }
    }
  });

  const percentages = {};
  Object.keys(categorisedExpenses).forEach((category) => {
    percentages[category] = (
      (categorisedExpenses[category] / income) *
      100
    ).toFixed(2);
  });
  return percentages;
};
