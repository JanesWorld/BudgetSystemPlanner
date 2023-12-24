export const compareExpensesWithSystem = (
  userExpenses,
  systemAllocation,
  income,
  systemPercentages
) => {
  let comparison = {};

  if (!systemAllocation) {
    console.error("System allocation is empty or undefined.");
    return {};
  }

  for (const [category, systemAmount] of Object.entries(systemAllocation)) {
    console.log(`Processing category: ${category}`);
    console.log(`User expenses for ${category}:`, userExpenses[category]);
    const userSpentAmount = userExpenses[category] || 0;
    const systemPercent = systemPercentages[category] * 100;

    const allocatedPercentage = (systemAmount / income) * 100;
    const spentPercentage = (userSpentAmount / income) * 100;
    const delta = allocatedPercentage - spentPercentage;

    comparison[category] = {
      allocatedPercentage: allocatedPercentage.toFixed(2),
      spentAmount: userSpentAmount.toFixed(2),
      spentPercentage: spentPercentage.toFixed(2),
      delta: delta.toFixed(2),
      systemPercentages: systemPercent.toFixed(2),
    };
    console.log(`Category: ${category}, Comparison:`, comparison[category]);
    console.log("User Expenses in compareExpensesWithSystem:", userExpenses);
    console.log("System Allocation:", systemAllocation);
    console.log("System Percentages:", systemPercentages);
  }
  return comparison;
};

// export const compareExpensesWithSystem = (
//   userExpenses,
//   systemAllocation,
//   income,
//   systemPercentages // This is the passed parameter
// ) => {
//   let comparison = {};

//   if (!systemAllocation) {
//     return {};
//   }

//   for (const [category, systemAmount] of Object.entries(systemAllocation)) {
//     // Use a different variable name to avoid conflict
//     const categoryPercentage = systemPercentages[category] * 100;

//     const safeSystemAmount = Number(systemAmount) || 0;
//     const safeSpentAmount = Number(userExpenses[category]) || 0;

//     const allocatedPercentage = (safeSystemAmount / income) * 100;
//     const spentPercentage = (safeSpentAmount / income) * 100;
//     const delta = allocatedPercentage - spentPercentage;

//     comparison[category] = {
//       allocatedPercentage: allocatedPercentage.toFixed(2),
//       spentAmount: safeSpentAmount.toFixed(2),
//       spentPercentage: spentPercentage.toFixed(2),
//       delta: delta.toFixed(2),
//       systemPercentages: categoryPercentage.toFixed(2),
//     };
//     console.log(`Category: ${category}, Comparison:`, comparison[category]);
//   }
//   return comparison;
// };
