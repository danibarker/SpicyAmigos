let romanNum = { M: 1000, C: 100, D: 500, L: 50, V: 5, X: 10, I: 1 };

class RomanNumeral {
    toRoman(number) {
        let ret = "";
        while (number > 0) {
            if (number >= 1000) {
                ret += "M";
                number -= 1000;
            } else if (number >= 900) {
                ret += "CM";
                number -= 900;
            } else if (number >= 500) {
                ret += "D";
                number -= 500;
            } else if (number >= 400) {
                ret += "CD";
                number -= 400;
            } else if (number >= 100) {
                ret += "C";
                number -= 100;
            } else if (number >= 90) {
                ret += "XC";
                number -= 90;
            } else if (number >= 50) {
                ret += "L";
                number -= 50;
            } else if (number >= 40) {
                ret += "XL";
                number -= 40;
            } else if (number >= 10) {
                ret += "X";
                number -= 10;
            } else if (number >= 9) {
                ret += "IX";
                number -= 9;
            } else if (number >= 5) {
                ret += "V";
                number -= 5;
            } else if (number >= 4) {
                ret += "IV";
                number -= 4;
            } else {
                ret += "I";
                number -= 1;
            }
        }
        return ret;
    }

    fromRoman(roman) {
        // roman = 'CMX' = 910
        let number = 0;
        for (let i = 0; i < roman.length; i++){
            if (romanNum[roman[i]] < romanNum[roman[i + 1]]) {
                number -= romanNum[roman[i]]

            } else {
                number += romanNum[roman[i]]
            }
        }
        // while (roman.length > 0) {
        //     if (romanNum[roman[0]] < romanNum[roman[1]]) {
        //         number += romanNum[roman[1]] - romanNum[roman[0]];
        //         roman = roman.substring(2) || ''
        //     } else {
        //         number += romanNum[roman[0]]
        //         roman = roman.substring(1) || '';
        //     }


            
        // }
        return number
    }
}

let RomanNumerals = new RomanNumeral();

console.log(RomanNumerals.fromRoman('CMX'))
