function fn(obj) {
    console.log(obj);

    obj.a = 1;

    console.log(obj);
}

let obj = { a: 0 };

fn(obj);

console.log(obj); // {a:1}

// 外部的指针obj与函数内部的指针obj不是一个指针，\
// 实际上，传给函数fn()的参数并非外部obj指针本身，而是它的一个拷贝指针。 可以用一下的fn验证


function fn1(obj1) {
    console.log(obj1);

    obj1 = { b: 1 };
    console.log(obj1);

}

let obj1 = { b: 0 };

fn1(obj1);

console.log('aa:',obj1); // {b:0}

// 如果传给函数fn()的参数是外部指针obj本身，那么函数内部对obj重新复制之后，外部的obj应该被同步修改才对。