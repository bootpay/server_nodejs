import { BootpaySingleton } from "./singleton"

export interface Validate {
    isBlank(value: any): Boolean

    isPresent(value: any): Boolean

    presence(value: any, defaultValue: any): any
}

class ValidateMethod extends BootpaySingleton implements Validate {
    isBlank(value: any): Boolean {
        let valid: Boolean = false
        if (typeof value === 'string') {
            valid = value.length === 0
        } else if (Array.isArray(value)) {
            valid = value.length === 0
        } else if (typeof value === 'object') {
            valid = Object.keys(value).length === 0
        } else {
            valid = value === undefined || value === null
        }
        return valid
    }

    isPresent(value: any): Boolean {
        return !this.isBlank(value)
    }

    presence(value: any, defaultValue: any): any {
        if (this.isBlank(value)) {
            return defaultValue
        } else {
            return value
        }
    }
}

const ValidClass: ValidateMethod = ValidateMethod.currentInstance()

export const isPresent = (value: any) => ValidClass.isPresent(value)
export const isBlank = (value: any) => ValidClass.isBlank(value)
export const presence = (value: any, defaultValue: any) => ValidClass.presence(value, defaultValue)