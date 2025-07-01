export const categoryColors = ['#8C1A33', '#AE2696', '#B95D08', '#036450', '#5F8109', '#1F3363', '#8302E6'];

export const getCategoryColor = (category: string): string => {
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % categoryColors.length);
  return categoryColors[index];
};
