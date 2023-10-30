const { find, filter, map, forEach } = require("../");

describe("find()", () => {
  test("should return the first element in the array that causes the callback function to return `true`", () => {
    const array = [10, 20, 30];
    const callback = (element) => element === 20;

    const actual = find(array, callback);
    const expected = 20;
    expect(actual).toEqual(expected);
  });

  test("should return the first element for different inputs and callbacks", () => {
    expect(find([10, 20, 30], (element) => element > 25)).toEqual(30);
    expect(
      find(
        [null, undefined, "A", "B", 10],
        (element) => typeof element === "string"
      )
    ).toEqual("A");
    expect(
      find([[1], [2, 2], [3, 3, 3]], (element) => element.length > 1)
    ).toEqual([2, 2]);
    expect(
      find(
        [{ name: "Brandon" }, { name: "Alexis" }, { name: "Kason" }],
        (element) => element.name === "Alexis"
      )
    ).toEqual({ name: "Alexis" });
  });

  test("should return `undefined` if a matching value cannot be found", () => {
    const array = [10, 20, 30];
    const callback = (element) => element < 0;

    const actual = find(array, callback);
    const expected = undefined;
    expect(actual).toEqual(expected);
  });

  test("should not make use of the native `.find()` method", () => {
    const text = find.toString();
    expect(text).not.toMatch(/\.find\(/);
  });
});

describe("filter()", () => {
  test("should return all elements in an array that cause the callback to return `true`", () => {
    const array = [10, 20, 30];
    const callback = (element) => element >= 20;

    const actual = filter(array, callback);
    const expected = [20, 30];
    expect(actual).toEqual(expected);
  });

  test("should return the filtered list for different inputs and callbacks", () => {
    expect(filter([10, 20, 30], (element) => element > 25)).toEqual([30]);
    expect(
      filter(
        [null, undefined, "A", "B", 10],
        (element) => typeof element === "string"
      )
    ).toEqual(["A", "B"]);
    expect(
      filter([[1], [2, 2], [3, 3, 3]], (element) => element.length > 1)
    ).toEqual([
      [2, 2],
      [3, 3, 3],
    ]);
    expect(
      filter(
        [{ name: "Brandon" }, { name: "Alexis" }, { name: "Kason" }],
        (element) => element.name !== "Alexis"
      )
    ).toEqual([{ name: "Brandon" }, { name: "Kason" }]);
  });

  test("should return an empty array if no elements cause the callback to return a truthy value", () => {
    const array = [10, 20, 30];
    const callback = (element) => element < 0;

    const actual = filter(array, callback);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  test("should not make use of the native `.filter()` method", () => {
    const text = filter.toString();
    expect(text).not.toMatch(/\.filter\(/);
  });
});

describe("map()", () => {
  test("should return all elements in an array as transformed by the callback", () => {
    const array = [10, 20, 30];
    const callback = (element) => element + 1;

    const actual = map(array, callback);
    const expected = [11, 21, 31];
    expect(actual).toEqual(expected);
  });

  test("should return the transformed array for different inputs and callbacks", () => {
    expect(map([10, 20, 30], (element) => element * -1)).toEqual([
      -10, -20, -30,
    ]);
    expect(
      map(
        [null, undefined, "A", "B", 10],
        (element) => typeof element === "string"
      )
    ).toEqual([false, false, true, true, false]);
    expect(map([[1], [2, 2], [3, 3, 3]], (element) => element[0])).toEqual([
      1, 2, 3,
    ]);
    expect(
      map(
        [{ name: "Brandon" }, { name: "Alexis" }, { name: "Kason" }],
        (element) => ({ [element.name]: { purchasedTicket: true } })
      )
    ).toEqual([
      { Brandon: { purchasedTicket: true } },
      { Alexis: { purchasedTicket: true } },
      { Kason: { purchasedTicket: true } },
    ]);
  });

  test("should return an empty array if there are no elements in the array", () => {
    const array = [];
    const callback = (element) => element < 0;

    const actual = map(array, callback);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  test("should not make use of the native `.map()` method", () => {
    const text = map.toString();
    expect(text).not.toMatch(/\.map\(/);
  });
});

describe("forEach()", () => {
  test("should pass the element, the index, and the array into the callback, in that order", () => {
    const actual = [];
    const array = ["First", "Second", "Third"];
    const callback = (element, index, array) => {
      actual.push(`${index + 1} out of ${array.length}: ${element}`);
    };

    forEach(array, callback);
    const expected = [
      "1 out of 3: First",
      "2 out of 3: Second",
      "3 out of 3: Third",
    ];
    expect(actual).toEqual(expected);
  });

  // TBD
  test("should work for various inputs and callbacks", () => {
    const case1 = [];
    forEach([10, 20, 30], (element, index) => case1.push(element * index));
    expect(case1).toEqual([0, 20, 60]);

    const case2 = [];
    forEach([null, undefined, "A", "B", 10], (element) =>
      case2.push(element + "")
    );
    expect(case2).toEqual(["null", "undefined", "A", "B", "10"]);

    const case3 = [];
    forEach([[1], [2, 2], [3, 3, 3]], (element, index, array) =>
      case3.push([element.length, index, array.length])
    );
    expect(case3).toEqual([
      [1, 0, 3],
      [2, 1, 3],
      [3, 2, 3],
    ]);

    const case4 = [];
    forEach(
      [{ name: "Brandon" }, { name: "Alexis" }, { name: "Kason" }],
      (element, index) => case4.push({ [element.name]: index })
    );
    expect(case4).toEqual([{ Brandon: 0 }, { Alexis: 1 }, { Kason: 2 }]);
  });

  test("should not make use of the native `.forEach()` method", () => {
    const text = forEach.toString();
    expect(text).not.toMatch(/\.forEach\(/);
  });
});
