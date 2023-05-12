import { sql_con } from "./set_db.js";

const tableSetting = async () => {
    console.log('테이블 셋팅 안하는거니~~~~~~~~~~~~~~');

    let makeUsersTable = `CREATE TABLE IF NOT EXISTS users(
        idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_email varchar(100) UNIQUE,
        user_pwd varchar(100) ,
        user_name VARCHAR(20),
        user_nick VARCHAR(20),
        user_snsid VARCHAR(100),
        user_provider  VARCHAR(10),
        user_rate int(5) DEFAULT 1,
        user_thumbnail VARCHAR(255),
        user_retoken VARCHAR(255),
        user_created_at DATETIME,
        user_updated_at DATETIME,
        user_deleted_at DATETIME
    );`;
    try {
        sql_con.query(makeUsersTable);
    } catch (err) {
        console.error(err);
    }
};

export { tableSetting }