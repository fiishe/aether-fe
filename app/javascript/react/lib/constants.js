const abbreviateStats = statObj => {
  return {
    'HP': statObj.max_hp,
    'STR': statObj.strength,
    'MAG': statObj.magic,
    'SKL': statObj.skill,
    'SPD': statObj.speed,
    'LUK': statObj.luck,
    'DEF': statObj.defense,
    'RES': statObj.resistance
  }
}

export { abbreviateStats };
