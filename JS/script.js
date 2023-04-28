const eleGrid = document.querySelector('.grid');
const btnPlay = document.querySelector('#play');
const selectLevel = document.querySelector('#level');
const eleHelp = document.querySelector('.help');

let nCells;
let arrMines;
let score;


btnPlay.addEventListener('click', function() {

	eleHelp.classList.add('hidden');

	eleGrid.classList.remove('hidden');

	nCells = parseInt(selectLevel.value);

	eleGrid.style.setProperty('--sideSquare', Math.sqrt(nCells));

	arrMines = generateRandomArray(1, nCells, 16);
	console.log(arrMines);

	score = 0;

	createGrid(nCells, eleGrid);
});

// FUNCTION


function createGrid(nCells, eleContainer) {
	console.log(nCells);

	const side = Math.sqrt(nCells);

	eleContainer.innerHTML = '';

	for (let i = 1; i <= nCells; i++) {
		const eleCell = document.createElement('div');
		eleCell.innerHTML = i;
		eleCell.classList.add('cell');
		arrMines.includes(i) ? eleCell.classList.add('mine-helper') : '';
		eleContainer.append(eleCell);

		eleCell.addEventListener('click', cellClick);
	}
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateRandomArray(min, max, nElements) {
	let arr = [];
	for (let i = 0; i < nElements; i++) {

		let randomNum;
		do {
			randomNum = getRandomInteger(min, max);
		} while (arr.includes(randomNum))

		arr.push(randomNum);
	}

	return arr;
}

function cellClick() {
	const numCell = parseInt(this.innerHTML);
	this.removeEventListener('click', cellClick);
	if (arrMines.includes(numCell)) {
		this.classList.add('mine');
		endGame(true,  'Hai perso. Punteggio: ' + score);
	} else {
		this.classList.add('clicked');
		score++;
		if (nCells - score == 16) {
			endGame(false, 'Hai vinto. Punteggio: ' + score);
		}
	}
}

function endGame(isLost, message) {
	// togliere gli event listener ed illuminare tutte le bombe
	const cells = document.querySelectorAll('.cell');
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', cellClick);
		const numCell = parseInt(cells[i].innerHTML);
		isLost && arrMines.includes(numCell) ? cells[i].classList.add('mine') : '';
	}
	// dire il punteggio
	console.log(message);
}