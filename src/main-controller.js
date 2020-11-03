import {
  arrayOfElementsToString,
  arrayElementsWrapper,
  applier,
  someConstant,
  destructuredProps,
} from "./common";

import { contentLoader } from "./utils";
import { salida } from "./other";
import TestClass from "./test-class";

export const setDependencies = () => {
  return {};
};

export const execute = async (context) => {
  const { setResponseElement, getResponseState, req } = context;

  const tagFamilia = req.query.fa || "FAMILIA";

  console.log("NUEVO REQUEST: getResponseState(): ", getResponseState());

  const elements1 = ["camila", "paula", "salvi", "laurín", "diego"];
  const elements2 = ["ucco", "bebu", "martu"];
  const familia1Wrapper = arrayElementsWrapper(
    `<${tagFamilia}_1>`,
    `</${tagFamilia}_1>`
  );

  const familia2Wrapper = arrayElementsWrapper(
    `<${tagFamilia}_XXX>`,
    `</${tagFamilia}_XXX>`
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
  const elements1WrappedLi = elements1.map(liApplier);
  const elements2WrappedTd = elements2Wrapped.map(tdApplier);

  setResponseElement("value0", elements1Wrapped);
  setResponseElement(
    "value2",
    arrayOfElementsToString(elements2WrappedTd, "ROOT")
  );

  setResponseElement("value1", tdApplier(elements1WrappedLi));
  setResponseElement(
    "value2",
    arrayOfElementsToString(elements2WrappedTd, "ROOT")
  );
  setResponseElement("value3", elements2WrappedTd);
  setResponseElement(
    "value4",
    destructuredProps({
      foo: "still",
      bar: "working",
      dontshowthis: false,
    })("fine")
  );

  setResponseElement(
    "value5",
    destructuredProps({ foo: "still2", bar: "working2", dontshowthis: true })(
      "fine"
    )
  );

  setResponseElement(
    "value6",
    destructuredProps({ foo: "fooovalue", bar: "foooobar" })("it works")
  );

  setResponseElement(
    "value7",
    destructuredProps(
      { foo: "diego", bar: "manuel", dontshowthis: false },
      "comesaña"
    )("ilikeit")
  );

  setResponseElement(
    "value8",
    destructuredProps(
      { foo: "diego", bar: "manuel", dontshowthis: true },
      "comesaña"
    )("just-lastname")
  );

  setResponseElement(
    "value",
    contentLoader({ content: "diego content", loading: false })
  );
  setResponseElement(
    "value",
    contentLoader({ content: "should never be seen", loading: true })
  );
  setResponseElement("value", salida.primeraFunc("lalala"));
  setResponseElement("value", salida.primeraFunc("lololo"));
  setResponseElement("value", salida.segundaFunc("yeahhh"));

  const instance = new TestClass(22, 33);

  setResponseElement("value", instance.getValues("foooo"));
  setResponseElement("value", instance.getValues("barrr"));

  //   throw new Error("la re puta madreeeee"); // ends in 500

  return getResponseState();
};

export default {
  execute,
  setDependencies,
};
