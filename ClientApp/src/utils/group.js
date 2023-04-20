export const groupByCategory = (subcategories) => {
  const groupedData = {};

  subcategories.forEach((subcategory) => {
    const { category, catId, ...rest } = subcategory;
    if (!groupedData[category]) {
      groupedData[category] = [];
    }
    groupedData[category].push({ catId, ...rest });
  });
  console.log(groupedData);
  return groupedData;
};
