import {
    monads, factorial, sqrt, neg, sin, cos, tan, sinh, cosh, tanh,
    asin, acos, atan, asinh, acosh, atanh, isDigitsOrDot
} from './core.js';

export function evalpostfix(pf) {
    let stack = [];
    for (let i = 0; i < pf.length; i++) {
        if (isDigitsOrDot(pf[i])) {
            stack.push(parseFloat(pf[i]));
        } else {
            let operator = pf[i];
            let result = 0.0;
            if (monads.includes(operator)) {
                let n = parseFloat(stack.pop());
                if (operator === "!") result = factorial(n);
                else if (operator === "sqrt") result = sqrt(n);
                else if (operator === "neg") result = neg(n);
                else if (operator === "ln") result = Math.log(n);
                else if (operator === "log") result = Math.log10(n);
                else if (operator === "exp") result = Math.exp(n);
                else if (operator === "sin") result = sin(n);
                else if (operator === "cos") result = cos(n);
                else if (operator === "tan") result = tan(n);
                else if (operator === "sinh") result = sinh(n);
                else if (operator === "cosh") result = cosh(n);
                else if (operator === "tanh") result = tanh(n);
                else if (operator === "asin") result = asin(n);
                else if (operator === "acos") result = acos(n);
                else if (operator === "atan") result = atan(n);
                else if (operator === "asinh") result = asinh(n);
                else if (operator === "acosh") result = acosh(n);
                else if (operator === "atanh") result = atanh(n);
                else throw new Error("Unknown monad operator: " + operator);
                stack.push(result);
            } else {
                let n2 = parseFloat(stack.pop());
                let n1 = parseFloat(stack.pop());
                if (operator === "+") result = n1 + n2;
                else if (operator === "-") result = n1 - n2;
                else if (operator === "*") result = n1 * n2;
                else if (operator === "/") result = n1 / n2;
                else if (operator === "^") result = Math.pow(n1, n2);
                else if (operator === "%") result = n1 % n2;
                else if (operator === "//") result = Math.floor(n1 / n2);
                else throw new Error("Unknown operator: " + operator);
                stack.push(result);
            }
        }
    }
    return stack[stack.length - 1];
}

export function format_out(flt) {
    if (Math.abs(flt) === Infinity) {
        return "Infinity";
    }
    let out = 0.0;
    if (typeof flt === "number") {
        if (isNaN(flt)) return "NaN";
        out = parseFloat(flt);
        if (out === Math.round(out)) {
            out = Math.round(out);
        }
        return out.toString();
    }
    return String(flt);
}