import {IIncludedLetters} from "./Models/Models";

class Helpers {
    static Unrepeated = (str: string): string => {
        return Array.from(new Set(str)).join('').toLowerCase();
    };

    static AllIncludedLetters = (iObj: IIncludedLetters[]): string => {
        let retval = '';

        for (const l of iObj) {
            retval += l.letters;
        }

        return Helpers.Unrepeated(retval);
    }
}

export {Helpers}
