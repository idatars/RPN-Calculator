let history = {
    data: [new Entry([], "")],
    index: 0,
};
let currnum = null;
let screen = document.getElementById("screen");
let infixscreen = document.getElementById("infixdisplay");
let infixversion = "";
let decimal = 1;

function reset() {
    history.data[history.index].display = screen.innerHTML;
    history.data.push(new Entry([], ""));
    history.index = history.data.length - 1;
    screen.innerHTML = "";
    decimal = 1;
}

// 
function invalidArgument() {
    reset();
    screen.innerHTML = "Invalid argument";
}

function copy(tree) {
    if (tree.left == null && tree.right == null) return new Node(tree.value, null, null);
    else return new Node(tree.value, copy(tree.right), copy(tree.left));
}

function dontfork() {
    if (screen.innerHTML == "Invalid argument") {
        screen.innerHTML = "";
    }
    if (history.index != history.data.length - 1) {
        let stackcopy = [];
        for (let i = 0; i < history.data[history.index].stack.length; i++) {
            stackcopy[i] = copy(history.data[history.index].stack[i]);
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

function addOperator(op) {
    dontfork();
    console.log(history.data[history.index]);
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

function Node(val, rs, ls) {
    this.value = val;
    this.left = ls;
    this.right = rs;
}

function Entry(stack, display) {
    this.stack = stack;
    this.display = display;
}

function addDigit(n) {
    dontfork();

    if (currnum == null) currnum = n;
    else if (decimal < 1) {
        currnum = currnum + n * decimal;
        //console.log(currnum);
        decimal /= 10;
    } else currnum = currnum * 10 + n;

    screen.innerHTML += n;
}

function dec() {
    dontfork();
    if (currnum == null) currnum = 0;
    decimal /= 10;
    screen.innerHTML += '.';
}

function evaluate(tree) {
    if (tree.value == '+') {
        return evaluate(tree.left) + evaluate(tree.right);
    }
    if (tree.value == '-') return evaluate(tree.left) - evaluate(tree.right);
    if (tree.value == 'x') return evaluate(tree.left) * evaluate(tree.right);
    if (tree.value == '/') return evaluate(tree.left) / evaluate(tree.right);
    if (tree.value == '^') return Math.pow(evaluate(tree.left), evaluate(tree.right));

    // node is a number
    if (tree.right == null && tree.left == null) return tree.value;
}

function evalWrapper() {
    dontfork();

    if (history.data[history.index].stack.length != 1) {
        invalidArgument();
    } else {
        //console.log(history.data[history.index].stack[0]);
        currnum = evaluate(history.data[history.index].stack[0]);
        infixscreen.innerHTML = infixConversion(history.data[history.index].stack[0]) + " = " + currnum;
        history.data[history.index].display = screen.innerHTML;
        history.data.push(new Entry([], ""));
        history.index++;
        screen.innerHTML = currnum;
        addNum();
    }
}

function enter() {
    //console.log(history.data[history.index].stack);
    if (currnum != null) addNum();
    else evalWrapper();
}

function infixConversion(tree) {
    if (tree.right == null && tree.left == null) {
        return tree.value;
    }
    else return "(" + infixConversion(tree.left) + tree.value + infixConversion(tree.right) + ")";
}

function pi() {
    dontfork();
    addNum();
    if (currnum == null) {
        screen.innerHTML += 'pi';
        currnum = Math.PI;
        addNum();
    }
}

function up() {
    if (history.index > 0) {
        history.data[history.index].display = screen.innerHTML;
        history.index--;
        screen.innerHTML = history.data[history.index].display;
    }
}

function down() {
    if (history.index < history.data.length - 1) {
        history.index++;
        screen.innerHTML = history.data[history.index].display;
    }
}

function infixdisplay(e) {
    if (e.target.checked) {
        infixscreen.style.display = "block";
    } else infixscreen.style.display = "none";
}

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
document.getElementById("pi").addEventListener("click", pi);
document.getElementById("decimal").addEventListener("click", dec);

document.getElementById("enter").addEventListener("click", enter);
document.getElementById("add").addEventListener("click", () => {addOperator('+')});
document.getElementById("subtract").addEventListener("click", () => {addOperator('-')});
document.getElementById("multiply").addEventListener("click", () => {addOperator('x')});
document.getElementById("divide").addEventListener("click", () => {addOperator('/')});
document.getElementById("exp").addEventListener("click", () => {addOperator('^')});
//document.getElementById("equals").addEventListener("click", evalWrapper);
document.getElementById("clear").addEventListener("click", reset);

document.getElementById("up").addEventListener("click", up);
document.getElementById("down").addEventListener("click", down);

document.getElementById("infixcheckbox").addEventListener("change", (e) => {infixdisplay(e)});

// THINGS TO ADD
// - keep pi in exact form?
// - browser (keyboard) support
// - modularization??