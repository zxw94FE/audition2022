/**
 * ^ - 匹配输入的开始  例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。
 *      但是： 当 '^' 作为第一个字符出现在一个字符集合模式时（[]），它将会有不同的含义。
 *
 * * - 匹配前一个表达式 0次或者n次 等价于 {0,}
 *      例如（bo*）  会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中不会匹配任何内容。
 *
 * $ - 匹配输入的结束，
 *      例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。
 *
 * + - 匹配前面一个表达式0次或者多次， 等价于{1,}
 *      例如，/a+/ 会匹配 "candy" 中的 'a' 和 "caaaaaaandy" 中所有的 'a'，但是在 "cndy" 中不会匹配任何内容。
 *
 * ？- 匹配前面一个表达式0次或者1次，等价于 {0,1} 例如，/e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。
 *      如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为非贪婪（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。
 *      例如，对 "123abc" 使用 /\d+/ 将会匹配 "123"，而使用 /\d+?/ 则只会匹配到 "1"。
 *
 * . - (小数点)默认匹配除了换行符之外的任何单个字符
 *      例如，/.n/ 将会匹配 "nay, an apple is on the tree" 中的 'an' 和 'on'，但是不会匹配 'nay'。
 *
 * {n} - n 是一个正整数，匹配了前面一个字符刚好出现了 n 次
 *      比如， /a{2}/ 不会匹配“candy”中的'a',但是会匹配“caandy”中所有的 a，以及“caaandy”中的前两个'a'。
 *
 * {n, } -  n是一个正整数，匹配前一个字符至少出现了n次
 *      例如, /a{2,}/ 匹配 "aa", "aaaa" 和 "aaaaa" 但是不匹配 "a"。
 *
 * {n,m} - n 和 m 都是整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略。
 *      例如，/a{1, 3}/ 并不匹配“cndy”中的任意字符，匹配“candy”中的a，匹配“caandy”中的前两个a，也匹配“caaaaaaandy”中的前三个a。
 *      注意，当匹配”caaaaaaandy“时，匹配的值是“aaa”，即使原始的字符串中有更多的a。
 *
 *  x(?=y) - 匹配'x'仅仅当'x'后面跟着'y'.这种叫做先行断言。
 *      例如，/Jack(?=Sprat)/会匹配到'Jack'仅当它后面跟着'Sprat'。/Jack(?=Sprat|Frost)/匹配‘Jack’仅当它后面跟着'Sprat'或者是‘Frost’。
 *      但是‘Sprat’和‘Frost’都不是匹配结果的一部分。
 *
 * [^xyz] - 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。你可以使用破折号（-）来指定一个字符范围。任何普通字符在这里都是起作用的。
 *      例如，[^abc] 和 [^a-c] 是一样的。他们匹配"brisket"中的‘r’，也匹配“chop”中的‘h’。
 *
 * \d - 匹配一个数字 等价于[0-9]
 *      例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'。
 *
 * \D - 匹配一个非数字字符
 *      例如， /\D/ 或者 /[^0-9]/ 匹配"B2 is the suite number."中的'B' 。
 *
 * \n - 匹配一个换行符
 *
 * \r - 匹配一个回车符
 *
 * \w - 匹配一个单字字符（字母、数字或者下划线） 等价于 [A-Za-z0-9_]
 *
 * \W - 匹配一个非单字字符。等价于 [^A-Za-z0-9_]
 *      例如, /\W/ 或者 /[^A-Za-z0-9_]/ 匹配 "50%." 中的 '%'。
 *
 * \s - 匹配一个空白字符 包括空格、制表符、换页符和换行符 等价于[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
 *      例如，/ \S\w* / 匹配"foo bar."中的'foo'。 TODO // 之间没有空格 是为了注释的正常展示而已。
 *
 * \S - 匹配一个非空白字符 等价于 [^ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]。
 *      例如，/ \S\w* / 匹配"foo bar."中的'foo'。
 *
 * \n(n是数字) -  在正则表达式中，它返回最后的第n个子捕获匹配的子字符串(捕获的数目以左括号计数)。
 *      比如 /apple(,)\sorange\1/ 匹配"apple, orange, cherry, peach."中的'apple, orange,' 。
 **/


/**
 * 以下哪些正则表达式满足regexp.test('abc') === true？
 */

// A: /^abc$/
// B: /...(?=.)/
// C:/[ab]{2}[^defgh]/
// D: /[defgh]*/



let regExp1 = /^abc$/               // 成功原因: 以a开头 c结尾 符合条件          TODO 匹配到了 abc
let regExp2 = /...(?=.)/            // 失败原因：先行断言 x(?=y) 此时的y在‘abc’中没有对应的值去匹配
let regExp3 = /[ab]{2}[^defgh]/     // 成功原因：留意 ^ 用在字符集中，表达取反。   TODO 匹配到了abc
let regExp4 = /b[defgh]*/           // 成功原因：* 表示匹配0次或者n次，          TODO 匹配到了b

console.log(regExp1.test('abc') === true) // true
console.log(regExp2.test('abc') === true) // false
console.log(regExp3.test('abc') === true) // true
console.log(regExp4.test('abc') === true) // true

// TODO：正则匹配的原则： 拿着regExp往string里面套。只要在目标string上，只要有能匹配到的东西 就ok ，就是true。
// TODO: //g g的作用：replace时，如果不加g，则只匹配一项并替换， 如果加了g， 全部匹配并替换。

// 这个例子可以帮你更好理解上面的原则。
let regExp5 = /b[defgh]*/g
let str1 = 'abc abd g b bf abf bcf'

let str2 = str1.replace(regExp5, '$')
console.log(str2) // a$c a$ g $ $ a$ $cf


let regExp6 = /apple(,)orange\1/
let str3 = "apple,orange,cherry,peach."
let str4 = str3.replace(regExp6, '$')
console.log(str4) // $cherry,peach.

let regExp7 = /_\1/
let str5 = "a_b_cherry,peach."
let str6 = str5.replace(regExp7, '$')
console.log(str6) // $cherry,peach.
