export const AppConfig = {
    jwtSecret:
        "751db26ea0d648458af454a9142ff9c9b7c12d2ac653c1336b85a669897ac36652935ab0017ebf41df68ac042e24f6201e2b1dcc14c734eeaa69f12bbb4818dd",
    jwtExpiration: "10d",
    domain: process.env.DOMAIN || "http://localhost:7010",
    uri_model: "http://zypluzaabtest.azurewebsites.net/getmodelresult",
    port: process.env.PORT || "7010",
};
