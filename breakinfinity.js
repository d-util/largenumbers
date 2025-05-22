const is_degrees = false;
const monads = ["!", "sqrt", "neg", "sin", "cos", "tan",
          "ln", "log", "exp",
          "sinh", "cosh", "tanh", "asin", "acos", "atan",
          "asinh", "acosh", "atanh"];

// Additional functions for monad operators
function factorial(n) {
    return Math.factorial(n);
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
    return split.map(o => o.trim())
}

function parse(input) {
    return "Coming Soon...";
}