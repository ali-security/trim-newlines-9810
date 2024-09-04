function trimNewlines(string) {
    var start = 0;
    var end = string.length;

    while (start < end && (string[start] === '\r' || string[start] === '\n')) {
        start++;
    }

    while (end > 0 && (string[end - 1] === '\r' || string[end - 1] === '\n')) {
        end--;
    }

    return (start > 0 || end < string.length) ? string.slice(start, end) : string;
}

trimNewlines.start = function (string) {
    var end = string.length;
    var start = 0;

    while (start < end && (string[start] === '\r' || string[start] === '\n')) {
        start++;
    }

    return start > 0 ? string.slice(start, end) : string;
};

trimNewlines.end = function (string) {
    var end = string.length;

    while (end > 0 && (string[end - 1] === '\r' || string[end - 1] === '\n')) {
        end--;
    }

    return end < string.length ? string.slice(0, end) : string;
};

module.exports = trimNewlines;