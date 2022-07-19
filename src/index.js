import "./styles/index.scss";

const pizzaRecipe = {
    flour: 2,
    peppers: 1,
    cheese: 1
}

const italianPizzaRecipe = {
    ...pizzaRecipe,
    cheese: 3,
    italianPeppers: 1
}

console.log(pizzaRecipe);
console.log(italianPizzaRecipe);