/**
 * 
 * @param {number[]} nums 
 * @param {number} target 
 * @returns {number[]}
 */
var solution = function (nums, target) {
    map = new map()
    for(var i=0; i<nums.length; i++) {
        x = target - nums[i]
        if(map.has(x)) {
            return [map.get(x), i]
        }
        map.set(nums[i], i)
    }
}

// map 存放的是键值对，此次存放的是 {值，对应的下标}。has(key)判断是否存在key，返回布尔值。get(key)得到value，
// 运用逆向解法，即用target减去数组中的某个元素，然后来判断map中是否有相同的值，若有则存在满足条件的答案，返回两个坐标即可；若没有，则保存{数组中某个元素值，对应的坐标}到map对象中。依次遍历即可判断是否有满足条件的两个元素。
