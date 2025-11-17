export function getDeflection(x: number, F: number, E: number, I: number, L = x) {
    return (F / (E * I)) * (0.5 * L * x ** 2 - (1 / 6) * x ** 3);
}
