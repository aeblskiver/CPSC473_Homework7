import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({

  emailAddress: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),

  actualEmailAddress: Ember.computed('emailAddress', function() {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: Ember.observer('emailAddress', function() {
    console.log('observer is called ', this.get('emailAddress'));
  }),

  actions: {
    saveInvitation() {
      // alert(`Saving the following email address is in progress: ${this.get('emailAddress')}`);
      const email = this.get('emailAddress');
      const newInvitation = this.store.createRecord('invitation', {
        email: email
      });
      //Response is the model sent back from the server. It has an id
      newInvitation.save().then((response) => {
        this.set('responseMessage', `Thank you! We've just saved your email address with the following id: ${response.get('id')}`);
        this.set('emailAddress', '');
      });
    }
  }
});
