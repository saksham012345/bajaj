export const validateBfhlInput = (body) => {
    const keys = Object.keys(body);
    if (keys.length !== 1) return false;

    const key = keys[0];
    const value = body[key];

    if (key === 'fibonacci') {
        return typeof value === 'number' && value >= 0 && Number.isInteger(value);
    }

    if (['prime', 'lcm', 'hcf'].includes(key)) {
        return Array.isArray(value) && value.length > 0 && value.every(Number.isInteger);
    }

    if (key === 'AI') {
        return typeof value === 'string';
    }

    return false;
};
