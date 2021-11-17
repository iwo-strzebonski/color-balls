/**
 * NOOO! Why a type interface when you cane have a normal type!!! NOOOO!!!
 * @extends {Array<Array<number|string>}
 */
export default interface IArrOfArrs extends Array<Array<number | string>> {
    [index: number]: (string | number)[]
}
