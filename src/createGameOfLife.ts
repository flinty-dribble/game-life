/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(
  sizeX: number,
  sizeY: number,
  htmlElement: HTMLElement
) {
  let gameIsRunning = false;
  let timer: number;

  // Создать блок для поля
  // Создать кнопку управления игрой
  htmlElement.innerHTML = `<div class="field-wrapper"></div><button>Start</button><input type="range" value="1000" min="100" max="1000" step="50"></input><label>speed</label>`;
  const fieldWrapper = htmlElement.querySelector(".field-wrapper");
  const button = htmlElement.querySelector("button");

  // Создать поле заданного размера
  let field = Array.from({ length: sizeY }).map(() =>
    Array.from({ length: sizeX }).fill(0)
  );

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame() {
    gameIsRunning = false;

    button!.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }
  function startGame() {
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;

    button!.innerHTML = "Stop";

    const input = htmlElement.querySelector("input");
    let inputValue = +input!.value;

    // - запустить таймер для обновления поля
    timer = window.setInterval(() => {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      field = getNextState(field as number[][]);
      drawField(fieldWrapper, field, cellClickHandler);
      if (!isAnyoneAlive(field as number[][])) {
        alert("Death on the block");
        stopGame();
      }
    }, inputValue);
  }

  button!.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}
