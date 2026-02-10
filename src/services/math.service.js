const getGCD = (a, b) => {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
};

export const getFibonacci = (n) => {
    if (n === 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
};

export const isPrime = (n) => {
    if (typeof n !== 'number' || !Number.isInteger(n)) return false;
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
};

export const getLCM = (arr) => {
    let ans = arr[0];
    for (let i = 1; i < arr.length; i++) {
        ans = (ans * arr[i]) / getGCD(ans, arr[i]);
    }
    return ans;
};

export const getHCF = (arr) => {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = getGCD(result, arr[i]);
    }
    return result;
};
