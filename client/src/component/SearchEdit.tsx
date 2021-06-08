import * as React from 'react';

interface SearchEditProps {
    value?: string;
    header: any;
    content: any;
    onChange?: (text: string) => void;
    onSelected?: (row: any) => void;
    showHeader?: boolean;
}

interface SearchEditState {
    hasBeenInputFocused: boolean;
    isInputFocused: boolean,
    isMouseInCard: boolean;
    isMouseInInput: boolean;
    isRowActive?: HTMLTableRowElement;
    isRowSelected?: boolean;
}

class SearchEdit extends React.Component<SearchEditProps, SearchEditState> {

    constructor(props: SearchEditProps) {
        super(props);

        this.state = {
            hasBeenInputFocused: false,
            isInputFocused: false,
            isMouseInCard: false,
            isMouseInInput: false,
            isRowActive: undefined,
            isRowSelected: false,
        };

    }

    watchSearching() {
        setTimeout(() => {
                console.log('watcher')
                if (!this.state.isMouseInCard && !this.state.isMouseInInput && !this.state.isInputFocused) {
                    this.resetSearching();
                }
            },
            100
        );
    }

    resetSearching = () => {
        console.log('reset')
        this.setState({hasBeenInputFocused: false})
    }

    onInputChanged = (elm: any) => {
        if (this.props.onChange) {
            this.props.onChange(elm.target.value)
        }
        ;
    }

    onMouseFocusInput = () => {
        console.log('onMouseFocusInput')
        this.setState({hasBeenInputFocused: true})
        this.setState({isInputFocused: true})
    }

    onMouseLeaveFocusInput = () => {
        console.log('onMouseLeaveFocusInput')
        this.setState({isInputFocused: false})
    }

    onMouseEnterInput = () => {
        console.log('onMouseEnterInput')
        this.setState({isMouseInInput: true})
    }

    onMouseLeaveInput = () => {
        console.log('onMouseLeaveInput')
        this.setState({isMouseInInput: false})
        this.watchSearching();
    }

    onMouseEnterCard = () => {
        console.log('onMouseEnterCard')
        this.setState({isMouseInCard: true})
    }

    onMouseLeaveCard = () => {
        console.log('onMouseLeaveCard')
        this.setState({isMouseInCard: false})
        this.watchSearching();
    }

    onMouseLeaveRow = (elm: React.MouseEvent<HTMLTableRowElement>) => {
        elm.currentTarget.className = '';
        this.setState({isRowActive: undefined});
    }

    onMouseEnterRow = (elm: React.MouseEvent<HTMLTableRowElement>) => {
        this.setState({isRowActive: elm.currentTarget});
        elm.currentTarget.className = 'table-active';
    }

    onRowMouseClick = (key: string) => {
        console.log(key);
        this.setState({isRowSelected: true});
        if (this.props.onSelected) {
            this.props.onSelected(key);
        }
    }

    isSearchInProgress(): boolean {
        return this.state.hasBeenInputFocused && (this.state.isMouseInCard || this.state.isMouseInInput || this.state.isInputFocused);
    }

    render() {
        return (
            <div>
                <div className="searchbox">
                    <input className="form-control" type="edit"
                           value={this.props.value}
                           onChange={this.onInputChanged}
                           onMouseEnter={this.onMouseEnterInput}
                           onMouseLeave={this.onMouseLeaveInput}
                           onFocus={this.onMouseFocusInput}
                           onBlur={this.onMouseLeaveFocusInput}
                    />
                    {this.isSearchInProgress() && (
                        <div className="searchbox-items">
                            <div className="card card-body-sm"
                                 onMouseEnter={this.onMouseEnterCard}
                                 onMouseLeave={this.onMouseLeaveCard}
                            >
                                <table className="table table-sm table-light">
                                    {this.props.showHeader && (
                                        <thead>
                                        <tr>
                                            {Object.keys(this.props.header).map((key: string) =>
                                                <th key={key}>{this.props.header[key]}</th>
                                            )}
                                        </tr>
                                        </thead>
                                    )}
                                    <tbody>
                                    {this.props.content.map((data: any) =>
                                        <tr key={data.id}
                                            onMouseEnter={(e) => this.onMouseEnterRow(e)}
                                            onMouseLeave={(e) => this.onMouseLeaveRow(e)}
                                            onClick={() => this.onRowMouseClick(data)}
                                        >
                                            {Object.keys(this.props.header).map((key: string) =>
                                                <td key={key}>{data[key]}</td>
                                            )}
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }

}

export default SearchEdit;