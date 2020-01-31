/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Testing from '@singleware/testing';

import { Repository } from './repository.spec';

const suite = new Testing.Suite();
const logger = new Testing.Loggers.Tap();

// Test cases.
suite.addCase(Repository);

(async function() {
  const report = await suite.perform();
  logger.print(report);
  process.exitCode = report.errors > 0 ? 1 : 0;
})();
