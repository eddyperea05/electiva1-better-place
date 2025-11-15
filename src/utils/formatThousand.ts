//Formato para que los onputs tengan los signos de miles
export const formatThousands = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};