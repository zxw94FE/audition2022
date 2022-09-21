// 合并两个有序数组
var merge = function(nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2)
  nums2.sort((a, b) => a - b)
}

// 关于sort 可以用于比较字符串跟数字。都会转换为字符串进行比较。例如 banana>apple 20>111
// 可以创建比较函数进行比较。
// 1. 比较数字，可以直接使用这种方式进行升序排列，因为如果a>b 返回值大于0， 则b在a的前面。如果 a<b 返回值小于0， a在b的前面。所以无论如何都是升序。
// 反之无论如何都是降序排列。
[1,20,11,44].sort((a, b) => {
  return a - b
})

// 也可以利用对象的属性值进行排序等等。
var merge = function (nums1, m, nums2, n) {
  let p1 = 0, p2 = 0;
  const sorted = new Array(m+n).fill(0);
  var cur;
  while(p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++]
    } else if (p2 === n) {
      cur = nums1[p1++]
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++]
    } else {
      cur = nums2[p2++]
    }
    sorted[p1 + p2 - 1] = cur
  }
  for (let i = 0; i != m + n; ++i) {
    nums1[i] = sorted[i]
  }
}