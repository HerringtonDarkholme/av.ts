import Vue from 'vue'

import {Component} from './core'
import {$$Prop} from './interface'
import {createMap, ReadonlyPropertyDescriptor} from './util'

const LIFECYCLE_KEY = '$$Lifecycle' as $$Prop

export type Lifecycles =
  'beforeCreate' | 'created' |
  'beforeDestroy' | 'destroyed' |
  'beforeMount' | 'mounted' |
  'beforeUpdate' | 'updated' |
  'activated' | 'deactivated'

export type BeforeRouteUpdateLifecycle = 'beforeRouteUpdate'
export type BeforeRouteLeaveLifecycle = 'beforeRouteLeave'
export type BeforeRouteEnterLifecycle = 'beforeRouteEnter'

export declare type NextFuncVmCallback<T extends Vue> = (vm: T) => void
export declare type NextFunc = () => void;
export declare type NextFuncBool = (ok?: false) => void;
export declare type NextFuncVm<T extends Vue = any> = (next?: NextFuncVmCallback<T>) => void;
export type BeforeRouteUpdateHandler = (to: any, from: any, next: NextFunc) => void
export type BeforeRouteLeaveHandler = (to: any, from: any, next: NextFuncBool) => void
export type BeforeRouteEnterHandler = (to: any, from: any, next: NextFuncVm) => void

export function Lifecycle(target: Vue, life: Lifecycles, _: ReadonlyPropertyDescriptor<() => void>): void
export function Lifecycle(target: Vue, life: BeforeRouteUpdateLifecycle, _: ReadonlyPropertyDescriptor<BeforeRouteUpdateHandler>): void
export function Lifecycle(target: Vue, life: BeforeRouteLeaveLifecycle, _: ReadonlyPropertyDescriptor<BeforeRouteLeaveHandler>): void
export function Lifecycle(target: Vue, life: BeforeRouteEnterLifecycle, _: ReadonlyPropertyDescriptor<BeforeRouteEnterHandler>): void
export function Lifecycle(target: Vue, life: string, _: ReadonlyPropertyDescriptor<(...args: any[]) => void>) {
  let lifecycles = target[LIFECYCLE_KEY] = target[LIFECYCLE_KEY] || createMap()
  lifecycles[life] = true
}

Component.register(LIFECYCLE_KEY, function(proto, instance, options) {
  let lifecycles: string[] = proto[LIFECYCLE_KEY]
  for (let lifecycle in lifecycles) {
    // lifecycles must be on proto because internalKeys is processed before method
    let handler = proto[lifecycle]
    delete proto[lifecycle]
    options[lifecycle] = handler
  }
})
