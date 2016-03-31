import Ember from 'ember';
import heatmap from 'npm:heatmap.js'

export default Ember.Component.extend({
  heatmap: null,
  events: [],
  loaded: false,
  didInsertElement () {
    let instance = heatmap.create({
      container: this.$('.match-heatmap')[0]
    })
    this.set('heatmap', instance)
  },

  didReceiveAttrs () {
    let heatmap = this.get('heatmap')
    let events = this.get('events')
    let loaded = this.get('loaded')

    if (!heatmap || events.length === 0 && loaded === false) return
    this.set('loaded', true)

    // resets heatmap, and adds coords
    // @TODO: figure out way to do in setdata, with value increasing whenever duplicate coords are added
    heatmap.setData({
      max: 1,
      data: []
    })
    heatmap.addData(events.map(ev => ({
      x: ev.get('x'),
      y: ev.get('y'),
      value: 1,
      radius: 30
    })))
  }
});
