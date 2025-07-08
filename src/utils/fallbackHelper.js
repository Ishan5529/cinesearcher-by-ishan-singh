import { isEmpty } from "ramda";

export const fallbackHelper = (content, fallbackToContent) => {
  if (isEmpty(content)) {
    return fallbackToContent;
  }

  if (content === "N/A") {
    return fallbackToContent;
  }

  return content;
};
