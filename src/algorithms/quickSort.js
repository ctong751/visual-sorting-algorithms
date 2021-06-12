export function getQuickSortAnimations(array) {
    const animations = [];
    const sortedArray = array;
    quickSort(sortedArray, 0, array.length - 1, animations);
    // Push to change all bars to green since the sorting is complete.
    animations.push([3]);
    return animations;
}

function quickSort(array, a, b, animations) {
    if (a >= b) return;

    let left = a;
    let right = b - 1;
    // Choose the last element in the array to be the pivot.
    let pivot = array[b];
    // Change the pivot bar to red.
    animations.push([0, b, 0]);
    // Temporary object used for swapping.
    let temp;

    while (left <= right) {
        while (left <= right && array[left] < pivot) {
            left++;
        }
        while (left <= right && array[right] >= pivot) {
            right--;
        }
        if (left <= right) {
            temp = array[left];
            array[left] = array[right];
            array[right] = temp;
            // Comparing these values. Need to change their color to yellow.
            animations.push([1, left, 0]);
            animations.push([1, right, 0]);
            // Now change the colors to green since they're being swapped.
            animations.push([2, left, array[left]]);
            animations.push([2, right, array[right]]);
            left++;
            right--;
        }
    }
    temp = array[left];
    array[left] = array[b];
    array[b] = temp;
    // Change the colors to green since they're being swapped.
    animations.push([2, left, array[left]]);
    animations.push([2, b, array[b]]);

    // Make recursive calls.
    quickSort(array, a, left - 1, animations);
    quickSort(array, left + 1, b, animations);
}

