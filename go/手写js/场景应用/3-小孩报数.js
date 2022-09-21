/**
 * 问题：有30个小孩儿，
 * 编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 
 * 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
 */

/***
 * 思路：首先建立一个1-30排列的数组，遍历，遇到该退出的就把值赋为0  最后哪个元素不是0 哪个就是最后的小孩编号。
 * 变量：
 *  - 当前下标。curIndex
 *  - 淘汰人数。exitNum
 *  - 记录报数。countNum
 */

function childNum (num, count) {
    let allPlayer = []
    for(let i = 0; i < num.length; i++) {
        allPlayer[i] = i + 1
    }
    let curIndex = 0
    let exitNum = 0
    let countNum = 1

    while(exitNum < num - 1) {
        if(allPlayer[curIndex] !== 0) countNum++;
        if(countNum === count) {
            allPlayer[curIndex] = 0
            counter = 0
            exitNum++
        }
        curIndex++
        if(curIndex == num) {
            curIndex = 0
        }
    }
    for(i=0; i<allPlayer.length; i++) {
        if(allPlayer[i] !== 0) return allPlayer[i]
    }
}

childNum(30, 3)

