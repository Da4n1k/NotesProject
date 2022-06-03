import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/home'
import Notes from '@/views/notes'
import auth from "@/views/auth";
import calendar from "@/views/calendar";
import alertUser from "@/views/alertUser";
import extUser from "@/views/extUser";



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        // beforeEnter: (to, from,next) =>{
        //     if(localStorage.getItem('auth') === 'false' || localStorage.length === 0 || localStorage.getItem('auth') === 'undefined'){
        //         next()
        //     }else{
        //         next({name: 'notes'})
        //     }
        // }
    },
    {
        path: '/notes',
        name: 'notes',
        component: Notes,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('auth') === "true"){
                next()
            }else{
                next({name: 'Home'})
            }
    }
    },
    {
        path: '/login',
        name: 'login',
        component: auth,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('auth') === "false" || localStorage.length === 0 || localStorage.getItem('auth') === 'undefined'){
                next()
            }else{
                next({name: 'notes'})
            }
        }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: calendar,
        beforeEnter: (to, from, next) =>{
            if(localStorage.getItem('auth') === "true"){
                next()
            }else{
                next({name: 'Home'})
            }
        }
    },
    {
        path: '/alertUs',
        name: 'alertUs',
        component: alertUser,
        beforeEnter: (to, from, next) =>{
            if(localStorage.getItem('auth') === 'true'){
                next()
            }else{
                next({name: 'Home'})
            }
        }

    },
    {
        path: '/setting',
        name: 'userSetting',
        component: extUser,
        beforeEnter: (to, from, next) =>{
            if(localStorage.getItem('auth') === 'true'){
                next()
            }else{
                next({name: 'Home'})
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;