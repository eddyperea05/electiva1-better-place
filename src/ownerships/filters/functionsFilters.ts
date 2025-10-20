export const filters = (filter: string, houses: any) => {
  if (filter === "mayor precio") {
    const newOrder = [...houses].sort((a, b) => b.price - a.price);
    console.log(newOrder)
    return newOrder;
  }

  if (filter === "menor precio") {
    const newOrder = [...houses].sort((a, b) => a.price - b.price);
    return newOrder;
  }

  if (filter === "más recientes") {
    const newOrder = [...houses].sort((a, b) => b.price - a.price);
    return newOrder;
  }

  if (filter === "menos recientes") {
    const newOrder = [...houses].sort((a, b) => a.price - b.price);
    return newOrder;
  }

  if (filter === "más habitaciones") {
    const newOrder = [...houses].sort(
      (a, b) => b.habitaciones - a.habitaciones
    );
    return newOrder;
  }

  if (filter === "menos habitaciones") {
    const newOrder = [...houses].sort(
      (a, b) => a.habitaciones - b.habitaciones
    );
    return newOrder;
  }

  console.log(houses)
  return houses;

};
