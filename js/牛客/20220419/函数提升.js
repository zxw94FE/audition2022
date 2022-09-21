/**
 *
 * 函数的创建方式 ：
 *  1、 函数声明
 *      function fun() {console.log(1)}
 *         函数声明整体函数提升至最前面
 *         fun()
 *         function fun() {}
 *
 *         提升后
 *
 *         function fun() {}
            fun()
 *  2、 函数表达式
 *      var fn = function () {console.log(2)}
 *
 *          函数表达式是先提升变量，后再原来位置赋值
 *          fn()
            var fn = function() {}

            提升后
            var fn // 提升变量
            fn()    // fn is not a funciton
            fn = function() {}
    3. new Function ()  参数是字符串 https://zh.javascript.info/new-function、
        注意的点
            怎么出现的这种创建方式： 动态的创建函数（需要根据从后端或者其他地方获取的字符串，动态的创建函数）
            1. let func = new Function ([arg1, arg2, ...argN], functionBody); 以下的三种方式都是可以的 参数是字符串的类型
                 new Function('a', 'b', 'return a + b'); // 基础语法
                 new Function('a,b', 'return a + b'); // 逗号分隔
                 new Function('a , b', 'return a + b'); // 逗号和空格分隔
            2. 使用 new Function 创建的函数，它的 [[Environment]] 指向全局词法环境，而不是函数所在的外部词法环境 (如果是闭包，函数所在的外部词法环境就不是全局)，所以只能访问全局变量
            原因是因为：代码会压缩，局部变量名会变化，用这种方式会导致程序很容易出错。 当我们需要向 new Function 创建出的新函数传递数据时，我们必须显式地通过参数进行传递
 */

