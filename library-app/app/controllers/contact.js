import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({

  emailAddress: '',
  message: '',
  hasSuccess: '',

  isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isLongEnough: Ember.computed.gte('message.length', 5),
  isReadyToSend: Ember.computed.and('isValid','isLongEnough'),
  isDisabled: Ember.computed.not('isReadyToSend'),

  actions: {
    saveContact() {
      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', {
        email: email,
        message: message
      });

      newContact.save().then((response) => {
        
      alert(`Sending message '${response.get('message')}' from email ${response.get('emailAddress')}'`);
      this.set('emailAddress', '');
      this.set('message', '');
      this.set('responseMessage', 'We got your message and we\'ll be in touch soon!');
    });
  }
}

});
