export const is_degrees = false;
export const monads = [
    "!", "sqrt", "neg", "sin", "cos", "tan",
    "ln", "log", "exp",
    "sinh", "cosh", "tanh", "asin", "acos", "atan",
    "asinh", "acosh", "atanh"
];

export function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export function sqrt(n) { return Math.sqrt(n); }
export function neg(n) { return -n; }

export function trigop(_angle, _trigop) {
    return is_degrees ? _trigop(degToRad(_angle)) : _trigop(_angle);
}
export function atrigop(_value, _atrigop) {
    return is_degrees ? radToDeg(_atrigop(_value)) : _atrigop(_value);
}
export function degToRad(deg) { return deg * Math.PI / 180; }
export function radToDeg(rad) { return rad * 180 / Math.PI; }

// Trigonometric functions
export function sin(angle)   { return trigop(angle, Math.sin); }
export function cos(angle)   { return trigop(angle, Math.cos); }
export function tan(angle)   { return trigop(angle, Math.tan); }
export function sinh(angle)  { return trigop(angle, Math.sinh); }
export function cosh(angle)  { return trigop(angle, Math.cosh); }
export function tanh(angle)  { return trigop(angle, Math.tanh); }

// Inverse trigonometric functions
export function asin(value)  { return atrigop(value, Math.asin); }
export function acos(value)  { return atrigop(value, Math.acos); }
export function atan(value)  { return atrigop(value, Math.atan); }
export function asinh(value) { return atrigop(value, Math.asinh); }
export function acosh(value) { return atrigop(value, Math.acosh); }
export function atanh(value) { return atrigop(value, Math.atanh); }

export function isDigitsOrDot(string) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ".") continue;
        if (string[i] < "0" || string[i] > "9") return false;
    }
    return true;
}