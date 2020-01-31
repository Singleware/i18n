"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const i18n = require("../source");
const repository = new i18n.Repository();
repository.add('test', {
    value: 'Common value.',
    nested: {
        value: 'Common nested value.'
    },
    variable: 'The variable value is {x}.',
    plural: {
        '@empty': 'No {x} letters found.',
        '@singular': '{x} letter was found.',
        '@plural': '{x} letters were found.'
    },
    context: {
        '@a': '{x} is the first letter.',
        '@z': '{x} is the last letter.',
        '@fallback': '{x} is an unmapped letter.',
        plural: {
            '@a': {
                '@empty': "The first letter {x} wasn't repeated",
                '@singular': 'The first letter {x} was repeated {t} time.',
                '@plural': 'The first letter {x} was repeated {t} times.'
            },
            '@z': {
                '@empty': "The last letter {x} wasn't repeated",
                '@singular': 'The last letter {x} was repeated {t} time.',
                '@plural': 'The last letter {x} was repeated {t} times.'
            },
            '@fallback': {
                '@empty': "The unmapped letter {x} wasn't repeated",
                '@singular': 'The unmapped letter {x} was repeated {t} time.',
                '@plural': 'The unmapped letter {x} was repeated {t} times.'
            }
        }
    }
});
console.log(repository.get('test.value'));
console.log(repository.get('test.nested.value'));
console.log(repository.get('test.variable', { parameters: { x: 'a' } }));
console.log(repository.get('test.plural', { counter: 0, parameters: { x: 'a' } }));
console.log(repository.get('test.plural', { counter: 1, parameters: { x: 'b' } }));
console.log(repository.get('test.plural', { counter: 2, parameters: { x: 'c' } }));
console.log(repository.get('test.context', { context: 'a', parameters: { x: 'a' } }));
console.log(repository.get('test.context', { context: 'z', parameters: { x: 'b' } }));
console.log(repository.get('test.context', { context: 'b', parameters: { x: 'c' } }));
console.log(repository.get('test.context.plural', { context: 'a', counter: 0, parameters: { x: 'a', t: 0 } }));
console.log(repository.get('test.context.plural', { context: 'a', counter: 1, parameters: { x: 'a', t: 1 } }));
console.log(repository.get('test.context.plural', { context: 'a', counter: 2, parameters: { x: 'a', t: 2 } }));
console.log(repository.get('test.context.plural', { context: 'z', counter: 0, parameters: { x: 'z', t: 0 } }));
console.log(repository.get('test.context.plural', { context: 'z', counter: 1, parameters: { x: 'z', t: 1 } }));
console.log(repository.get('test.context.plural', { context: 'z', counter: 2, parameters: { x: 'z', t: 2 } }));
console.log(repository.get('test.context.plural', { context: 'b', counter: 0, parameters: { x: 'b', t: 0 } }));
console.log(repository.get('test.context.plural', { context: 'b', counter: 1, parameters: { x: 'b', t: 1 } }));
console.log(repository.get('test.context.plural', { context: 'b', counter: 2, parameters: { x: 'b', t: 2 } }));
