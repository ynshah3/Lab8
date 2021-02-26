describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider')
      .then(function change($el) {
        expect($el).to.have.value(75);
      });
  });

  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number')
      .then(function change($el) {
        expect($el).to.have.value(33);
      });
  });

  it('Audio element changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound')
      .then(function change($el) {
        expect($el).to.have.prop('volume', 0.33);
      });
  });

  it('Image and sound sources change when party horn button selected', () => {
    cy.get('#radio-party-horn').trigger('change');
    cy.get('#sound-image')
      .then(function img_change($el) {
        expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
      });
    cy.get('#horn-sound')      
      .then(function sound_change($el) {
        expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
      });
  });

  it('Volume image changes when increasing volumes', () => {
    cy.get('#volume-slider').invoke('val', 0).trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg');
      });
    cy.get('#volume-slider').invoke('val', 20).trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
      });
    cy.get('#volume-slider').invoke('val', 50).trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
      });
    cy.get('#volume-slider').invoke('val', 88).trigger('input');
    cy.get('#volume-image')
      .then(($el) => {
        expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
      });
  });

  it('Honk button is disabled when input is empty or non-number', () => {
    cy.get('#volume-number').clear().focus().blur();
    cy.get('#honk-btn')
      .then(($el) => {
        expect($el).to.have.attr('disabled', 'disabled');
      });
    cy.get('#volume-number').clear().type('a');
    cy.get('#honk-btn')
      .then(($el) => {
        expect($el).to.have.attr('disabled', 'disabled');
      });
    cy.get('#volume-number').clear().type('%');
    cy.get('#honk-btn')
      .then(($el) => {
        expect($el).to.have.attr('disabled', 'disabled');
      });
  });

  it('Error when number outside range', () => {
    cy.get('#volume-number').clear().type(-1);
    cy.get('#volume-number')
      .then(($el) => {
        expect($el[0].validationMessage).to.eq('Value must be greater than or equal to 0.');
      });
    cy.get('#volume-number').clear().type(101);
    cy.get('#volume-number')
      .then(($el) => {
        expect($el[0].validationMessage).to.eq('Value must be less than or equal to 100.');
      });
  });
});
