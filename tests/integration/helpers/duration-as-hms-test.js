
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duration-as-hms', 'helper:duration-as-hms', {
  integration: true
});

test('it renders correctly', function(assert) {
  this.render(hbs`{{duration-as-hms 60}}`);
  assert.equal(this.$().text().trim(), '00:01:00');

  this.render(hbs`{{duration-as-hms 121 showHours=false}}`);
  assert.equal(this.$().text().trim(), '02:01');
});
