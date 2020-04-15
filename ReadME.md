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

	在原生元素现有的功能的基础上进行增量扩展是一种典型的渐进性增强思维，也是PWA积极提倡的一种实践模式。 --> components目录下button的demo展示的就是扩展原生组件<button></button>的流程

##### 2-1-2)、新建独立元素

#### 2-2）、HTML template