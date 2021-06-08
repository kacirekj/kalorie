import Food from "../domain/Food";

class FoodConnector {
    getFoodByIdContaining = async (text: string): Promise<Array<Food>> => {
        const response = await fetch('http://localhost:8080/food?id=' + text);
        const foods = new Array<Food>();
        const jsons = await response.json();
        for (const j of jsons) {
            const food = Food.createFromApiResponse(j);
            foods.push(food);
            console.log(food.getCalcProtein())
        }

        return foods;
    }
}

export default FoodConnector;