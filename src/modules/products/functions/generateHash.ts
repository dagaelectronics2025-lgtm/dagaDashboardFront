export function generateHashCode(): string {
    const charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    const randomValues = new Uint8Array(8);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < 8; i++) {
        const index = randomValues[i] % charts.length;
        result += charts.charAt(index);
    }
    return result;
}
