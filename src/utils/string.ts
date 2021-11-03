export function formattNumber(num: number = 0, fixed: number = 0) {
    if (fixed) {
        Number(num.toFixed(fixed)).toLocaleString();
    }
    return num.toLocaleString()
}

export function scorePassword(pass: string) {
    var score: number = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters: any = {};
    for (var i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations: any = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount: number = 0;
    for (const check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score + '');
}

export function uuid(i?: string) {
    return new Date().getTime() + '' + Math.random() + '' + Math.random() + i;
}

export const wordifyfa = function (num: any, level: any): any {

    function isCorrectNumber(num: any): any {
        return /^-?(\d{1,3},?)+(\.?\d+)?$/.test(num);
    }

    if (num === null) {
        return "";
    }

    level = level || 0;

    // remove all non digits from string
    if (level === 0 && typeof num === "string" && isCorrectNumber(num)) {
        num = (parseInt(num.replace(/,/g, "")) as any);
    }


    // convert negative number to positive and get wordify value
    if (num < 0) {
        num = num * -1;
        return "منفی " + wordifyfa(num, level);
    }
    if (num === 0) {
        if (level === 0) {
            return "صفر";
        } else {
            return "";
        }
    }
    var result = "",
        yekan = [" یک ", " دو ", " سه ", " چهار ", " پنج ", " شش ", " هفت ", " هشت ", " نه "],
        dahgan = [" بیست ", " سی ", " چهل ", " پنجاه ", " شصت ", " هفتاد ", " هشتاد ", " نود "],
        sadgan = [" یکصد ", " دویست ", " سیصد ", " چهارصد ", " پانصد ", " ششصد ", " هفتصد ", " هشتصد ", " نهصد "],
        dah = [" ده ", " یازده ", " دوازده ", " سیزده ", " چهارده ", " پانزده ", " شانزده ", " هفده ", " هیجده ", " نوزده "];
    if (level > 0) {
        result += " و ";
        level -= 1;
    }

    if (num < 10) {
        result += yekan[num - 1];
    } else if (num < 20) {
        result += dah[num - 10];
    } else if (num < 100) {
        result += dahgan[parseInt((num / 10) + '', 10) - 2] + wordifyfa(num % 10, level + 1);
    } else if (num < 1000) {
        result += sadgan[parseInt((num / 100) + '', 10) - 1] + wordifyfa(num % 100, level + 1);
    } else if (num < 1000000) {
        result += wordifyfa(parseInt((num / 1000) + '', 10), level) + " هزار " + wordifyfa(num % 1000, level + 1);
    } else if (num < 1000000000) {
        result += wordifyfa(parseInt((num / 1000000) + '', 10), level) + " میلیون " + wordifyfa(num % 1000000, level + 1);
    } else if (num < 1000000000000) {
        result += wordifyfa(parseInt((num / 1000000000) + '', 10), level) + " میلیارد " + wordifyfa(num % 1000000000, level + 1);
    } else if (num < 1000000000000000) {
        result += wordifyfa(parseInt((num / 1000000000000) + '', 10), level) + " تریلیارد " + wordifyfa(num % 1000000000000, level + 1);
    }
    return result;

};

export const wordifyRialsInTomansJs = function (num: number) {

    if (num >= 10) {
        num = parseInt((num / 10) + '', 10);
    } else if (num <= -10) {
        num = parseInt((num / 10) + '', 10);
    } else {
        num = 0;
    }

    return wordifyfa(num, 0) + " تومان";
};

export const renderNumber = (number: number) => {
    if (typeof (number * 1) !== 'number')
        return null;
    number = Number(number);
    return Math.round(number) === number ? number.toLocaleString() : number.toFixed(2).toLocaleString();
}