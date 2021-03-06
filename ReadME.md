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

		<a>标签对应HTMLAnchorElement接口
		<div>标签对应HTMLDivElement接口
		<button>标签对应HTMLButtonElement接口
		<strong>、<section>、<code>等标签直接对应HTMLElement接口

##### 2-1-1)、扩展原生元素

	在原生元素现有的功能的基础上进行增量扩展是一种典型的渐进性增强思维，也是PWA积极提倡的一种实践模式。
	示例参考：components的custom目录下button的demo展示的就是扩展原生组件<button></button>的流程。

##### 2-1-2)、新建独立元素

    大多数HTML原生元素的划分均面向细粒度层面，功能单一并且有很强的组合性。
	在实际工作中，往往需要将多种HTML原生元素封装为一些功能更丰富的组件，比如弹窗组件Dialog、导航组件Navigator等，这些组件被称为业务组件。
    业务组件可以抽象为一个独立元素，他有自己的标签、样式和逻辑，不用于任何原生元素。
	在React/Vue中，将一个业务组件进行封装后，可以使用类似HTML标签的语法声明，并且组件的数据可以通过标签属性传入组件内部。
    使用自定义元素api创建一个独立元素的模式与之类似。
	实例参考：components的custom目录下circularRing的demo展示的就是新建一个独立元素的创建和声明方式。

##### 2-1-3)、生命周期

    React/Vue/Angular等框架的组件均有完整的生命周期，
	并且在生命周期的里程碑阶段暴露出相应的钩子函数以便开发者编写有针对性的处理逻辑。都一定程度上借鉴了Web Components规范。
    需要注意的是。组件或元素的生命周期并非是绝对线性的，甚至有时也并非是完整的。
	实例参考：compones目录下lifeCircle的demo展示的就是结合生命周期创建的一个自定义元素my-dialog
	demo收获：自定义元素缺少与全局隔离的命名空间

![](C:\Users\Eric\Desktop\微信图片_20200417152350.jpg)

	1. connectCallBack:当元素被加入HTML文档后，即于document建立连接进入connected状态后被一次性触发
	2. disconnectedCallback:与connectedCallback相反，当元素被从HTML文档中删除进入disconnected状态后被一次性触发。
	3. attributeChangedCallback:监听元素属性的变化，每次改变后均被赋值。
	4. adoptedCallback:元素被从当前document移动到其他document后被触发，比如把iframe中元素移动到主文档中。


#### 2-2）、Shadow DOM

	Shadow DOM可以创建一个与全局隔离的独立作用域，全局作用域和独立作用域的CSS和JavaScript互不影响。
	听上去类似iframe，两者均可用于作用域的隔离和封装。

Iframe Vs Shadow DOM

	iframe封装了一个完整的执行上下文
	Shadow DOM封装了一个较轻量的局部作用域

	
类似于DOM组成DOM Tree一样，Shadow DOM也组成了Shadow Tree;

	Shadow DOM所在的子树作为全局DOM Tree的一部分而被称之为Shadow Tree。
	在全局作用域内的DOM成为Light DOM。其共同组成的树形结构被称为Light Tree;
	
1. 当attachShadow的参数mode为true时，返回一个SharowRoot对象.它是一个Document Fragment，可以使用绝大多数的DOM API，例如querySelector和innerHTML。
2. 被改造前，xy-dialog元素的CSS代码被注入head里面，即全局作用域内：HTML结构被注入xy-dialog节点。被改造后的CSS和HTML结构均被注入xy-dialog的ShadowRoot中。
3. 将原本xy-dialog节点的属性open迁移到classname为xy-dialog_wrapper的节点上，用于控制Dialog组件的显示和隐藏状态。

#### 2-3）、HTML template

HTML template 是一个有既定格式的处理器，输入数据输出HTML字符串，HTML新增的template元素的作用同样如此。

template元素是惰性的，主要表现在以下几个方面：

