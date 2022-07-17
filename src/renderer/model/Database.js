import { ipcRenderer } from '../electron'

export default class Database {
    static #queue = []
    static #workingOnPromise = false
    static #delay = false

    static query(query) {
        return this.#enqueue(query)
    }

    static #enqueue(query) {
        return new Promise((resolve, reject) => {
            this.#queue.push({
                query,
                resolve,
                reject,
            });
            this.#dequeue()
        });
    }

    static #dequeue() {
        if (this.#workingOnPromise) return false
        const item = this.#queue.shift()
        if (!item) return false
        try {
            this.#workingOnPromise = true
            // console.log('Query: ', item.query)
            ipcRenderer.send('request', item.query)
            ipcRenderer.receive('response', (data) => {
              this.#workingOnPromise = false
            //   console.log('Response: ', data)
 
              if(this.#delay) {
                setTimeout(() => {
                    item.resolve(data)
                    this.#dequeue()
                }, 2000)
              } 
              else {
                item.resolve(data)
                this.#dequeue()
              }
           })
        } catch (err) {
            console.log(err)
            this.#workingOnPromise = false
            item.reject(err)
            this.#dequeue()
        }
        return true
    }
}

