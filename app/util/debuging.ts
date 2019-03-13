export const OBFUSCATED_ERROR =
    "An invariant failed, however the error is obfuscated because this is an production build."
export function invariant(check: boolean, message?: string | boolean) {
  if (!check) throw new Error("[mobx] " + (message || OBFUSCATED_ERROR))
}