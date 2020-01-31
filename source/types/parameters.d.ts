/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as JSX from '@singleware/jsx';

/**
 * Map of parameters.
 */
export type Parameters = {
  /**
   * Parameters keys.
   */
  [key: string]: string | number | JSX.Element;
};
