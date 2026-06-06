import { isUndefined } from "es-toolkit";

type PromptOptions = {
  tag?: string;
  props?: Record<string, string>;
};

const prompt = (raw: string, options?: PromptOptions) => {
  const { tag, props } = options ?? {};

  if (isUndefined(tag)) {
    return raw;
  }

  const additionalProps = isUndefined(props)
    ? ""
    : " " +
      Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");

  return `<${tag}${additionalProps}>${raw}</${tag}>`;
};

const lineBreak = () => "\n";

export { prompt, lineBreak };
