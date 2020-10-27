export class BootpaySingleton {
    private static __instance: any

    /**
     * Singleton Instance Return
     * Comment by rumi
     * @date: 2020-10-20
     * @param
     * @returns
     */
    static currentInstance<T>() {
        if (!this.__instance) {
            this.__instance = new this()
        }
        return this.__instance as T
    }
}