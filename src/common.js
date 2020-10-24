// FACTABLE

export const someConstant = "someConstant";

export function arrayOfElementsToString(arr, wrap = "") {
  console.log("arrayOfElementsToString called! ", arr);
  return `\n<${wrap}>\t${arr.join("-")}</${wrap}>`;
}

export const arrayElementsWrapper = (str1, str2) => (arr) => {
  console.log("arrayElementsWrapper called! ", str1, str2);
  return arr.map((elem) => `${str1}${elem}${str2}`);
};

// NOT WORKING:
// export const applier = (toApply) => {
//   return (elem) => {
//     return toApply(elem);
//   };
// };

export const applier = (toApply) => (elem) => {
  return toApply(elem);
};

export const destructuredProps = (
  { foo, bar, dontshowthis },
  vamos = "yeahh"
) => (meGusta) => {
  return `${dontshowthis ? "" : foo + bar}${vamos}${meGusta}`;
};
