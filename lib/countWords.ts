export function countWords(data: string): number {
  const pattern =
    /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  const matches = data.match(pattern)
  let count = 0

  if (!matches) {
    return 0
  }

  for (let i = 0; i < matches.length; i++) {
    // Use non-null assertion operator to assert matches[i] is not undefined
    const match = matches[i]!
    if (match.charCodeAt(0) >= 0x4e00) {
      count += match.length
    } else {
      count += 1
    }
  }

  return count
}
