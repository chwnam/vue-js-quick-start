<template>
    <div>
        <div class="header">
            <h1 class="headerText">(주) OpenSG</h1>
            <nav>
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about">About</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/contacts">Contacts</nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <nuxt></nuxt>
        </div>
    </div>
</template>

<script>
    export default {
        name: "default"
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