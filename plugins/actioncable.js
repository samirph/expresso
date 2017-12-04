import Vue from 'vue'
import ActionCable from 'actioncable'

Vue.use(ActionCable)

export default ({ app }, inject) => {
  Vue.prototype.$cable = ActionCable.createConsumer('ws://127.0.0.1:3001/cable')
}
