/*
 * Pokémon Champions - Regulation M-C
 * Newly featured Pokémon data
 */

const MC_POKEMON_DATA = [
  {
    name: "Wigglytuff",
    types: ["Normal", "Fairy"],
    regulations: ["M-C"]
  },
  {
    name: "Persian",
    types: ["Normal"],
    regulations: ["M-C"]
  },
  {
    name: "Swalot",
    types: ["Poison"],
    regulations: ["M-C"]
  },
  {
    name: "Salamence",
    types: ["Dragon", "Flying"],
    regulations: ["M-C"]
  },
  {
    name: "Gogoat",
    types: ["Grass"],
    regulations: ["M-C"]
  },
  {
    name: "Golisopod",
    types: ["Bug", "Water"],
    regulations: ["M-C"]
  },
  {
    name: "Rillaboom",
    types: ["Grass"],
    regulations: ["M-C"]
  },
  {
    name: "Cinderace",
    types: ["Fire"],
    regulations: ["M-C"]
  },
  {
    name: "Inteleon",
    types: ["Water"],
    regulations: ["M-C"]
  },
  {
    name: "Thievul",
    types: ["Dark"],
    regulations: ["M-C"]
  },
  {
    name: "Toxtricity",
    displayName: "Toxtricity (Amped Form)",
    types: ["Electric", "Poison"],
    regulations: ["M-C"]
  },
  {
    name: "Toxtricity-Low-Key",
    displayName: "Toxtricity (Low Key Form)",
    types: ["Electric", "Poison"],
    regulations: ["M-C"]
  },
  {
    name: "Grapploct",
    types: ["Fighting"],
    regulations: ["M-C"]
  },
  {
    name: "Perrserker",
    types: ["Steel"],
    regulations: ["M-C"]
  },
  {
    name: "Pincurchin",
    types: ["Electric"],
    regulations: ["M-C"]
  },
  {
    name: "Indeedee",
    displayName: "Indeedee (Male)",
    types: ["Psychic", "Normal"],
    regulations: ["M-C"]
  },
  {
    name: "Indeedee-Female",
    displayName: "Indeedee (Female)",
    types: ["Psychic", "Normal"],
    regulations: ["M-C"]
  },
  {
    name: "Pawmot",
    types: ["Electric", "Fighting"],
    regulations: ["M-C"]
  },
  {
    name: "Arboliva",
    types: ["Grass", "Normal"],
    regulations: ["M-C"]
  },
  {
    name: "Squawkabilly",
    displayName: "Squawkabilly (Green Plumage)",
    types: ["Normal", "Flying"],
    regulations: ["M-C"]
  },
  {
    name: "Squawkabilly-Blue",
    displayName: "Squawkabilly (Blue Plumage)",
    types: ["Normal", "Flying"],
    regulations: ["M-C"]
  },
  {
    name: "Squawkabilly-Yellow",
    displayName: "Squawkabilly (Yellow Plumage)",
    types: ["Normal", "Flying"],
    regulations: ["M-C"]
  },
  {
    name: "Squawkabilly-White",
    displayName: "Squawkabilly (White Plumage)",
    types: ["Normal", "Flying"],
    regulations: ["M-C"]
  },
  {
    name: "Mabosstiff",
    types: ["Dark"],
    regulations: ["M-C"]
  },
  {
    name: "Baxcalibur",
    types: ["Dragon", "Ice"],
    regulations: ["M-C"]
  }
];

