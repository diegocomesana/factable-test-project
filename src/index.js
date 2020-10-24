import {
  arrayOfElementsToString,
  arrayElementsWrapper,
  applier,
  someConstant,
  destructuredProps,
} from "./common";

import { contentLoader } from "./utils";

console.log("running factable-test-project - ", someConstant);

const selfExecuting = (function () {
  console.log("selfExecuting!!");

  const elements1 = ["camila", "paula", "salvi", "laurín", "diego"];
  const elements2 = ["ucco", "bebu", "martu"];
  const familia1Wrapper = arrayElementsWrapper("<FAMILIA_1>", "</FAMILIA_1>");

  const familia2Wrapper = arrayElementsWrapper(
    "<FAMILIA_XXX>",
    "</FAMILIA_XXX>"
  );

  const wrapper = (wrap) => (towrap) => {
    return `\n<${wrap}>${
      Array.isArray(towrap) ? towrap.join("") : towrap
    }</${wrap}>\n`;
  };

  const tdApplier = applier(wrapper("td"));
  const liApplier = applier(wrapper("li"));

  const elements1Wrapped = familia1Wrapper(elements1);
  const elements2Wrapped = familia2Wrapper(elements2);

  console.log("elements1Wrapped: ", elements1Wrapped);
  console.log("elements2Wrapped: ", elements2Wrapped);

  const elements1WrappedLi = elements1.map(liApplier);
  const elements2WrappedTd = elements2Wrapped.map(tdApplier);

  console.log("elements1WrappedLi: ", tdApplier(elements1WrappedLi));
  console.log(
    "elements2WrappedTd: ",
    arrayOfElementsToString(elements2WrappedTd, "ROOT")
  );

  arrayOfElementsToString(elements2WrappedTd);

  destructuredProps({ foo: "still", bar: "working", dontshowthis: false })(
    "fine"
  );

  destructuredProps({ foo: "still2", bar: "working2", dontshowthis: true })(
    "fine"
  );

  console.log(
    "destructuredProps:",
    destructuredProps({ foo: "fooovalue", bar: "foooobar" })("it works")
  );

  destructuredProps(
    { foo: "diego", bar: "manuel", dontshowthis: false },
    "comesaña"
  )("ilikeit");

  destructuredProps(
    { foo: "diego", bar: "manuel", dontshowthis: true },
    "comesaña"
  )("just-lastname");

  return true;
})();

console.log("selfExecuting result: ", selfExecuting);

console.log(contentLoader({ content: "diego content", loading: false }));
console.log(contentLoader({ content: "should never be seen", loading: true }));