1. template元素自身以及其内部的所有元素均不会被渲染，视觉上不可见。使用浏览器的开发者工具会发现，template的默认样式仅有“display:none;”,其内部元素被一个DocumentFragment包裹，没有任何样式。
2. template内部的所有元素在被激活之前不会被解析、图片不会被加载、audio和video不会被播放、JavaScript脚本不会被执行。
3. template内部的所有元素均不存在于文档空间内，无法使用document.querySelector获取它们。
4. 在使用importNode或cloneNode激活template模版后，其内部的元素便被转化为HTML实体，从而被解析和渲染，与常规HTML模版引擎不同的是，template只是静态的样板结构，没有任何逻辑处理能力，主要依赖引用它的外部逻辑实现数据到结构的转换。
	1. importNode函数的第二个参数的作用是指定导入方式是浅克隆还是深克隆，值为true时将导入template内部的所有子元素。

##### 2-3-1）、扩展组件

	Web Components 规范的slot与Vue的slot在使用方法上基本一致；
	在模版中使用slot标签占位，如果有name属性则称其为具名slot；
	自定义的HTML结构通过slot属性指定具名slot取代其占位。
	与vue的slot不用的是，Web Components 的slot占位符与slot实体之间是引用关系。

### 3）、更友好的编码方式

	对于组件本身，基于结构、表现和行为分离的原则，保持其CSS、JavaScript、和HTML代码的相对独立性。
	项目设计的所有文件可以归类为5个角色：组件的源码文件、组件编译后的文件、编译器compile.js、运行时runtime.js以及外层业务文件。

	组件源码的组织结构可以按照文件的类型和数目分为以下两类。

#### 3-1）、多文件组件

多文件组件是最普遍，也是相对古老的组织结构模式，即CSS、JavaScript和HTML模版分别为独立的文件，在目前流行的前端框架中，Angular的组件结构也是多文件。

#### 3-2)、单文件组件

ALL-in-JS是单文件组件的核心开发模式，React和Vue均支持使用JSX将JavaScript、CSS和HTML汇总在一个文件中编写，同时Vue还支持类似Mustache的模版语法。

主流浏览器的最新版本已经开始提供支持，未来可期。其实除了现实意义以外吗，Web Components规范更重要的是它在前端组建理论上的里程碑意义、以此为引导，原本混沌的前端组件化有了相对统一的方向。开发者可围绕Web components的设计模式进行深度探索和思考。

### 4）、设计模式

#### 4-1)、重新思考DOM

性能损耗主要由JavaScript调用DOM API引起。

解决上述问题的尝试：

1. 利用浏览器执行帧机制，尽可能批量处理对DOM API的调用，从而将DOM操作集中到一帧，进而减少浏览器的重排等性能损耗较高的行为。
2. 使用Virtual Scrolling提高长列表滚动性能、
3. 借助Canvas取代其他DOM以减少DOM数量等。
4. 因React同时被人熟知的虚拟DOM（Virtual Dom,简称VDOM），也是目前前端社区较流行的DOM操作模式。
		
		VDOM将每个DOM映射为内存中一个称为Virtual DOM的json对象，DOM Tree映射为Virtual Tree。在需要改变DOM属性或者本身之前，使用高效的diff算法对比Virtual Tree当前版本和即将更新的版本之间的差异，最后将其应用于真实的DOM中。
		VDOM并非没有DOM操作，而是尽量减少不必要的DOM操作。

#### 4-2）、生命周期的设计艺术

自定义元素生命周期的里程碑对应的钩子函数可以简单归为两种：仅触发一次和可多次触发。从命名上，钩子函数均使用过去式，如connectedCallback和disconnectedCallback,代表钩子函数在里程碑阶段的逻辑执行完毕后才被调用。

***总体来说，不论是组件化还是模块化，核心的理念都是解耦和复用。Web Components规范包括三种核心技术：自定义元素、Shadow DOM和HTML template。即支持渐进增强HTML原生元素，也可以自定义结构、表现、和行为完全独立的新元素。一方面，Web Components规范为前端组件化制定了相对统一的模式和方向；另一方面，自定义元素的生命周期理念也为组件的设计提供了优秀的参考。***