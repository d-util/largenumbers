import { monads, isDigitsOrDot } from './core.js';

export function splitExpression(exp) {
    let split = [];
    let e = exp.trim();
    let i = 0;
    while (i < e.length) {
        if ("()".includes(e[i])) {
            split.push(e[i]);
            i++;
        } else {
            let match_found = false;
            for (let length = 7; length >= 2; length--) {
                if (monads.includes(e.slice(i, i + length))) {
                    split.push(e.slice(i, i + length));
                    i += length;
                    match_found = true;
                    break;
                }
            }
            if (!match_found) {
                if (isDigitsOrDot(e[i])) {
                    let num = "";
                    while (i < e.length && isDigitsOrDot(e[i])) {
                        num += e[i];
                        i++;
                    }
                    split.push(num);
                } else if (e[i] === "-" && 
                    (i === 0 || !isDigitsOrDot(e[i - 1])) && 
                    (i < e.length - 1 && isDigitsOrDot(e[i + 1]))
                ) {
                    split.push("neg");
                    i++;
                } else {
                    split.push(e[i]);
                    i++;
                }
            }
        }
    }
    return split.map(s => s.trim());
}

export function prec(c) {
    if (["%", "//"].includes(c)) {
        return 4;
    } else if (["^", "rt"].includes(c)) {
        return 3;
    } else if (["/", "*"].includes(c)) {
        return 2;
    } else if (["+", "-"].includes(c)) {
        return 1;
    } else if (monads.includes(c)) {
        return 5;
    } else {
        return -1;
    }
}