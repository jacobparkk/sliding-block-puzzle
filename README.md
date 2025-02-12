# Block Shuffle Puzzle

A classic sliding block puzzle game built with HTML, CSS, and JavaScript. Test your spatial reasoning skills by rearranging the shuffled blocks to restore the original order!

## Table of Contents

*   [Description](#description)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [How to Play](#how-to-play)
*   [Installation & Setup](#installation--setup)
*   [Project Structure](#project-structure)
*   [Solvability Explanation](#solvability-explanation)
*   [Contributing](#contributing)
*   [License](#license)

## Description

Block Shuffle Puzzle is a web-based implementation of the classic 15-puzzle (and its variations with different grid sizes).  The game presents a grid of numbered blocks with one block missing.  The player must slide blocks into the empty space to rearrange them into the correct order (usually 1 to N, with the empty space in the bottom right corner).

## Features

*   **Randomly Generated Puzzles:**  Each game presents a new, *solvable* puzzle.
*   **Drag-and-Drop Interface:**  Intuitive drag-and-drop controls for moving blocks.
*   **Solvability Guarantee:** The puzzle generation algorithm ensures that every puzzle is solvable.  No frustrating, impossible puzzles!
*   **Win Detection:** The game automatically detects when the puzzle is solved and displays a "You Win!" message.
*   **Dynamic Grid Size:**  The game is currently set up for a 3x3 grid, but it's designed to easily accommodate different grid sizes (4x4, 5x5, etc.) with minimal code changes.
*   **Responsive Design:** The game layout adapts to different screen sizes.

## Technologies Used

*   **HTML5:** For the structure of the web page.
*   **CSS3:** For styling and layout, including CSS Grid for the puzzle board.
*   **JavaScript (ES6+):** For the core game logic, drag-and-drop handling, puzzle generation, and win condition checking.  Uses the native HTML5 Drag and Drop API.
*   **No Frameworks:**  The project is built with vanilla JavaScript for simplicity and clarity.

## How to Play

1.  **Start the Game:** Click the "New Game" button to generate a new shuffled puzzle.
2.  **Drag and Drop:** Click and drag a block adjacent to the empty space to move it.  You can only move blocks directly into the empty space (no diagonal moves).
3.  **Solve the Puzzle:**  Continue moving blocks until they are in numerical order from left to right and top to bottom, with the empty space in the bottom right corner.
4.  **Win Condition:** The game will display a "You Win!" message when the puzzle is solved.

## Installation & Setup

This project requires no special installation. Simply clone the repository and open `index.html` in a web browser:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```
    (Replace `<repository-url>` with the actual URL of your GitHub repository.)

2.  **Navigate to the project directory:**

    ```bash
    cd block-shuffle-puzzle
    ```

3.  **Open `index.html` in your browser:**

    You can double-click the `index.html` file, or open it directly from your browser (e.g., File > Open File...).

## Project Structure
```
block-shuffle-puzzle/
├── index.html (Main HTML file)
├── style.css (CSS styling)
└── script.js (JavaScript logic)
```


*   **`index.html`:**  Contains the basic HTML structure of the game, including the puzzle board, message area, and "New Game" button.
*   **`style.css`:**  Contains the CSS styles for the game, including the layout of the puzzle board, the appearance of the blocks, and visual feedback for drag-and-drop interactions.  Uses CSS Grid for the puzzle board layout.
*   **`script.js`:**  Contains the JavaScript code that implements the game logic:
    *   Puzzle generation (including ensuring solvability).
    *   Drag-and-drop event handling.
    *   Win condition checking.
    *   Board rendering and updating.

## Solvability Explanation

Not all random shuffles of a sliding block puzzle are solvable.  This project uses an algorithm to guarantee that every generated puzzle *can* be solved.  The algorithm is based on counting *inversions*.

*   **Inversion:** An inversion is a pair of tiles where a larger number appears *before* a smaller number (when reading the tiles from left to right, top to bottom).

*   **Solvability Rules:**

    *   **Odd-Sized Grids (e.g., 3x3):**  A puzzle is solvable if the number of inversions is *even*.
    *   **Even-Sized Grids (e.g., 4x4):** A puzzle is solvable if:
        *   The blank tile is on an *even* row (counting from the bottom, starting at 1), *and* the number of inversions is *odd*.
        *   The blank tile is on an *odd* row (counting from the bottom, starting at 1), *and* the number of inversions is *even*.
        *   The row number of the empty tile is calculated from zero from the top, as implemented in the `isSolvable()` method.

The `isSolvable()` function in `script.js` implements this logic to ensure that only solvable puzzles are generated.

## Contributing

Contributions are welcome!

## License

Anybody can use for personal use!