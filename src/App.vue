<template>
  <div id="app">
    <div class="logo">
    <h2>Gondr Calendar</h2>
    </div>
    <div class="button-row">
      <button  @click="prev">&lt;</button>
      <div class="month-label">{{current.getFullYear()}}년 {{current.getMonth() + 1}}월</div>
      <button  @click="next">&gt;</button>
    </div>
    <div class="calendar">
      <transition-group name="fade">
      <div v-for="week in dayList" class="week" v-bind:key="week">
        <day
          v-for="day in week"
          :day="day"
          :key="day.idx"
          @edit="openEditPopup"
          @open="openPopupWindow(day.idx)"
        >{{day}}</day>
      
      </div>
      </transition-group>
    </div>
    <transition name="fade">
    <div id="popup" v-if="popupOpen">
      <div class="inner">
        <div class="form-group">
          <input v-model="todoTitle" type="text" placeholder="할 일을 입력하세요" />
          <textarea v-model="todoContent" placeholder="상세한 내용을 입력하세요"></textarea>
          <button class="inner-btn" type="button" @click="saveTodo">입력</button>
          <button class="inner-btn" type="button" @click="popupOpen = false">닫기</button>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    let now = new Date();
    this.drawCalendar(now);
  },
  methods: {
    drawCalendar(now) {
      this.current = now;
      let first = now.getFirstDate();
      
     
      console.log("first : "+first.getMonth()+" now : "+now.getMonth() +" - " + (-first.getDay()));
      first.addDay(-first.getDay()); //달력의 최초 시작일이 나온다.
      this.dayList = [];
      while (true) {
        let arr = [];
        
        for (let i = 0; i < 7; i++) {
          arr.push({ idx: first.getTime(), date: first.clone(), list: [] });
         
          first.addDay(1);
        }
        this.dayList.push(arr);
        if (first.getMonth() != now.getMonth()){
          break;
        }

      }
      
    },
    prev() {
      let pre = this.current.clone();
      pre.setMonth(pre.getMonth() - 1);
      this.drawCalendar(pre);
    },
    next() {
      let nex = this.current.clone();
      nex.setMonth(nex.getMonth() + 1);
      this.drawCalendar(nex);
    },
    openPopupWindow(day) {
      console.log(day);
      this.currentPopupData = day;
      this.popupOpen = true;
    },
    saveTodo() {
      if (this.currentEditItem != null) {
        this.currentEditItem.name = this.todoTitle;
        this.currentEditItem.content = this.todoContent;
        this.currentEditItem = null;
      } else {
        this.dayList.forEach(week => {
          week.forEach(day => {
            if (day.idx == this.currentPopupData) {
              day.list.push({
                name: this.todoTitle,
                content: this.todoContent
              });
            }
          });
        });
      }

      this.popupOpen = false;
      this.todoTitle = "";
      this.todoContent = "";
    },
    openEditPopup(e, idx, dIdx) {
      this.dayList.forEach(week => {
        week.forEach(day => {
          if (day.idx == dIdx) {
            this.todoTitle = day.list[idx].name;
            this.todoContent = day.list[idx].content;
            this.currentEditItem = day.list[idx];
            this.popupOpen = true;
          }
        });
      });
    }
  },
  data() {
    return {
      current: null,
      dayList: [],
      popupOpen: false,
      currentPopupData: null,
      todoTitle: "",
      todoContent: "",
      currentEditItem: null
    };
  }
};
</script>

<style>
body{
  height: 100%;
  background: rgb(157, 156, 236);
}
.logo {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.logo > h2 {
  font-size: 30px;
  color: #fff;;
 
}
.button-row {
  width: 45%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.button-row > button{
  
  user-select: none;
  outline: none;
  appearance: none;
  font-size: 55px;
  border: none;
  display: flex;
  align-items: center;
  color: #fff;
  background-color:rgb(157, 156, 236); 
}
.month-label {  
  margin-top: 15px;
  display: flex;
  align-items: center;
  font-size: 45px;
  color: #fff;
}
.calendar {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  
}
.week {
  display: grid;
  grid-gap: 10px;
  margin-bottom: 10px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: minmax(120px, auto);
}
.inner-btn{
  color: #fff;
  background-color: rgb(114, 113, 113);
}
#popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

#popup > .inner {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#popup > .inner > .form-group {
  display: grid;
  grid-template-columns: 1fr;
  width: 80%;
  height: 80%;
  grid-gap: 10px;
}

.fade-enter-active,.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,.fade-leave-to  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-to,.fade-leave{
  opacity: 1;
}
.form-group > textarea {
  height: 150px;
}
.in-enter{
  opacity: 0;
}
.in-enter-to{
  opacity: 1;
}
.in-enter-acrive{
  transition: opacity 5s;
}
</style>
