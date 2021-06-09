import * as React from 'react';
import SearchBox from './SearchBox'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DatimePicker from "./DatimePicker";
import DaytimeEnum from "../domain/DaytimeEnum";
import DaytimePicker from "./DatimePicker";

interface DayMenuRowProp {
    food: Food;
    onRemove: (foodToRemove: Food) => void;
    onChange: (food: Food) => void;
    onDaytimeChange: (newDaytimeEnum: DaytimeEnum, food: Food) => void;
}

interface DayMenuRowState {
    searchedFoods: Array<Food>;
}

class MenuDayRow extends React.Component<DayMenuRowProp, DayMenuRowState> {

    private foodConnector = new FoodConnector();

    constructor(props: DayMenuRowProp) {
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
                    <DaytimePicker value={food.daytimeEnum} onChange={(daytimeEnum) => {
                        this.props.onDaytimeChange(daytimeEnum, food);
                    }}/>
                </td>
                <td>{food.name}

                    {/*<SearchBox value={food.name}*/}
                    {/*           onSelected={(newlySelectedFood) => {*/}
                    {/*                this.props.onChange(newlySelectedFood)*/}
                    {/*            }}*/}
                    {/*           onChange={(text => {*/}
                    {/*                this.onFoodSearching(text)*/}
                    {/*            })}*/}
                    {/*           header={{*/}
                    {/*                'name': 'Potravina',*/}
                    {/*            }}*/}
                    {/*           content={this.state.searchedFoods}/>*/}


                </td>
                <td><input type="number" step={5} value={food.amount} onChange={(event) => {
                    food.amount = parseInt(event.target.value, 10);
                    this.props.onChange(food);
                }}
                           className="form-control form-control-sm"/></td>

                <td>{food.getCalcProtein()}</td>
                <td>{food.getCalcCarbs()}</td>
                <td>{food.getCalcFat()}</td>
                <td>{food.getCalcCalories()}</td>
                <td><input type="button" value="-" className="btn btn-sm btn-outline-primary button-smybol"
                           onClick={() => this.props.onRemove(food)}/>
                </td>
            </tr>
        );
    }
}

export default MenuDayRow;