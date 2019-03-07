import app from 'internal/app'

const observable = app.mobx.observable
const action = app.mobx.action;
const autorun = app.mobx.autorun;
const computed = app.mobx.computed;
const observer = app.mobx.observer;

export {
    observable,
    action,
    autorun,
    computed,
    observer
}