var lengthOfLongestSubString = function (s) {
  let rk = -1 , n = s.length, ans = 0, occ = new Set();
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      occ.delete(s.charAt(i - 1))
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1))
      ++rk
    }
    ans = Math.max(ans, rk - i + 1)
  }
}