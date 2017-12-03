export function capitalize(str: string = ""): string {
    return typeof str !== "string" ? "" : str[0].toUpperCase() + str.slice(1);
}
