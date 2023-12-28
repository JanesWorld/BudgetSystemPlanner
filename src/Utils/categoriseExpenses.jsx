export const categorizeExpenses = (expenses, budgetMethod) => {
  if (!expenses) {
    return {};
  }

  let categoryMapping;
  if (budgetMethod === "503020") {
    categoryMapping = {
      Needs: ["rent", "bills", "groceries", "transportation"],
      Wants: ["entertainment", "social", "hobbies"],
      Savings: ["savings", "investments", "education", "charity"],
    };
  } else {
    categoryMapping = {
      Necessities: ["rent", "bills", "groceries", "transportation"],
      FinancialFreedom: ["investments"],
      LongTermSavings: ["savings"],
      Education: ["education"],
      Play: ["entertainment", "social", "hobbies"],
      Give: ["charity"],
    };
  }

  let categorizedExpenses = {};
  for (const category in categoryMapping) {
    categorizedExpenses[category] = 0;
  }

  for (const [key, value] of Object.entries(expenses)) {
    for (const [category, items] of Object.entries(categoryMapping)) {
      if (items.includes(key)) {
        const numericValue = parseFloat(value) || 0;
        categorizedExpenses[category] += numericValue;
      }
    }
  }

  return categorizedExpenses;
};
