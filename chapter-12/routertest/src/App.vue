<template>
    <div>
        <div class="header">
            <h1 class="headerText">(주) OpenSG</h1>
            <nav>
                <ul>
                    <li>
                        <router-link v-bind:to="{name: 'home'}">Home</router-link>
                    </li>
                    <li>
                        <router-link v-bind:to="{name: 'about'}">About</router-link>
                    </li>
                    <li>
                        <router-link v-bind:to="{name: 'contacts'}">Contacts</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import About from './components/About'
    import Contacts from './components/Contacts'
    import ContactByNo from './components/ContactByNo'
    import Home from './components/Home'
    import NotFound from './components/NotFound'
    import VueRouter from 'vue-router'

    const router = new VueRouter({
        mode: 'history',
        routes: [
            {path: '/', component: Home},
            {path: '/home', name: 'home', component: Home},
            {path: '/about', name: 'about', component: About},
            {
                path: '/contacts', name: 'contacts', component: Contacts,
                children: [
                    {
                        path: ':no',
                        name: 'contactbyno',
                        component: ContactByNo,
                        props: true,
                        // beforeEnter: (to, from, next) => {
                        //     console.log('@@ beforeEnter!: ', from.path + ' --> ' + to.path);
                        //     if (from.path.startsWith('/contacts')) {
                        //         next();
                        //     } else {
                        //         next('/home');
                        //     }
                        // }
                    }
                ]
            },
            {path: '*', component: NotFound}
        ]
    });

    router.beforeEach((to, from, next) => {
        console.log('** beforeEach!');
        next();
    });

    router.afterEach(() => {
        console.log('** afterEach!');
    });

    export default {
        name: 'App',
        router,
    }
</script>

<style scoped>
    .header {
        background-color: aqua;
        padding: 10px 0 0 0;
    }

    .headerText {
        padding: 0 20px 0 20px;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: purple;
    }

    li {
        float: left;
        display: block;
        color: yellow;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    li:hover {
        background-color: aqua;
        color: black;
        cursor: pointer;
    }
</style>
