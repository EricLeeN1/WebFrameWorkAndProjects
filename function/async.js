function bar(arg) {
    if (typeof arg !== 'number') {
        throw new TypeError('invalid parameter');
    }
    return arg + 1;
}

async function foo(arg) {
    const result = await bar(arg);
    return result;
}

foo('10').then((result) => {
    console.log(`result=${result}`);// 11
}).catch((err) => {
    console.log(err.message);
});

console.log(111);

// async函数返回一个Promise,在then()方法中可以通过参数获取到计算结果
// 相比较而言、从简洁性还是错误处理方式上，async/await均优于Generator，是相对较优的异步编程模式