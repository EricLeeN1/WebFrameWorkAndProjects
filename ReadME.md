# 前端技术架构与工程


## 一、Function 函数式编程

    callBySharing1.js 值传参（Call by sharing）
    callBySharing2.js 值传参（Call by sharing）
    currying.js 函数柯里化（Currying）
    highOrderFunction.js 高阶函数（High Order Function）
    functionsComposition.js 函数组合（Functions Composition）
    async.js async函数（Async Await）
    generator.js genarator函数（generator）

## 二、Components 组件化

### 1）、Components Vs Modules

1. 模块和组件均为可分离的、有独立功能的一种封装对象。
2. 模块强调功能性，其功能性并非一定与视图相关。一个完整的应用程序由多个模块组成。
3. 组件强调组合性，是一个视图片段的逻辑抽象。粒度比模块细，一个模块可以包含一个或多个组件。
4. 编程语言基元 --> 对象 --> 组件 --> 模块 --> 引用程序

### 2）、Web Components

Web Components是W3C推出的一套用于封装具有复用性，互用性前端组件的技术规范，旨在提供一种标准的组件化模式。它是一系列技术的集合，包括如下几项：

2. HTML template：组件的模版，一块不会被渲染的HTML片段。

3. Shadow DOM：创建隔离作用域，实现DOM、样式和逻辑的封装。

#### 2-1）、自定义元素

自定义元素（Custom Elements）：创建自定义HTML元素或扩展内置元素。

元素与接口之间是多对多的映射关系。存在多个不同元素对应同一个接口类型，以及同一个接口对应多个不同元素的情形。这对扩展原生元素非常重要。

自定义元素API建立在一系列HTMLElement接口的基础上，通过创建一个继承HTMLElement接口对应类的派生类实现扩展。

HTML每个元素均对应一种接口类型，HTMLElement是所有接口的跟接口（Basic Interface）。

```
<a>标签对应HTMLAnchorElement接口
<div>标签对应HTMLDivElement接口
<button>标签对应HTMLButtonElement接口
<strong>、<section>、<code>等标签直接对应HTMLElement接口
```

##### 2-1-1)、扩展原生元素

	在原生元素现有的功能的基础上进行增量扩展是一种典型的渐进性增强思维，也是PWA积极提倡的一种实践模式。
	示例参考：components目录下button的demo展示的就是扩展原生组件<button></button>的流程。

##### 2-1-2)、新建独立元素

    大多数HTML原生元素的划分均面向细粒度层面，功能单一并且有很强的组合性。
	在实际工作中，往往需要将多种HTML原生元素封装为一些功能更丰富的组件，比如弹窗组件Dialog、导航组件Navigator等，这些组件被称为业务组件。
    业务组件可以抽象为一个独立元素，他有自己的标签、样式和逻辑，不用于任何原生元素。
	在React/Vue中，将一个业务组件进行封装后，可以使用类似HTML标签的语法声明，并且组件的数据可以通过标签属性传入组件内部。
    使用自定义元素api创建一个独立元素的模式与之类似。
	实例参考：components目录下circularRing的demo展示的就是新建一个独立元素的创建和声明方式。

##### 2-1-3)、生命周期

    React/Vue/Angular等框架的组件均有完整的生命周期，
	并且在生命周期的里程碑阶段暴露出相应的钩子函数以便开发者编写有针对性的处理逻辑。都一定程度上借鉴了Web Components规范。
    需要注意的是。组件或元素的生命周期并非是绝对线性的，甚至有时也并非是完整的。
	实例参考：compones目录下lifeCircle的demo展示的就是结合生命周期创建的一个自定义元素my-dialog
	demo收获：自定义元素缺少与全局隔离的命名空间

1. connectCallBack:当元素被加入HTML文档后，即于document建立连接进入connected状态后被一次性触发
2. disconnectedCallback:与connectedCallback相反，当元素被从HTML文档中删除进入disconnected状态后被一次性触发。
3. attributeChangedCallback:监听元素属性的变化，每次改变后均被赋值。
4. adoptedCallback:元素被从当前document移动到其他document后被触发，比如把iframe中元素移动到主文档中。

#### 2-2）、HTML template

	1、