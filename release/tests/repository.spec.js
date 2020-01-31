"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2020 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Testing = require("@singleware/testing");
const i18n = require("../source");
/**
 * Repository test case.
 */
let Repository = class Repository extends Testing.Case {
    /**
     * Default constructor.
     */
    constructor() {
        super();
        /**
         * Global repository.
         */
        this.repository = new i18n.Repository();
        /**
         * Global messages.
         */
        this.messages = {
            value: 'Value',
            variable: 'Variable({x})',
            nested: {
                value: 'Nested:Value',
                variable: 'Nested:Variable({x})'
            },
            plural: {
                '@empty': 'Empty',
                '@singular': 'Singular',
                '@plural': 'Plural'
            },
            context: {
                '@a': 'Context:A',
                '@z': 'Context:Z',
                '@fallback': 'Context:Fallback',
                plural: {
                    '@a': {
                        '@empty': 'Context:A:Empty',
                        '@singular': 'Context:A:Singular',
                        '@plural': 'Context:A:Plural'
                    },
                    '@z': {
                        '@empty': 'Context:Z:Empty',
                        '@singular': 'Context:Z:Singular',
                        '@plural': 'Context:Z:Plural'
                    },
                    '@fallback': {
                        '@empty': 'Context:Fallback:Empty',
                        '@singular': 'Context:Fallback:Singular',
                        '@plural': 'Context:Fallback:Plural'
                    }
                }
            }
        };
        this.repository.add('test', this.messages);
    }
    /**
     * Test of basic translations.
     */
    testBasicTranslations() {
        this.areEquals(this.repository.get('test.value'), 'Value');
        this.areEquals(this.repository.get('test.variable', { parameters: { x: 'ok' } }), 'Variable(ok)');
        this.areEquals(this.repository.get('test.nested.value'), 'Nested:Value');
        this.areEquals(this.repository.get('test.nested.variable', { parameters: { x: 'ok' } }), 'Nested:Variable(ok)');
    }
    /**
     * Test of plural translations.
     */
    testPluralTranslations() {
        this.areEquals(this.repository.get('test.plural', { counter: 0 }), 'Empty');
        this.areEquals(this.repository.get('test.plural', { counter: 1 }), 'Singular');
        this.areEquals(this.repository.get('test.plural', { counter: 2 }), 'Plural');
    }
    /**
     * Test of context translations.
     */
    testContextTranslations() {
        this.areEquals(this.repository.get('test.context', { context: 'a' }), 'Context:A');
        this.areEquals(this.repository.get('test.context', { context: 'z' }), 'Context:Z');
        this.areEquals(this.repository.get('test.context', { context: 'b' }), 'Context:Fallback');
    }
    /**
     * Test of plural context translations.
     */
    testPluralContextTranslations() {
        this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 0 }), 'Context:A:Empty');
        this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 1 }), 'Context:A:Singular');
        this.areEquals(this.repository.get('test.context.plural', { context: 'a', counter: 2 }), 'Context:A:Plural');
        this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 0 }), 'Context:Z:Empty');
        this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 1 }), 'Context:Z:Singular');
        this.areEquals(this.repository.get('test.context.plural', { context: 'z', counter: 2 }), 'Context:Z:Plural');
        this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 0 }), 'Context:Fallback:Empty');
        this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 1 }), 'Context:Fallback:Singular');
        this.areEquals(this.repository.get('test.context.plural', { context: 'b', counter: 2 }), 'Context:Fallback:Plural');
    }
    /**
     * Test of translation not found.
     */
    testTranslationNotFound() {
        this.areEquals(this.repository.get('test.not.found'), 'test.not.found');
        this.areEquals(this.repository.get('test.not.found', { fallback: 'Fallback' }), 'Fallback');
    }
};
__decorate([
    Class.Private()
], Repository.prototype, "repository", void 0);
__decorate([
    Class.Private()
], Repository.prototype, "messages", void 0);
__decorate([
    Testing.Method(),
    Class.Public()
], Repository.prototype, "testBasicTranslations", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Repository.prototype, "testPluralTranslations", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Repository.prototype, "testContextTranslations", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Repository.prototype, "testPluralContextTranslations", null);
__decorate([
    Testing.Method(),
    Class.Public()
], Repository.prototype, "testTranslationNotFound", null);
Repository = __decorate([
    Class.Describe()
], Repository);
exports.Repository = Repository;
