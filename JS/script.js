const eleGrid = document.querySelector('.grid');
const btnPlay = document.querySelector('#play');
const selectLevel = document.querySelector('#level');
const eleHelp = document.querySelector('.help');

let arrMines;

btnPlay.addEventListener('click', function() {

	eleHelp.classList.add('hidden');

	eleGrid.classList.remove('hidden');

	const nCells = parseInt(selectLevel.value);

	eleGrid.style.setProperty('--sideSquare', Math.sqrt(nCells));

	arrMines = [];
	for (i = 0; i < 16; i++) {
		do {
			arrMines.push(getRndInteger(1, nCells));
		}
		while arrMines.includes(randomNum);
	}


	createGrid(nCells, eleGrid);
});

// FUNCTION

function createGrid(nCells, eleContainer) {

	const side = Math.sqrt(nCells);

	eleContainer.innerHTML = '';

	for (let i = 1; i <= nCells; i++) {
		const eleCell = document.createElement('div');
		eleCell.innerHTML = i;
		eleCell.classList.add('cell');
		eleContainer.append(eleCell);
		eleCell.addEventListener('click', function() {
			console.log('cliccata cella n° ' + this.innerHTML)
			this.classList.toggle('clicked');
		});
	}
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}