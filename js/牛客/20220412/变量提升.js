/**
 * 当 foo是引用数据类型的时候
 */
var foo = {n: 1};
(function (foo) {
    console.log(foo.n);
    foo.n = 3;
    var foo = {n: 2};
    console.log(foo.n);
})(foo);
console.log(foo.n);


// answer： 1 2 3


/**
 * 解答
 */
var foo = {n: 1};
(function (foo) {            //形参foo同实参foo一样指向同一片内存空间，这个空间里的n的值为1
    var foo;               // TODO 在任何地方给一个已经声明且赋值的变量再重新声明，重新声明是无效的。因此第一个console会打印形参的n，即1
    console.log(foo.n);    //输出1
    foo.n = 3;             //形参与实参foo指向的内存空间里的n的值被改为3
    foo = {n: 2};           //形参foo指向了新的内存空间，里面n的值为2.
    console.log(foo.n);    //输出新的内存空间的n的值
})(foo);
console.log(foo.n);        //实参foo的指向还是原来的内存空间，里面的n的值为3.

/**
 * 如果foo是基本数据类型呢 ?
 **/

var foo1 = 1;
(function (foo1) {
    console.log(foo1)
    foo1 = 3
    var foo1 = 2
    console.log(foo1)
})(foo1)
console.log(foo1)

// 答案 1 2 1

/**
 * 解答
 */
var foo1 = 1;
(function (foo1) { // 形参跟实参都是1 但是因为是基本数据类型 所以二者并没有用同一块内存地址
    var foo1;   // foo1 这个变量已经被赋值了，重新声明就无效了。
    console.log(foo1)   // 1
    foo1 = 3    // 形参被赋值为3
    foo1 = 2    // 形参被赋值为2
    console.log(foo1)      // 2
})(foo1)
console.log(foo1) // 实参还是1 不会收到形参变化的影响。

// 答案 1 2 1

/**
 * TODO 学到的点：
 *  1. 在任何地方给一个已经声明且赋值的变量再重新声明，重新声明是无效的。注意是重新声明 而不是赋值
 *  2.
 *      1.函数参数是原始类型的值（数值、字符串、布尔值），传递方式是传值传递，即在函数体内修改参数值，不会影响到函数外部。
 *      2.函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递，传入的是原始值的地址，因此在函数内部修改参数，将会影响到原始值。
 *      3.注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值！
 *  3. 如果变量名和已经声明并赋值的函数名或者参数名相同，不会影响已经存在的属性（也就是说变量提升无效）
 */

