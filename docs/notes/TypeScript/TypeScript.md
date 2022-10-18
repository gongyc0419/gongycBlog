## TypeScript介绍
### 什么是TypeScript    
TypeScript简称TS。
TypeScript是JavaScript的超集，因为它`扩展`了JavaScript，有JavaScript没有的东西。
硬要以父子类关系来说的话，TypeScript是JavaScript子类，继承的基础上去扩展。

### 为什么需要TypeScript
因为JavaScript是`弱类型`, 很多错误只有在**运行时**才会被发现
而TypeScript提供了一套静态检测机制, 可以帮助我们在**编译时**就发现错误

## 搭建TypeScript环境
### 安装
```bash
npm i -g typescript
```

### 安装ts-node
```bash
npm i -g ts-node
```

### 创建一个 tsconfig.json 文件
```bash
tsc --init
```

然后新建index.ts,输入相关练习代码，然后执行 ts-node index.ts

## 基础数据类型

### 八种内置类型
```ts
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```

### 注意点

#### null和undefined
默认情况下 `null` 和 `undefined` 是所有类型的子类型。（可以把 null 和 undefined 赋值给其他类型。）
```ts
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined

// null和undefined赋值给object
let obj:object ={};
obj = null
obj= undefined

// null和undefined赋值给Symbol
let sym: symbol = Symbol("me"); 
sym = null
sym= undefined
```

如果在tsconfig.json指定了`"strictNullChecks":true` ，null 和 undefined 只能赋值给 `void` 和它们各自的类型。

#### number和bigint

虽然number和bigint都表示数字，但是这两个类型不兼容。
```typescript
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
```

会抛出一个类型不兼容的 ts(2322) 错误。

## 其他类型

### Array
对数组类型的定义有两种方式：
```typescript
// 例如：定义字符串类型的数组
let arr:string[]=["1","2"];
let arr1:Array<string>=["1"，"2"];
```

定义联合类型数组：

```ts
let arr2:(number|string)[];
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr2=["a",1,2,3]
```

定义指定对象成员的数组：
```ts
//interface是接口,后面会讲到
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jary',age:18}]
```

### 函数

#### 函数声明
```ts
function sum(x:number,y:number):number{
    return x+y
}
```

#### 函数表达式
注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数
```ts
//等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
let sum:(x:number,y:number)=>number=function(x:number,y:number):number{
    return x+y
};
```

#### 用接口定义函数类型                            ????
```ts
interface SearchFunc{
    (source:string,subString:string):boolean;
}

let mySearch:SearchFunc;
mySearch=function(source:string,subString:string){
    return source.search(subString)!=-1;
}
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

#### 可选参数
```ts
function buildeName(firstName:string,lastName?:string){
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}

