function removeDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (JSON.stringify(arr[i]) == JSON.stringify(arr[j])) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;
}

module.exports = {removeDuplicates}