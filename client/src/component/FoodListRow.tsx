import * as React from 'react';
import SearchEdit from './SearchEdit'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DatimePicker from "./DatimePicker";
import DaytimeEnum from "../domain/DaytimeEnum";
import DaytimePicker from "./DatimePicker";

interface FoodListRowProp {
    food: Food;
    onRemove: (foodToRemove: Food) => void;
    onChange: (food: Food) => void;
    onDaytimeChange: (newDaytimeEnum: DaytimeEnum, food: Food) => void;
}

interface FoodListRowState {
    searchedFoods: Array<Food>;
}

class FoodListRow extends React.Component<FoodListRowProp, FoodListRowState> {

    private foodConnector = new FoodConnector();

    constructor(props: FoodListRowProp) {
        super(props);
        this.state = {
            searchedFoods: [],
        };
    }

    onFoodSearching = async (text: string) => {
        this.props.food.name = text;
        const searchedFoods = await this.foodConnector.getFoodByIdContaining(text);
        this.setState({
            searchedFoods
        });

    }

    onFoodChanged = (food: Food, inputElm: any) => {
        food.amount = inputElm.target.value;
        this.setState({});
    }

    render() {
        const food = this.props.food;

        return (
            <tr key={food.id}>
                <td>

                    <SearchEdit value={food.name}
                                onSelected={(newlySelectedFood) => {
                                    food.merge(newlySelectedFood);
                                    this.setState({})
                                    // this.props.onChange(food);
                                }}
                                onChange={(text => {this.onFoodSearching(text)
                                })}
                                header={{
                                    'name': 'Potravina',
                                }}
                                content={this.state.searchedFoods}/>


                </td>
                <td><input type="number" value={food.amount} onChange={(event) => {
                    food.amount = parseInt(event.target.value, 10);
                    this.props.onChange(food);
                }}
                           className="form-control input-amount"/></td>
                <td>{food.getCalcProtein()}</td>
                <td>{food.getCalcCarbs()}</td>
                <td>{food.getCalcFat()}</td>
                <td>{food.getCalcCalories()}</td>
                <td>
                    <DaytimePicker value={food.daytimeEnum} onChange={(daytimeEnum) => {
                        this.props.onDaytimeChange(daytimeEnum, food);
                    }}/>
                </td>
                <td><input type="button" value="-" className="btn btn-outline-primary button-smybol"
                           onClick={() => this.props.onRemove(food)}/>
                </td>
            </tr>
        );
    }
}

export default FoodListRow;