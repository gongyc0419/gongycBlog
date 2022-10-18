## 1.为什么需要Promise
需求：通过Ajax发送请求，得到用户id，再通过id发送请求得到用户名，再通过用户名发送请求得到email

以前的方法：通过回调函数处理异步请求
导致：回调地狱————回调函数中嵌套了回调函数
```js
      //场景：通过ajax请求id，再根据id请求用户名，再根据用户名请求邮箱
      //发送ajax请求
      $.ajax({
        type: "GET",
        url: "./data1.json",
        success: function (res) {   //请求成功的回调
          //response,result
          const { id } = res       //得到用户id
          console.log(id)

          $.ajax({           
            type: "GET",
            url: "./data2.json",
            data: { id }, //相当于{id:id}   
            success: function (res) {      //请求成功的回调
              const { username } = res     //根据id，得到用户名
            //   console.log(username)

            $.ajax({
                type:'GET',
                url:'/data3.json',
                data:{username},
                success:function(res){    //请求成功的回调
                    console.log(res)      //根据用户名，得到email
                }
            })
            },
          })
        },
      })
```

Promise：用于解决回调地狱

## 2.Promise的基本使用
Promise 是一个**构造函数**, 通过 new 关键字实例化对象

语法：
```js
new Promise((resolve, reject) => {})
```

+ Promise构造函数接受一个函数作为参数
+ 在参数函数中接受两个参数,这两个参数也是函数
    - resolve:成功函数
    - reject:失败函数

promise实例有两个属性：
+ state:状态
+ result:结果

### 1）promise的状态

第一种状态: pending(准备, 待解决, 进行中)

第二种状态: fulfilled(已完成, 成功)

第三种状态: rejected(已拒绝, 失败)

### 2）promise状态的改变
通过调用 resolve()和 reject()改变当前 promise 对象的状态
```js
const p = new Promise((resolve, reject) => {
  // resolve(): 调用函数, 使当前promise对象的状态改成fulfilled
  // reject(): 调用函数, 使当前promise对象的状态改成rejected

  // resolve()
  reject()
})
console.dir(p)

```
+ resolve(): 调用函数, 使当前 promise 对象的状态改成 fulfilled
+ reject(): 调用函数, 使当前 promise 对象的状态改成 rejected
+ 注意：promise 状态的改变是一次性的

### 3）promise结果的改变
通过向resolve和reject中传递参数，改变promise对象的结果。

```js
const p = new Promise((resolve, reject) => {
  // 通过调用resolve, 传递参数, 改变 当前promise对象的 结果
  resolve('成功的结果')
  //reject('失败的结果')
})
console.dir(p)
```

## 3.Promise的方法

### 1)then方法
Promise的原型中存在then方法
then方法参数：两个函数，第一个函数当promise状态为fulfill时执行，第二个函数当promise状态为rejected时执行
then方法返回值：返回一个新的 promise 实例, 状态是pending

```js
const p = new Promise((resolve, reject) => {
  // 通过调用resolve, 传递参数, 改变 当前promise对象的 结果
  resolve('成功的结果')
  //reject('失败的结果')
})

// then方法函数
// 参数
// 1. 是一个函数
// 2. 还是一个函数
// 返回值: 是一个promise对象
p.then(
  () => {
    // 当promise的状态是fulfilled时, 执行
    console.log('成功时调用')
  },
  () => {
    // 当promise的状态是rejected时, 执行
    console.log('失败时调用')
  }
)
console.dir(p)
```

在 then 方法的参数函数中, 通过**形参**使用 promise 对象的结果
```js
const p = new Promise((resolve, reject) => {
  // 通过调用resolve, 传递参数, 改变 当前promise对象的 结果
  resolve('123')
  //reject('失败的结果')
})

// then方法函数
// 参数
// 1. 是一个函数
// 2. 还是一个函数
// 返回值: 是一个promise对象
const t = p.then(
  (value) => {
    // 当promise的状态是fulfilled时, 执行,value是'123'
    console.log('成功时调用', value)
  },
  (reason) => {
    // 当promise的状态是rejected时, 执行
    console.log('失败时调用', reason)
  }
)
console.dir(t)
```

注意：promise的状态如果是pending,不执行then中的方法
```js 
// 如果promise的状态不改变, then里的方法不会执行!!!
new Promise((resolve, reject) => {}).then(
  (value) => {
    console.log('成功')  //不执行
  },
  (reason) => {
    console.log('失败')  //不执行
  }
)
```

在 `then` 方法中, 通过 `return` 将返回的 `promise` 实例改为 `fulfilled` 状态
如果在 `then` 方法中, 出现**代码错误**, 会将返回的 `promise` 实例改为 `rejected` 状态

```js 
// 如果promise的状态不改变, then里的方法不会执行
const p = new Promise((resolve, reject) => {
  resolve()
})

const t = p.then(
  (value) => {
    console.log('成功')
    // 使用return可以将t实例的状态改成fulfilled
    return 123
  },
  (reason) => {
    console.log('失败')
  }
)

t.then(
  (value) => {
    console.log('成功2', value)
  },
  (reason) => {
    console.log('失败')
  }
)
```

