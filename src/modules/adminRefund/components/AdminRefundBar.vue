<template>
    <div class="admin_bar-wrapper">
        <div class="admin_bar-header">
            <h1>Base de datos y reportes</h1>
        </div>
        <div class="admin_bar-body">
            <ul class="options-wrapper">
                <router-link class="router-link_admin-bar" :to="{name: 'admin-clients'}">Clientes</router-link>
                <router-link class="router-link_admin-bar" :to="{name: 'admin-places'}">Destinos</router-link>
                <router-link class="router-link_admin-bar" :to="{name: 'admin-reports'}">Reportes</router-link>
                <router-link class="router-link_admin-bar" :to="{name: 'menu-refunds'}">Volver</router-link>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.admin_bar-wrapper {
    text-align: center;
    width: 100%;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    padding: 10px 0px 0px 0px;
}

.admin_bar-header {
    color: white;
    text-transform: uppercase;
}

.options-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
}

.router-link_admin-bar {
    text-decoration: none;
    color: white;
}

.router-link-active {
    color: black;
    background-color: white;
}

@media screen and (min-width: 768px) {

    .admin_bar-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px 0px 0px 10px;
        
    }

    .router-link_admin-bar {
    padding: 10px 20px;
}

  }

</style>