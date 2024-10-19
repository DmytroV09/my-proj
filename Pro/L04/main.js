// Определяем две переменные с рецептами
let recipeWithMilk = "1. Add milk to the mixture. 2. Stir well. 3. Bake at 180°C for 20 minutes.";
let recipeWithoutMilk = "1. Do not add milk. 2. Stir well. 3. Bake at 180°C for 20 minutes.";

// Логическая переменная, указывающая, добавлять ли молоко
let addMilk = false; // Измените на true, если нужно добавить молоко

// Условие для выбора правильного рецепта
if (addMilk) {
  console.log(recipeWithMilk); // Если молоко нужно, выводим рецепт с молоком
} else {
  console.log(recipeWithoutMilk); // Если молоко не нужно, выводим рецепт без него
}
