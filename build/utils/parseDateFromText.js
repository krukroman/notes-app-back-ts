"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const re = 
// eslint-disable-next-line no-useless-escape
/((0?[1-9]|1[012])[- \/.](0?[1-9]|[12][0-9]|3[01])[- \/.](19|20)?[0-9]{2})/gm;
const parseDateFromText = (string) => {
    const matches = string.match(re);
    return matches ? matches.join(', ').replace(/-/g, '/') : '';
};
exports.default = parseDateFromText;
