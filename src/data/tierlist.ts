import { characters } from './characters';

export const tierlist = {
  EX: ["berenica", "hilda", "truffle-and-filbert"],
  S: ["psyche", "tabethe", "yuming"],
  A: ["fina", "lynn", "outsider"]
};

// Helper function to get characters by tier
export function getCharactersByTier(tier: keyof typeof tierlist) {
  return tierlist[tier]
    .map(id => characters.find(char => char.id === id))
    .filter((char): char is NonNullable<typeof char> => char !== undefined);
}

// Helper function to get all tiers
export function getAllTiers() {
  return Object.keys(tierlist) as (keyof typeof tierlist)[];
}
