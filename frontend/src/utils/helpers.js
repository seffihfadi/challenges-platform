export const getFirstLetter = (text) => {
  const firstLetter = text.charAt(0).toUpperCase()
  return firstLetter
}

export const getDifficultyLevel = (difficulty, reference = 100) => {
  if (difficulty < 0.3 * reference) {
    return 'easy';
  } else if (difficulty > 0.7 * reference) {
    return 'hard';
  } else {
    return 'medium';
  }
}

export const COLORS = ['#ffce44', '#9F4298', '#E2495B', '#8E7C68', '#ae874a', '#0C4A60']