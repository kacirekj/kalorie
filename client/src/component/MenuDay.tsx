import * as React from 'react';
import SearchBox from './SearchBox'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DatimePicker from "./DatimePicker";
import DaytimeEnum from "../domain/DaytimeEnum";
import MenuDayRow from "./MenuDayRow";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

interface DayMenuProp {
}

interface DayMenuState {
    searchedFoods: Array<Food>;
    selectedFood?: Food;
    searchedFoodName: string;
    isSelectedFoodValid: boolean;
    foods0: Array<Food>;
}

class MenuDay extends React.Component<DayMenuProp, DayMenuState> {

    private foodConnector = new FoodConnector();

    constructor(props: DayMenuProp) {
        super(props);
        this.state = {
            searchedFoods: [],
            selectedFood: undefined,
            searchedFoodName: '',
            isSelectedFoodValid: false,
            foods0: [],
        };
    }

    onAddFoodInputChanged = async (text: string) => {
        console.log('onAddFoodInputChanged')
        const foods = await this.foodConnector.getFoodByIdContaining(text);
        this.setState({
            searchedFoods: foods,
            searchedFoodName: text,
            isSelectedFoodValid: false,
        });
    }

    onAddFoodAmoundChanged = (inputElm: any) => {
        if(this.state.selectedFood) {
            this.setState({
                selectedFood: Object.assign(this.state.selectedFood, {amount: inputElm.target.value}),
            });
        }
    }

    onAddFoodDaytimeChanged = (daytimeEnum: DaytimeEnum) => {
        this.setState({
            selectedFood: Object.assign(this.state.selectedFood, {daytimeEnum}),
        });
    }

    onAddFoodFoodSelected = (foodSelected: Food) => {
        console.log('onAddFoodFoodSelected')

        this.onAddFoodInputChanged(foodSelected.name)
        this.setState({
            selectedFood: foodSelected,
        })
    }

    onAddFoodButtonClicked = () => {
        const copyArray = [...this.state.foods0];
        copyArray.push(this.state.selectedFood!!);
        this.setState({selectedFood: undefined, foods0: copyArray});
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
        console.log('d-------------')
        console.log(newFood)
        console.log(oldFood)
        console.log(Food.merge(oldFood, newFood))
        this.setState(
            {
                foods0: this.state.foods0.map((food) => food === oldFood ? Food.merge(oldFood, newFood) : food)
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
                        <DatimePicker onChange={this.onAddFoodDaytimeChanged}
                                      value={this.state.selectedFood ? this.state.selectedFood.daytimeEnum : DaytimeEnum.NEUVEDENO}/>
                    </td>
                    <td>
                        <SearchBox value={this.state.searchedFoodName}
                                   onSelected={(food) => this.onAddFoodFoodSelected(food)}
                                   onChange={this.onAddFoodInputChanged}
                                   header={{
                                       'name': 'Potravina',
                                   }}
                                   content={this.state.searchedFoods}/>

                    </td>
                    <td><input className="form-control form-control-sm input-amount" type="number"
                               value={this.state.selectedFood?.amount}
                               onChange={(event) => this.onAddFoodAmoundChanged(event)}
                    /></td>
                    <td>{this.state.selectedFood?.getCalcProtein()}</td>
                    <td>{this.state.selectedFood?.getCalcCarbs()}</td>
                    <td>{this.state.selectedFood?.getCalcFat()}</td>
                    <td>{this.state.selectedFood?.getCalcCalories()}</td>


                    <td>
                        <input type="button" className="btn btn-sm btn-outline-primary button-smybol" value="+"
                               onClick={this.onAddFoodButtonClicked} disabled={!this.state.selectedFood}/>
                    </td>
                </tr>

                {this.state.foods0.filter((food) => food.daytimeEnum === DaytimeEnum.NEUVEDENO).length > 0 &&
                <tr>
                    <td>V prubehu dne</td>
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