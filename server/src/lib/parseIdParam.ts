export function parseIdParam(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) ? id : null
}
