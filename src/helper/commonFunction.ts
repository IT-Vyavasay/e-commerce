const ThrowErrorReponse = ({ type, status, object, response }) => {
  if (type == "response") {
  } else {
    throw object;
  }
};

const ResponseManage = ({ error, responseData, response, messageObject }) => {
  if (error) {
    console.log(error);
    response.status(500).json({ message: messageObject.error, error: error });
  } else {
    response
      .status(200)
      .json({ message: messageObject.success, data: responseData });
  }
};

function FilterQuery({ obj }) {
  const FilterLength = Object.keys(obj).length;
  const conditions = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      if (typeof obj[key] === "string") {
        conditions.push(`${key} = '${obj[key]}'`);
      } else {
        conditions.push(`${key} = ${obj[key]}`);
      }
    }
  }

  if (FilterLength !== 0) {
    return `AND ${conditions.join(" AND ")}`;
  } else {
    return ``;
  }
}

const FinalQueryGenerator = ({
  tableName,
  defaultSortingField,
  request,
  relationQuery,
}) => {
  const { filter = {}, sort = {}, search = {}, range = {} } = request.body;
  const FilterString = FilterQuery({ obj: filter });
  const GenerateFinalQuearyString = GenerateFinalQuery(Object.values(search));
  const PaginatonSortingString = PaginatonSortingQuery({
    ...sort,
    defaultSortingField: defaultSortingField,
  });
  const querySyntex = `SELECT * FROM ${tableName} ${
    relationQuery ?? ""
  } ${GenerateFinalQuearyString} ${FilterString} ${PaginatonSortingString}`;
  return querySyntex;
};

const PaginatonSortingQuery = ({
  sortingField,
  sortType,
  record,
  pageNo,
  defaultSortingField,
}) => {
  const QueryString = `ORDER BY ${sortingField ?? defaultSortingField} ${
    sortType ?? "ASC"
  } LIMIT ${record ?? 10} OFFSET ${pageNo ?? 0}`;
  return QueryString;
};

const RangeQuery = ({ rangeObject }) => {
  const RangeObjectLength = Object.keys(rangeObject).length;
  // const rangeObject = {
  //     price: "50,60",
  //     discount_price: "50,600"
  // };
  if (RangeObjectLength && RangeObjectLength !== 0) {
    let sqlQuery = "WHERE ";

    // Iterate through each key-value pair in the input object
    for (const key in rangeObject) {
      if (rangeObject.hasOwnProperty(key)) {
        const [min, max] = rangeObject[key].split(",").map(Number);
        sqlQuery += `${key} BETWEEN ${min} AND ${max} AND `;
      }
    }

    const QueryString = sqlQuery.slice(0, -5);
    return QueryString;
  } else {
    return "";
  }
};

function GenerateFinalQuery(array) {
  // const inputArray = [
  //     "city,equal,10",
  //     "city,greter then,10",
  //     "city,less then,10",
  //     "city,greter then or equal,10",
  //     "city,less then or equal,10",
  //     "city,like,ser",
  //     "city, in, city1|city2",
  //     "city, between, 1|2"
  // ];

  if (array && array.length !== 0) {
    function generateQuery(str) {
      const [columnName, operator, valueStr] = str
        .split(",")
        .map((part) => part.trim());
      let query = "";

      if (operator === "like") {
        query = `${columnName} LIKE '${valueStr}%'`;
      } else if (operator === "equal") {
        query = `${columnName} = ${valueStr}`;
      } else if (
        operator === "greter then or equal" ||
        operator === "less then or equal"
      ) {
        const equalityOperator =
          operator === "greter then,or,equal" ? ">=" : "<=";
        query = `${columnName} ${equalityOperator} ${valueStr}`;
      } else if (operator === "greter then") {
        query = `${columnName} > ${valueStr}`;
      } else if (operator === "less then") {
        query = `${columnName} < ${valueStr}`;
      } else if (operator === "in") {
        const values = valueStr
          .split("|")
          .map((val) => `'${val.trim()}'`)
          .join(",");
        query = `${columnName} IN (${values})`;
      } else if (operator === "between") {
        const [min, max] = valueStr.split("|").map((val) => val.trim());
        query = `${columnName} BETWEEN ${min} AND ${max}`;
      }

      return query;
    }
    const queries = array.map(generateQuery);
    return `WHERE ${queries.join(" AND ")}`;
  } else {
    return "";
  }
}

module.exports = {
  ThrowErrorReponse,
  FilterQuery,
  PaginatonSortingQuery,
  RangeQuery,
  GenerateFinalQuery,
  ResponseManage,
  FinalQueryGenerator,
};
