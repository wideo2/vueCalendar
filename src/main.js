import Vue from 'vue';
import App from './App.vue';
import Day from './Day.vue';

Date.prototype.clone = function(){
  console.log(new Date (this));
  return new Date(this);
}

Date.prototype.getFirstDate = function(){
  let temp = this.clone();
  temp.setDate(1);
  return temp;
}

Date.prototype.addDay = function(value) {
  console.log("value "+value+"this.getDate "+ this.getDate());
  this.setDate( this.getDate() + value);
}

Vue.component('day', Day);

new Vue({
  el: '#app',
  render: h => h(App),
  methods:{
    openAddTodo(){
      
    }
  }
})
