let animals = [{type:"lion"}, "tiger"]

let clones = animals.slice()
clones[0].type = "bear"
clones[1] = "sheep"

console.log(clones)