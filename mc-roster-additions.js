/*
 * Pokémon Champions - Regulation M-C additions
 * Roster metadata
 */

const MC_ROSTER_ADDITIONS = {
  regulation: "M-C",

  newPokemon: [
    "Wigglytuff",
    "Persian",
    "Alolan Persian",
    "Farfetch'd",
    "Mr. Mime",
    "Swalot",
    "Salamence",
    "Gogoat",
    "Golisopod",
    "Rillaboom",
    "Cinderace",
    "Inteleon",
    "Thievul",
    "Toxtricity",
    "Grapploct",
    "Perrserker",
    "Sirfetch'd",
    "Pincurchin",
    "Indeedee",
    "Pawmot",
    "Arboliva",
    "Squawkabilly",
    "Mabosstiff",
    "Baxcalibur"
  ],

  newMegaEvolutions: [
    "Mega Salamence",
    "Mega Golisopod",
    "Mega Baxcalibur",
    "Mega Absol Z",
    "Mega Garchomp Z",
    "Mega Lucario Z"
  ]
};
MC_ROSTER_ADDITIONS.pokemonData = MC_ROSTER_ADDITIONS.newPokemon.map(name => ({
  name,
  types: [],
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
  regulations: ["M-C"]
}));

window.MC_ROSTER_ADDITIONS = MC_ROSTER_ADDITIONS;
if (window.LocalData && Array.isArray(window.LocalData.pokemon)) {
  for (const p of MC_ROSTER_ADDITIONS.pokemonData) {
    if (!window.LocalData.pokemon.some(x => x.name === p.name)) {
      window.LocalData.pokemon.push(p);
    }
  }
}

console.log(
  "M-C Pokémon added:",
  MC_ROSTER_ADDITIONS.pokemonData.length
);
