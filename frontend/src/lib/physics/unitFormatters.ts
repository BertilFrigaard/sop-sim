const _MICRO_M = 0.000001;
const _MM = 0.001;
const _CM = 0.01;
const _M = 1;
const _KM = 1000;

export function formatMeters(value: number) {
    const abs_value = Math.abs(value);
    if (abs_value >= _KM) {
        return `${shortenDecimals(value / _KM, 2)} km`;
    }

    if (abs_value >= _M) {
        return `${shortenDecimals(value / _M, 2)} m`;
    }

    if (abs_value >= _CM) {
        return `${shortenDecimals(value / _CM, 2)} cm`;
    }

    if (abs_value >= _MM) {
        return `${shortenDecimals(value / _MM, 2)} mm`;
    }

    return `${shortenDecimals(value / _MICRO_M, 2)} μm`;
}

const _MN = 10 ** 6;
const _KN = 10 ** 3;

export function formatNewtons(value: number) {
    const abs_value = Math.abs(value);

    if (abs_value >= _MN) {
        return `${shortenDecimals(value / _MN, 2)} mN`;
    }

    if (abs_value >= _KN) {
        return `${shortenDecimals(value / _KN, 2)} kN`;
    }

    return `${shortenDecimals(value, 2)} N`;
}

const _GPA = 10 ** 9;
const _MPA = 10 ** 6;

export function formatElasticity(value: number) {
    const abs_value = Math.abs(value);

    if (abs_value >= _GPA) {
        return `${shortenDecimals(value / _GPA, 2)} GPa`;
    }

    if (abs_value >= _MPA) {
        return `${shortenDecimals(value / _MPA, 2)} MPa`;
    }

    return `${shortenDecimals(value, 2)} Pa`;
}

const _M4 = 1;
const _CM4 = 10 ** -8;
const _MM4 = 10 ** -12;

export function formatInertia(value: number) {
    const abs_value = Math.abs(value);

    if (abs_value >= _M4) {
        return `${shortenDecimals(value / _M4, 2)} m^4`;
    }

    if (abs_value >= _CM4) {
        return `${shortenDecimals(value / _CM4, 2)} cm^4`;
    }

    return `${shortenDecimals(value / _MM4, 2)} mm^4`;
}

function shortenDecimals(value: number, decimals: number) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}
