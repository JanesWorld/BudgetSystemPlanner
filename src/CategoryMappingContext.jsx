import React, { createContext, useContext } from "react";

const CategoryMappingContext = createContext();

export const useCategoryMapping = () => useContext(CategoryMappingContext);

function getCategoryMapping(budgetMethod) {
  let categoryMapping = {};

  if (budgetMethod === "503020") {
    categoryMapping = {
      Needs: ["Rent", "Bills", "Groceries", "Transportation"],
      Wants: ["Entertainment", "Social", "Hobbies"],
      Savings: ["Savings", "Investments", "Education", "Charity"],
    };
  } else {
    categoryMapping = {
      Necessities: ["Rent", "Bills", "Groceries", "Transportation"],
      FinancialFreedom: ["Investments"],
      LongTermSavings: ["Savings"],
      Education: ["Education"],
      Play: ["Entertainment", "Social", "Hobbies"],
      Give: ["Charity"],
    };
  }

  return categoryMapping;
}

export const CategoryMappingProvider = ({ children, budgetMethod }) => {
  const categoryMapping = getCategoryMapping(budgetMethod);

  return (
    <CategoryMappingContext.Provider value={categoryMapping}>
      {children}
    </CategoryMappingContext.Provider>
  );
};
