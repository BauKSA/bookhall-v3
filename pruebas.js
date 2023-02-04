const _date = new Date("07/18/2022")

const date = _date.toLocaleDateString()

console.log(typeof(_date.toJSON()))

const new_date = new Date(_date.toJSON())
console.log(new_date.getDate())
