

function generateFinalQuery(array) {
    function generateQuery(str) {
        const [columnName, operator, valueStr] = str.split(",").map(part => part.trim());
        let query = "";
        if (operator === "like") {
            query = `${columnName} LIKE '${valueStr}%'`;
        }
        // else if (operator === "equal") {
        //     query = `${columnName} = ${valueStr}`;

        // } else if (operator === "greter then or equal" || operator === "less then or equal") {
        //     console.log("object===========", operator);
        //     const equalityOperator = operator === "greter then,or,equal" ? ">=" : "<=";
        //     query = `${columnName} ${equalityOperator} ${valueStr}`;
        // } else if (operator === "greter then") {
        //     console.log("object===========", operator);
        //     query = `${columnName} > ${valueStr}`;
        // } else if (operator === "less then") {
        //     query = `${columnName} < ${valueStr}`;
        // } else if (operator === "in") {
        //     const values = valueStr.split("|").map(val => `'${val.trim()}'`).join(",");
        //     query = `${columnName} IN (${values})`;
        // } else if (operator === "between") {
        //     const [min, max] = valueStr.split("|").map(val => val.trim());
        //     query = `${columnName} BETWEEN ${min} AND ${max}`;
        // }

        return query;
    }
    const queries = array.map(generateQuery);
    return queries.join(" AND ");
}

const inputArray = [
    "city,like,ser",
];

const finalQuery = generateFinalQuery(inputArray);
console.log(finalQuery);
