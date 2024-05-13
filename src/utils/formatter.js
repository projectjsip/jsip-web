
export const formatter = new Intl.NumberFormat('id');

export function releaseSeparatorFromString(stringWithSeparator) {
    return stringWithSeparator.replace(/\D+/g, "");
}

export function numberWithSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}