export const pageDisplayedIndex = (index, max) => {
    let arr = [];
    if (max <= 8) {
        for (let i = 0; i < max; i += 1) arr.push(i);
        return arr;
    }
    switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
            arr = [0, 1, 2, 3, 4, 5, max - 1];
            break;
        case max - 1:
        case max - 2:
        case max - 3:
        case max - 4:
        case max - 5:
            arr = [0, max - 6, max - 5, max - 4, max - 3, max - 2, max - 1];
            break;
        default:
            arr = [0, index - 1, index, index + 1, index + 2, max - 1];
            break;
    }
    return arr;
};

export const testimonyDisplayedIndex = (index, max) => {
    let arr = []
    if (max <= 9) {
        for (let i = 0; i < max; i += 1) arr.push(i);
        return arr;
    }
    switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            arr = [0, 1, 2, 3, 4, 5, 6, max - 1];
            break;
        case max - 1:
        case max - 2:
        case max - 3:
        case max - 4:
        case max - 5:
            arr = [0, max - 7, max - 6, max - 5, max - 4, max - 3, max - 2, max - 1];
            break;
        default:
            arr = [0, index - 2, index - 1, index, index + 1, index + 2, max - 1];
            break;
    }
    return arr;
};

export const gotoElementByIdAdjusted = (url, adjustment) => {
    const element = document.getElementById(url);
    const headerOffset = adjustment ?? 40;
    const elementPosition = element ? element.getBoundingClientRect().top : 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    });
};
