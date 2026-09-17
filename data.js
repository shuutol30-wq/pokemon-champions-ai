/*
 * Pokémon Champions AI - Local Data Layer
 * GitHub Pages / Browser only
 */

const LocalData = (() => {
  const pokemon = [
    {
      name: "Pikachu",
      types: ["Electric"],
      baseStats: {
        hp: 35,
        atk: 55,
        def: 40,
        spa: 50,
        spd: 50,
        spe: 90
      },
      abilities: ["Static"],
      moves: ["Thunderbolt", "Volt Switch", "Nuzzle", "Protect"]
    },
    {
      name: "Garchomp",
      types: ["Dragon", "Ground"],
      baseStats: {
        hp: 108,
        atk: 130,
        def: 95,
        spa: 80,
        spd: 85,
        spe: 102
      },
      abilities: ["Rough Skin"],
      moves: ["Earthquake", "Dragon Claw", "Swords Dance", "Protect"]
    },
    {
      name: "Rotom-Wash",
      types: ["Electric", "Water"],
      baseStats: {
        hp: 50,
        atk: 65,
        def: 107,
        spa: 105,
        spd: 107,
        spe: 86
      },
      abilities: ["Levitate"],
      moves: ["Hydro Pump", "Volt Switch", "Will-O-Wisp", "Protect"]
    }
  ];

  const moves = {
    "Thunderbolt": {
      type: "Electric",
      category: "Special",
      power: 90,
      accuracy: 100,
      priority: 0
    },

    "Volt Switch": {
      type: "Electric",
      category: "Special",
      power: 70,
      accuracy: 100,
      priority: 0,
      switchAfter: true
    },

    "Nuzzle": {
      type: "Electric",
      category: "Status",
      power: 20,
      accuracy: 100,
      priority: 0,
      status: "paralysis"
    },

    "Protect": {
      type: "Normal",
      category: "Status",
      power: 0,
      accuracy: 100,
      priority: 4,
      protect: true
    },

    "Earthquake": {
      type: "Ground",
      category: "Physical",
      power: 100,
      accuracy: 100,
      priority: 0
    },

    "Dragon Claw": {
      type: "Dragon",
      category: "Physical",
      power: 80,
      accuracy: 100,
      priority: 0
    },

    "Swords Dance": {
      type: "Normal",
      category: "Status",
      power: 0,
      accuracy: 100,
      priority: 0,
      boosts: {
        atk: 2
      }
    },

    "Hydro Pump": {
      type: "Water",
      category: "Special",
      power: 110,
      accuracy: 80,
      priority: 0
    },

    "Will-O-Wisp": {
      type: "Fire",
      category: "Status",
      power: 0,
      accuracy: 85,
      priority: 0,
      status: "burn"
    }
  };

  const abilities = {
    Static: {
      description:
        "接触技を受けたとき、相手をまひ状態にすることがある。"
    },

    "Rough Skin": {
      description:
        "接触技を受けたとき、相手にダメージを与える。"
    },

    Levitate: {
      description:
        "じめんタイプの技を受けない。"
    }
  };

  const items = {
    "Leftovers": {
      description:
        "毎ターン終了時にHPを少し回復する。"
    },

    "Choice Scarf": {
      description:
        "すばやさが上がる代わりに、最初に選んだ技しか使用できない。"
    },

    "Choice Specs": {
      description:
        "特攻が上がる代わりに、最初に選んだ技しか使用できない。"
    },

    "Life Orb": {
      description:
        "技の威力を上げる代わりに、攻撃後にHPを失う。"
    }
  };

  const typeChart = {
    Normal: {
      Rock: 0.5,
      Ghost: 0,
      Steel: 0.5
    },

    Fire: {
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Ice: 2,
      Bug: 2,
      Rock: 0.5,
      Dragon: 0.5,
      Steel: 2
    },

    Water: {
      Fire: 2,
      Water: 0.5,
      Grass: 0.5,
      Ground: 2,
      Rock: 2,
      Dragon: 0.5
    },

    Electric: {
      Water: 2,
      Electric: 0.5,
      Grass: 0.5,
      Ground: 0,
      Flying: 2,
      Dragon: 0.5
    },

    Grass: {
      Fire: 0.5,
      Water: 2,
      Grass: 0.5,
      Poison: 0.5,
      Ground: 2,
      Flying: 0.5,
      Bug: 0.5,
      Rock: 2,
      Dragon: 0.5,
      Steel: 0.5
    },

    Ice: {
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Ice: 0.5,
      Ground: 2,
      Flying: 2,
      Dragon: 2,
      Steel: 0.5
    },

    Ground: {
      Fire: 2,
      Electric: 2,
      Grass: 0.5,
      Poison: 2,
      Flying: 0,
      Bug: 0.5,
      Rock: 2,
      Steel: 2
    },

    Flying: {
      Electric: 0.5,
      Grass: 2,
      Fighting: 2,
      Bug: 2,
      Rock: 0.5,
      Steel: 0.5
    },

    Dragon: {
      Dragon: 2,
      Steel: 0.5,
      Fairy: 0
    },

    Steel: {
      Fire: 0.5,
      Water: 0.5,
      Electric: 0.5,
      Ice: 2,
      Rock: 2,
      Fairy: 2,
      Steel: 0.5
    },

    Fairy: {
      Fire: 0.5,
      Poison: 0.5,
      Steel: 0.5,
      Fighting: 2,
      Dragon: 2,
      Dark: 2
    }
  };

  const statuses = {
    burn: {
      name: "やけど",
      damageFraction: 1 / 16
    },

    poison: {
      name: "どく",
      damageFraction: 1 / 8
    },

    paralysis: {
      name: "まひ",
      speedMultiplier: 0.5
    },

    sleep: {
      name: "ねむり"
    },

    freeze: {
      name: "こおり"
    }
  };

  const regulations = {
    format: "singles",
    teamSize: 6,
    battleTeamSize: 3,
    maxStatPoints: 66,
    maxStatPointsPerStat: 32
  };

  function getPokemon(name) {
    return pokemon.find(
      p =>
        p.name.toLowerCase() ===
        String(name).toLowerCase()
    );
  }

  function getMove(name) {
    return moves[name];
  }

  function getAbility(name) {
    return abilities[name];
  }

  function getItem(name) {
    return items[name];
  }

  return {
    pokemon,
    moves,
    abilities,
    items,
    typeChart,
    statuses,
    regulations,

    getPokemon,
    getMove,
    getAbility,
    getItem
  };
})();

window.LocalData = LocalData;
