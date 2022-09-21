const obj = {
    a: 123,
    b: 456
}

const arr = Object.entries(obj)

for (let [key, value] of arr) {
    console.log(key, value)
}
