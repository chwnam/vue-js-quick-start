<template>
    <div>
        <p class="add-new">
            <router-link class="btn btn-primary" v-bind:to="{name: 'addcontact'}">새로운 연락처 추가하기</router-link>
        </p>
        <div id="example">
            <table id="list" class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>사진</th>
                    <th>편집/삭제</th>
                </tr>
                </thead>
                <tbody id="contacts">
                <tr v-for="contact in contactlist.contacts" :key="contact.no">
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.tel }}</td>
                    <td>{{ contact.address }}</td>
                    <td><img class="thumbnail" :src="contact.photo" @click="editPhoto(contact.no)"></td>
                    <td>
                        <button class="btn btn-primary" @click="editContact(contact.no)">편집</button>
                        <button class="btn btn-primary" @click="deleteContact(contact.no)">삭제</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <paginate ref="pagebutton"
                  v-model="contactlist.pageno"
                  :page-count="totalPage"
                  :page-range="7"
                  :margin-pages="1"
                  :click-handler="pageChanged"
                  :prev-text="'이전'"
                  :next-text="'다음'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"></paginate>
        <router-view></router-view>
    </div>
</template>

<script>
    import Constant from '../Constant';
    import {mapState} from 'vuex';
    import Paginate from 'vuejs-paginate';

    export default {
        name: 'contactList',
        components: {
            Paginate
        },
        computed: {
            totalPage() {
                return Math.floor((this.contactlist.totalcount - 1) / this.contactlist.pagesize) + 1;
            },
            ...mapState(['contactlist'])
        },
        mounted: function () {
            let page = 1;
            if (this.$route.query && this.$route.query.page) {
                page = parseInt(this.$route.query.page);
            }
            this.$store.dispatch(Constant.FETCH_CONTACTS, {pageno: page});
        },
        watch: {
            '$route': function (to) {
                if(to.query.page && to.query.page) {
                    let page = to.query.page;
                    this.$store.dispatch(Constant.FETCH_CONTACTS, {pageno: page});
                }
            }
        },
        methods: {
            pageChanged(page) {
                this.$router.push({name: 'contacts', query: {page: page}});
            },
            editContact(no) {
                this.$router.push({name: 'updatecontact', params: {no: no}});
            },
            deleteContact(no) {
                if (confirm('정말로 삭제하시겠습니까?')) {
                    this.$store.dispatch(Constant.DELETE_CONTACT, {no: no});
                    this.$router.push({name: 'contacts'});
                }
            },
            editPhoto(no) {
                this.$router.push({name: 'updatephoto', params: {no: no}});
            }
        }
    }
</script>

<style scoped>
    .add-new {
        margin: 10px auto;
        max-width: 820px;
        min-width: 820px;
        padding: 40px 0 0 0;
        text-align: left;
    }

    #example {
        margin: 10px auto;
        max-width: 820px;
        min-width: 820px;
        padding: 0;
        position: relative;
        font: 13px "vernada";
    }

    #example .long {
        width: 100%;
    }

    #example .short {
        width: 50%;
    }

    #example input,
    textarea,
    select {
        box-sizing: border-box;
        border: 1px solid #bebebe;
        padding: 7px;
        margin: 0;
        outline: none;
    }

    #list {
        width: 800px;
        font: 13px "vernada";
    }

    #list thead tr {
        color: yellow;
        background-color: purple;
    }

    #list th:nth-child(5n+1),
    #list td:nth-child(5n+1) {
        width: 200px;
    }

    #list th:nth-child(5n+2),
    #list td:nth-child(5n+2) {
        width: 150px;
    }

    #list th:nth-child(5n+3),
    #list td:nth-child(5n+3) {
        width: 250px;
    }

    #list th:nth-child(5n+4),
    #list td:nth-child(5n+4) {
        width: 60px;
    }

    #list th:nth-child(5n),
    #list td:nth-child(5n) {
        width: 150px;
    }

    #list th {
        padding: 10px 5px 10px 5px;
    }

    #list tr {
        border-bottom: solid 1px black;
    }

    #list td, #list th {
        text-align: center;
        vertical-align: middle;
    }

    img.thumbnail {
        width: 48px;
        height: 48px;
        margin-top: auto;
        margin-bottom: auto;
        display: block;;
        cursor: pointer;
    }
</style>