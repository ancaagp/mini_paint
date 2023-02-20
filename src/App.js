import Box from './Box';
import { useState } from 'react';

// creating data array for the boxes
const dataArray = [];

for (let i=1; i < 2500; i++) {
    dataArray.push({
        id: i,
        on: false
    });
}


function App(){

    const [boxesArray, setBoxesArray] = useState(dataArray);

    const [mode, setMode] = useState('edit');
    
    // function that fills in box by box
    function floodFillUtil(updatedBoxes, x, y, width, height)
    {
        // Base cases
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        let arrayIndex = y * width + x;
        let currBox = boxesArray[arrayIndex];
        if (!currBox || currBox.on) return;

        // Replace the color at (x, y)
        currBox.on = true;
        updatedBoxes[arrayIndex] = currBox;

        // Recur for north, east, south and west
        floodFillUtil(updatedBoxes, x + 1, y, width, height);
        floodFillUtil(updatedBoxes, x - 1, y, width, height);
        floodFillUtil(updatedBoxes, x, y + 1, width, height);
        floodFillUtil(updatedBoxes, x, y - 1, width, height);
    }
 
      // It mainly finds the previous color
      // on (x, y) and calls floodFillUtil()
    function floodFill(id) {
        let rootDiv = document.getElementById("root");
        let boxWidth = 17;
        let numBoxes = boxesArray.length;
        let numCols = Math.floor((rootDiv.clientWidth)/ boxWidth);
        let numRows = Math.round(numBoxes/numCols);
        let x = id % numCols;
        let y = Math.ceil(id/numCols);
        // clone the boxes
        let updatedBoxes = JSON.parse(JSON.stringify(boxesArray));
        // fills up
        floodFillUtil(updatedBoxes, x, y, numCols, numRows);
        // updates the state
        setBoxesArray(updatedBoxes);
    }

    function handleClick(id) {
        if (mode === 'fill'){
            floodFill(id);
        } else {
            setBoxesArray(prevState => {
                // maps through the previous array and return a new array
                return prevState.map(box=>{
                    // if id is the same add to the current object a new value for on property, else return the current object
                    return box.id === id ? {...box, on: !box.on} : box
                });
            });
        }
    }

    const boxes = boxesArray.map(box => {
        return (
            <Box 
                on={box.on} 
                id={box.id}
                handleClick={handleClick} 
                key={box.id}
            />
        )
    })

    return (
        <div>
            <button 
                className='fill-btn'
                onClick={() => setMode('fill')} 
                style={{backgroundColor: (mode === 'fill') ? '#F0F0F0' : ''}}>
                Fill
            </button>
            <button 
                className='edit-btn'
                onClick={() => setMode('edit')} 
                style={{backgroundColor: (mode === 'edit') ? '#F0F0F0' : ''}}>
                Edit
            </button>
            {boxes}
        </div>
    )
}

export default App;