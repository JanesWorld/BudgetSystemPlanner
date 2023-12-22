export const calculateJARS = (income, expenses = {}) => {
  const jarsPercentages = {
    Necessities: 0.55,
    FinancialFreedom: 0.1,
    longTermSavings: 0.1,
    education: 0.1,
    play: 0.1,
    give: 0.05,
  };

  let totalExpenses = Object.values(expenses).reduce(
    (sum, value) => sum + parseFloat(value || 0),
    0
  );
  let disposableIncome = Math.max(income - totalExpenses, 0);
  let jarsAllocation = Object.keys(jarsPercentages).reduce(
    (allocations, jar) => {
      allocations[jar] = disposableIncome * jarsPercentages[jar];
      return allocations;
    },
    {}
  );
  return jarsAllocation;
};
