import * as types from '../mutation-types.js'

//全局状态
const state = {
  products: []
}

//getters
const getters = {
  [types.PRODUCT]: state => {
    return state.products
  }
}

const mutations = {
  [types.PRODUCT] (state, products) {
    state.products = products
  }
}

const actions = {
  [types.PRODUCT]({commit}) {
    commit(types.PRODUCT, [
      {
        ProductID: 1,
        ProductCode: '1001',
        ProductName: '中茶独红',
        Brand: '',
        ProductShortName: '中茶独红',
        MarketPrice: 99800,
        ShopPrice: 99800,
        Inventory: 9,
        ImageMin: '',
        ImageMedium: '',
        ImageMax: '',
        ProductDesc: '',
        ProductSizeInfo: '',
        IsHot: 1,
        ProductType: 4,
        ProductMType: 1,
        ProduceArea: '宁波',
        Material: '',
        ProductStatus: 1,
        CreateTime: '2018-12-12 11:11:08',
        Discount: 1,
        DisplayOrder: 1,
        SubType: 1,
        Specification: '357g',
        DefaultSpec: 1,
        ProductTypeID: 1000
      },
      {
        ProductID: 1,
        ProductCode: '1001',
        ProductName: '中茶独红',
        Brand: '',
        ProductShortName: '中茶独红',
        MarketPrice: 99800,
        ShopPrice: 99800,
        Inventory: 9,
        ImageMin: '',
        ImageMedium: '',
        ImageMax: '',
        ProductDesc: '',
        ProductSizeInfo: '',
        IsHot: 1,
        ProductType: 4,
        ProductMType: 1,
        ProduceArea: '宁波',
        Material: '',
        ProductStatus: 1,
        CreateTime: '2018-12-12 11:11:08',
        Discount: 1,
        DisplayOrder: 1,
        SubType: 1,
        Specification: '357g',
        DefaultSpec: 1,
        ProductTypeID: 1000
      },
      {
        ProductID: 1,
        ProductCode: '1001',
        ProductName: '中茶独红',
        Brand: '',
        ProductShortName: '中茶独红',
        MarketPrice: 99800,
        ShopPrice: 99800,
        Inventory: 9,
        ImageMin: '',
        ImageMedium: '',
        ImageMax: '',
        ProductDesc: '',
        ProductSizeInfo: '',
        IsHot: 1,
        ProductType: 4,
        ProductMType: 1,
        ProduceArea: '宁波',
        Material: '',
        ProductStatus: 1,
        CreateTime: '2018-12-12 11:11:08',
        Discount: 1,
        DisplayOrder: 1,
        SubType: 1,
        Specification: '357g',
        DefaultSpec: 1,
        ProductTypeID: 1000
      },
      {
        ProductID: 1,
        ProductCode: '1001',
        ProductName: '中茶独红',
        Brand: '',
        ProductShortName: '中茶独红',
        MarketPrice: 99800,
        ShopPrice: 99800,
        Inventory: 9,
        ImageMin: '',
        ImageMedium: '',
        ImageMax: '',
        ProductDesc: '',
        ProductSizeInfo: '',
        IsHot: 1,
        ProductType: 4,
        ProductMType: 1,
        ProduceArea: '宁波',
        Material: '',
        ProductStatus: 1,
        CreateTime: '2018-12-12 11:11:08',
        Discount: 1,
        DisplayOrder: 1,
        SubType: 1,
        Specification: '357g',
        DefaultSpec: 1,
        ProductTypeID: 1000
      }
    ])
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
