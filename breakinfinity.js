const is_degrees = false;
const monads = ["!", "sqrt", "neg", "sin", "cos", "tan",
          "ln", "log", "exp",
          "sinh", "cosh", "tanh", "asin", "acos", "atan",
          "asinh", "acosh", "atanh"];

// Additional functions for monad operators
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function sqrt(n) {
    return Math.sqrt(n);
}

function neg(n) {
    return -n;
}

function trigop(_angle, _trigop) {
    return is_degrees ? _trigop(degToRad(_angle)) : _trigop(_angle);
}

function atrigop(_value, _atrigop) {
    return is_degrees ? radToDeg(_atrigop(_value)) : _atrigop(_value);
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

// Trigonometric functions
function sin(angle)   { return trigop(angle, Math.sin); }
function cos(angle)   { return trigop(angle, Math.cos); }
function tan(angle)   { return trigop(angle, Math.tan); }
function sinh(angle)  { return trigop(angle, Math.sinh); }
function cosh(angle)  { return trigop(angle, Math.cosh); }
function tanh(angle)  { return trigop(angle, Math.tanh); }

// Inverse trigonometric functions
function asin(value)  { return atrigop(value, Math.asin); }
function acos(value)  { return atrigop(value, Math.acos); }
function atan(value)  { return atrigop(value, Math.atan); }
function asinh(value) { return atrigop(value, Math.asinh); }
function acosh(value) { return atrigop(value, Math.acosh); }
function atanh(value) { return atrigop(value, Math.atanh); }

function isrealpos(string) {
    // Is a real positive number
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ".") continue;
        if (string[i] < "0" || string[i] > "9") return false;
    }
    return true;
}

function splitexpr(exp) {
    // Split Expression
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
                if (isrealpos(e[i])) {
                    let num = "";
                    while (i < e.length && isrealpos(e[i])) {
                        num += e[i];
                        i++;
                    }
                    split.push(num);
                } else if (e[i] === "-" && 
                    (i === 0 || !isrealpos(e[i - 1])) && 
                    (i < e.length - 1 && isrealpos(e[i + 1]))
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
    return split.map(s => s.trim())
}

function prec(c) {
    // Precedence
    if (["%", "//"].includes(c)) {
        return 4;
    } else if (["^", "rt"].includes(c)) {
        return 3;
    } else if (["/", "*"].includes(c)) {
        return 2;
    } else if (["+", "-"].includes(c)) {
        return 1;
    } else if (["+", "-"].includes(c)) {
        return 1;
    } else if (monads.includes(c)) {
        return 5;
    } else {
        return -1;
    }
}

// Infix to postfix
function topostfix(split) {
    let postfix = [];
    let stack = [];
    let c;
    for (let i = 0; i < split.length; i++) {
        c = split[i];
        if (isrealpos(c)) {
            postfix.push(c);
        } else if (c === "(") {
            stack.push(c);
        } else if (c === ")") {
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                postfix.push(stack.pop());
            }
            stack.pop();
        } else {
            while (stack.length > 0 && (prec(c) < prec(stack[stack.length - 1]))) {
                postfix.push(stack.pop());
            }
            stack.push(c);
        }
    }

    while (stack.length > 0 && (prec(c) < prec(stack[stack.length - 1]) || prec(split[i]) == prec(stack[stack.length - 1]))) {
        postfix.push(stack.pop());
    }
    return postfix;
}

function evalpostfix(pf) {
    let stack = [];
    for (let i = 0; i < pf.length; i++) {
        if (isrealpos(pf[i])) {
            stack.push(parseFloat(pf[i]));
        } else {
            let operator = pf[i];
            let result = 0.0;
            if (monads.includes(operator)) {
                let n = parseFloat(stack.pop());
                if (operator === "!") {
                    result = factorial(n);
                } else if (operator === "sqrt") {
                    result = sqrt(n);
                } else if (operator === "neg") {
                    result = neg(n);
                } else if (operator === "ln") {
                    result = Math.log(n);
                } else if (operator === "log") {
                    result = Math.log10(n);
                } else if (operator === "exp") {
                    result = Math.exp(n);
                } else if (operator === "sin") {
                    result = sin(n);
                } else if (operator === "cos") {
                    result = cos(n);
                } else if (operator === "tan") {
                    result = tan(n);
                } else if (operator === "sinh") {
                    result = sinh(n);
                } else if (operator === "cosh") {
                    result = cosh(n);
                } else if (operator === "tanh") {
                    result = tanh(n);
                } else if (operator === "asin") {
                    result = asin(n);
                } else if (operator === "acos") {
                    result = acos(n);
                } else if (operator === "atan") {
                    result = atan(n);
                } else if (operator === "asinh") {
                    result = asinh(n);
                } else if (operator === "acosh") {
                    result = acosh(n);
                } else if (operator === "atanh") {
                    result = atanh(n);
                } else {
                    throw new Error("Unknown monad operator: " + operator);
                }
                stack.push(result);
            } else {
                let n2 = parseFloat(stack.pop());
                let n1 = parseFloat(stack.pop());
                if (operator === "+") {
                    result = n1 + n2;
                } else if (operator === "-") {
                    result = n1 - n2;
                } else if (operator === "*") {
                    result = n1 * n2;
                } else if (operator === "/") {
                    result = n1 / n2;
                } else if (operator === "^") {
                    result = Math.pow(n1, n2);
                } else if (operator === "%") {
                    result = n1 % n2;
                } else if (operator === "//") {
                    result = Math.floor(n1 / n2);
                } else {
                    throw new Error("Unknown operator: " + operator);
                }
                stack.push(result);
            }
        }
    }
    return stack[stack.length - 1];
}

function format_out(flt) {
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
    // If flt is not a number, return as string (or "NaN" if you prefer)
    return String(flt);
}

function evaluate(expr) {
    if ((splitexpr(expr.replace(" ", "")) < 2).length) {
        return parseFloat(expr);
    }
    let ans = evalpostfix(topostfix(splitexpr(expr.replace(" ", ""))));
    return ans
}

function parse(input) {
    return format_out(evaluate(input));
}