import DaytimeEnum from "./DaytimeEnum";

let countId = 0;

class Food {

    // static createDefault = () => {
    //     const f = new Food();
    //     f._id = '';
    //     f._name = '';
    //     f._protein = 0;
    //     f._carbs = 0;
    //     f._calories = 0;
    //     f._fat = 0;
    //     f._amount = 100;
    //     f._daytimeEnum = DaytimeEnum.NEUVEDENO;
    //     return f;
    // }

    static createFromApiResponse = (json: any): Food => {
        const f = Object.assign(new Food(), json);
        f.amount = 100;
        return f;
    }

    static createSameAs(source: Food): Food {
        const newFood = new Food();
        return Object.assign(
            newFood,
            source,
            {
                reacyKey: newFood.reactKey
            });
    }

    private static round = (val: number) => {
        if (val < 10) {
            return Math.round(val * 10) / 10
        } else if (val < 1000) {
            return Math.round(val);
        } else {
            return Math.round(val / 10) * 10;
        }
    };

    private _reactKey: number;

    private _id: string;
    private _name: string;
    private _calories: number;
    private _protein: number;
    private _carbs: number;
    private _fat: number;

    private _amount: number;
    private _daytimeEnum: DaytimeEnum;
    private _dateConsumed: Date;

    constructor() {
        this._reactKey = countId++;
    }

    getCalcProtein() {
        return Food.round(this._amount / 100 * this._protein);
    };

    getCalcCarbs() {
        return Food.round(this._amount / 100 * this._carbs);
    }

    getCalcFat() {
        return Food.round(this._amount / 100 * this._fat);
    };

    getCalcCalories() {
        return Food.round(this._amount / 100 * this._calories);
    };


    get reactKey(): number {
        return this._reactKey;
    }

    set reactKey(value: number) {
        this._reactKey = value;
    }

    get daytimeEnum(): DaytimeEnum {
        return this._daytimeEnum;
    }

    set daytimeEnum(value: DaytimeEnum) {
        this._daytimeEnum = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get calories(): number {
        return this._calories;
    }

    set calories(value: number) {
        this._calories = value;
    }

    get protein(): number {
        return this._protein;
    }

    set protein(value: number) {
        this._protein = value;
    }

    get carbs(): number {
        return this._carbs;
    }

    set carbs(value: number) {
        this._carbs = value;
    }

    get fat(): number {
        return this._fat;
    }

    set fat(value: number) {
        this._fat = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }
}

export default Food;