import * as React from 'react';
import SearchEdit from './SearchEdit'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DatimePicker from "./DatimePicker";
import DaytimeEnum from "../domain/DaytimeEnum";
import FoodListRow from "./FoodListRow";

interface FoodListProp {
}

interface FoodListState {
    searchedFoods: Array<Food>;
    selectedFood: Food;
    foods0: Array<Food>;
    foods1: Array<Food>;
    foods2: Array<Food>;
    foods3: Array<Food>;
    foods4: Array<Food>;
    foods5: Array<Food>;
}

class FoodList extends React.Component<FoodListProp, FoodListState> {

    private foodConnector = new FoodConnector();

    constructor(props: FoodListProp) {
        super(props);
        this.state = {
            searchedFoods: [],
            selectedFood: Food.createDefault(),
            foods0: [],
            foods1: [],
            foods2: [],
            foods3: [],
            foods4: [],
            foods5: [],
        };
    }

    onAddFoodInputChanged = async (text: string) => {
        const foods = await this.foodConnector.getFoodByIdContaining(text);
        this.state.selectedFood.name = text;
        this.setState({searchedFoods: foods});
    }

    onAddFoodAmoundChanged = (food: Food, inputElm: any) => {
        food.amount = inputElm.target.value;
        this.setState({});
    }

    onAddFoodDaytimeChanged = (value: DaytimeEnum) => {
        this.state.selectedFood.daytimeEnum = value;
        this.setState({});
    }

    onAddFoodFoodSelected = (foodSelected: Food) => {
        console.log(foodSelected);
        this.state.selectedFood.merge(foodSelected);
        this.onAddFoodInputChanged(foodSelected.name)
    }

    onAddFoodButtonClicked = () => {
        const newlyAddedFood = Object.assign(new Food(), this.state.selectedFood);
        this.getProperFoodList(newlyAddedFood.daytimeEnum).push(newlyAddedFood);
        const defaultFood = Food.createDefault();
        defaultFood.daytimeEnum = newlyAddedFood.daytimeEnum;
        this.setState({selectedFood: defaultFood});
    }

    onAddedFoodDaytimeChanged(newDaytimeEnum: DaytimeEnum, food: Food) {
        console.log('onAddedFoodDaytimeChanged')
        const oldFoodList = this.getProperFoodList(food.daytimeEnum);
        this.removeFromArray(food, oldFoodList);

        food.daytimeEnum = newDaytimeEnum

        const newFoodList = this.getProperFoodList(food.daytimeEnum);
        newFoodList.push(food);

        this.setState({});
    }

    getProperFoodList(daytimeEnum: DaytimeEnum): Array<Food> {
        switch (daytimeEnum) {
            case DaytimeEnum.SNIDANE:
                return this.state.foods0;
            case DaytimeEnum.DOPOLEDNI_SVACINA:
                return this.state.foods1;
            case DaytimeEnum.OBED:
                return this.state.foods2;
            case DaytimeEnum.ODPOLEDNI_SVACINA:
                return this.state.foods3;
            case DaytimeEnum.VECERE:
                return this.state.foods4;
            case DaytimeEnum.DRUHA_VECERE:
                return this.state.foods5;
        }
        // return null;
    }

    onRemoveFoodButtonClicked = (foodToRemove: Food, removeFromList: Array<Food>) => {
        this.removeFromArray(foodToRemove, removeFromList);
        this.setState({});
    }

    removeFromArray(itemToRemove: any, array: Array<any>) : any {
        const index = array.indexOf(itemToRemove, 0);
        if (index > -1) {
            array.splice(index, 1);
            return itemToRemove;
        }
        return null;
    }

