import * as React from 'react';
import SearchEdit from './SearchEdit'

interface Beer {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number
}

interface BeerListProps {
}

interface BeerListState {
    beers: Array<Beer>;
    searchValue: string;
}

class BeerList extends React.Component<BeerListProps, BeerListState> {

    constructor(props: BeerListProps) {
        super(props);

        this.state = {
            beers: [],
            searchValue: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text: string) {
        fetch('http://localhost:8080/food?id=' + text)
            .then(response => response.json())
            .then(data => this.setState({beers: data, searchValue: text}));
    }

    render() {
        return (
            <div>

                <h2>Jidelnicek</h2>
                <label>Nazev potraviny:</label>
                <SearchEdit value={this.state.searchValue} onSelected={(row) => this.setState({searchValue: row.name})} onChange={this.handleChange} header={{'name':'Potravina', 'calories': 'Energeticka hodnota [kcal]'}} content={this.state.beers} />
                A tady je nejaky dalsi text <br/>
                A tady je nejaky dalsi text <br/>
            </div>
        );
    }

}

export default BeerList;