let tomcat=buildeName('Tom','cat')
let tom=buildeName('Tom')
```
注意点：可选参数后面不允许再出现必需参数

#### 默认值参数
```ts
function buildeName(firstName:string,lastName:string='cat'){
     return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

#### 剩余参数
```ts
function push(array:any[],...items:any[]){
    items.forEach(function(item){
        array.push(item)
    })
}

let a=[]
push(a,1,2,3)
```

#### 函数重载
由于 JavaScript 是一个动态语言，我们通常会使用不同类型的参数来调用同一个函数，该函数会根据不同的参数而返回不同的类型的调用结果：

```ts
function add(x, y) {
 return x + y;
}
add(1, 2); // 3
add("1", "2"); //"12"
```

由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 `noImplicitAny` 的配置项时，以上代码会提示以下错误信息：

```
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
```


该信息告诉我们参数 x 和参数 y 隐式具有 any 类型。为了解决这个问题，我们可以为参数设置一个类型。因为我们希望 add 函数同时支持 string 和 number 类型，因此我们可以定义一个 string | number 联合类型，同时我们为该联合类型取个别名：

```ts
type Combinable=string | number;

function add(a:Combinable,b:Combinable){
    if (typeof a === 'string' || typeof b === 'string') {
     return a.toString() + b.toString();
    }
    return a + b;
}
```
为 `add` 函数的参数显式设置类型之后，之前错误的提示消息就消失了。那么此时的 add 函数就完美了么?我们来实际测试一下：

```ts
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

在上面代码中，我们分别使用 `'Semlinker'` 和 `' Kakuqo'` 这两个字符串作为参数调用 add 函数，并把调用结果保存到一个名为 result 的变量上，这时候我们想当然的认为此时 result 的变量的类型为 string，所以我们就可以正常调用字符串对象上的 split 方法。但这时 TypeScript 编译器又出现以下错误信息了：
```
Property 'split' does not exist on type 'number'.
```
很明显 `number` 类型的对象上并不存在 `split` 属性。问题又来了，那如何解决呢？这时我们就可以利用 TypeScript 提供的函数重载特性。

**函数重载或方法重载是使用【相同名称】和【不同参数数量或类型】创建多个方法的一种能力。** 要解决前面遇到的问题，方法就是为同一个函数提供**多个函数类型定义**来进行函数重载，编译器会根据这个列表去处理函数的调用。
```ts
type Types = number | string
function add(a:number,b:number):number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a:Types, b:Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');

```
在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。这时 result 变量的类型是 `string` 类型。

### 元组

#### 元组定义

数组一般由同种类型的值组成，但有时我们需要在单个变量中存储`不同类型`的值，这时候我们就可以使用`元组`。

元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组最重要的特性是可以限制`数组元素的个数和类型`，它特别适合用来实现多值返回。
```ts
let x: [string, number]; 
// 类型必须匹配且个数必须为2

x = ['hello', 10]; // OK 
x = ['hello', 10,10]; // Error 
x = [10, 'hello']; // Error
```

注意，元组类型只能表示一个【已知元素数量和类型】的数组，**长度已指定**，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]。


#### 元组类型的解构赋值

我们可以通过下标的方式来访问元组中的元素，当元组中的元素较多时，这种方式并不是那么便捷。其实元组也是支持解构赋值的：
```ts
let employee:[number,string]=[1,'tom'];
let [id,username]=employee;
console.log(`id: ${id}`);          //id: 1
console.log(`username: ${username}`);  //username:tom
```
这里需要注意的是，在解构赋值时，**解构数组元素的个数是不能超过元组中元素的个数**，否则也会出现错误。

#### 元组类型的可选元素
在实际工作中，声明可选的元组元素有什么作用？这里我们来举一个例子，在三维坐标轴中，一个坐标点可以使用 `(x, y, z)` 的形式来表示，对于二维坐标轴来说，坐标点可以使用 `(x, y)` 的形式来表示，而对于一维坐标轴来说，只要使用 `(x)` 的形式来表示即可。针对这种情形，在 TypeScript 中就可以利用元组类型可选元素的特性来定义一个元组类型的坐标点，具体实现如下：
```ts
// 定义一个特定类型的元组
type Point=[number,number?,number?];

const x:Point=[10]   //一维点坐标
const xy:Point=[10,10]  //二维点坐标
const xyz:Point=[10,10,10]   //三维点坐标

console.log(x.length); // 1
console.log(xy.length); // 2
console.log(xyz.length); // 3
```

#### 元组类型的剩余元素
元组类型里**最后一个元素**可以是剩余元素，形式为 ...X，这里 X 是数组类型。剩余元素代表元组类型是开放的，可以有零个或多个额外的元素。 例如，[number, ...string[]] 表示带有一个 number 元素和任意数量string 类型元素的元组类型。为了能更好的理解，我们来举个具体的例子：
```ts
type RestTupleType=[number,...[string]];
let restTuple:RestTupleType=[666,"Semlinker", "Kakuqo", "Lolo"];
console.log(restTuple[0]);  //666
console.log(restTuple[1]);  //"Semlinker"
```

#### 只读的元组类型
TypeScript 3.4 还引入了对只读元组的新支持。我们可以为任何元组类型加上 `readonly` 关键字前缀，以使其成为只读元组。具体的示例如下：
```ts
const point:readonly[number,string]=[1,'abc']
```
在使用 readonly 关键字修饰元组类型之后，任何企图修改元组中元素的操作都会抛出异常：

```ts
// Cannot assign to '0' because it is a read-only property.
point[0] = 1;
// Property 'push' does not exist on type 'readonly [number, number]'.
point.push(0);
// Property 'pop' does not exist on type 'readonly [number, number]'.
point.pop();
// Property 'splice' does not exist on type 'readonly [number, number]'.
point.splice(1, 1);
```

### void
`void`表示没有任何类型，和其他类型是平等关系，不能直接赋值:
```ts
let a: void; 
let b: number = a; // Error
```
你只能为它赋予null和undefined（在strictNullChecks未指定为true时）。**声明一个void类型的变量没有什么大用，我们一般也只有在函数没有返回值时去声明。**
```ts
function fun():void{
    console.log("hello world")
};
fun();
```

### Never
`never`类型表示的是那些永不存在的值的类型。

值会永不存在的两种情况：
1、如果一个函数执行时抛出了【异常】，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；
2.函数中执行【无限循环】的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。
```ts
// 异常
function err(msg: string): never { // OK
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}
```

`never`类型同`null`和`undefined`一样，也是任何类型的子类型，也可以赋值给任何类型。
但是：`never`没有任何子类型！！因此，任何类型都不可以赋值给`never`（除了`never`本身），即使`any`也不可以赋值给`never`.

**【总结：never可以赋值给任何类型，但是任何类型都不可以赋值给never（除了never本身）】**

```ts
let ne: never;
let nev: never;
let an: any;

ne = 123; // Error
ne = nev; // OK
ne = an; // Error
ne = (() => { throw new Error("异常"); })(); // OK
ne = (() => { while(true) {} })(); // OK
```

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：
```ts
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```
注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：
```ts
type Foo = string | number | boolean;
```
然而他忘记同时修改 controlFlowAnalysisWithNever 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 boolean 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保controlFlowAnalysisWithNever 方法总是穷尽了 Foo 的所有可能类型。 
通过这个示例，我们可以得出一个结论：**【使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。】**

### any
在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型。
**【所有类型都可以赋值给any类型,any类型也可以赋值给任何类型】**
`any`类型就是没有什么约束

```ts
let a: any = 666;
a = "Semlinker";
a = false;
a = 66
a = undefined
a = null
a = []
a = {}
```

在any上访问任何属性都是允许的,也允许调用任何方法.
可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。**

```ts
let anyThing:any="hello";
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
```

变量如果在声明的时候，**未指定其类型**，那么它会被识别为任意值类型：
```ts
let something;    //等价于 let something:any;
something = 'seven';
something = 7;
something.setName('Tom');
```
在许多场景下，这太宽松了。使用` any `类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用` any `类型，就无法使用 TypeScript 提供的大量的保护机制。请记住，`any` 是魔鬼！尽量不要用`any`。
为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。


### unknown
**【和any一样，所有类型都可以赋值给unknown类型】**
```ts
let notSure: unknown = 4;
notSure = "maybe a string instead"; // OK
notSure = false; // OK
```
`unknown`与`any`的最大区别是：任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型；但对于`unknown`，任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`

```ts
let notSure: unknown = 4;
let uncertain: any = notSure; // OK

let notSure: any = 4;
let uncertain: unknown = notSure; // OK

let notSure: unknown = 4;
let uncertain: number = notSure; // Error
```

如果不缩小类型，就无法对`unknown`类型执行任何操作：                      ???????????????
```ts
function getDog() {
 return '123'
}
 
const dog: unknown = {hello: getDog};
dog.hello(); // Error
```

这种机制起到了很强的预防性，更安全，这就要求我们必须缩小类型，我们可以使用typeof、类型断言等方式来缩小未知范围：
```ts
function getDogName() {
 let x: unknown;
 return x;
};
const dogName = getDogName();
// 直接使用
const upName = dogName.toLowerCase(); // Error
// typeof
if (typeof dogName === 'string') {
  const upName = dogName.toLowerCase(); // OK
}
// 类型断言 
const upName = (dogName as string).toLowerCase(); // OK
```

### Number、String、Boolean、Symbol
**先说结论：【原始类型可以赋值给对象类型，对象类型不能赋值给原始类型】**
可以理解为，原始类型是对象类型的子类型。

原始类型 number、string、boolean、symbol 混淆的首字母大写的 Number、String、Boolean、Symbol 类型，后者是相应原始类型的**包装对象**，姑且把它们称之为对象类型。
```ts
let num: number;
let Num: Number;
Num = num; // ok
num = Num; // ts(2322)报错
```

因此，我们需要铭记不要使用对象类型来注解值的类型，因为这没有任何意义。

### object、Object 和 {}
**先说结论：【{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则只能表示非原始类型。】**

小 object 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，null 和 undefined 类型也不能赋给 object。

::: warning 
JavaScript 中以下类型被视为原始类型：string、boolean、number、bigint、symbol、null 和 undefined。
:::

```ts
let lowerCaseObject: object;
lowerCaseObject = 1; // ts(2322)
lowerCaseObject = 'a'; // ts(2322)
lowerCaseObject = true; // ts(2322)
lowerCaseObject = null; // ts(2322)
lowerCaseObject = undefined; // ts(2322)
lowerCaseObject = {}; // ok
```

大Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。
```ts
let upperCaseObject: Object;
upperCaseObject = 1; // ok
upperCaseObject = 'a'; // ok
upperCaseObject = true; // ok
upperCaseObject = null; // ts(2322)
upperCaseObject = undefined; // ts(2322)
upperCaseObject = {}; // ok
```

从上面示例可以看到，大 Object 包含原始类型，小 object 仅包含非原始类型，所以大 Object 似乎是小 object 的父类型。**【实际上，大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型。】**

```ts
type isLowerCaseObjectExtendsUpperCaseObject = object extends Object ? true : false; // true
type isUpperCaseObjectExtendsLowerCaseObject = Object extends object ? true : false; // true
upperCaseObject = lowerCaseObject; // ok
lowerCaseObject = upperCaseObject; // ok
```
::: warning
注意：尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。
:::

{}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {}.
```ts
let ObjectLiteral: {};
ObjectLiteral = 1; // ok
ObjectLiteral = 'a'; // ok
ObjectLiteral = true; // ok
ObjectLiteral = null; // ts(2322)
ObjectLiteral = undefined; // ts(2322)
ObjectLiteral = {}; // ok
type isLiteralCaseObjectExtendsUpperCaseObject = {} extends Object ? true : false; // true
type isUpperCaseObjectExtendsLiteralCaseObject = Object extends {} ? true : false; // true
upperCaseObject = ObjectLiteral;
ObjectLiteral = upperCaseObject;
```

## 类型推断

```ts
{
  let str: string = 'this is string';
  let num: number = 1;
  let bool: boolean = true;
}
{
  const str: string = 'this is string';
  const num: number = 1;
  const bool: boolean = true;
}
```
看着上面的示例，可能你已经在嘀咕了：定义基础类型的变量都需要写明类型注解，TypeScript 太麻烦了吧？在示例中，使用 `let` 定义变量时，我们写明类型注解也就罢了，毕竟值可能会被改变。可是，使用 `const` 常量时还需要写明类型注解，那可真的很麻烦。

实际上，TypeScript 早就考虑到了这么简单而明显的问题。

在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解。因此，上面的示例可以简化为如下所示内容：

```ts
{
  let str = 'this is string'; // 等价
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}
```

我们把 TypeScript 这种基于**赋值表达式**推断类型的能力称之为`类型推断`。

在 TypeScript 中，具有初始化值的变量、有默认值的函数参数、函数返回的类型都可以根据上下文推断出来。比如我们能根据 return 语句推断函数返回的类型，如下代码所示：
```ts
{
  /** 根据参数的类型，推断出返回值的类型也是 number */
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number
  
  /** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  const x3 = add2(1, '1'); // ts(2345) Argument of type "1" is not assignable to parameter of type 'number | undefined
}
```
如果定义的时候**没有赋值**，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查：
```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
**总结：如果定义变量的时候，直接进行了赋值，则TS能够推断出变量的类型；如果定义变量时没有赋值，则TS认为这个变量是any类型**

## 类型断言
有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

TypeScript 类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 TypeScript 更清楚实际类型的情况，比如下面的例子：
```ts
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 ts(2322)
```

其中，greaterThan2 一定是一个数字（确切地讲是 3），因为 arrayNumber 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。
在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 number。

不过，我们可以使用一种笃定的方式——**【类型断言】**（类似仅作用在类型层面的**强制类型转换**）告诉 TypeScript 按照我们的方式做类型检查。
比如，我们可以使用 as 语法做类型断言，如下代码所示：
```ts
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

### 语法

```ts
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

以上两种方式虽然没有任何区别，但是尖括号格式会与react中JSX产生语法冲突，因此我们更推荐使用 as 语法。

### 非空断言
在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符` ! `可以用于断言操作对象是非 `null` 和非 `undefined` 类型。具体而言，`x! `将从 x 值域中排除 null 和 undefined 。

具体看以下示例：
```ts
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)
```

### 确定赋值断言
允许在**实例属性**和**变量声明**后面放置一个`!` 号，从而告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：
```ts
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}


