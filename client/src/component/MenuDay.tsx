import * as React from 'react';
import SearchBox from './SearchBox'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DatimePicker from "./DatimePicker";
import DaytimeEnum from "../domain/DaytimeEnum";
import MenuDayRow from "./MenuDayRow";
import {Simulate} from "react-dom/test-utils";


interface DayMenuProp {
    foods?: Array<Food>;
    date?: Date;
    onAddFoodClicked?: (food: Food) => void;
    onRemoveFoodClicked?: (food: Food) => void;
}

interface DayMenuState {
    searchboxFoods: Array<Food>;
    searchboxSelectedFood?: Food;
    searchboxFoodName: string;
    searchboxFoodDaytime: DaytimeEnum;
    searchboxFoodAmount: DaytimeEnum;
    isSelectedFoodValid: boolean;
    foods0: Array<Food>;
}

class MenuDay extends React.Component<DayMenuProp, DayMenuState> {

    private foodConnector = new FoodConnector();

    constructor(props: DayMenuProp) {
        super(props);
        this.state = {
            searchboxFoods: [],
            searchboxSelectedFood: undefined,
            searchboxFoodName: '',
            searchboxFoodDaytime: DaytimeEnum.NEUVEDENO,
            searchboxFoodAmount: 100,
            isSelectedFoodValid: false,
            foods0: [],
        };
    }

    onSearchBoxInputChanged = async (text: string) => {
        console.log('onAddFoodInputChanged')
        const foods = await this.foodConnector.getFoodByIdContaining(text);
        this.state.foods0.filter(f => f.amount === 100).for
        this.setState({
            searchboxFoods: foods,
            searchboxFoodName: text,
            isSelectedFoodValid: false,
        });
    }

    onSearchBoxAmoundChanged = (inputElm: any) => {
        console.log(this.state.searchboxSelectedFood)
        if (this.state.searchboxSelectedFood) {
            this.setState({
                searchboxSelectedFood: Object.assign(this.state.searchboxSelectedFood, {amount: inputElm.target.value}),
            });
        }
    }

    onSearchBoxDaytimeChanged = (daytimeEnum: DaytimeEnum) => {
        this.setState({
            searchboxFoodDaytime: daytimeEnum
        });
    }

    onSeachBoxFoodSelected = (foodSelected: Food) => {
        console.log('onAddFoodFoodSelected', foodSelected)

        this.onSearchBoxInputChanged(foodSelected.name)
        this.setState({
            searchboxSelectedFood: foodSelected,
        })
    }

    onSearchBoxAddFoodButtonClicked = () => {
        const food = this.state.searchboxSelectedFood!!;
        food.daytimeEnum = this.state.searchboxFoodDaytime;
        this.setState({
            foods0: [...this.state.foods0, this.state.searchboxSelectedFood!!],
            searchboxSelectedFood: Food.createSameAs(food),
            searchboxFoodName: food.name,
        });
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

    onAddedFoodChanged(oldFood: Food, newFood: Food) {
        this.setState(
            {
                foods0: this.state.foods0.map((food) => food === oldFood ? newFood : food)
            }
        )
    }

    getProperFoodList(daytimeEnum: DaytimeEnum): Array<Food> {
        return this.state.foods0;
    }

    onRemoveFoodButtonClicked = (foodToRemove: Food) => {
        const copyArray = [...this.state.foods0];
        this.removeFromArray(foodToRemove, copyArray);
        this.setState({
            foods0: copyArray
        });
    }

    removeFromArray(itemToRemove: any, array: Array<any>): any {
        const index = array.indexOf(itemToRemove, 0);
        if (index > -1) {
            array.splice(index, 1);
            return itemToRemove;
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>
                        <DatimePicker onChange={this.onSearchBoxDaytimeChanged}
                                      value={this.state.searchboxFoodDaytime}/>
                    </td>
                    <td>
                        <SearchBox value={this.state.searchboxFoodName}
                                   onSelected={(food) => this.onSeachBoxFoodSelected(food)}
                                   onChange={this.onSearchBoxInputChanged}
                                   header={{
                                       'name': 'Potravina',
                                   }}
                                   content={this.state.searchboxFoods}/>

                    </td>
                    <td><input className="form-control form-control-sm input-amount" type="number"
                               value={this.state.searchboxSelectedFood?.amount}
                               onChange={(event) => this.onSearchBoxAmoundChanged(event)}
                    /></td>
                    <td>{this.state.searchboxSelectedFood?.getCalcProtein()}</td>
                    <td>{this.state.searchboxSelectedFood?.getCalcCarbs()}</td>
                    <td>{this.state.searchboxSelectedFood?.getCalcFat()}</td>
                    <td>{this.state.searchboxSelectedFood?.getCalcCalories()}</td>


                    <td>
                        <input type="button" className="btn btn-sm btn-outline-primary button-smybol" value="+"
                               onClick={this.onSearchBoxAddFoodButtonClicked}
                               disabled={!this.state.searchboxSelectedFood}/>
                    </td>
                </tr>

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.NEUVEDENO).length > 0
                 &&
                <tr>
                    <td>Prubezne</td>
                </tr>
                }

                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.NEUVEDENO)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.SNIDANE).length > 0 &&
                <tr>
                    <td>Snidane</td>
                </tr>
                }

                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.SNIDANE)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.DOPOLEDNI_SVACINA).length > 0 &&
                <tr>
                    <td>Dopoledni svacina</td>
                </tr>
                }

                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.DOPOLEDNI_SVACINA)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}
                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.OBED).length > 0 &&
                <tr>
                    <td>Obed</td>
                </tr>
                }
                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.OBED)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.ODPOLEDNI_SVACINA).length > 0 &&
                <tr>
                    <td>Odpoledni svacina</td>
                </tr>
                }
                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.ODPOLEDNI_SVACINA)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.VECERE).length > 0 &&
                <tr>
                    <td>Vecere</td>
                </tr>
                }
                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.VECERE)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.DRUHA_VECERE).length > 0 &&
                <tr>
                    <td>Druha vecere</td>
                </tr>
                }
                {this.state.foods0
                    .filter((food) => food.daytimeEnum === DaytimeEnum.DRUHA_VECERE)
                    .map((food) =>
                        <MenuDayRow key={food.reactKey}
                                    food={food}
                                    onChange={(changedFood) => this.onAddedFoodChanged(food, changedFood)}
                                    onDaytimeChange={(newDaytime) => this.onAddedFoodDaytimeChanged(newDaytime, food)}
                                    onRemove={() => this.onRemoveFoodButtonClicked(food)}/>
                    )}
            </React.Fragment>

        );
    }
}

export default MenuDay;