window.MC_POKEMON_DATA = MC_POKEMON_DATA;
if (window.LocalData && Array.isArray(window.LocalData.pokemon)) {
  for (const p of MC_POKEMON_DATA) {
    const existing = window.LocalData.pokemon.find(
      x => x.name === p.name
    );

    if (existing) {
      existing.types = p.types;
      existing.regulations = p.regulations;
    } else {
      window.LocalData.pokemon.push({
        name: p.name,
        types: p.types,
        baseStats: {
          hp: 0,
          atk: 0,
          def: 0,
          spa: 0,
          spd: 0,
          spe: 0
        },
        abilities: [],
        moves: [],
        regulations: p.regulations
      });
    }
  }

  console.log(
    "M-C data merged:",
    LocalData.pokemon.length
  );
}
const MC_BASE_STATS = {
  "Wigglytuff": {
    hp: 140, atk: 70, def: 45, spa: 85, spd: 50, spe: 45
  },

  "Persian": {
    hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115
  },

  "Alolan Persian": {
    hp: 65, atk: 60, def: 60, spa: 75, spd: 65, spe: 115
  },

  "Farfetch'd": {
    hp: 52, atk: 90, def: 55, spa: 58, spd: 62, spe: 60
  },

  "Mr. Mime": {
    hp: 40, atk: 45, def: 65, spa: 100, spd: 120, spe: 90
  },

  "Swalot": {
    hp: 100, atk: 73, def: 83, spa: 73, spd: 83, spe: 55
  },

  "Salamence": {
    hp: 95, atk: 135, def: 80, spa: 110, spd: 80, spe: 100
  },

  "Gogoat": {
    hp: 123, atk: 100, def: 62, spa: 97, spd: 81, spe: 68
  },

  "Golisopod": {
    hp: 75, atk: 125, def: 140, spa: 60, spd: 90, spe: 40
  },

  "Rillaboom": {
    hp: 100, atk: 125, def: 90, spa: 60, spd: 70, spe: 85
  },

  "Cinderace": {
    hp: 80, atk: 116, def: 75, spa: 65, spd: 75, spe: 119
  },

  "Inteleon": {
    hp: 70, atk: 85, def: 65, spa: 125, spd: 65, spe: 120
  },

  "Thievul": {
    hp: 70, atk: 58, def: 58, spa: 87, spd: 92, spe: 90
  },

  "Toxtricity": {
    hp: 75, atk: 98, def: 70, spa: 114, spd: 70, spe: 75
  },

  "Toxtricity-Low-Key": {
    hp: 75, atk: 98, def: 70, spa: 114, spd: 70, spe: 75
  },

  "Grapploct": {
    hp: 80, atk: 118, def: 90, spa: 70, spd: 80, spe: 42
  },

  "Perrserker": {
    hp: 70, atk: 110, def: 100, spa: 50, spd: 60, spe: 50
  },

  "Sirfetch'd": {
    hp: 62, atk: 135, def: 95, spa: 68, spd: 82, spe: 65
  },

  "Pincurchin": {
    hp: 48, atk: 101, def: 95, spa: 91, spd: 85, spe: 15
  },

  "Indeedee": {
    hp: 60, atk: 65, def: 55, spa: 105, spd: 95, spe: 95
  },

  "Indeedee-Female": {
    hp: 70, atk: 55, def: 65, spa: 95, spd: 105, spe: 85
  },

  "Pawmot": {
    hp: 70, atk: 115, def: 70, spa: 70, spd: 60, spe: 105
  },

  "Arboliva": {
    hp: 78, atk: 69, def: 90, spa: 125, spd: 109, spe: 39
  },

  "Squawkabilly": {
    hp: 82, atk: 96, def: 51, spa: 45, spd: 51, spe: 92
  },

  "Squawkabilly-Blue": {
    hp: 82, atk: 96, def: 51, spa: 45, spd: 51, spe: 92
  },

  "Squawkabilly-Yellow": {
    hp: 82, atk: 96, def: 51, spa: 45, spd: 51, spe: 92
  },

  "Squawkabilly-White": {
    hp: 82, atk: 96, def: 51, spa: 45, spd: 51, spe: 92
  },

  "Mabosstiff": {
    hp: 80, atk: 120, def: 90, spa: 60, spd: 70, spe: 85
  },

  "Baxcalibur": {
    hp: 115, atk: 145, def: 92, spa: 75, spd: 86, spe: 87
  }
};

for (const p of LocalData.pokemon) {
  if (MC_BASE_STATS[p.name]) {
    p.baseStats = MC_BASE_STATS[p.name];
  }
}

console.log(
  "M-C base stats loaded:",
  Object.keys(MC_BASE_STATS).length
);
