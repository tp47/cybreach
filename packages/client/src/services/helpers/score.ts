const ITEM_NAME = 'cybereachScore_'

export const setScoreLocal = ({ login, value }: { login: string; value: number }) =>
  typeof value === 'number' ? localStorage.setItem(ITEM_NAME + login, value.toString()) : null

export const getScoreLocal = ({ login }: { login: string }) => {
  const score = localStorage.getItem(ITEM_NAME + login)
  return score ? Number(score) : 0
}

export const removeScoreLocal = ({ login }: { login: string }) =>
  localStorage.removeItem(ITEM_NAME + login)
