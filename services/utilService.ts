export function getYears() {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < 50; i++) {
    years.unshift(currentYear - i)
  }
  // years.push(currentYear)
  for (let i = 1; i < 50; i++) {
    years.push(currentYear + i)
  }

  return years
}
