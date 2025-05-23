import { splitExpression } from './parser.js';
import { topostfix } from './postfix.js';
import { evalpostfix, format_out } from './eval.js';
import { help } from './help.js';

export function evaluate(expr) {
    if (splitExpression(expr.replace(/ /g, "")).length < 2) {
        return parseFloat(expr);
    }
    let ans = evalpostfix(topostfix(splitExpression(expr.replace(/ /g, ""))));
    return ans;
}

export function parse(expr) {
    if (expr === "help") {
        return help();
    }
    return format_out(evaluate(expr));
}

const terminal = document.getElementById('terminal');

function addPrompt() {
    // Remove any existing input
    const oldInput = document.getElementById('prompt');
    if (oldInput) oldInput.disabled = true;

    // Add prompt line
    const promptLine = document.createElement('div');
    promptLine.innerHTML = '<span style="font-size:1.1em;font-family:monospace;color:white;">dCalc&gt; </span>';
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
            try {
                const result = parse(input.value);
                if (result === "NaN") {
                    outputLine.textContent = "Error: Result is not a number (NaN)";
                    outputLine.style.color = 'red';
                } else {
                    outputLine.textContent = result;
                    outputLine.style.color = '#888';
                }
            } catch (err) {
                outputLine.textContent = "Error: " + (err.message || err);
                outputLine.style.color = 'red';
            }
            outputLine.className = 'output-line';
            terminal.appendChild(outputLine);

            const extraBlankLine = document.createElement('div');
            extraBlankLine.innerHTML = '<br>';
            terminal.appendChild(extraBlankLine);

            addPrompt();
            terminal.scrollTop = terminal.scrollHeight;
        }
    });
}

// Start with prompt only
addPrompt();