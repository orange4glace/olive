import { observable } from 'mobx'

import App from './app';

class Test {
  @App.mobx.observable t: number;
  @observable g: number;
}