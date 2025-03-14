require('dotenv').config();

const PORT =process.env.PORT || 8080
const DB_HOST =process.env.DB_HOST || 'localhost'
const DB_USER =process.env.DB_USER || 'root'
const DB_PASSWORD =process.env.DB_PASSWORD || ''
const DB_PORT =process.env.DB_PORT || '3306'
const DB_DATABASES =process.env.DB_DATABASES || 'companydb'


console.log(process.env.PORT)
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_PORT)
console.log(process.env.DB_DATABASES)

module.exports={
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASES
}