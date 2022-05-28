export type ComponentNameKeyMapToUIMessage = {
  type: "newComponentsKeyMap";
  keymap: string;
};

export type PostToUIMessage = ComponentNameKeyMapToUIMessage;

export type CreateComponentsToFigmaMessage = {
  type: "createComponents";
};

export type GenerateComponentsKeyMapToFigmaMessage = {
  type: "generateComponentsKeyMap";
};

export type RemoveComponentPrefixToFigmaMessage = {
  type: "removeComponentPrefix";
};

export type PostToFigmaMessage =
  | CreateComponentsToFigmaMessage
  | GenerateComponentsKeyMapToFigmaMessage
  | RemoveComponentPrefixToFigmaMessage;
