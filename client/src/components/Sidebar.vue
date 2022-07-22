<template>
    <div class="sidebar">
        <div class="logo">
            <b-icon-chat-dots-fill></b-icon-chat-dots-fill>
        </div>
        <div class="nav-links-container">
            <ul>
                <li v-on:click="toggleView('chats')" :class="sidebarView=='chats'&&'active'">
                    <b-icon-chat-square-dots></b-icon-chat-square-dots>
                </li>
                <li v-on:click="toggleView('friends')" :class="sidebarView=='friends'&&'active'">
                    <b-icon-person-fill></b-icon-person-fill>
                </li>
            </ul>
            <ul class="mt-auto">
                <li v-on:click="logout">
                    <b-icon-box-arrow-left></b-icon-box-arrow-left>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
    props:['sidebarView'],
    methods: {
        toggleView: function(val) {
            this.$emit('toggleSidebarView', val)
        },
        logout: function() {
            localStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>