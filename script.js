document.addEventListener('DOMContentLoaded', () => {
    const puzzleBoard = document.getElementById('puzzle-board');
    const message = document.getElementById('message');
    const newGameButton = document.getElementById('new-game-button');
    let gridSize = 3; // Start with 3x3
    let cells = [];
    let emptyCellIndex = 0;

    // --- Drag and Drop Event Handlers ---
    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.index);
        event.target.classList.add('dragging');
    }

    function dragOver(event) {
      event.preventDefault(); // Necessary to allow drop
      if (event.target.classList.contains('puzzle-cell')) {
        event.target.classList.add('drag-over');
      }
    }

    function dragEnter(event) {
        event.preventDefault(); // Necessary in some browsers
    }

    function dragLeave(event) {
        if (event.target.classList.contains('puzzle-cell')) {
            event.target.classList.remove('drag-over');
        }
    }

    function dragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function drop(event) {
      event.preventDefault();
      if (!event.target.classList.contains('puzzle-cell')) {
          return; // Not a valid drop target
      }
      event.target.classList.remove('drag-over');

      const draggedIndex = parseInt(event.dataTransfer.getData('text/plain'));
      const targetIndex = parseInt(event.target.dataset.index);

      // Check if the move is valid (adjacent to the empty cell)
      if (isValidMove(draggedIndex, targetIndex)) {
          swapCells(draggedIndex, targetIndex);
          renderBoard();
          if (checkWin()) {
              message.textContent = 'You Win!';
          }
      }
    }
    // --- End Drag and Drop ---

    function createBoard() {
        const totalCells = gridSize * gridSize;
        cells = Array.from({ length: totalCells }, (_, i) => i + 1);
        emptyCellIndex = totalCells - 1; // Empty cell is the last one
        cells[emptyCellIndex] = null; // Represent the empty cell with null

         // Make it solvable.
        do {
            shuffleArray(cells);
        } while (!isSolvable());

        renderBoard();
    }

    function renderBoard() {
        puzzleBoard.innerHTML = ''; // Clear the board
        cells.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('puzzle-cell');
            cell.dataset.index = index;
            if (value === null) {
                cell.classList.add('empty');
            } else {
                cell.textContent = value;
                cell.draggable = true; // Make cells draggable
                cell.addEventListener('dragstart', dragStart);
                cell.addEventListener('dragend', dragEnd);
            }

            // Add drag and drop event listeners
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('drop', drop);
            puzzleBoard.appendChild(cell);
        });

          // Update grid template columns/rows for dynamic resizing
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
        puzzleBoard.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
      }

      // Ensure empty is not the last element.
      if (array.indexOf(null) === array.length -1)
        shuffleArray(array);
    }

    // Check if the shuffled puzzle is solvable
    function isSolvable() {
      let inversions = 0;
      const puzzleSize = cells.length;
      for (let i = 0; i < puzzleSize; i++) {
          for (let j = i + 1; j < puzzleSize; j++) {
              if (cells[i] && cells[j] && cells[i] > cells[j]) {
                  inversions++;
              }
          }
      }

      const emptyIndex = cells.indexOf(null);

        //For even grid sizes, an odd number of inversions, plus the row number of the blank square (counting from 0) is even for a solvable puzzle.
        //For odd grid sizes, the number of inversions must be even for a solvable puzzle.

      if (gridSize % 2 === 0) { // Even grid
          return (inversions + Math.floor(emptyIndex / gridSize)) % 2 === 0;
      } else { // Odd grid
          return inversions % 2 === 0;
      }
    }

    function isValidMove(draggedIndex, targetIndex) {
        const rowDiff = Math.abs(Math.floor(draggedIndex / gridSize) - Math.floor(targetIndex / gridSize));
        const colDiff = Math.abs((draggedIndex % gridSize) - (targetIndex % gridSize));

        // Check if the cells are adjacent (row or column difference of 1, but not both)
        // and if the target cell is the empty cell.
        return (
            (rowDiff === 1 && colDiff === 0 || rowDiff === 0 && colDiff === 1) &&
            cells[targetIndex] === null
        );
    }


    function swapCells(index1, index2) {
      [cells[index1], cells[index2]] = [cells[index2], cells[index1]];
      if (cells[index1] === null) emptyCellIndex = index1;
      if (cells[index2] === null) emptyCellIndex = index2;
    }

    function checkWin() {
      for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] !== i + 1) {
          return false;
        }
      }
      return true;
    }

    newGameButton.addEventListener('click', () => {
        message.textContent = ''; // Clear win message
        createBoard();
    });

    createBoard(); // Initialize the game
});