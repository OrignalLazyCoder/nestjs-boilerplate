import {Logger, QueryRunner} from "typeorm";

export class CustomLogger implements Logger {

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log("log query");
    }
    
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log("log query error");
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log("log query slow");
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        console.log("log query schema build");
    }

    logMigration(message: string, queryRunner?: QueryRunner) {
        console.log("log query migration");
    }

    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
        console.log("log");
    }
    
    // implement all methods from logger class
    
}