import React from 'react';
import MUtil from 'util/util.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import Selectors from 'pages/product/selectors.jsx'

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 0,
                    room: 'live 1',
                    length: '',
                    width: '',
                    pleats: '',
                    style: '',
                    notes: ''
                }
            ],
            _id: 0,
            customer: '',
            suburb: 0,
            material: 0,
            colour: 0
        };
    }
    changeSelectorValue(cust, sub, mat, col) {
        console.log("222===", cust, sub, mat, col);

        this.setState({
            customer: cust,
            suburb: parseInt(sub),
            material: parseInt(mat),
            colour: parseInt(col)
        })
    }
    componentDidMount() {

        this.loadProductList();
    }
    loadProductList() {
        _product.getProductList().then(res => {
            console.log(res);
            this.setState({
                list: res.list,
                customer: res.customer,
                suburb: res.suburb,
                material: res.material,
                colour: res.colour
            });
            this.changeSelectorValue(res.customer, res.suburb, res.material, res.colour);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e) {
        var name = e.target.name,
            value = e.target.value,
            id = e.target.getAttribute('data-index');

        var data = this.state.list.map(v => {
            if (v.id === parseInt(id)) {
                v[name] = value;
            }
            return v
        });
        this.setState({ list: data })
    }
    onAdd(e) {
        const newList = {
            id: this.state._id + 1,
            room: '',
            length: '',
            width: '',
            pleats: '',
            style: '',
            notes: ''
        };
        this.setState({
            list: this.state.list.concat(newList),
            _id: this.state._id + 1
        });
    }
    onDelete(e) {
        let lists = this.state.list;
        // lists.splice(e, 1);
        delete this.state.list[e]
        this.setState({ list: lists })
    }
    onSaveall() {
        // console.log(this.state.list);

        // let productArray = [];
        let product = JSON.stringify(this.state);
        // console.log(typeof(product));

        // product.filter(function(x){
        //     return x!== "_id"
        // })
        // let product = {
        //     id        : this.state.list[0].id,
        //     length    : this.state.list[0].length,
        //     notes       : this.state.list[0].notes,
        //     pleats   : this.state.list[0].pleats,
        //     room      : this.state.list[0].room,
        //     style       : this.state.list[0].style,
        //     width      : this.state.list[0].width
        // }

        // console.log(product);
        console.log(product);
        _product.saveProduct(product).then((res) => {
            _mm.successTips(res);
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    onBack() {
        history.back();
    }
    render() {
        let tableHeads = [
            { name: 'Room', width: '20%' },
            { name: 'Length', width: '10%' },
            { name: 'Width', width: '10%' },
            { name: 'Pleats', width: '10%' },
            { name: 'Style', width: '10%' },
            { name: 'Notes', width: '35%' },
            { name: '', width: '50%' }
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Product View">

                </PageTitle>
                <Selectors changeSelectorValue={(cust, sub, mater, col) => this.changeSelectorValue(cust, sub, mater, col)}
                    data={this.state} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Room"
                                            name="room"
                                            data-index={product.id} defaultValue={product.room}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Length"
                                            name="length"
                                            data-index={product.id} defaultValue={product.length}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Width"
                                            name="width"
                                            data-index={product.id} defaultValue={product.width}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Pleats"
                                            name="pleats"
                                            data-index={product.id} defaultValue={product.pleats}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Style"
                                            name="style"
                                            data-index={product.id} defaultValue={product.style}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control"
                                            placeholder="Notes"
                                            name="notes"
                                            data-index={product.id} defaultValue={product.notes}
                                            onChange={(e) => this.onValueChange(e)} />
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-2x fa-times-circle hover-red5" onClick={(e) => this.onDelete(index)}></i>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <div className="row rowrelative">
                    <div className="page-header-right">
                        <button type="submit" className="btn btn-warning"
                            onClick={(e) => { this.onAdd(e) }}><i className="fa fa-plus"></i> Add</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-default" onClick={() => { this.onBack() }}>Back</button>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-success"
                            onClick={(e) => { this.onSaveall(e) }}>Save all changes</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductList;