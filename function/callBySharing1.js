// javaScript函数的传参方式只有值传参

function fn(a) {
    a = 1;
}

let a = 0;

fn(0);

console.log(a); // 0

// 调用参数fn()时，将变量a的值传递给fn()而非变量a本身，所以函数内部对a重新赋值之后并未影响外部的a变量。