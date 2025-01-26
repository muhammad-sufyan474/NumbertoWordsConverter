const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const scales = ["", "Thousand", "Lac", "Crore"];

function validateInput(input) {
    const errorSpan = document.getElementById("error");

    // Remove non-numeric characters (except commas)
    input.value = input.value.replace(/[^0-9,]/g, '');
    const num = parseInt(input.value.replace(/,/g, '') || 0);

    // Check if number exceeds 100 crores
    if (num > 1000000000) {
        errorSpan.style.display = "inline"; // Show error message
        input.value = ""; // Clear input
    } else {
        errorSpan.style.display = "none"; // Hide error message
    }
}

function convertToWords() {
    let input = document.getElementById("numberInput");
    let num = input.value.replace(/,/g, '');
    if (!num) {
        document.getElementById("result").innerText = "Please Insert Amount";
        return;
    }
    input.value = formatNumberWithCommas(num);
    document.getElementById("result").innerText = numberToWords(num);
}

function formatNumberWithCommas(num) {
    num = num.toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, -3);
    }
    result = num + result;
    return result;
}

function numberToWords(num) {
    if (num == 0) return "Zero Only";

    let words = "";
    num = parseInt(num);

    if (num >= 10000000) {
        let crore = Math.floor(num / 10000000);
        words += convertHundreds(crore) + " Crore ";
        num %= 10000000;
    }

    if (num >= 100000) {
        let lac = Math.floor(num / 100000);
        words += convertHundreds(lac) + " Lac ";
        num %= 100000;
    }

    if (num >= 1000) {
        let thousand = Math.floor(num / 1000);
        words += convertHundreds(thousand) + " Thousand ";
        num %= 1000;
    }

    if (num > 0) {
        words += convertHundreds(num);
    }

    return words.trim() + " Only";
}

function convertHundreds(num) {
    let result = "";

    if (num > 99) {
        result += units[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
    }

    if (num > 10 && num < 20) {
        result += teens[num - 10];
    } else {
        if (num >= 10) {
            result += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }

        if (num > 0) {
            result += units[num];
        }
    }
    return result.trim();
}