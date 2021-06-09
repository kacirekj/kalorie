import * as React from 'react';
import MenuDay from "./MenuDay";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FoodDairyProp {
}

interface FoodDairyState {
    show0: boolean;
}

class Menu extends React.Component<FoodDairyProp, FoodDairyState> {

    constructor(props: FoodDairyProp) {
        super(props);
        this.state = {
            show0: false,
        };
    }

    render() {
        const startDate = Date.now();
        const colSpan = 7;
        return (
            <div>
                {/*<table>*/}
                {/*    <tr>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value="<<<"/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value="<<"/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value="<"/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <DatePicker selected={startDate}/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value=">"/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value=">>"/>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <input type="button" className="btn btn-sm btn-outline-primary" value=">>>"/>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*</table>*/}

                <table className="table table-striped">
                    <thead>
                    <tr className="topheader">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th  colSpan={3}>Makroziviny [g]</th>


                        <th colSpan={1}>Energie [kcal]</th>
                        <th ></th>
                    </tr>
                    <tr>
                        <th className="select-daytime">Datum</th>
                        <th>Potraviny</th>
                        <th className="input-amount">Mnozstvi</th>
                        <th className="input-bst">B</th>
                        <th className="input-bst">S</th>
                        <th className="input-bst">T</th>
                        <th className="input-bst">Prijem</th>
                        <th className="input-bst">Akce</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr className="table-active">
                        <th>06/09/2021</th>
                        <td>Kureci maso, Mouka bila hladka, Veprova kotleta</td>
                        <td>66 minut</td>
                        <td>255</td>
                        <td>380</td>
                        <td>120.4</td>
                        <td>13000</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary button-smybol" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample0" aria-expanded="false"
                                    aria-controls="collapseExample0"
                                    onClick={() => {
                                        if (this.state.show0) {
                                            this.setState({show0: false});
                                        } else {
                                            this.setState({show0: true});
                                        }
                                    }}>v
                            </button>
                        </td>
                    </tr>
                    {this.state.show0 &&
                    <MenuDay/>
                    }

                    <tr className="table-active">
                        <th>06/09/2021</th>
                        <td>Kureci maso, Mouka bila hladka, Veprova kotleta</td>
                        <td>66 minut</td>
                        <td>255</td>
                        <td>380</td>
                        <td>120.4</td>
                        <td>13000</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary button-smybol" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample0" aria-expanded="false"
                                    aria-controls="collapseExample0"
                                    onClick={() => {
                                        if (this.state.show0) {
                                            this.setState({show0: false});
                                        } else {
                                            this.setState({show0: true});
                                        }
                                    }}>v
                            </button>
                        </td>
                    </tr>



                    <tr className="table-active">
                        <th>06/09/2021</th>
                        <td>Kureci maso, Mouka bila hladka, Veprova kotleta</td>
                        <td>66 minut</td>
                        <td>255</td>
                        <td>380</td>
                        <td>120.4</td>
                        <td>13000</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary button-smybol" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample0" aria-expanded="false"
                                    aria-controls="collapseExample0"
                                    onClick={() => {
                                        if (this.state.show0) {
                                            this.setState({show0: false});
                                        } else {
                                            this.setState({show0: true});
                                        }
                                    }}>v
                            </button>
                        </td>
                    </tr>



                    <tr className="table-active">
                        <th>06/09/2021</th>
                        <td>Kureci maso, Mouka bila hladka, Veprova kotleta</td>
                        <td>66 minut</td>
                        <td>255</td>
                        <td>380</td>
                        <td>120.4</td>
                        <td>13000</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary button-smybol" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample0" aria-expanded="false"
                                    aria-controls="collapseExample0"
                                    onClick={() => {
                                        if (this.state.show0) {
                                            this.setState({show0: false});
                                        } else {
                                            this.setState({show0: true});
                                        }
                                    }}>v
                            </button>
                        </td>
                    </tr>





                    <tr className="table-active">
                        <td>06/09/2021</td>
                        <td>Kureci maso, Mouka bila hladka, Veprova kotleta</td>
                        <td>66 minut</td>
                        <td>255</td>
                        <td>380</td>
                        <td>120.4</td>
                        <td>13000</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary button-smybol" type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample0" aria-expanded="false"
                                    aria-controls="collapseExample0"
                                    onClick={() => {
                                        if (this.state.show0) {
                                            this.setState({show0: false});
                                        } else {
                                            this.setState({show0: true});
                                        }
                                    }}>v
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>

            </div>

        );
    }
}

export default Menu;