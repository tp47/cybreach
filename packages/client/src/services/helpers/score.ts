const ITEM_NAME = 'cybereachScore'

export const setScoreLocal = (value: number) =>
  typeof value === 'number' ? localStorage.setItem(ITEM_NAME, value.toString()) : null

export const getScoreLocal = () => {
  const score = localStorage.getItem(ITEM_NAME)
  return score ? Number(score) : 0
}

export const removeScoreLocal = () => localStorage.removeItem(ITEM_NAME)
