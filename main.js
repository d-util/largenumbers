import { splitExpression } from './parser.js';
import { topostfix } from './postfix.js';
import { evalpostfix, format_out } from './eval.js';

export function evaluate(expr) {
    if (splitExpression(expr.replace(/ /g, "")).length < 2) {
        return parseFloat(expr);
    }
    let ans = evalpostfix(topostfix(splitExpression(expr.replace(/ /g, ""))));
    return ans;
}

export function parse(expr) {
    return format_out(evaluate(expr));
}

const terminal = document.getElementById('terminal');

function addPrompt() {
    // Remove any existing input
    const oldInput = document.getElementById('prompt');
    if (oldInput) oldInput.disabled = true;

    // Add prompt line
    const promptLine = document.createElement('div');
    promptLine.innerHTML = 'UltraCalc 2025 &gt;&gt;&gt; ';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'prompt';
    input.autofocus = true;
    input.style.background = 'black';
    input.style.color = '#fff';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.fontFamily = 'monospace';
    input.style.width = '60%';
    promptLine.appendChild(input);
    terminal.appendChild(promptLine);

    input.focus();

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            input.disabled = true;

            // Show output line after the prompt
            const outputLine = document.createElement('div');
            outputLine.textContent = parse(input.value);
            outputLine.style.color = '#888';
            terminal.appendChild(outputLine);

            addPrompt();
            terminal.scrollTop = terminal.scrollHeight;
        }
    });
}

// Start with prompt only
addPrompt();