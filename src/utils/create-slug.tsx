export const createSlug = (username: string): string => {
    return username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .trim()
        .toLowerCase();
};