import Vue = require('vue')
import {PropOptions, VClass, $$Prop} from './interface'
import {Component} from './core'


const PROP_KEY = '$$Prop' as $$Prop

export function Prop(target: Vue, key: string): void
export function Prop(config: PropOptions): PropertyDecorator
export function Prop(target: Vue | PropOptions): PropertyDecorator | void {
  if (typeof target === 'function') {
    return function(cls, key) {
    }
  }
}

Component.register(PROP_KEY, function() {
})
