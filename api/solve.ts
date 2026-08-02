import words from 'an-array-of-english-words';

// ১. মেমোরিতে শব্দ সাজিয়ে রাখার ইনডেক্স বক্স
const signatureMap: Record<string, string[]> = {};

// ২. সাইট চালু হওয়ার সাথে সাথে ডিকশনারি প্রসেস করার নিয়ম
words.forEach((word: string) => {
    const cleanWord = word.toLowerCase().trim();
    if (!cleanWord) return;
    const signature = cleanWord.split('').sort().join('');
    if (!signatureMap[signature]) {
        signatureMap[signature] = [];
    }
    signatureMap[signature].push(cleanWord);
});

// ৩. আসল সলভার ফাংশন যা ক্র্যাশ ছাড়াই চোখের পলকে শব্দ খুঁজবে
export function solveJumble(input: string): Record<number, string[]> {
    const cleanInput = input.trim().toLowerCase();
    const inputLen = cleanInput.length;
    const resultsByLength: Record<number, string[]> = {};

    const inputCounts: Record<string, number> = {};
    for (const char of cleanInput) {
        inputCounts[char] = (inputCounts[char] || 0) + 1;
    }

    for (const signature in signatureMap) {
        if (signature.length > inputLen) continue;

        let isMatch = true;
        const sigCounts: Record<string, number> = {};
        for (const char of signature) {
            sigCounts[char] = (sigCounts[char] || 0) + 1;
            if (!inputCounts[char] || sigCounts[char] > inputCounts[char]) {
                isMatch = false;
                break;
            }
        }

        if (isMatch) {
            const wordLen = signature.length;
            if (!resultsByLength[wordLen]) {
                resultsByLength[wordLen] = [];
            }
            resultsByLength[wordLen].push(...signatureMap[signature]);
        }
    }

    return resultsByLength;
}
