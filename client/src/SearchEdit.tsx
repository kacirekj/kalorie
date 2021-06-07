import * as React from 'react';

interface SearchEditProps {
    value?: string;
    header: any;
    content: any;
    onChange?: (text: string) => void;
    onSelected?: (row: any) => void;
}

interface SearchEditState {
    isInputFocused: boolean;
    isCardFocused: boolean;
    activeRow?: HTMLTableRowElement;
}

class SearchEdit extends React.Component<SearchEditProps, SearchEditState> {

    constructor(props: SearchEditProps) {
        super(props);

        this.state = {
            isInputFocused: false,
            isCardFocused: false,
            activeRow: undefined
        };

    }

    onRowMouseLeave(elm: React.MouseEvent<HTMLTableRowElement>) {
        elm.currentTarget.className = '';
        this.setState({activeRow: undefined});
    }

    onRowMouseEnter(elm: React.MouseEvent<HTMLTableRowElement>) {
        this.setState({activeRow: elm.currentTarget});
        elm.currentTarget.className ='table-active';
    }

    onRowMouseClick(key: string) {
        console.log(key);
        if(this.props.onSelected) {
            this.props.onSelected(key);
        }
    }

    render() {
        return (
            <div>
                <div className="searchbox">
                    <input className="input-group-text" type="edit"
                           value={this.props.value}
                           onChange={(input) => (this.props.onChange && this.props.onChange(input.target.value))}
                           onMouseEnter={(e) => this.setState({isInputFocused: true})}
                           onMouseLeave={(e) => this.setState({isInputFocused: false})}
                    />
                    {(this.state.isInputFocused || this.state.activeRow || this.state.isCardFocused) && (
                        <div className="card card-body"
                             onMouseEnter={(e) => this.setState({isCardFocused: true})}
                             onMouseLeave={(e) => this.setState({isCardFocused: false})}
                        >
                            <table className="table table-sm table-light">
                                <thead>
                                <tr>
                                    {Object.keys(this.props.header).map((key: string) =>
                                        <th key={key}>{this.props.header[key]}</th>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.content.map((data: any) =>
                                    <tr key={data.id}
                                        onMouseEnter={(e) => this.onRowMouseEnter(e)}
                                        onMouseLeave={(e) => this.onRowMouseLeave(e)}
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
                    )}
                </div>

            </div>
        );
    }

}

export default SearchEdit;