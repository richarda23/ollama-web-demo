import { ImageAnalysis } from "./api";

export type ImageCards = ImageAnalysis[];

type Action = "add" | "remove" | "replace" | "changed";

export type ActionPayload = {
  type: Action;
  payload: ImageAnalysis | ImageAnalysis[];
};

export type ReducerFunc = (
  state: ImageCards,
  action: ActionPayload
) => ImageCards;

export const reducer: ReducerFunc = (state, action) => {
  switch (action.type) {
    case "add":
      return [action.payload as ImageAnalysis, ...state];
    case "remove":
      return state.filter(
        (x) => x.filename !== (action.payload as ImageAnalysis).filename
      );
    case "replace":
      return [...(action.payload as ImageAnalysis[])];
    case "changed":
      return state.map((card) => {
        const updated = action.payload as ImageAnalysis;
        if (card.filename === updated.filename) {
          return updated;
        } else {
          return card;
        }
      });
    default:
      return state;
  }
};
