export function getAvailableInstrumentTitlesDiff(allInstrumentTitles, selectedInstrumentTitles) {
    const selectedTitleSet = new Set(selectedInstrumentTitles);

    return allInstrumentTitles.filter((instrumentTitle) => {
        return !selectedTitleSet.has(instrumentTitle);
    });
}

export function buildAvailableInstrumentsMessage(instrumentTitles) {
    if (instrumentTitles.length === 0) {
        return "Все основные приборы уже добавлены в текущий набор оборудования.";
    }

    return `Для добавления доступны: ${instrumentTitles.join(", ")}.`;
}

export function sortInstrumentDescriptionWords(instrumentDescription) {
    const cleanedWords = instrumentDescription
        .replace(/[.,:;!?]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const sortedWords = cleanedWords.map((word) => {
        const sortedLetters = word
            .toLowerCase()
            .split("")
            .sort((a, b) => a.localeCompare(b, "ru"))
            .join("");

        return sortedLetters.charAt(0).toUpperCase() + sortedLetters.slice(1);
    });

    sortedWords.sort((a, b) => a.localeCompare(b, "ru"));

    return sortedWords.join(" ");
}

export function buildSortedInstrumentDescriptionMessage(originalDescription, sortedDescription) {
    return `Исходный текст: ${originalDescription} Отсортированный текст: ${sortedDescription}.`;
}

export function sumOfSquares(arr) {
    let sum = 0;

    for (const value of arr) {
        sum += value * value;
    }

    return sum;
}

export function buildPowerSquaresMessage(instrumentPowerValues, totalPowerSquares) {
    return `Для значений энергопотребления ${instrumentPowerValues.join(", ")} сумма квадратов равна ${totalPowerSquares}.`;
}

export function getAverage(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sum = 0;

    for (const value of arr) {
        sum += value;
    }

    return sum / arr.length;
}

export function buildAveragePowerMessage(instrumentPowerValues, averagePowerValue) {
    return `Для значений энергопотребления ${instrumentPowerValues.join(", ")} среднее арифметическое равно ${averagePowerValue}.`;
}
