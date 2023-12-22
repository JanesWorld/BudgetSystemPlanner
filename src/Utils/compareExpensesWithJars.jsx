export const compareExpensesWithJars = (
  userExpenses,
  jarsAllocation,
  income
) => {
  // Check if income is a number, if not, return empty object
  if (typeof income !== "number" || isNaN(income)) {
    return {};
  }

  let comparison = {};
  for (const [category, jarsAmount] of Object.entries(jarsAllocation)) {
    const spentAmount = Number(userExpenses[category.toLowerCase()]) || 0;

    console.log(
      `Category: ${category}, JarsAmount: ${jarsAmount}, SpentAmount: ${spentAmount}`
    );

    const allocatedPercentage = (Number(jarsAmount) / income) * 100;
    const spentPercentage = (spentAmount / income) * 100;
    const delta = allocatedPercentage - spentPercentage;

    comparison[category] = {
      allocatedPercentage: allocatedPercentage.toFixed(2),
      spentAmount: spentAmount.toFixed(2),
      spentPercentage: spentPercentage.toFixed(2),
      delta: (allocatedPercentage - spentPercentage).toFixed(2), // Delta as the difference in percentages
    };
  }
  return comparison;
};
