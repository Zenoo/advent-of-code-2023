import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const isFiveOfAKind = (hand: string) => {
  const card = hand[0];
  return hand.split('').every(c => c === card);
}

const isFourOfAKind = (hand: string) => {
  return [...new Set(hand.split(''))].some(c => {
    const count = hand.split('').filter(h => h === c).length;
    return count === 4;
  });
}

const isFullHouse = (hand: string) => {
  const cards = [...new Set(hand.split(''))];

  if (cards.length !== 2) {
    return false;
  }

  return cards.every(c => {
    const count = hand.split('').filter(h => h === c).length;
    return count === 2 || count === 3;
  });
}

const isThreeOfAKind = (hand: string) => {
  const cards = [...new Set(hand.split(''))];

  if (cards.length !== 3) {
    return false;
  }

  return cards.every(c => {
    const count = hand.split('').filter(h => h === c).length;
    return count === 3 || count === 1;
  });
}

const isTwoPairs = (hand: string) => {
  const cards = [...new Set(hand.split(''))];

  if (cards.length !== 3) {
    return false;
  }

  return cards.every(c => {
    const count = hand.split('').filter(h => h === c).length;
    return count === 2 || count === 1;
  });
}

const isOnePair = (hand: string) => {
  const cards = [...new Set(hand.split(''))];

  if (cards.length !== 4) {
    return false;
  }

  return cards.every(c => {
    const count = hand.split('').filter(h => h === c).length;
    return count === 2 || count === 1;
  });
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cards = '23456789TJQKA';

  const orderedHands = input.split('\n').sort((a, b) => {
    // Weaker hands first
    const aHand = a.split(' ')[0];
    const bHand = b.split(' ')[0];

    const isAFiveOfAKind = isFiveOfAKind(aHand);
    const isBFiveOfAKind = isFiveOfAKind(bHand);
    if (isAFiveOfAKind && !isBFiveOfAKind) {
      return 1;
    }
    if (isBFiveOfAKind && !isAFiveOfAKind) {
      return -1;
    }

    const isAFourOfAKind = isFourOfAKind(aHand);
    const isBFourOfAKind = isFourOfAKind(bHand);
    if (isAFourOfAKind && !isBFourOfAKind) {
      return 1;
    }
    if (isBFourOfAKind && !isAFourOfAKind) {
      return -1;
    }

    const isAFullHouse = isFullHouse(aHand);
    const isBFullHouse = isFullHouse(bHand);
    if (isAFullHouse && !isBFullHouse) {
      return 1;
    }
    if (isBFullHouse && !isAFullHouse) {
      return -1;
    }

    const isAThreeOfAKind = isThreeOfAKind(aHand);
    const isBThreeOfAKind = isThreeOfAKind(bHand);
    if (isAThreeOfAKind && !isBThreeOfAKind) {
      return 1;
    }
    if (isBThreeOfAKind && !isAThreeOfAKind) {
      return -1;
    }

    const isATwoPairs = isTwoPairs(aHand);
    const isBTwoPairs = isTwoPairs(bHand);
    if (isATwoPairs && !isBTwoPairs) {
      return 1;
    }
    if (isBTwoPairs && !isATwoPairs) {
      return -1;
    }

    const isAOnePair = isOnePair(aHand);
    const isBOnePair = isOnePair(bHand);
    if (isAOnePair && !isBOnePair) {
      return 1;
    }
    if (isBOnePair && !isAOnePair) {
      return -1;
    }

    // Else order by lowest card (repeat for each card)
    const aCards = aHand.split('');
    const bCards = bHand.split('');

    for (let i = 0; i < aHand.length; i++) {
      const aCard = aCards[i];
      const bCard = bCards[i];

      if (cards.indexOf(aCard) < cards.indexOf(bCard)) {
        return -1;
      }
      if (cards.indexOf(bCard) < cards.indexOf(aCard)) {
        return 1;
      }
    }

    return 0;
  });

  console.log(orderedHands);

  return orderedHands.reduce((acc, hand, index) => acc + +hand.split(' ')[1] * (index + 1), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cards = 'J23456789TQKA';
  // J became a joker

  const getPossibleHands = (hand: string) => {
    // If only jokers, return only one hand
    if (hand.split('').every(c => c === 'J')) {
      return [hand];
    }

    // If no jokers, return only one hand
    if (!hand.split('').some(c => c === 'J')) {
      return [hand];
    }

    const cards = hand.split('');
    const differentCards = [...new Set(cards)].filter(c => c !== 'J');

    const possibleHands = [];

    for (const differentCard of differentCards) {
      const possibleHand = cards.map(c => c === 'J' ? differentCard : c).join('');
      possibleHands.push(possibleHand);
    }

    return possibleHands;
  }

  const orderedHands = input.split('\n').sort((a, b) => {
    // Weaker hands first
    const aHand = a.split(' ')[0];
    const bHand = b.split(' ')[0];
    const possibleAHands = getPossibleHands(aHand);
    const possibleBHands = getPossibleHands(bHand);
    let similar = false;

    const isAFiveOfAKind = possibleAHands.some(hand => isFiveOfAKind(hand));
    const isBFiveOfAKind = possibleBHands.some(hand => isFiveOfAKind(hand));
    if (isAFiveOfAKind) {
      if (isBFiveOfAKind) {
        similar = true;
      } else {
        return 1;
      }
    } else if (isBFiveOfAKind) {
      return -1;
    }

    const isAFourOfAKind = possibleAHands.some(hand => isFourOfAKind(hand));
    const isBFourOfAKind = possibleBHands.some(hand => isFourOfAKind(hand));
    if (!similar) {
      if (isAFourOfAKind) {
        if (isBFourOfAKind) {
          similar = true;
        } else {
          return 1;
        }
      } else if (isBFourOfAKind) {
        return -1;
      }
    }

    const isAFullHouse = possibleAHands.some(hand => isFullHouse(hand));
    const isBFullHouse = possibleBHands.some(hand => isFullHouse(hand));
    if (!similar) {
      if (isAFullHouse) {
        if (isBFullHouse) {
          similar = true;
        } else {
          return 1;
        }
      } else if (isBFullHouse) {
        return -1;
      }
    }

    const isAThreeOfAKind = possibleAHands.some(hand => isThreeOfAKind(hand));
    const isBThreeOfAKind = possibleBHands.some(hand => isThreeOfAKind(hand));
    if (!similar) {
      if (isAThreeOfAKind) {
        if (isBThreeOfAKind) {
          similar = true;
        } else {
          return 1;
        }
      } else if (isBThreeOfAKind) {
        return -1;
      }
    }

    const isATwoPairs = possibleAHands.some(hand => isTwoPairs(hand));
    const isBTwoPairs = possibleBHands.some(hand => isTwoPairs(hand));
    if (!similar) {
      if (isATwoPairs) {
        if (isBTwoPairs) {
          similar = true;
        } else {
          return 1;
        }
      } else if (isBTwoPairs) {
        return -1;
      }
    }

    const isAOnePair = possibleAHands.some(hand => isOnePair(hand));
    const isBOnePair = possibleBHands.some(hand => isOnePair(hand));
    if (!similar) {
      if (isAOnePair) {
        if (isBOnePair) {
          similar = true;
        } else {
          return 1;
        }
      } else if (isBOnePair) {
        return -1;
      }
    }

    // Else order by lowest card (repeat for each card)
    const aCards = aHand.split('');
    const bCards = bHand.split('');

    for (let i = 0; i < aHand.length; i++) {
      const aCard = aCards[i];
      const bCard = bCards[i];

      if (cards.indexOf(aCard) < cards.indexOf(bCard)) {
        return -1;
      }
      if (cards.indexOf(bCard) < cards.indexOf(aCard)) {
        return 1;
      }
    }

    return 0;
  });

  return orderedHands.reduce((acc, hand, index) => acc + +hand.split(' ')[1] * (index + 1), 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483
        `,
        expected: 5905,
      },
      {
        input: `
        J5TT2 827
        8J5TK 651
        7Q2JA 139
        JJJJJ 417
        723AK 496
        75575 377
        `,
        expected: 496 + 139 * 2 + 651 * 3 + 827 * 4 + 377 * 5 + 417 * 6,
      },
      {
        input: `
        6J3A2 999
        99965 119
        4QJJT 491
        J796Q 289
        TTJ2T 144
        `,
        expected: 289 + 999 * 2 + 491 * 3 + 119 * 4 + 144 * 5,
      },
      {
        input: `
        KK6KK 617
        JJJ8J 143
        56365 348
        6T33T 85
        QQQQ9 963
        `,
        expected: 348 + 85 * 2 + 963 * 3 + 617 * 4 + 143 * 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
