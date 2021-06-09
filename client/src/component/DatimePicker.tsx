import * as React from 'react';
import SearchBox from './SearchBox'
import Food from '../domain/Food'
import FoodConnector from '../connector/FoodConnector'
import DaytimeEnum from "../domain/DaytimeEnum";

interface DaytimePickerProp {
    onChange: (daytimeEnum: DaytimeEnum) => void,
    value: DaytimeEnum,
}

interface DaytimePickerState {
}

class DaytimePicker extends React.Component<DaytimePickerProp, DaytimePickerState> {

    private foodConnector = new FoodConnector();

    constructor(props: DaytimePickerProp) {
        super(props);
    }

    render() {
        return (
            <div>
                <select className="form-control form-control-sm select-daytime"
                        value={this.props.value}
                        onChange={(val) => this.props.onChange(parseInt(val.target.value, 10))}>
                    <option value="0">Prubezne</option>
                    <option value="1">Snídaně</option>
                    <option value="2">Dopolední svačina</option>
                    <option value="3">Oběd</option>
                    <option value="4">Odpolední svačina</option>
                    <option value="5">Večeře</option>
                    <option value="6">Druhá večeře</option>
                </select>

            </div>
        );
    }
}

export default DaytimePicker;