export const BudgetingSystems = [
  {
    id: "JARS System",
    name: "JARS System",
    description:
      "Using this budgeting system, you will split up your money across 6 different accounts. Each account has a different purpose, and you will use each account for different expenses with a specific %. The jars are as follows:",
    system: [
      { id: "Jar 1", name: "Necessities", description: "55% of your income" },
      {
        id: "Jar 2",
        name: "Financial Freedom",
        description: "10% of your income",
      },
      {
        id: "Jar 3",
        name: "Long Term Savings",
        description: "10% of your income",
      },
      { id: "Jar 4", name: "Education", description: "10% of your income" },
      { id: "Jar 5", name: "Play", description: "10% of your income" },
      { id: "Jar 6", name: "Give", description: "5% of your income" },
    ],
  },
  {
    id: "50/30/20 System",
    name: "50/30/20 System",
    description:
      "Using this budgeting system, you will split up your money across 3 different accounts. Each account has a different purpose, and you will use each account for different expenses with a specific %. The accounts are as follows:",
    system: [
      { id: "Account 1", name: "Needs", description: "50% of your income" },
      { id: "Account 2", name: "Wants", description: "30% of your income" },
      { id: "Account 3", name: "Savings", description: "20% of your income" },
    ],
  },
  // {
  //   id: "Zero-Based Budgeting System",
  //   name: "Zero-Based Budgeting System",
  //   description:
  //     "Every single £ in your account will be accounted for, with no leftover. The idea is that every single £1 is assigned to an expense. Even if that expense is a savings account. Its typically used by corporations but individuals can benefit as well.",
  //   system: [
  //     {
  //       id: "",
  //       name: "List Monthly Income",
  //       description: "50% of your income",
  //     },
  //     {
  //       id: "Account 2",
  //       name: "List Your Monthly Expenses",
  //       description: "Every £1 you receive counts.",
  //     },
  //     {
  //       id: "Account 3",
  //       name: "Subtract Expenses From Income",
  //       description:
  //         "This must add up to 0, otherwise you have not accounted for all your expenses",
  //     },
  //   ],
  // },
];

export const jarsDescription = {
  FinancialFreedom:
    "This is your financial freedom account. This is the money you will use to pay off your debts, and invest in your future.",
  longTermSavings:
    "This is a general savings account for long term use. Think of it as a rainy day fund, when a new laptop is needed or a new car.",
  education:
    "This is your education account. This is the money you will use to upskill either in your career by paying for courses or certification.",
  Necessities:
    "This is your necessities account. This is money for surviving such as Rent, Bills, Groceries etc.",
  play: "Your fun account. Do what you want with this money, use it for a vacation, or get a spa treatment",
  give: "This last account is to give back. Bless your family or friends or give to charity.",
};
