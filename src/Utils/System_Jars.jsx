export const jarsPercentages = {
  Necessities: 0.55,
  FinancialFreedom: 0.1,
  LongTermSavings: 0.1,
  Education: 0.1,
  Play: 0.1,
  Give: 0.05,
};

export const calculateJARS = (income, expenses = {}) => {
  let jarsAllocation = {};
  for (const [jar, percentage] of Object.entries(jarsPercentages)) {
    jarsAllocation[jar] = income * percentage;
  }
  return jarsAllocation;
};
