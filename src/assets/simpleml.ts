// use newton's method to find gradient descent solution of input/output data

type Data = [input: number, output: boolean][];
type MultiInputData = [input: number[], output: boolean][];
type DataObject = Record<string, number>[];

function scoreDivision(data: Data, division: number) {
  let incorrect = 0;

  for (let [input, output] of data) {
    if (input < division) {
      // When an input is less than division, it is classified as TRUE.
      // Therefore, if the expected output is FALSE, it is incorrect.
      if (!output) incorrect++;
    } else {
      // When an input is greater than division, it is classified as FALSE.
      // Therefore, if the expected output is TRUE, it is incorrect.
      if (output) incorrect++;
    }
  }

  return Math.min(incorrect, data.length - incorrect);
}

export function getDivisions(data: Data) {
  let inputs = data.map((e) => e[0]);
  let divisions = inputs
    .slice(0, -1)
    .map((e, i) => (e * 1e16 + inputs[i + 1] * 1e16) / 2e16)
    .concat(Math.min(...inputs) - 1, Math.max(...inputs) + 1);

  let accuracies: [division: number, numCorrect: number][] = [];

  for (let division of divisions)
    accuracies.push([division, scoreDivision(data, division)]);

  return accuracies;
}

export function getBestDivision(data: Data) {
  let accuracies = getDivisions(data);
  let bestAccuracy = Math.min(...accuracies.map((e) => e[1]));
  return accuracies.find((e) => e[1] === bestAccuracy)!;
}

export function getBestMultiInputDivision(
  data: MultiInputData
): [index: number, division: number, numCorrect: number] {
  let datasets = data[0][0].map((_, i) =>
    data.map<[input: number, output: boolean]>(([input, output]) => [
      input[i],
      output,
    ])
  );

  let accuracies = datasets.map((dataset) => getBestDivision(dataset));
  let bestAccuracy = Math.min(...accuracies.map((e) => e[1]));

  return [
    accuracies.map((e) => e[1]).indexOf(bestAccuracy),
    ...accuracies.find((e) => e[1] === bestAccuracy)!,
  ];
}

export function getBestObjectDivison(
  data: DataObject,
  output: string
): [key: string, division: number, numCorrect: number] {
  let dataset = data.map<[number[], boolean]>((entry) => [
    Object.entries(entry)
      .filter(([key]) => key != output)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value),
    !!entry[output],
  ]);

  let [index, division, numCorrect] = getBestMultiInputDivision(dataset);

  return [
    Object.keys(data[0])
      .filter((key) => key != output)
      .sort()[index],
    division,
    numCorrect,
  ];
}
