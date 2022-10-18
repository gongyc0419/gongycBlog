# Vue Router

##  路由传参——query和params

### vue路由中的传参

假设现在需要实现路由切换，点击切换到w组件，并传递参数id和age值

使用`router-link`来实现：
```js
<router-link :to="{ A: 'xxx', query: { xx:'xxx' }}" />
<router-link :to="{ A: 'xxx', parmas: { xx:'xxx' }}" />
routes:{ ??? }
```

将有如下疑问：

对于params和query来说

（1） A是path还是name？

（2） routes要怎么写？

（3）url显示的是什么？


### query

```js
<router-link :to="{ name: 'W', query: { id:'1234'，age:'12' }}"/>
<router-link :to="{ path: '/W', query: { id:'1234',age:'12' }}"/>
```
（1）对于query来说，`name`和`path`都可以

（2）

①如果使用了`name`,routes基于`name`设置
```js
{
  path: '/hhhhhhh', //这里可以任意
  name: 'W',  //这里必须是W
  component: W
}
```
②如果使用了`path`，routes基于`path`设置
```js
{
  path: '/W', //这里必须是W
  name: 'hhhhhhhh',  //这里任意
  component: W
}
```
(3)

①对应的url为：
`http://localhost:8080/#/hhhhhhh?id=1234&age=12`

②对应的url为：
`url:http://localhost:8080/#/W?id=1234&age=12`

在接收参数时都使用：
`this.$route.query.id`


### params

```js
<router-link :to="{ name: 'W', params: { id:'1234',age:'12' }}"/>
```

(1)对于params只能用`name`,不能用`path`,否则会无视掉params中的内容

(2)在routes中添加
```js
{
      path:'/W/:id/:age',  // /W/可以为任意
      name:'W',
      component:W
}
```
这里的name与上面router-link中的name保持一致

注意：`/:id`和`/:age`不能省略，且不能改名字

(3)对应的url为：
`http://localhost:8080/#/W/1234/12`
