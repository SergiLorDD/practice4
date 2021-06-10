import Subject from "./subject.js";
import { status } from "../task-1.js";

export default class Cart {
    constructor() {
        this.baseUrl = "http://localhost:3001/cart/items/";
        this.subject = new Subject();
        this.items = [];
        this.loading = false;
        this._middleware = this._middleware.bind(this)
    }

    _ajax(url, method = "GET", data = null, middleware = this._middleware) {

        const params = {
            method,
            mode: "cors",
            headers: { "Content-type": "application/json" }
        };
        if (data) {
            params.body = JSON.stringify(data);
        }

        middleware(null, null, true)
        
        return window.fetch(url, params)
            .then(status)
            .then(response => middleware(null, response, false)).catch(error => middleware(error, null, false))
    }

    _middleware(error, response, loading) {
        this.loading = loading;
        this._notify()
        if(error) {
            console.warn(error)
            return null
        } 
        if(response) {
            if(response.status === 200) return response.json()
            this.load();
            return null
        }
    }

    _notify() {
        this.subject.notifyObservers();
    }

    register(...args) {
        this.subject.add(...args);
    }

    getItems() {
        return this.items;
    }

    getTotalQuantity() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0)
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.price, 0)
    }

    load() {
        this._ajax(this.baseUrl).then((data) => data ? this.items = data : null).then(() => this._notify())
    }

    addItem(item) {
        if(!item) return;
        this._ajax(this.baseUrl, 'POST', item)
    }

    updateItem(itemId, item) {
        if(!item || !itemId) return;
        this._ajax(this.baseUrl + itemId, 'PUT', item)
    }

    removeItem(itemId) {
        if(!itemId) return;
        this._ajax(this.baseUrl + itemId, 'DELETE')
    }

    removeAll() {
        this._ajax(this.baseUrl, 'DELETE')
    }
}
