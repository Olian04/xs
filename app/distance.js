module.exports = function levenshteinDistance(w1, w2) {
    const matrix = Array(w1.length+1).fill(undefined)
        .map(v => Array(w2.length+1).fill(undefined))
        .map((v, i) => {
            if (i === 0) {
                v = v.map((_, i) => i);
            } else {
                v[0] = i;
            }
            return v;
        });

    for (let i = 1; i <= w1.length; i++) {
        for (let j = 1; j <= w2.length; j++) {
            const cost = w1[i-1] === w2[j-1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i-1][j]+1,
                matrix[i][j-1]+1,
                matrix[i-1][j-1]+cost
            );
        }
    }
    return matrix[w1.length][w2.length] + 1;
}