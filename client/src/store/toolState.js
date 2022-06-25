import { makeAutoObservable } from 'mobx'

class ToolState {
    constructor() {
        makeAutoObservable(this)
    }
    tool = null

    setTool(tool) {
        this.tool = tool
    }
}

export default new ToolState()