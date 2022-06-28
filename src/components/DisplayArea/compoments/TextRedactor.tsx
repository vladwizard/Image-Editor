import React from "react";

export default function ({getTextFromElement, setTextInElement, remove, close}: { getTextFromElement: any, setTextInElement: any, remove: any, close: any }) {

    const [text, setText] = React.useState<string>(getTextFromElement());


    return (
        <div className="textInput"
             onClick={() => {
                 if (text == '') {
                     remove();
                 } else {
                     setTextInElement(text);
                 }
                 close();
             }}
        >
                    <textarea value={text}
                              rows={
                                  text.length == 0 ? 1 :
                                      text.split('\n').filter((line) => line.length > 25).length + text.split('\n').length
                              }
                              onChange={(e) => setText(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                    />
        </div>
    )
}
