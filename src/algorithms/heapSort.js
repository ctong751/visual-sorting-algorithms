export function getHeapSortAnimations(array) {
    const animations = [];
    const sortedArray = array;
    heapSort(sortedArray, animations);
    console.log(sortedArray);
    console.log(animations);
    return animations;
}

function heapSort(array, animations) {
    for (let i = array.length / 2 - 1; i >= 0; i--) {
        buildHeap(array, array.length, i, animations);
    }

    for (let i = array.length - 1; i > 0; i--) {
        animations.push([0, 0, 0]);
        animations.push([0, i, 0]);
        var temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        animations.push([2, 0, array[0]]);
        animations.push([2, i, array[i]]);

        buildHeap(array, i, 0, animations);
    }
}

function buildHeap(array, size, index, animations) {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== index) {
        animations.push([0, index, 0]);
        animations.push([0, largest, 0]);
        let temp = array[index];
        array[index] = array[largest];
        array[largest] = temp;
        animations.push([1, index, array[index]]);
        animations.push([1, largest, array[largest]]);

        buildHeap(array, size, largest, animations);
    }
}