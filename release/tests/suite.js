"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Testing = require("@singleware/testing");
const repository_spec_1 = require("./repository.spec");
const suite = new Testing.Suite();
const logger = new Testing.Loggers.Tap();
// Test cases.
suite.addCase(repository_spec_1.Repository);
(async function () {
    const report = await suite.perform();
    logger.print(report);
    process.exitCode = report.errors > 0 ? 1 : 0;
})();
