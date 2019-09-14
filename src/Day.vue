<template>
    <div class="day" @click="openPopup">
        <div class="date">
            
            <span v-if="day.date.getDate() == current.getDate()&&day.date.getMonth() == current.getMonth()&&day.date.getFullYear() == current.getFullYear()" class="today" key="1">{{day.date.getDate()}}</span>
            <span v-else class="number" key="2">{{day.date.getDate()}}</span>
            <span class="month">({{day.date.getMonth() + 1}}월)</span>
        </div>
        <div  class="list">
            <transition-group name="fade">
            <div v-bind:key="idx" class="item" v-for="(todo, idx) in day.list" @click.stop="openEditPopup(idx)">{{todo.name}}</div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    export default {
        name:'day',
        props:['day'],
        data(){
            return {
                current: null,
            }
        }, 
        created() {
         let now = new Date();
         this.current = now;
        },
        methods:{
            
            openPopup(){
                this.$emit("open");
            },
            openEditPopup(idx){
                this.$emit("edit", event, idx, this.day.idx);
            }
        }
    }
</script>

<style scoped>
    .day {
        width:100%;
        height:100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        box-shadow: 0px 0px 0px 2px #fff;
        
    }

    .date {
        padding:8px;
    }
    .today{
        display: inline-block;
        font-size: 25px;
        padding: 2px 7px;
        font-weight: bold;
        color: rgb(157, 156, 236);
        border-radius: 10px;
        background-color: #fff;
        animation: scale 1s infinite linear;
    }
    .today:hover{
        animation: none;
    }
    .number {
        font-size:25px;
        font-weight: bold;
        color: #fff;
    }

    .month {
        font-size:15px;
        color:rgb(255, 255, 255);
    }
   
    .item {
        background-color: rgb(92, 87, 145);
        color:#fff;
        border-radius: 0.3rem;
        padding:0.2rem 0.25rem;
        margin:4px;
        transition: all 5s;
    }
    .list{
        max-height: 62px;
        overflow: hidden;
    }
    .list:hover{
        animation: size 20s;
    }
    @keyframes size{
        0%{
            max-height: 62px;
        }
        50%{
            max-height: 1000px;
        }
        100%{
            max-height: none;
        }
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
    .fade-leave,.fade-enter-to{
        opacity: 1;
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity 3s;

    }
  
    @keyframes scale{
        0%{
            transform: scale(.8);
         }
        100% {
        transform: scale(1.0);

    }
    }
</style>