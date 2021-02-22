

window.onload = function () {
    //浅拷贝
    function shallowCopy(obj) {
        //1.数组对象
        if (typeof obj !== 'object') return;
        //2.将属性和值放入一个新对象中
        let newObj = obj instanceof Array ? [] : {};
        //3.遍历
        for (let key in obj) {
            //自身属性,不能是继承过来的属性
            if (obj.hasOwnPropetry(key)) {
                newObj[key] = obj[key];
            }
        }

    }

    //深拷贝
    function deepCopy(obj) {
        //1.只拷贝数组对象
        if (typeof obj !== 'object') return;
        //2.将属性和值放入一个新对象中
        let newObj = obj instanceof Array ? [] : {};
        //3.遍历
        for (let key in obj) {
            //自身属性,不能是继承过来的属性
            if (obj.hasOwnPropetry(key)) {
                //深拷贝只是在浅拷贝的基础上去判断这个是不是对象或者数组,如果是将继续遍历
                newObj[key] = typeof obj[key] !== 'object' ? deepCopy(obj[key]) : obj[key]
            }
        }
    }

    // 防抖
    function myBounce(fn, time = 1000) {
        let timer = null;
        return function () {
            //先要清除定时器
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, time)
        }
    }
    // 节流
    function myThrottle(fn, time = 1000) {
        //定义一个标记,来标记可以点击
        let flag = true;
        return function () {
            //
            if (!flag) {
                return;
            } else {
                flag = false;
                setInterval(() => {
                    fn.apply(this, arguments);
                    //当执行完毕后 
                    flag = true;
                }, time);
            }

        }
    }

    // call
    Function.prototype.myCall = function (context) {
        //这个context只能是函数
        if (typeof context !== 'function') return;
        let result = null;
        context = context || window;
        //获取参数 不要第一个参数
        let args = [...arguments].slice(1);
        //将函数设置为属性
        context.fn = this;
        //调用函数
        result = context.fn(...args);
        //删除函数属性
        delete context.fn;
        //返回结果
        return result
    }
    // apply
    Function.prototype.myApply = function (context) {
        //这个context只能是函数
        if (typeof context !== 'function') return;
        let result = null;
        context = context || window;
        //将函数设置为属性
        context.fn = this;
        //调用函数 ,因为apply第二个参数是一个数组,我们可以直接获取
        if (arguments[1]) {
            result = context.fn(arguments[1]);
        } else {
            result = context.fn();
        }
        //删除函数属性
        delete context.fn;
        //返回结果
        return result
    }

    // bind
    Function.prototype.myBind = function (context) {
        //获取arguments[1]后面的参数
        let args = [...arguments].slice(1);
        let self = this;
        //bind的特性
        //1.返回一个函数
        return function Fn() {
            //使用apply来实现
            //2.可以在调用的时候传入参数
            //3.当返回的函数成为构造函数的时候,this指向改变,
            return self.apply(  
                // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
                // 以上面的是 demo 为例，如果改成 `this instanceof Fn ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
                // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
                // this instanceof Fn 这个this指的是self 这个主要来判断返回的函数是否为构造函数,如果是将返回构造函数那边的this 
                this instanceof Fn ? this : context,
                //2.可以传入参数
                args.concat(...arguments))

        }
    }


    //bing
    Function.prototype.mybind = function(context){
          //3个特点
          //1.返回一个函数
          //2.在调用的时候可以插入参数
          //3.当返回函数成为构造函数的时候,this指向改变
          let args = [...arguments].slice(1);
          let self = this;
         
          return function Fn(){
              return self.apply(
                  this instanceof Fn ? this: context,
                  args.concat(...arguments);
              )
          }
    }
}