/*
 * Pokémon Champions Singles AI
 * Battle Engine
 *
 * シングルバトル用の状態管理・乱数・ダメージ・状態異常・交代の土台。
 */

const BattleEngine = (() => {
  const TYPES = [
    "Normal","Fire","Water","Electric","Grass","Ice",
    "Fighting","Poison","Ground","Flying","Psychic","Bug",
    "Rock","Ghost","Dragon","Dark","Steel","Fairy"
  ];

  const STAGES = {
    MIN: -6,
    MAX: 6
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function clone(value) {
    return structuredClone(value);
  }

  /*
   * 乱数
   *
   * Pokémon系のダメージ乱数を
   * 0.85～1.00 の範囲で扱う。
   */
  function damageRoll() {
    return Math.floor(85 + Math.random() * 16);
  }

  function stageMultiplier(stage) {
    stage = clamp(stage, STAGES.MIN, STAGES.MAX);

    if (stage >= 0) {
      return (2 + stage) / 2;
    }

    return 2 / (2 - stage);
  }

  function createPokemon(data) {
    const p = clone(data || {});

    p.hp = Number.isFinite(p.hp) ? p.hp : 0;
    p.maxhp = Number.isFinite(p.maxhp) ? p.maxhp : p.hp;

    p.status = p.status || null;

    p.stages = Object.assign({
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
      acc: 0,
      eva: 0
    }, p.stages || {});

    p.pp = Object.assign({}, p.pp || {});

    p.volatile = Object.assign({}, p.volatile || {});

    return p;
  }

  function createBattle(meTeam, opponentTeam, options = {}) {
    const me = meTeam.map(createPokemon);
    const opp = opponentTeam.map(createPokemon);

    return {
      turn: 1,

      weather: options.weather || null,

      terrain: options.terrain || null,

      sides: {
        me: {
          team: me,
          active: 0,
          hazards: {
            stealthRock: false,
            spikes: 0,
            toxicSpikes: 0,
            stickyWeb: false
          },
          screens: {
            reflect: 0,
            lightScreen: 0
          }
        },

        opponent: {
          team: opp,
          active: 0,
          hazards: {
            stealthRock: false,
            spikes: 0,
            toxicSpikes: 0,
            stickyWeb: false
          },
          screens: {
            reflect: 0,
            lightScreen: 0
          }
        }
      },

      log: []
    };
  }

  function activePokemon(state, side) {
    const s = state.sides[side];

    if (!s) {
      throw new Error(`Unknown side: ${side}`);
    }

    return s.team[s.active];
  }

  function opponentSide(side) {
    return side === "me" ? "opponent" : "me";
  }

  function isAlive(pokemon) {
    return pokemon && pokemon.hp > 0;
  }

  function availableSwitches(state, side) {
    const s = state.sides[side];

    return s.team
      .map((pokemon, index) => ({
        pokemon,
        index
      }))
      .filter(x =>
        x.index !== s.active &&
        isAlive(x.pokemon)
      );
  }

  function switchPokemon(state, side, index) {
    const s = state.sides[side];

    if (!s.team[index]) {
      throw new Error("そのポケモンは存在しません。");
    }

    if (!isAlive(s.team[index])) {
      throw new Error("ひんしのポケモンには交代できません。");
    }

    s.active = index;

    applyEntryHazards(state, side);

    state.log.push({
      turn: state.turn,
      type: "switch",
      side,
      pokemon: s.team[index].name
    });
  }

  function applyEntryHazards(state, side) {
    const s = state.sides[side];
    const p = activePokemon(state, side);

    if (!isAlive(p)) {
      return;
    }

    /*
     * ステルスロック等の詳細倍率は
     * タイプ相性データと接続する部分。
     */
    if (s.hazards.stealthRock) {
      const damage = Math.max(1, Math.floor(p.maxhp / 8));
      p.hp = Math.max(0, p.hp - damage);
    }

    if (s.hazards.spikes > 0) {
      const damage = Math.max(
        1,
        Math.floor(
          p.maxhp *
          Math.min(3, s.hazards.spikes) /
          8
        )
      );

      p.hp = Math.max(0, p.hp - damage);
    }

    if (
      s.hazards.toxicSpikes > 0 &&
      !p.status
    ) {
      p.status = "poison";
    }
  }

  function modifyStage(state, side, stat, amount) {
    const p = activePokemon(state, side);

    if (!p.stages.hasOwnProperty(stat)) {
      p.stages[stat] = 0;
    }

    const before = p.stages[stat];

    p.stages[stat] = clamp(
      p.stages[stat] + amount,
      STAGES.MIN,
      STAGES.MAX
    );

    return {
      before,
      after: p.stages[stat],
      changed: before !== p.stages[stat]
    };
  }

  function calculateStat(pokemon, stat, baseStat = 1) {
    const stage = pokemon.stages?.[stat] || 0;

    const base = Number(baseStat) || 1;

    const raw = base + 20;

    return Math.max(
      1,
      Math.floor(raw * stageMultiplier(stage))
    );
  }

  function typeEffectiveness(moveType, defenderTypes = [], chart = {}) {
    let multiplier = 1;

    for (const defenderType of defenderTypes) {
      multiplier *=
        chart?.[moveType]?.[defenderType] ?? 1;
    }

    return multiplier;
  }

  function calculateDamage({
    attacker,
    defender,
    move,
    baseAttack,
    baseDefense,
    typeChart = {},
    critical = false,
    random = true
  }) {
    const power = Number(move?.power) || 0;

    if (!power) {
      return {
        damage: 0,
        min: 0,
        max: 0,
        effectiveness: 1
      };
    }

    const category =
      String(move.category || "").toLowerCase();

    const attackStat =
      category.includes("special")
        ? "spa"
        : "atk";

    const defenseStat =
      category.includes("special")
        ? "spd"
        : "def";

    const attack =
      calculateStat(
        attacker,
        attackStat,
        baseAttack
      );

    const defense =
      calculateStat(
        defender,
        defenseStat,
        baseDefense
      );

    let base =
      Math.floor(
        Math.floor(
          (22 * power * attack) /
          defense
        ) / 50
      ) + 2;

    const stab =
      (attacker.types || []).includes(move.type)
        ? 1.5
        : 1;

    const effectiveness =
      typeEffectiveness(
        move.type,
        defender.types || [],
        typeChart
      );

    const criticalMultiplier =
      critical ? 1.5 : 1;

    const fixed =
      Math.floor(
        base *
        stab *
        effectiveness *
        criticalMultiplier
      );

    const min =
      Math.floor(fixed * 0.85);

    const max =
      fixed;

    const damage =
      random
        ? Math.floor(
            fixed * damageRoll() / 100
          )
        : max;

    return {
      damage: Math.max(1, damage),
      min: Math.max(1, min),
      max: Math.max(1, max),
      effectiveness
    };
  }

  function applyDamage(
    state,
    side,
    amount,
    source = "move"
  ) {
    const p = activePokemon(state, side);

    const before = p.hp;

    p.hp = Math.max(
      0,
      p.hp - Math.max(0, amount)
    );

    state.log.push({
      turn: state.turn,
      type: "damage",
      side,
      pokemon: p.name,
      source,
      before,
      after: p.hp,
      amount: before - p.hp
    });

    return {
      before,
      after: p.hp,
      fainted: p.hp <= 0
    };
  }

  function applyStatus(state, side, status) {
    const p = activePokemon(state, side);

    if (!isAlive(p)) {
      return false;
    }

    if (p.status) {
      return false;
    }

    p.status = status;

    state.log.push({
      turn: state.turn,
      type: "status",
      side,
      pokemon: p.name,
      status
    });

    return true;
  }

  function endTurnStatus(state, side) {
    const p = activePokemon(state, side);

    if (!isAlive(p)) {
      return;
    }

    if (p.status === "poison") {
      const damage =
        Math.max(
          1,
          Math.floor(p.maxhp / 8)
        );

      applyDamage(
        state,
        side,
        damage,
        "poison"
      );
    }

    if (p.status === "burn") {
      const damage =
        Math.max(
          1,
          Math.floor(p.maxhp / 16)
        );

      applyDamage(
        state,
        side,
        damage,
        "burn"
      );
    }
  }

  function cloneState(state) {
    return clone(state);
  }

  function getLegalActions(state, side) {
    const p = activePokemon(state, side);

    if (!isAlive(p)) {
      return [];
    }

    const actions = [];

    for (const move of p.moves || []) {
      if (
        !p.pp ||
        (p.pp[move] ?? 1) > 0
      ) {
        actions.push({
          type: "move",
          move
        });
      }
    }

    for (const candidate of availableSwitches(state, side)) {
      actions.push({
        type: "switch",
        index: candidate.index,
        pokemon: candidate.pokemon.name
      });
    }

    return actions;
  }

  function evaluateState(state, side = "me") {
    const other = opponentSide(side);

    function teamValue(team) {
      return team.reduce((sum, p) => {
        if (!p || p.hp <= 0) {
          return sum;
        }

        const hpRatio =
          p.maxhp > 0
            ? p.hp / p.maxhp
            : 0;

        return sum + 100 * hpRatio;
      }, 0);
    }

    return (
      teamValue(state.sides[side].team) -
      teamValue(state.sides[other].team)
    );
  }

  return {
    TYPES,
    clone,
    createPokemon,
    createBattle,
    activePokemon,
    availableSwitches,
    switchPokemon,
    applyEntryHazards,
    modifyStage,
    calculateStat,
    calculateDamage,
    applyDamage,
    applyStatus,
    endTurnStatus,
    cloneState,
    getLegalActions,
    evaluateState
  };
})();
