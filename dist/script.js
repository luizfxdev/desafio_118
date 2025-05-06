"use strict";
/**
 * Função para verificar se um número é primo
 * @param num Número a ser verificado
 * @returns Retorna true se o número for primo, false caso contrário
 */
function isPrime(num) {
    if (num <= 1)
        return false;
    if (num === 2)
        return true;
    // Verifica divisores até a raiz quadrada para otimização
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}
/**
 * Função para calcular a soma dos dígitos de um número
 * @param num Número para calcular a soma dos dígitos
 * @returns Soma dos dígitos do número
 */
function sumDigits(num) {
    return num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}
/**
 * Função principal que encontra e valida o número mágico
 * @returns Objeto com detalhes do cálculo e validação
 */
function calculateMagicDetails() {
    // Etapa 1: Encontrar primos menores que 20
    const primes = [];
    for (let i = 2; i < 20; i++) {
        if (isPrime(i))
            primes.push(i);
    }
    // Etapa 2: Calcular soma dos primos
    const sum = primes.reduce((acc, curr) => acc + curr, 0);
    // Etapa 3: Verificar condições
    const digitSum = sumDigits(sum);
    const remainder = sum % 10;
    return {
        primes,
        sum,
        digitSum,
        remainder,
        isValid: digitSum <= 25 && remainder === 7
    };
}
// Elementos do DOM
const decipherBtn = document.getElementById('decipherBtn');
const returnBtn = document.getElementById('returnBtn');
const resultBox = document.getElementById('result');
// Evento para o botão DECIFRAR
decipherBtn.addEventListener('click', () => {
    try {
        const { primes, sum, digitSum, remainder, isValid } = calculateMagicDetails();
        if (!isValid)
            throw new Error('Condições não satisfeitas');
        // Montagem do relatório detalhado
        resultBox.innerHTML = `
            <div class="calculation-steps">
                <h3>🔍 Passo a Passo da Decifração:</h3>
                <p>1. Primos menores que 20: ${primes.join(', ')}</p>
                <p>2. Soma dos primos: ${primes.join(' + ')} = <strong>${sum}</strong></p>
                <h3>✅ Verificações:</h3>
                <p>- Soma dos dígitos: ${sumDigits(sum)} (≤25 ✔️)</p>
                <p>- Resto da divisão por 10: ${sum} % 10 = ${remainder} (✔️)</p>
                <h2 class="magic-number">Número Mágico: ${sum}</h2>
                <p class="portal-status">✨ Portal aberto com sucesso! ✨</p>
            </div>
        `;
    }
    catch (error) {
        resultBox.textContent = error instanceof Error ? error.message : 'Erro desconhecido';
    }
});
// Evento para o botão RETORNAR
returnBtn.addEventListener('click', () => {
    resultBox.textContent = 'Aguardando decifração...';
});
