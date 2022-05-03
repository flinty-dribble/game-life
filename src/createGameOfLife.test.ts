/**
 * @jest-environment jsdom
 */

/* eslint-disable no-param-reassign */
import { createGameOfLife } from "./createGameOfLife";
import { drawField } from "./drawField";

jest.mock("./drawField");

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe("createGameOfLife", () => {
  let element: HTMLElement;
  let originalAlert = jest.spyOn(window, "alert");
  beforeEach(() => {
    element = document.createElement("div");
    originalAlert = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
    originalAlert = jest.spyOn(window, "alert");
  });
  describe("UI", () => {
    it("creates Start button and field", () => {
      createGameOfLife(10, 10, element);
      expect(element.querySelector("button")).toBeTruthy();
      expect(element.querySelector("button")!.innerHTML).toBe("Start");
      expect(element.querySelector(".field-wrapper")).toBeTruthy();
    });
    it("changes button name on click", () => {
      createGameOfLife(10, 10, element);
      expect(element.querySelector("button")!.innerHTML).toBe("Start");
      element.querySelector("button")!.click();
      expect(element.querySelector("button")!.innerHTML).toBe("Stop");
      element.querySelector("button")!.click();
      expect(element.querySelector("button")!.innerHTML).toBe("Start");
      element.querySelector("button")!.click();
      expect(element.querySelector("button")!.innerHTML).toBe("Stop");
    });
    it("draws field", () => {
      (drawField as jest.Mock).mockImplementation((fieldEl, field) => {
        fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
      });
      createGameOfLife(2, 2, element);
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("redraw field on interaction with it", () => {
      let onCellClick: Function | undefined;
      (drawField as jest.Mock).mockImplementation(
        (fieldEl, field, cellClickHandler) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );

      createGameOfLife(2, 2, element);
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
      if (onCellClick != undefined) {
        onCellClick(0, 0);
      }

      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [1, 0],
          [0, 0],
        ])})`
      );
      if (onCellClick != undefined) {
        onCellClick(0, 0);
      }
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
      if (onCellClick != undefined) {
        onCellClick(0, 1);
        onCellClick(1, 1);
      }
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [1, 1],
        ])})`
      );
    });
    it("on start it runs 1sec timer to update state", async () => {
      let onCellClick: Function | undefined;
      (drawField as jest.Mock).mockImplementation(
        (fieldEl, field, cellClickHandler) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      if (onCellClick != undefined) {
        onCellClick(0, 0);
      }
      element.querySelector("button")!.click();
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [1, 0],
          [0, 0],
        ])})`
      );
      await sleep(1000);
      expect(element.querySelector(".field-wrapper")!.innerHTML).toBe(
        `drawField(${JSON.stringify([
          [0, 0],
          [0, 0],
        ])})`
      );
    });
    it("stops game with alert, when none alive", async () => {
      let onCellClick: Function | undefined;
      (drawField as jest.Mock).mockImplementation(
        (fieldEl, field, cellClickHandler) => {
          onCellClick = cellClickHandler;
          fieldEl.innerHTML = `drawField(${JSON.stringify(field)})`;
        }
      );
      createGameOfLife(2, 2, element);
      if (onCellClick != undefined) {
        onCellClick(0, 0);
      }
      element.querySelector("button")!.click();
      await sleep(1000);
      expect(window.alert).toHaveBeenCalledWith("Death on the block");
      expect(element.querySelector("button")!.innerHTML).toBe("Start");
    });
  });
});
