export const jarsPercentages = {
  Necessities: 0.55,
  FinancialFreedom: 0.1,
  LongTermSavings: 0.1,
  Education: 0.1,
  Play: 0.1,
  Give: 0.05,
};

export const system503020Percentages = {
  Needs: 0.5,
  Wants: 0.3,
  Savings: 0.2,
};

export const calculateJARS = (income, expenses = {}) => {
  console.log(
    "Calculating JARS Allocation. Income:",
    income,
    "Expenses:",
    expenses
  );
  let jarsAllocation = {};

  for (const [jar, percentage] of Object.entries(jarsPercentages)) {
    jarsAllocation[jar] = income * percentage;
    console.log(`Allocating for ${jar}:`, jarsAllocation[jar]);
  }

  if (Object.keys(jarsAllocation).length === 0) {
    console.error("JARS Allocation is empty. Check calculations and inputs.");
  } else {
    console.log("Final JARS Allocation:", jarsAllocation);
  }

  return jarsAllocation;
};

export const calculate503020 = (income) => {
  return {
    Needs: income * 0.5,
    Wants: income * 0.3,
    Savings: income * 0.2,
  };
};

export const calculateBudget = (method, income, expenses) => {
  console.log("calculateBudget called. Method:", method);
  switch (method) {
    case "JARS": {
      const jarsAllocation = calculateJARS(income, expenses);
      console.log("JARS Allocation in calculateBudget:", jarsAllocation);
      return jarsAllocation;
    }
    case "503020": {
      return calculate503020(income);
    }
    default:
      return {};
  }
};
