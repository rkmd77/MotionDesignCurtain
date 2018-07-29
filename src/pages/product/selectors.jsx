import React from 'react';
import MUtil from 'util/util.jsx'
import Product from 'service/product-service.jsx'
const _mm = new MUtil();
const _product = new Product();

class ProductSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            suburbList: [],
            firstSuburbId: 1,
            materialList: [],
            firstMaterialId: 1,
            colourList: [],
            firstColourId: 1
        }
    }

    componentDidMount() {
        this.loadSuburb();
        this.loadMaterial();
        this.loadColour();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            customer: nextProps.data.customer,
            firstSuburbId: nextProps.data.suburb,
            firstMaterialId: nextProps.data.material,
            firstColourId: nextProps.data.colour
        })
    }
    loadSuburb() {
        _product.getSuburbList().then(res => {
            this.setState({
                suburbList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    loadMaterial() {
        _product.getMaterialList().then(res => {
            this.setState({
                materialList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    loadColour() {
        _product.getColourList().then(res => {
            this.setState({
                colourList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e) {
        let newValue = e.target.value || 1;
        let newName = e.target.name;
        this.setState({
            ['first' + newName + 'Id']: newValue
        }, () => {
            this.props.changeSelectorValue(this.state.customer, this.state.firstSuburbId, this.state.firstMaterialId, this.state.firstColourId)
        })
    }
    onValueChangeInput(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        }, () => {
            this.props.changeSelectorValue(this.state.customer, this.state.firstSuburbId, this.state.firstMaterialId, this.state.firstColourId)
        });
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-3 control-label">Customer</label>
                            <div className="col-md-8">
                                <input type="text" className="form-control"
                                    placeholder="Customer"
                                    name="customer"
                                    value={this.state.customer}
                                    onChange={(e) => this.onValueChangeInput(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <select className="form-control cate-select"
                        value={this.state.firstSuburbId}
                        name="Suburb"
                        onChange={(e) => this.onValueChange(e)}
                    >
                        <option value="" hidden>Suburb</option>
                        {
                            this.state.suburbList.map(
                                (m, index) => <option value={m.id} key={index}>{m.name} - {m.city}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-md-2">
                    <select className="form-control cate-select"
                        value={this.state.firstMaterialId}
                        name="Material"
                        onChange={(e) => this.onValueChange(e)}
                    >
                        <option value="" hidden>Material</option>
                        {
                            this.state.materialList.map(
                                (m, index) => <option value={m.id} key={index}>{m.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-md-2">
                    <select className="form-control cate-select"
                        value={this.state.firstColourId}
                        name="Colour"
                        onChange={(e) => this.onValueChange(e)}
                    >
                        <option value="" hidden>Colour</option>
                        {
                            this.state.colourList.map(
                                (m, index) => <option value={m.id} key={index}>{m.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>
        )
    }
}
export default ProductSelector;