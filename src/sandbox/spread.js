const food = ["tiramisu", "pizza", "icecream", "coffee"];

console.log(...food, "tea")

const initState = {
  food: ["tiramisu", "pizza", "icecream", "coffee"],
  article: ["lilo", "tidam"]
}

// console.log(...initState, article "lol")

const result = () => {
  console.log( {
    ...initState,
    article: [...initState.article, "LOL"]
  })
}
result();
