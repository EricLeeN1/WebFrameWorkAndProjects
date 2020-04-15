function bar(arg) {
    if (typeof arg !== 'number') {
        throw new TypeError('invalid parameter');
    }
    return arg + 1;
}

function* foo(arg) {
    yield bar(arg);
}

try {
    console.log(foo('10').next().value);// 11    
} catch (error) {
    console.log(error.message);
}

// Genereator函数必须调用next()方法用来获取每一次迭代计算的结果
// 相比较而言、从简洁性还是错误处理方式上，async/await均优于Generator，是相对较优的异步编程模式