```js 
// 如果promise的状态不改变, then里的方法不会执行
const p = new Promise((resolve, reject) => {
  resolve()
})

const t = p.then(
  (value) => {
    console.log('成功')
    // 使用return可以将t实例的状态改成fulfilled
    //return 123

    // 如果这里的代码出错, 会将t实例的状态改成rejected
    console.log(a)
  },
  (reason) => {
    console.log('失败')
  }
)

t.then(
  (value) => {
    console.log('成功2', value)
  },
  (reason) => {
    console.log('失败', reason)
  }
)
```

### 2)catch方法
catch方法参数：是一个函数

catch中的参数函数在什么时候被执行?
  + 当promise的状态改为rejected时, 被执行
  + 当promise执行体中出现代码错误时, 被执行

```js 
const p = new Promise((resolve, reject) => {
  // reject()
  // console.log(a)
  throw new Error('出错了')
})

// 思考: catch中的参数函数在什么时候被执行?
// 1. 当promise的状态改为rejected时, 被执行
// 2. 当promise执行体中出现代码错误时, 被执行
p.catch((reason) => {
  console.log('失败', reason)
})
console.log(p)
```

## 4.优化需求代码
对于文章开头时提出的需求，使用promise进行优化后：

```js 
// 封装ajax请求
      $.ajax({
        type: "GET",
        url: "./data1.json",
        success: function (res) {   //请求成功的回调
          //response,result
          const { id } = res       //得到用户id
          console.log(id)

          $.ajax({           
            type: "GET",
            url: "./data2.json",
            data: { id }, //相当于{id:id}   
            success: function (res) {      //请求成功的回调
              const { username } = res     //根据id，得到用户名
            //   console.log(username)

            $.ajax({
                type:'GET',
                url:'/data3.json',
                data:{username},
                success:function(res){    //请求成功的回调
                    console.log(res)      //根据用户名，得到email
                }
            })
            },
          })
        },
      })

// 封装ajax请求
function getData(url,data={}){
    return new Promise((resolve,reject)=>{
        $.ajax({
            type: "GET",
            url: url,
            data:data
            //请求成功的回调
            success: function (res) {  
                resolve(res)     //将返回的promise状态改为fulfill，并且改变promise实例的result为得到的res
            }
            // 请求失败的回调
            error:function(res){
                reject(res)     //将返回的promise状态改为rejected，并且改变result为得到的res
            }
        })
    }
}

//调用函数
getData("data1.json")   //发送ajax请求得到用户id，并且返回一个promise，返回的结果保存在promise实例的result中
.then((data)=>{         //data接收promise实例身上的result(也就是ajax返回的结果)
    const {id}=data
    return getData("data2.json", {id})  //再次发送ajax请求，得到用户名，并返回一个promise，返回的结果保存在promise实例的result中
}).then((data)=>{
    const {username}=data
    return getData("data3.json", {usename}) //再次发送ajax请求，得到email，并返回一个promise，返回的结果保存至promise实例的result中
}).then((data)=>{
    console.log(data)
})
```

## 5.async和await

### 1）async函数

1.函数返回一个promise对象
2.promise对象的结果由async函数执行的返回值决定（和then函数的返回值类似）
+ 如果返回值是非promise类型的数据，return 一个字符串 数字 布尔值等都是成功的Promise对象
+ 如果返回值是promise对象：
    - resolve("OK") 返回的是成功Promise对象,状态值:[[PromiseState]]:"fulfilled"
    - reject("Err") 返回的是失败Promise对象,状态值:[[PromiseState]]:"rejected"	
+ 抛出异常 状态值:[[PromiseState]]:"rejected",结果是抛出的值

```js
async function main(){
  // 1.如果返回值是一个非Promise类型的数据
  //  return 一个字符串 数字 布尔值等都是成功的Promise对象
  // 2. 如果返回的时一个Promise对象
  //  return new Promise((resolve, reject) => {
  //  resolve("OK") 返回的是成功Promise对象,状态值:[[PromiseState]]:"fulfilled"
  //  reject("Err") 返回的是失败Promise对象,状态值:[[PromiseState]]:"rejected"		
  // 3. 抛出异常
  throw "oh No" // 状态值:[[PromiseState]]:"rejected",结果是抛出的值
})
}
let result = main();
console.log(result);
```
### 2)await表达式
1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
2. 如果表达式是 promise 对象, await 返回的是 promise **成功的结果**
3. 如果表达式是其它值, 直接将此值作为 await 的返回值

:::warning 注意
1. await 必须写在 async 函数中, 但 async 函数中可以没有 await
2. 如果 await 的 **promise 失败了**, 就会抛出异常, 需要通过 try...catch 捕获处理
:::

### 3）async和await结合
```js
const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);// promisify转换为Promise形态的函数

async function main(){
  // 捕获处理，如果异步操作失败，则通过try catch捕获异常
try{
  	// 读取第一个文件的内容
    let data1 = await mineReadFile("./resource/1.html");   //data1是读取文件成功的结果
    let data2 = await mineReadFile("./resource/2.html");
    let data3 = await mineReadFile("./resource/3.html");
  }catch(e){
  	console.log(e):	
  }
}
```