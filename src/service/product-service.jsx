import MUtil        from 'util/util.jsx'

const _mm   = new MUtil();

class Product{
    getProductList(){
        return _mm.request({
            url: '/data'
        });
    }

    saveProduct(product){
        return _mm.request({
            type    : 'post',
            url     : '/data',
            data    : product
        });
    }

    getSuburbList(){
        return _mm.request({
            url: '/suburbs'
        });
    }
    getMaterialList(){
        return _mm.request({
            url: '/materials'
        });
    }
    getColourList(){
        return _mm.request({
            url: '/colours'
        });
    }
    
}

export default Product;