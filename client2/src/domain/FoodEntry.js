class FoodEntry {
    constructor(json) {
        Object.assign(this, json);
        this.isEdit = false;
    }

    getTotalCalories() {
        return FoodEntry.round(this.amount / 100 * this.food.calories);
    }

    getCzechDate() {
        return this.date.toISOString().slice(0, 10);
    }

    static round(val) {
        if (val < 10) {
            return Math.round(val * 10) / 10
        } else if (val < 1000) {
            return Math.round(val);
        } else {
            return Math.round(val / 10) * 10;
        }
    }

}

export default FoodEntry;