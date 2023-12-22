export const categorizeExpenses = (expenses) => {
  if (!expenses) {
    return {};
  }

  const categoryMapping = {
    necessities: ["rent", "bills", "groceries", "transportation"],
    financialFreedom: ["debt", "investments"],
    longTermSavings: ["savings"],
    education: ["education"],
    play: ["entertainment", "social", "hobbies"],
    give: ["charity"],
  };

  const categorizedExpenses = {
    necessities: 0,
    financialFreedom: 0,
    longTermSavings: 0,
    education: 0,
    play: 0,
    give: 0,
  };

  Object.entries(expenses).forEach(([key, value]) => {
    Object.entries(categoryMapping).forEach(([category, items]) => {
      if (items.includes(key)) {
        const numericValue = parseFloat(value) || 0;
        categorizedExpenses[category] += numericValue;
        console.log(`Adding ${numericValue} to ${category} for ${key}`);
      }
    });
  });

  console.log("Categorized Expenses:", categorizedExpenses);
  return categorizedExpenses;
};
