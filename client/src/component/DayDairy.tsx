import * as React from 'react';
import SearchEdit from './SearchEdit'
import Food from '../domain/Food'
import FoodList from "./FoodList";

interface FoodDairyProp {
}

interface FoodDairyState {
}

class FoodDairy extends React.Component<FoodDairyProp, FoodDairyState> {

    constructor(props: FoodDairyProp) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h5>Jidelnicek</h5>
                <FoodList/>


            </div>
        );
    }
}

export default FoodDairy;