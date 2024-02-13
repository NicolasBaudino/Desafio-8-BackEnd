import { productModel } from "../models/product.model.js";

export async function findProducts(limit = 10, page = 1, query, sort) {
    let consult = {}

    if (query != undefined){
        consult[query.split(":")[0]] = query.split(":")[1]
    }

    return await productModel.paginate(consult,{limit:limit,page:page,sort:sort == undefined ? {}: {price:Number(sort)}})
}

export async function findProductById(id) {
    return await productModel.findById(id);
}

export async function createProducts(product) {
    return await productModel.create(product);
}

export async function updateProducts(_id, product) {
    return await productModel.findOneAndUpdate({ _id }, product)
}

export async function deleteProducts(_id) {
    return await productModel.findByIdAndDelete({ _id });
}