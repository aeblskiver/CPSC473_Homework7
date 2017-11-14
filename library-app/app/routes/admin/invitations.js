import Route from '@ember/routing/route';
//import Ember from 'emeber';

export default Route.extend({
  model() {
    return this.store.findAll('invitation');
  }
});
