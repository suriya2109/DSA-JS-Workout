// Core building blocks of dynamic array behavior,
// 1) Capacity vs Length

// ⚠️ capacity: total storage allocated.

// ⚠️ len: actual number of elements stored.

// ⚠️ When len + 1 >= capacity, the array doubles its capacity (classic dynamic array growth strategy).

// 2) Adding elements (add)

// ⚠️ If there’s no room, resize (copy to a new, bigger array).

// ⚠️ Append the new element.

// 3) Getting/setting (get, set)

// ⚠️ Bounds checking (throw error if index out of range).

// 4) Removing (removeAt, remove)

// ⚠️ removeAt: shift all elements after the index one step left (O(n)).

// ⚠️ remove: find the element and remove it (O(n)).

// 5) Other operations

// ⚠️ reverse(): swaps elements in place.

// ⚠️ binarySearch(): classic O(log n) search (requires sorted array).

// ⚠️ sort(): uses JS’s built-in sort, but only sorts up to len.

// ⚠️ isEmpty() & size(): utility functions.

// ⚠️ toString(): readable output.

// ⚠️ [Symbol.iterator]: makes it work with for… of.

class IntArray {
    static DEFAULT_CAP = 1 << 3;

    constructor(capacity = IntArray.DEFAULT_CAP) {
        if (capacity < 0) throw new Error("Illegal Capacity: " + capacity);
        this.arr = new Array(capacity);
        console.log(this.arr);
        this.len = 0;
        this.capacity = capacity;
    }

    // Initialize from existing array
    static from(array) {
        if (!Array.isArray(array)) throw new Error("Array cannot be null");
        let obj = new IntArray(array.length);
        obj.arr = array.slice();
        obj.len = array.length;
        obj.capacity = array.length;
        return obj;
    }

    size() {
        return this.len;
    }

    isEmpty() {
        return this.len === 0;
    }

    get(index) {
        if (index < 0 || index >= this.len) throw new RangeError("Index out of bounds");
        return this.arr[index];
    }

    set(index, elem) {
        if (index < 0 || index >= this.len) throw new RangeError("Index out of bounds");
        this.arr[index] = elem;
    }

    add(elem) {
        if (this.len + 1 >= this.capacity) {
            this.capacity = this.capacity === 0 ? 1 : this.capacity * 2;
            let newArr = new Array(this.capacity);
            for (let i = 0; i < this.len; i++) {
                newArr[i] = this.arr[i];
            }
            this.arr = newArr;
        }
        this.arr[this.len++] = elem;
    }

    removeAt(rmIndex) {
        if (rmIndex < 0 || rmIndex >= this.len) throw new RangeError("Index out of bounds");
        for (let i = rmIndex; i < this.len - 1; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.len--;
        this.capacity--; // (⚠️ in Java this shrinks capacity, but usually not done in JS)
    }

    remove(elem) {
        for (let i = 0; i < this.len; i++) {
            if (this.arr[i] === elem) {
                this.removeAt(i);
                return true;
            }
        }
        return false;
    }

    reverse() {
        let left = 0,
            right = this.len - 1;
        while (left < right) {
            let tmp = this.arr[left];
            this.arr[left] = this.arr[right];
            this.arr[right] = tmp;
            left++;
            right--;
        }
    }

    binarySearch(key) {
        let low = 0,
            high = this.len - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (this.arr[mid] === key) return mid;
            else if (this.arr[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        return -1; // not found
    }

    sort() {
        this.arr = this.arr.slice(0, this.len).sort((a, b) => a - b).concat(new Array(this.capacity - this.len));
    }

    [Symbol.iterator]() {
        let index = 0;
        let data = this;
        return {
            next() {
                if (index < data.len) {
                    return { value: data.arr[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    toString() {
        if (this.len === 0) return "[]";
        let parts = [];
        for (let i = 0; i < this.len; i++) {
            parts.push(this.arr[i]);
        }
        return `[${parts.join(", ")}]`;
    }
}

// Example usage
let ar = new IntArray(50);
ar.add(3);
ar.add(7);
ar.add(6);
ar.add(-2);

ar.sort(); // [-2, 3, 6, 7]

// Prints each element
for (let val of ar) {
    console.log(val);
}

// Prints [-2, 3, 6, 7]
console.log(ar.toString());