import React, { useDebugValue } from 'react';
import {getMergeSortAnimations} from '../algorithms/mergeSort.js';
import { getQuickSortAnimations } from '../algorithms/quickSort.js';
import { getBubbleSortAnimations } from '../algorithms/bubbleSort.js';
import './SortingVisualizer.css';
import { getHeapSortAnimations } from '../algorithms/heapSort.js';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randIntFromInterval(5, 1000));
        }
        this.setState({array});
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'DodgerBlue';
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'green';
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * 10);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * 10);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [color, index, height] = animations[i];
            switch (color) {
                case 0:
                    // Sets the pivot array-bar to the color red.
                    setTimeout(() => {
                        arrayBars[index].style.backgroundColor = 'red';
                    }, i * 10);
                    break;
                case 1:
                    // Sets the array-bar being compared to the color yellow.
                    setTimeout(() => {
                        arrayBars[index].style.backgroundColor = 'yellow';
                    }, i * 10);
                    break;
                case 2:
                    // Swaps the array-bar value and sets the color to green.
                    setTimeout(() => {
                        arrayBars[index].style.height = `${height}px`;
                        arrayBars[index].style.backgroundColor = 'green';
                    }, i * 10);
                    break;
                case 3:
                    // Sets the array-bar color to green.
                    setTimeout(() => {
                        for (let i = 0; i < arrayBars.length; i++) {
                            arrayBars[i].style.backgroundColor = 'green';
                        }
                    }, i * 10);
                    break;
                default:
                    // Do nothing
                    break;
            }
        }
    }

    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [color, index, height] = animations[i];
            switch (color) {
                case 0:
                    // Sets the pivot array-bar to the color red.
                    setTimeout(() => {
                        arrayBars[index].style.backgroundColor = 'red';
                    }, i * 7);
                    break;
                case 1:
                    // Swaps the array-bar value and sets the color to blue.
                    setTimeout(() => {
                        arrayBars[index].style.height = `${height}px`;
                        arrayBars[index].style.backgroundColor = 'DodgerBlue';
                    }, i * 7);
                    break;
                case 2:
                    // Swaps the array-bar value and sets the color to green.
                    setTimeout(() => {
                        arrayBars[index].style.height = `${height}px`;
                        arrayBars[index].style.backgroundColor = 'green';
                    }, i * 7);
                    break;
                default:
                    // Do nothing
                    break;
            }
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            let [index, height] = animations[i];
            // Swaps the array-bar value and sets the color to green.
            setTimeout(() => {
                arrayBars[index].style.height = `${height}px`;
            }, i * 2);
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{
                    backgroundColor: 'DodgerBlue',
                    height: `${value}px`,
                    }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
}

function randIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortingTest(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
        console.log('Different lengths.')
        return false;
    }

    for (let i = 0; i < arrayOne.length - 1; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            console.log('Inconsistency at index: ' + i);
            return false;
        }
    }
    return true;
}