    render() {
        return (
            <div>
                <table className="table table-sm table-light">
                    <thead>
                    <tr>
                        <th>Nazev potraviny</th>
                        <th className="input-amount">Mnozstvi [g]</th>
                        <th className="input-amount">Bilkoviny [g]</th>
                        <th className="input-amount">Sacharidy [g]</th>
                        <th className="input-amount">Tuky [g]</th>
                        <th className="input-amount">Energie [kcal]</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <SearchEdit value={this.state.selectedFood.name}
                                        onSelected={(food) => this.onAddFoodFoodSelected(food)}
                                        onChange={this.onAddFoodInputChanged}
                                        header={{
                                            'name': 'Potravina',
                                        }}
                                        content={this.state.searchedFoods}/>

                        </td>
                        <td><input className="form-control input-amount" type="number"
                                   value={this.state.selectedFood.amount}
                                   onChange={(event) => this.onAddFoodAmoundChanged(this.state.selectedFood, event)}
                        /></td>
                        <td>{this.state.selectedFood.getCalcProtein()}</td>
                        <td>{this.state.selectedFood.getCalcCarbs()}</td>
                        <td>{this.state.selectedFood.getCalcFat()}</td>
                        <td>{this.state.selectedFood.getCalcCalories()}</td>
                        <td>
                            <DatimePicker onChange={this.onAddFoodDaytimeChanged}
                                          value={this.state.selectedFood.daytimeEnum}/>
                        </td>

                        <td>
                            <input type="button" className="btn btn-outline-primary button-smybol" value="+"
                                   onClick={this.onAddFoodButtonClicked}/>
                        </td>
                    </tr>

                    <tr>
                        <th><h5>Snidane</h5></th>
                    </tr>
                    {this.state.foods0.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods0)}/>
                    )}

                    <tr>
                        <th><h5>Dopoledni svacina</h5></th>
                    </tr>
                    {this.state.foods1.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods1)}/>
                    )}

                    <tr>
                        <th><h5>Obed</h5></th>
                    </tr>
                    {this.state.foods2.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods2)}/>
                    )}

                    <tr>
                        <th><h5>Odpoledni svacina</h5></th>
                    </tr>
                    {this.state.foods3.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods3)}/>
                    )}

                    <tr>
                        <th><h5>Vecere</h5></th>
                    </tr>
                    {this.state.foods4.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods4)}/>
                    )}

                    <tr>
                        <th><h5>Druha vecere</h5></th>
                    </tr>
                    {this.state.foods5.map((food) =>
                        <FoodListRow key={food.daytimeEnum + food.id}
                                     food={food}
                                     onChange={() => this.setState({})}
                                     onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                     onRemove={() => this.onRemoveFoodButtonClicked(food, this.state.foods5)}/>
                    )}

                    {/*{this.state.addedFoods.map((addedFood) =>*/}
                    {/*    <tr key={addedFood.id}>*/}


                    {/*        <SearchEdit value={addedFood.name}*/}
                    {/*                    onSelected={this.onAddFoodFoodSelected}*/}
                    {/*                    onChange={this.onAddFoodInputChanged}*/}
                    {/*                    header={{*/}
                    {/*                        'name': 'Potravina',*/}
                    {/*                    }}*/}
                    {/*                    content={this.state.searchedFoods}/>*/}


                    {/*        <td><input type="number" value={addedFood.amount}*/}
                    {/*                   onChange={(event) => this.onAddFoodAmoundChanged(addedFood, event)}*/}
                    {/*                   className="form-control input-amount"/></td>*/}
                    {/*        <td>{addedFood.getCalcProtein()}</td>*/}
                    {/*        <td>{addedFood.getCalcCarbs()}</td>*/}
                    {/*        <td>{addedFood.getCalcFat()}</td>*/}
                    {/*        <td>{addedFood.getCalcCalories()}</td>*/}
                    {/*        <td>*/}
                    {/*            <DaytimePicker onChange={this.onAddFoodDaytimeChanged} value={addedFood.daytimeEnum}/>*/}
                    {/*        </td>*/}
                    {/*        <td><input type="button" value="-" className="btn btn-outline-primary button-smybol"*/}
                    {/*                   onClick={() => this.onRemoveFoodButtonClicked(addedFood)}/></td>*/}
                    {/*    </tr>*/}
                    {/*)}*/}

                    {/*<tr>*/}
                    {/*    <th><h5>Obed</h5></th>*/}
                    {/*</tr>*/}

                    {/*<tr>*/}
                    {/*    <th><h5>Vecere</h5></th>*/}
                    {/*</tr>*/}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default FoodList;