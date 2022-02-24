<template>
<div>
    <nav>
    <ul style="text-align: left;">
        <router-link to="/dashboard">
            <li>Dashboard</li>
        </router-link>
        <router-link to="/menuManage">
            <li>Menu Manage</li>
        </router-link>
        <router-link to="/categoryManage">
            <li>Category Manage</li>
        </router-link>
    </ul>

    </nav>

</div>
</template>
<script>
    export default {
        name : 'NavAdmin'
    }
</script>