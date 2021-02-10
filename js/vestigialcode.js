/*function copy(tree) {
    if (tree.left == null && tree.right == null) return new Node(tree.value, null, null);
    else return new Node(tree.value, copy(tree.right), copy(tree.left));
}*/

/*function evaluate(tree) {
    if (tree.value == '+') {
        return evaluate(tree.left) + evaluate(tree.right);
    }
    if (tree.value == '-') return evaluate(tree.left) - evaluate(tree.right);
    if (tree.value == 'x') return evaluate(tree.left) * evaluate(tree.right);
    if (tree.value == '/') return evaluate(tree.left) / evaluate(tree.right);
    if (tree.value == '^') return Math.pow(evaluate(tree.left), evaluate(tree.right));

    // node is a number
    if (tree.right == null && tree.left == null) return tree.value;
}*/

/*function infixConversion(tree) {
    if (tree.right == null && tree.left == null) {
        return tree.value;
    }
    else return "(" + infixConversion(tree.left) + tree.value + infixConversion(tree.right) + ")";
}*/