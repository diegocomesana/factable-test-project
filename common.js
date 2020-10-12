// FACTABLE

export const someConstant = "someConstant";

export function arrayOfElementsToString(arr, wrap = "") {
  console.log("arrayOfElementsToString called! ", arr);
  return `\n<${wrap}>\t${arr.join("")}</${wrap}>`;
}

export const arrayElementsWrapper = (str1, str2) => (arr) => {
  console.log("arrayElementsWrapper called! ", str1, str2);
  return arr.map((elem) => `${str1}${elem}${str2}`);
};

export const applier = (toApply) => {
  return (elem) => {
    return toApply(elem);
  };
};
