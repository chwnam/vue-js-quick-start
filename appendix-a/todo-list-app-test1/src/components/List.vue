<style>
    * {
        box-sizing: border-box;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    ul li {
        cursor: pointer;
        position: relative;
        padding: 8px 8px 8px 40px;
        background: #eee;
        font-size: 14px;
        transition: 0.2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    ul li:hover {
        background: #ddd;
    }

    ul li.checked {
        background: #bbb;
        color: #fff;
        text-decoration: line-through;
    }

    ul li.checked:before {
        content: '';
        position: absolute;
        border-color: #fff;
        border-style: solid;
        border-width: 0 1px 1px 0;
        top: 10px;
        left: 16px;
        transform: rotate(45deg);
        height: 8px;
        width: 8px;
    }

    .close {
        position: absolute;
        right: 0;
        top: 0;
        padding: 12px 16px 12px 16px;
    }

    .close:hover {
        background-color: #f44336;
        color: white;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s;
    }

    .list-enter,
    .list-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }
</style>

<template id="list-template">
    <transition-group name="list" tag="ul">
        <li v-for="(a, index) in todoList" v-bind:key="index" :class="checked(a.done)" @click="doneToggle({index: index})">
            <span>{{ a.todo }}</span>
            <span v-if="a.done">(완료)</span>
            <span class="close" v-on:click.stop="deleteTodo({id: index})">&#x00D7;</span>
        </li>
    </transition-group>
</template>

<script>
    import Constants from '../Constants';
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'List',

        computed: mapState(['todoList']),

        methods: {
            checked: function (done) {
                return {
                    checked: !!done
                }
            },
            ...mapActions([Constants.DELETE_TODO, Constants.DONE_TOGGLE])
        }
    };
</script>