// use newton's method to find gradient descent solution of input/output data

type Data = [input: number, output: boolean][];
type MultiInputData = [input: number[], output: boolean][];
type DataObject = Record<string, number>[];
type SplitDataObject = [
  true: DataObject, // data that is classified as TRUE
  false: DataObject, // data that is classified as FALSE
  division: KeyedDivision // the division used to split the data
];

type Division = [division: number, numCorrect: number, direction: "lt" | "gte"]; // direction = which way the model believes TRUE is
type IndexedDivision = [index: number, ...division: Division];
type KeyedDivision = [key: string, ...division: Division];
type Model = [
  true: Model | KeyedDivision,
  false: Model | KeyedDivision,
  division: KeyedDivision
];

function scoreDivision(data: Data, division: number): Division {
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

  let direction: "lt" | "gte" = incorrect < data.length / 2 ? "lt" : "gte";
  return [division, Math.min(incorrect, data.length - incorrect), direction];
}

function indent(text: string) {
  return text.replace(/\n/g, "\n  ");
}

export function getDivisions(data: Data) {
  let inputs = data.map((e) => e[0]);
  let divisions = inputs
    .slice(0, -1)
    .map((e, i) => (e * 1e16 + inputs[i + 1] * 1e16) / 2e16)
    .concat(Math.min(...inputs) - 1, Math.max(...inputs) + 1);

  let accuracies: Division[] = [];

  for (let division of divisions)
    accuracies.push(scoreDivision(data, division));

  return accuracies;
}

export function getBestDivision(data: Data) {
  let accuracies = getDivisions(data);
  let bestAccuracy = Math.min(...accuracies.map((e) => e[1]));
  return accuracies.find((e) => e[1] === bestAccuracy)!;
}

export function getBestMultiInputDivision(
  data: MultiInputData
): IndexedDivision {
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
): KeyedDivision {
  let dataset = data.map<[number[], boolean]>((entry) => [
    Object.entries(entry)
      .filter(([key]) => key != output)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value),
    !!entry[output],
  ]);

  let [index, ...division] = getBestMultiInputDivision(dataset);

  return [
    Object.keys(data[0])
      .filter((key) => key != output)
      .sort()[index],
    ...division,
  ];
}

export function splitOnBestDivision(
  data: DataObject,
  output: string
): SplitDataObject {
  let predictsTrue: DataObject = [];
  let predictsFalse: DataObject = [];
  let [key, division, numCorrect, direction] = getBestObjectDivison(data, output); // prettier-ignore

  for (let entry of data) {
    if (
      (direction == "lt" && entry[key] < division) ||
      (direction == "gte" && entry[key] > division)
    ) {
      predictsTrue.push(entry);
    } else predictsFalse.push(entry);
  }

  return [predictsTrue, predictsFalse, [key, division, numCorrect, direction]];
}

export function createModel(
  depth: number,
  data: DataObject,
  output: string
): Model | KeyedDivision {
  let [onTrue, onFalse, division] = splitOnBestDivision(data, output);

  if (depth == 1) return division;
  return [
    createModel(depth - 1, onTrue, output),
    createModel(depth - 1, onFalse, output),
    division,
  ];
}

export function visualizeModel(
  model: Model | KeyedDivision,
  output: string
): string {
  if (model.length == 4) {
    return `
    if ${model[0]} < ${model[1]}
      ${output} = ${model[3] == "lt"}
    else
      ${output} = ${model[3] == "gte"}
    `.trim();
  } else {
    return `
    if ${model[2][0]} < ${model[2][1]}
      ${indent(
        model[2][3] == "lt"
          ? visualizeModel(model[0], output)
          : visualizeModel(model[1], output)
      )}
    else
      ${indent(
        model[2][3] == "lt"
          ? visualizeModel(model[1], output)
          : visualizeModel(model[0], output)
      )}
    `.trim();
  }
}

export function filterData(data: DataObject, keep: string[]) {
  return data.map((entry) =>
    Object.fromEntries(
      Object.entries(entry).filter(([key]) => keep.includes(key))
    )
  ) as any as DataObject;
}
