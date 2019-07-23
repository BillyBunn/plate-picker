export const initialState = {
  currentUnits: 'lbs',
  currentBar: { weight: 45, units: 'lbs' },
  bars: {
    lbs: [45, 25],
    kgs: [20, 15, 10]
  },
  plates: {
    lbs: [
      { weight: 0.25, available: false },
      { weight: 0.5, available: false },
      { weight: 1, available: false },
      { weight: 2.5, available: true },
      { weight: 5, available: true },
      { weight: 10, available: true },
      { weight: 25, available: true },
      { weight: 35, available: false },
      { weight: 45, available: true },
      { weight: 55, available: false }
    ],
    kgs: [
      { weight: 0.25, available: false },
      { weight: 0.5, available: false },
      { weight: 1.25, available: false },
      { weight: 2.5, available: false },
      { weight: 5, available: false },
      { weight: 10, available: false },
      { weight: 15, available: false },
      { weight: 20, available: false },
      { weight: 25, available: false }
    ]
  },

  currentWeights: {
    plates: [
      { weight: 45, qty: 2 },
      { weight: 25, qty: 1 },
      { weight: 5, qty: 1 }
    ],
    bar: 45,
    totalWeight: 285,
    targetWeight: 285,
    remainder: 0
  }
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_UNITS':
      console.log({ payload });
      return { ...state, currentUnits: payload };

    case 'TOGGLE_PLATE_AVAILABILITY':
      let updatedPlates = state.plates[state.currentUnits].map(plate => {
        if (plate.weight === payload) plate.available = !plate.available;
        return plate;
      });
      return {
        ...state,
        plates: { ...state.plates, [state.currentUnits]: updatedPlates }
      };

    case 'CALCULATE':
      // console.log(payload);
      let availablePlates = state.plates[state.currentUnits].reduce(
        (acc, plate) => {
          if (plate.available) acc.push(plate.weight);
          return acc;
        },
        []
      );
      // console.log(
      //   calcPlates(payload, availablePlates, state.currentBar.weight)
      // );
      const currentWeights = calcPlates(
        payload,
        availablePlates,
        state.currentBar.weight
      );
      return { ...state, currentWeights };

    default:
      return state;
  }
};

function calcPlates(targetWeight, weights, bar = 45) {
  weights.sort((a, b) => b - a); // plates examined heaviest to lightest

  let perSideTarget = (targetWeight - bar) / 2; // weight for each side of bar

  let plates = weights.reduce((acc, weight) => {
    let qty = perSideTarget / weight;
    if (qty >= 1) {
      qty = Math.floor(qty); // remove remainder
      acc.push({ weight, qty }); // add to plates array
      perSideTarget -= weight * qty; // reduce target weight
    }
    return acc;
  }, []);

  if (perSideTarget) console.log(`${perSideTarget} short on each side`);

  const remainder = perSideTarget * 2;

  return {
    plates,
    bar,
    totalWeight: targetWeight - remainder,
    targetWeight,
    remainder
  };
  // [ {weight: 45, qty: 2}, {{weight: 10, qty: 2}} ]
}
