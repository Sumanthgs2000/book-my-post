export const generateArticleNumber = () => {
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return `EK${randomDigits}IN`;
};
