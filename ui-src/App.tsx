import React, { useEffect, useRef } from "react";
import { Button, ToolkitProvider } from "@jpmorganchase/uitk-core";
import { FlexLayout } from "@jpmorganchase/uitk-lab";

import { PostToFigmaMessage, PostToUIMessage } from "../shared-src";

import "./App.css";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    window.onmessage = async (event: {
      data: {
        pluginMessage: PostToUIMessage;
      };
    }) => {
      if (event.data.pluginMessage) {
        const { pluginMessage } = event.data;
        switch (pluginMessage.type) {
          case "newComponentsKeyMap": {
            if (textareaRef.current) {
              textareaRef.current.value = pluginMessage.keymap;
            }
            break;
          }
          default:
        }
      }
    };
  }, []);

  const onCreateComponents = () => {
    parent.postMessage(
      { pluginMessage: { type: "createComponents" } as PostToFigmaMessage },
      "*"
    );
  };

  const onGenerateMap = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "generateComponentsKeyMap",
        } as PostToFigmaMessage,
      },
      "*"
    );
  };

  const onRemovePrefix = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "removeComponentPrefix",
        } as PostToFigmaMessage,
      },
      "*"
    );
  };

  return (
    <ToolkitProvider>
      <main>
        <FlexLayout>
          <Button onClick={onCreateComponents}>Create Components</Button>
          <Button onClick={onGenerateMap}>Generate Map</Button>
        </FlexLayout>
        <textarea ref={textareaRef}></textarea>

        <FlexLayout>
          <Button onClick={onRemovePrefix}>Remove Prefix</Button>
        </FlexLayout>
      </main>
    </ToolkitProvider>
  );
}

export default App;
