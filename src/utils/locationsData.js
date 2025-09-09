export const locations = {
  districts: {
    "Bengaluru": {
      taluks: {
        "Bengaluru North": ["560001", "560002", "560003"],
        "Bengaluru South": ["560004", "560005"]
      }
    },
    "Mysuru": {
      taluks: {
        "Mysuru": ["570001", "570002"]
      }
    }
  }
};
export const getCityFromPin = (pincode) => {
  for (const district of Object.values(locations.districts)) {
    for (const taluk of Object.values(district.taluks)) {
      if (taluk.includes(pincode)) return district;
    }
  }
  return null;
};
