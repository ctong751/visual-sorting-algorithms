export function getBubbleSortAnimations(array) {
    const animations = [];
    const sortedArray = array;
    bubbleSort(sortedArray, animations);
    return animations;
}

function bubbleSort(array, animations) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // Change array-bar values since they're being swapped.
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
    }
}