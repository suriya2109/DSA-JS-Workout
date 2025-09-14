class DoublyLinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    // Internal Node class
    static Node = class {
        constructor(data, prev = null, next = null) {
            this.data = data;
            this.prev = prev;
            this.next = next;
        }

        toString() {
            return String(this.data);
        }
    };

    // Empty the linked list
    clear() {
        let trav = this.head;
        while (trav !== null) {
            let next = trav.next;
            trav.prev = trav.next = null;
            trav.data = null;
            trav = next;
        }
        this.head = this.tail = null;
        this.size = 0;
    }

    sizeOf() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Add element to end
    add(elem) {
        this.addLast(elem);
    }

    addLast(elem) {
        if (this.isEmpty()) {
            this.head = this.tail = new DoublyLinkedList.Node(elem);
        } else {
            this.tail.next = new DoublyLinkedList.Node(elem, this.tail, null); // Attach the new node after the current tail.
            this.tail = this.tail.next; // Move the tail pointer to the new node.
        }
        this.size++;
    }

    addFirst(elem) {
        if (this.isEmpty()) {
            this.head = this.tail = new DoublyLinkedList.Node(elem);
        } else {
            this.head.prev = new DoublyLinkedList.Node(elem, null, this.head);
            this.head = this.head.prev;
        }
        this.size++;
    }

    addAt(index, data) {
        if (index < 0 || index > this.size) throw new Error("Illegal Index"); //out-of-bounds check

        if (index === 0) {
            this.addFirst(data);
            return;
        }

        if (index === this.size) {
            this.addLast(data);
            return;
        }

        let temp = this.head;
        for (let i = 0; i < index - 1; i++) {
            temp = temp.next;
        }
        let newNode = new DoublyLinkedList.Node(data, temp, temp.next);
        temp.next.prev = newNode;
        temp.next = newNode;
        this.size++;
        // This is the power of a doubly linked list: O(n) traversal, but once found, O(1) insertion by rewiring just 2–4 pointers.
        // B.next -> X
        // X.prev -> B
        // X.next -> C
        // C.prev -> X
    }

    peekFirst() {
        if (this.isEmpty()) throw new Error("Empty list");
        return this.head.data;
    }

    peekLast() {
        if (this.isEmpty()) throw new Error("Empty list");
        return this.tail.data;
    }

    removeFirst() {
        if (this.isEmpty()) throw new Error("Empty list");

        let data = this.head.data; //Store the value to return later.
        this.head = this.head.next; //Move the head pointer forward
        this.size--;

        if (this.isEmpty()) { //Check if list became empty
            this.tail = null;
        } else {
            this.head.prev = null;
        }
        // If list is empty after removal → both head and tail should be null.

        // Otherwise → fix the new head’s prev pointer (set it to null since it’s the first node now).
        // List = 10 ⇄ 20 ⇄ 30

        // Remove first (10)

        // head moves to 20

        // 20.prev becomes null

        // Result: 20 ⇄ 30
        return data;
    }

    removeLast() {
        if (this.isEmpty()) throw new Error("Empty list");

        let data = this.tail.data;
        this.tail = this.tail.prev;
        this.size--;

        if (this.isEmpty()) {
            this.head = null;
        } else {
            this.tail.next = null;
        }
        return data;
    }

    removeNode(node) {
        if (node.prev === null) return this.removeFirst();
        //If no prev, the node is the head → just call removeFirst()
        if (node.next === null) return this.removeLast();
        //If no next, the node is the tail → just call removeLast().

        node.next.prev = node.prev;
        node.prev.next = node.next;
        // Bypass the node:

        // Connect its next node’s prev back to node.prev

        // Connect its prev node’s next forward to node.next

        // 🔗 Example before removing 20:
        // 10 ⇄ 20 ⇄ 30
        // After rewiring:
        // 10 ⇄ 30

        let data = node.data;
        node.data = null;
        node.prev = node.next = null;

        // Save its data to return later.

        // Clear references → helps garbage collector free memory.

        this.size--;
        return data;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) throw new Error("Illegal Index"); //check out bound

        let trav;
        if (index < this.size / 2) {
            trav = this.head;
            for (let i = 0; i !== index; i++) {
                trav = trav.next;
            }
        } else {
            trav = this.tail;
            for (let i = this.size - 1; i !== index; i--) {
                trav = trav.prev;
            }
        }

        return this.removeNode(trav);
    }

    remove(obj) {
        let trav = this.head;

        if (obj === null) {
            while (trav !== null) {
                if (trav.data === null) {
                    this.removeNode(trav);
                    return true;
                }
                trav = trav.next;
            }
        } else {
            while (trav !== null) {
                if (obj === trav.data) {
                    this.removeNode(trav);
                    return true;
                }
                trav = trav.next;
            }
        }
        return false;
    }

    indexOf(obj) {
        let index = 0; //Start from the head.
        let trav = this.head; //index keeps track of the position.

        if (obj === null) {
            while (trav !== null) {
                //Walk through the list one node at a time.
                //If trav.data matches → return the current index.
                if (trav.data === null) return index;
                trav = trav.next;
                index++;
            }
        } else {
            while (trav !== null) {
                if (obj === trav.data) return index;
                trav = trav.next;
                index++;
                //  Compare normally.
                // If found → return index.
            }
        }
        return -1;
    }

    contains(obj) {
        return this.indexOf(obj) !== -1;
        // That’s a very clean helper function. (True or false);
    }

    // Iterator support
    [Symbol.iterator]() {
        let trav = this.head; //Start iterating from the first node (head).
        return {
            next() { //Each call gives the next element in the list. (Method)
                if (trav) {
                    let value = trav.data; //Store
                    trav = trav.next; //Move
                    return { value, done: false };
                }
                return { done: true };
            }
        };
    }

    toString() {
        let sb = [];
        let trav = this.head;
        while (trav !== null) {
            sb.push(trav.data);
            trav = trav.next;
        }
        return `[ ${sb.join(", ")} ]`;
    }
}

// Example usage
let dll = new DoublyLinkedList();
dll.addLast(10);
dll.addLast(20);
dll.addFirst(5);
dll.addAt(1, 15); // [5, 15, 10, 20]
console.log(dll.toString());

console.log("First:", dll.peekFirst()); // 5
console.log("Last:", dll.peekLast()); // 20

dll.removeAt(2); // remove 10
console.log(dll.toString()); // [5, 15, 20]