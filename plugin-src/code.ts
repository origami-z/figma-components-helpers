import { PostToFigmaMessage, PostToUIMessage } from "../shared-src/index";

figma.showUI(__html__, { themeColors: true, height: 400 });

figma.ui.onmessage = async (msg: PostToFigmaMessage) => {
  if (msg.type === "createComponents") {
    const componentNameKeyMap = new Map();
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "FRAME") {
        const frame = node;
        const component = figma.createComponent();
        component.x = frame.x;
        component.y = frame.y;
        component.name = frame.name;
        component.resizeWithoutConstraints(frame.width, frame.height);
        for (const child of frame.children) {
          component.appendChild(child);
        }
        frame.remove();
        componentNameKeyMap.set(component.name, component.key);
      }
    });
    figma.notify(
      `Successfully created ${componentNameKeyMap.size} components. 🚀`
    );
    const nameKeyMap = Object.fromEntries(componentNameKeyMap);
    figma.ui.postMessage({
      type: "newComponentsKeyMap",
      keymap: JSON.stringify(nameKeyMap),
    } as PostToUIMessage);
  } else if (msg.type === "generateComponentsKeyMap") {
    const componentNameKeyMap = new Map();
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "COMPONENT") {
        componentNameKeyMap.set(node.name, node.key);
      }
    });
    figma.notify(`Mapping created for ${componentNameKeyMap.size} components.`);
    const nameKeyMap = Object.fromEntries(componentNameKeyMap);
    figma.ui.postMessage({
      type: "newComponentsKeyMap",
      keymap: JSON.stringify(nameKeyMap),
    } as PostToUIMessage);
  } else if (msg.type === "removeComponentPrefix") {
    figma.currentPage.selection.forEach((node) => {
      if (node.type === "COMPONENT") {
        node.name = node.name.slice(node.name.indexOf("/") + 1);
      }
    });
    figma.notify("Prefix removed");
  }
};
