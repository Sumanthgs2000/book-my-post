export const calculatePrice = (weight, distanceKm) => {
  if (!weight || weight <= 0) return 0;

  let price = 0;

  if (weight <= 50) {
    // Row 1
    if (distanceKm === 0) price = 15; // Local
    else if (distanceKm <= 200) price = 35;
    else if (distanceKm <= 1000) price = 35;
    else if (distanceKm <= 2000) price = 35;
    else price = 35;
  } else if (weight <= 200) {
    // Row 2 (your case: 70gms falls here)
    if (distanceKm === 0) price = 25; // Local
    else if (distanceKm <= 200) price = 35;
    else if (distanceKm <= 1000) price = 40;
    else if (distanceKm <= 2000) price = 60;
    else price = 70;
  } else {
    // In case someone tries more than 200g (not for your kiosk)
    return 0;
  }

  return price;
};
