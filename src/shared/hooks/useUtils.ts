export function useUtils() {
    /**
     * Formatea un monto en centavos al estándar de Stripe (USD),
     * devolviendo un string tipo "$1,234.56".
     */
    const formatAmountFromCents = (cents?: number | null): string => {
        if (cents == null || Number.isNaN(cents)) return "";

        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formatter.format(cents / 100);
    };

    /**
     * Recibe un string (con o sin símbolo de moneda, comas, etc.) y
     * lo convierte a centavos siguiendo el estándar de Stripe.
     * Ejemplos:
     *   "12.34" -> 1234
     *   "$1,234.56" -> 123456
     */
    const parseAmountToCents = (value: string): number => {
        if (!value) return 0;

        // Elimina todo menos dígitos y el punto decimal
        const cleaned = value.replace(/[^\d.]/g, "");
        if (!cleaned) return 0;

        const num = Number.parseFloat(cleaned);
        if (Number.isNaN(num)) return 0;

        return Math.round(num * 100);
    };

    return {
        formatAmountFromCents,
        parseAmountToCents,
    };
}