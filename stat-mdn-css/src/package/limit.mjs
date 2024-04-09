// 参考自 https://juejin.cn/post/7310009007921791003
class Pool {
    #resources
    // releaseResolvers 是一个Promise的resolvers对象，包含promise和resolve方法
    #releaseResolvers


    constructor(resources) {
        this.#resources = resources
    }

    async acquire() {
        // 获取资源
        if (this.#resources.length > 0) {
            return this.#resources.pop()
        } else {
            if (!this.#releaseResolvers) {
                this.#releaseResolvers = {}

                this.#releaseResolvers.promise = new Promise((resolve) => {
                    this.#releaseResolvers.resolve = resolve
                })
            }
            // 等待资源释放
            await this.#releaseResolvers.promise
            // 重新获取资源
            return this.acquire()
        }
    }

    release(resource) {
        this.#resources.push(resource)
        if (this.#releaseResolvers) {
            // 通知等待的任务
            this.#releaseResolvers.resolve(resource)
            this.#releaseResolvers = undefined
        }
    }
}

export default function limit(concurrency, retryNum = 3) {
    const pool = new Pool(new Array(concurrency).fill())
    return {
        call: async (request) => {
            const resource = await pool.acquire()
            let result
            for (let i = 0; i < retryNum; i++) {
                try {
                    result = await request()
                    break
                } catch (e) {
                    console.log(`retry ${i + 1} times. ${e.message}`)
                }
            }
            pool.release(resource)
            return result
        }
    }
}
