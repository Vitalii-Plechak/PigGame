'use strict';

class PigGame {
    constructor(goal = 100) {
        this.goalScore = goal;
        this.dice = document.querySelector('.dice');
        this.diceEdges = [
            'dice-1.png',
            'dice-2.png',
            'dice-3.png',
            'dice-4.png',
            'dice-5.png',
            'dice-6.png'
        ];
        this.newGameBtn = document.querySelector('.btn--new');
        this.rollDiceBtn = document.querySelector('.btn--roll');
        this.holdBtn = document.querySelector('.btn--hold');
        this.winnerWrapper = document.querySelector('.winner');
        this.playersScore = [0, 0];
        this.activePlayer = 0;
        this.randomNumber = 0;
        this.currentScore = 0;

        this.init();
    }

    /**
     * Init method
     */
    init = () => {
        // Append goal score
        document.querySelector('.max-score-number').innerText = this.goalScore;

        this.rollDice();
        this.setHold();

        // Click new game button
        this.newGameBtn.addEventListener('click', () => window.location.reload());
    }

    /**
     * Roll dice and switch player if random number equal 1
     */
    rollDice = () => {
        this.rollDiceBtn.addEventListener('click', () => {
            this.randomNumber = this.getRandomNumber();
            const diceSrc = this.dice.src;
            const diceImg = /[^/]*$/.exec(diceSrc)[0];

            // Change dice image
            if (diceImg) {
                this.dice.src = diceSrc.replace(diceImg, this.diceEdges[this.randomNumber - 1]);
            }

            this.setScore();

            // Change player if random number === 1
            if (this.randomNumber === 1) {
                this.switchPlayer();
            }
        })
    }

    /**
     * Switch player method
     * Call determinePlayer method inside
     */
    switchPlayer = () => {
        const player = document.getElementsByClassName('player');
        const playerActiveClass = 'player--active';
        let i = 0, len = player.length;

        while (i < len) {
            if (player[i].classList.contains(playerActiveClass)) {
                player[i].classList.remove(playerActiveClass);

                // Reset current score
                player[i].querySelector('.current-score').textContent = '0';
                this.currentScore = 0;
            } else {
                player[i].classList.add(playerActiveClass);
            }

            i++;
        }

        this.determinePlayer();
    }

    /**
     * Set current player score
     */
    setScore = () => {
        const activePlayer = document.querySelector('.player.player--active');
        const activePlayerCurrentScore = activePlayer.querySelector('.current-score');

        if (this.randomNumber === 1) {
            this.currentScore = 0;
            activePlayerCurrentScore.textContent = this.currentScore;
        } else {
            this.currentScore += this.randomNumber;
            activePlayerCurrentScore.textContent = this.currentScore;
        }
    }

    /**
     * Hold button click interactions
     * Set players total score
     * Determine whether player is winner, if not, switch player
     */
    setHold = () => {
        this.holdBtn.addEventListener('click', () => {
            const activePlayer = document.querySelector('.player.player--active');
            const activePlayerScoreElement = activePlayer.querySelector('.score');

            if (this.randomNumber !== 1) {
                this.playersScore[this.activePlayer] += this.currentScore;
                activePlayerScoreElement.textContent = this.playersScore[this.activePlayer];
            }

            // Check is player win
            if (!this.isWinner()) {
                // Switch player
                this.switchPlayer();
            }
        })
    }

    /**
     * Check if player win
     *
     * @returns {boolean}
     */
    isWinner = () => {
        if (this.playersScore[this.activePlayer] >= this.goalScore) {
            this.rollDiceBtn.disabled = true;
            this.holdBtn.disabled = true;

            document.querySelector('.player.player--active').classList.add('player--winner');

            return true;
        }
    }

    /**
     * Determine current player number
     */
    determinePlayer = () => {
        const activePlayer = document.querySelector('.player.player--active');
        this.activePlayer = activePlayer.classList.contains('player--0') ? 0 : 1;
    }

    /**
     * Generate random number from 1 to 6
     */
    getRandomNumber = () => {
        const min = Math.ceil(1);
        const max = Math.floor(6);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

new PigGame();