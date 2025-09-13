// Node for LinkedList
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// A simple Queue implementation with LinkedList
class queueLinkedList {
    constructor(firstElem = null) {
        this.head = null; // front of queue
        this.tail = null; // end of queue
        this._size = 0;

        if (firstElem !== null) {
            this.append(firstElem);
        }
    }

    // Return the size of the queue
    size() {
        return this._size;
    }

    // Returns whether or not the queue is empty
    isEmpty() {
        return this._size === 0;
    }

    // Peek the element at the front of the queue
    // Throws error if queue is empty
    peek() {
        if (this.isEmpty()) throw new Error("Queue Empty");
        return this.head.data;
    }

    removePoll() {
        if (this.isEmpty()) throw new Error("Queue empty");

        let data = this.head.data; // 1️⃣ Save the value of the first node
        this.head = this.head.next; // 2️⃣ Move head to the next node
        this._size--; // 3️⃣ Reduce queue size

        if (this.isEmpty()) {
            this.tail = null; // reset tail if queue becomes empty
        }

        return data;
    }

    // Add an element to the back of the queue
    append(elem) {
        let newNode = new Node(elem);

        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode; //The old tail’s next pointer now links to the new node.
            this.tail = newNode; // Move the tail reference forward, so it points to the new last node.
        }

        this._size++;
    }

    * //2. Generator function (function*) + yield When you use function*, your function becomes a generator. Inside a generator, yield works like a pause + give back a value.

    [Symbol.iterator]() {
        let current = this.head;

        while (current) {
            yield current.data; // 👉 give one item to for...of
            current = current.next; // 👉 then move forward
        }
    }

}

let q = new queueLinkedList();

q.append("apply");
q.append("orange");
q.append("kiwi");

console.log("Peek:", q.peek());
console.log("Peek:", q.removePoll());
console.log("Peek:", q.peek());
console.log("Peek:", q.size());

for (let item of q) {
    console.log(item);
}