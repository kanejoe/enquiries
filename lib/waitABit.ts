/**
 * Waits for a specified amount of time.
 * @param howLong - The duration to wait in milliseconds. Default is 300ms.
 * @returns A Promise that resolves after the specified duration.
 */
export async function waitABit(howLong: number = 300): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, howLong))
}
