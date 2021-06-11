import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import FoodEntry from "@/domain/FoodEntry";

Vue.config.productionTip = false
Vue.use(Autocomplete)

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        console.log(el)
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});


new Vue({
    router,
    data: function () {
        return {
            test: 'root?',
            foods: [],
            foodEntries: [],
            newFoodEntry: new FoodEntry({
                date: new Date().toISOString().slice(0, 10),
                food: {
                    name: 'test',
                    calories: 0
                },
                amount: 100,
            }),
            user: {
                id: 0
            }
        }
    },
    render: h => h(App)
}).$mount('#app')
