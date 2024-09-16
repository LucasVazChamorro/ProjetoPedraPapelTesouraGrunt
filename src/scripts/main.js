document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');

    choices.forEach(choice => {
        choice.addEventListener('click', playGame);
    });

    function playGame(e) {
        const playerChoice = e.target.dataset.choice;
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        displayResult(playerChoice, computerChoice, winner);
    }

    function getComputerChoice() {
        const choices = ['pedra', 'papel', 'tesoura'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function getWinner(player, computer) {
        if (player === computer) return 'Empate';
        if (
            (player === 'pedra' && computer === 'tesoura') ||
            (player === 'papel' && computer === 'pedra') ||
            (player === 'tesoura' && computer === 'papel')
        ) {
            return 'Jogador';
        }
        return 'Computador';
    }

    function displayResult(player, computer, winner) {
        const resultText = `
            Jogador escolheu: ${player.toUpperCase()}<br>
            Computador escolheu: ${computer.toUpperCase()}<br>
            Resultado: ${winner === 'Empate' ? 'Empate!' : winner + ' venceu!'}
        `;
        result.innerHTML = resultText;
    }
});