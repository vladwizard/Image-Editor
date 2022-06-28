import React, {useEffect, useState} from "react";
// import Border from "./Border";


export default function ({itemRef}: any) {

    const borderSize = 50;
    const [width, setWidth] = useState<number>(parseInt(itemRef.current.style.width));
    const [height, setHeight] = useState<number>(parseInt(itemRef.current.style.height));


    const left = parseInt(itemRef.current.style.left);
    const top = parseInt(itemRef.current.style.top);


    let minWidth = 100;
    let minHeight = 100;
    const isText = itemRef.current.className.indexOf('text') != -1;
    let fontK = 0;
    if (isText) {
        minWidth = 100;
        minHeight = 30;
        fontK = parseInt(itemRef.current.style.fontSize)/parseInt(itemRef.current.style.height);
    }
    return (
        <div className='borderBox'>
            {[[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]].map((posVector) =>
                // <Border centerX={left} centerY={right} posVector={item} borderSize={borderSize}/>
                <button
                    style={(Math.abs(posVector[0]) == 1 && Math.abs(posVector[1]) == 1) ?
                        {

                            'width': borderSize + 12 + 'px',
                            'height': borderSize + 12 + 'px',

                            'left': left + ((width) / 2 + borderSize/2) * posVector[0] + 'px',
                            'top': top + ((height) / 2 + borderSize/2) * posVector[1] + 'px',

                        }
                        :
                        {

                            'width': (Math.abs(posVector[1]) == 1 ? width : borderSize) + 'px',
                            'height': (Math.abs(posVector[0]) == 1 ? height : borderSize) + 'px',

                            'left': left + (width / 2 + borderSize/2) * posVector[0] + 'px',
                            'top': top + (height / 2 + borderSize/2) * posVector[1] + 'px',
                        }
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseDown={() => {
                        document.onmousemove = function (ev) {

                            let transformX = ev.movementX * 2 / window.devicePixelRatio;
                            let transformY = ev.movementY * 2 / window.devicePixelRatio;

                            let newWidth = parseInt(itemRef.current.style.width) + transformX * posVector[0];
                            if (newWidth > minWidth || transformX * posVector[0] > 0) {
                                itemRef.current.style.width = newWidth + 'px'
                                setWidth(newWidth);
                            }

                            let newHeight = parseInt(itemRef.current.style.height) + transformY * posVector[1];
                            if (newHeight > minHeight || transformY * posVector[1] > 0) {
                                itemRef.current.style.height = newHeight + 'px'
                                setHeight(newHeight)
                            }

                            if (isText) {
                                itemRef.current.style.fontSize = parseInt(itemRef.current.style.height)*fontK + 'px'
                            }

                        }
                    }
                    }
                    onMouseUp={() => {
                        document.onmousemove = null;
                    }}
                />
            )}
        </div>
    )
}