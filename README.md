# UltraCalc
Do arithmetic with very large numbers e.g. 1e2e3e456 instead of being limited to 1.797e308. 
Calculation method is perfect for incremental games.

## Factorials
(5.1865e+19)! is the largest factorial without "Infinity".

The reason it's not (1.797e308)! is because currently the "string illusion" is limited to 10^10^21.

## Exponentiation
Limit: Powers whose result is less than 1e+1e+21 (used to be 1e+1e+308 but that created many errors, so that commit is now reverted)