```

很明显该异常信息是说变量` x `在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：
```ts
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```

## 字面量类型
在 TypeScript 中，字面量不仅可以表示值，还可以表示**类型**，即所谓的字面量类型。
目前，TypeScript 支持 3 种字面量类型：**字符串字面量类型**、**数字字面量类型**、**布尔字面量类型**，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：
```ts
{
  let specifiedStr: 'this is string' = 'this is string';
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}
```
比如 'this is string' （这里表示一个字符串字面量类型）类型是 string 类型（确切地说是 string 类型的子类型），而 string 类型不一定是 'this is string'（这里表示一个字符串字面量类型）类型，【也就是说，字面量类型比其对应的原始类型，范围小】如下具体示例：

```ts
{
  let specifiedStr: 'this is string' = 'this is string';
  let str: string = 'any string';
  specifiedStr = str; // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'
  str = specifiedStr; // ok 
}
```

### 字符串字面量类型
一般来说，我们可以使用一个字符串字面量类型作为变量的类型，如下代码所示：
```ts
let hello: 'hello' = 'hello';
hello = 'hi'; // ts(2322) Type '"hi"' is not assignable to type '"hello"'
```

实际上，定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个**联合类型**，用来描述拥有明确成员的实用的**集合**。

如下代码所示，我们使用字面量联合类型描述了一个明确、可 'up' 可 'down' 的集合，这样就能清楚地知道需要的数据结构了。

```ts
type Direction = 'up' | 'down';

function move(dir: Direction) {
  // ...
}
move('up'); // ok
move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'
```

通过使用字面量类型组合的联合类型，我们可以限制函数的参数为指定的**字面量类型集合**，然后编译器会检查参数**是否是指定的字面量类型集合里的成员**。
因此，相较于使用 string 类型，使用字面量类型（组合的联合类型）可以将函数的参数限定为**更具体的类型**。这不仅提升了程序的可读性，还保证了函数的参数类型，可谓一举两得。

### 数字字面量类型及布尔字面量类型
数字字面量类型和布尔字面量类型的使用与字符串字面量类型的使用类似，我们可以使用字面量组合的联合类型将函数的参数限定为更具体的类型，比如声明如下所示的一个类型 Config：
```ts
interface Config {
    size: 'small' | 'big';
    isEnable:  true | false;
    margin: 0 | 2 | 4;
}
```
在上述代码中，我们限定了 size 属性为字符串字面量类型 'small' | 'big'，isEnable 属性为布尔字面量类型 true | false（布尔字面量只包含 true 和 false，true | false 的组合跟直接使用 boolean 没有区别），margin 属性为数字字面量类型 0 | 2 | 4。



