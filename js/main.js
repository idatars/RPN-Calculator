// basically all the data ever
let history = {
    data: [new Entry([], "")],
    index: 0,
};

// augmented binary tree
function Node(val, rs, ls) {
    this.value = val;
    this.left = ls;
    this.right = rs;

    // returns deep copy of node
    this.copy = function() {
        if (this.left == null && this.right == null) return new Node(this.value, null, null);
        else return new Node(this.value, this.right.copy(), this.left.copy());
    }

    this.evaluate = function() {
        if (this.value == '+') {
            return this.left.evaluate() + this.right.evaluate();
        }
        if (this.value == '-') return this.left.evaluate() - this.right.evaluate();
        if (this.value == 'x') return this.left.evaluate() * this.right.evaluate();
        if (this.value == '/') return this.left.evaluate() / this.right.evaluate();
        if (this.value == '^') return Math.pow(this.left.evaluate(), this.right.evaluate());
    
        // node is a number
        if (this.right == null && this.left == null) return this.value;
        alert("Fatal error :( Please refresh the page!");
    }

    this.infixConversion = function() {
        if (this.right == null && this.left == null) {
            return this.value;
        }
        else return "(" + this.left.infixConversion() + this.value + this.right.infixConversion() + ")";
    }
}

function Entry(stack, display) {
    this.stack = stack;
    this.display = display;
}

let currnum = null;
let screen = document.getElementById("screen");
let infixscreen = document.getElementById("infixdisplay");
let infixversion = "";
let decimal = 1;

// basically an exception class
function invalidArgument() {
    reset();
    screen.innerHTML = "Invalid argument";
}

// does anything and everything
function dontfork() {
    if (screen.innerHTML == "Invalid argument") {
        screen.innerHTML = "";
    }
    if (history.index != history.data.length - 1) {
        let stackcopy = [];
        for (let i = 0; i < history.data[history.index].stack.length; i++) {
            stackcopy[i] = history.data[history.index].stack[i].copy();
        }
        history.data.push(new Entry(stackcopy, history.data[history.index].display));
        history.index = history.data.length - 1;
        screen.innerHTML = history.data[history.index].display;
        currnum = null;
    }
}

function addNum() {
    if (currnum != null) {
        dontfork();
        history.data[history.index].stack.push(new Node(currnum, null, null));
        screen.innerHTML += ' ';
    } else {
        console.log(history.data[history.index].stack);
        invalidArgument();
    }
    currnum = null;
    decimal = 1;
}

document.getElementById("clear").addEventListener("click", reset);
function reset() {
    history.data[history.index].display = screen.innerHTML;
    history.data.push(new Entry([], ""));
    history.index = history.data.length - 1;
    screen.innerHTML = "";
    decimal = 1;
}

/* OPERATORS */
document.getElementById("add").addEventListener("click", () => {addOperator('+')});
document.getElementById("subtract").addEventListener("click", () => {addOperator('-')});
document.getElementById("multiply").addEventListener("click", () => {addOperator('x')});
document.getElementById("divide").addEventListener("click", () => {addOperator('/')});
document.getElementById("exp").addEventListener("click", () => {addOperator('^')});
function addOperator(op) {
    dontfork();
    if (currnum != null) {
        dontfork();
        history.data[history.index].stack.push(new Node(currnum, null, null));
        screen.innerHTML += ' ';
        currnum = null;
        decimal = 1;
    }

    if (history.data[history.index].stack.length < 2) {
        console.log(history.data[history.index].stack);
        invalidArgument();
        return;
    }
    
    let newnode = new Node(op, history.data[history.index].stack.pop(), history.data[history.index].stack.pop());
    history.data[history.index].stack.push(newnode);
    screen.innerHTML += op + ' ';
}

/* DIGITS */
document.getElementById("one").addEventListener("click", () => {addDigit(1)});
document.getElementById("two").addEventListener("click", () => {addDigit(2)});
document.getElementById("three").addEventListener("click", () => {addDigit(3)});
document.getElementById("four").addEventListener("click", () => {addDigit(4)});
document.getElementById("five").addEventListener("click", () => {addDigit(5)});
document.getElementById("six").addEventListener("click", () => {addDigit(6)});
document.getElementById("seven").addEventListener("click", () => {addDigit(7)});
document.getElementById("eight").addEventListener("click", () => {addDigit(8)});
document.getElementById("nine").addEventListener("click", () => {addDigit(9)});
document.getElementById("zero").addEventListener("click", () => {addDigit(0)});
function addDigit(n) {
    dontfork();

    if (currnum == null) currnum = n;
    else if (decimal < 1) {
        currnum = currnum + n * decimal;
        decimal /= 10;
    } else currnum = currnum * 10 + n;

    screen.innerHTML += n;
}

document.getElementById("decimal").addEventListener("click", dec);
function dec() {
    dontfork();
    if (currnum == null) currnum = 0;
    decimal /= 10;
    screen.innerHTML += '.';
}

document.getElementById("enter").addEventListener("click", enter);
function enter() {
    if (currnum != null) addNum();
    else {
        dontfork();

        if (history.data[history.index].stack.length != 1) {
            invalidArgument();
        } else {
            currnum = history.data[history.index].stack[0].evaluate();
            infixscreen.innerHTML = history.data[history.index].stack[0].infixConversion() + " = " + currnum;
            history.data[history.index].display = screen.innerHTML;
            history.data.push(new Entry([], ""));
            history.index++;
            screen.innerHTML = currnum;
            addNum();
        }
    }
}

document.getElementById("pi").addEventListener("click", pi);
function pi() {
    dontfork();
    if (currnum == null) {
        screen.innerHTML += 'pi';
        currnum = Math.PI;
        addNum();
    } else {
        addNum();
        screen.innerHTML += 'pi';
        currnum = Math.PI;
        addNum();
    }
}

document.getElementById("up").addEventListener("click", up);
function up() {
    if (history.index > 0) {
        history.data[history.index].display = screen.innerHTML;
        history.index--;
        screen.innerHTML = history.data[history.index].display;
    }
}

document.getElementById("down").addEventListener("click", down);
function down() {
    if (history.index < history.data.length - 1) {
        history.index++;
        screen.innerHTML = history.data[history.index].display;
    }
}

document.getElementById("infixcheckbox").addEventListener("change", (e) => {infixdisplay(e)});
function infixdisplay(e) {
    if (e.target.checked) {
        infixscreen.style.display = "block";
    } else infixscreen.style.display = "none";
}

// THINGS TO ADD
// - keep pi in exact form?
// - variables?
// - keyboard support
// - modularization??
