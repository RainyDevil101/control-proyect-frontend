<template>
    <div class="admin__bar-wrapper">
        <div class="admin__bar-header">
            <h1>Administración</h1>
        </div>
        <div class="admin_bar-body">
            <ul class="options-wrapper">
                <router-link class="router-link__admin-bar" :to="{ name: 'regist-user' }">Registrar usuario</router-link>
                <router-link class="router-link__admin-bar" :to="{ name: 'user-list' }">Ver lista de usuarios</router-link>
                <router-link class="router-link__admin-bar" :to="{ name: 'massive-registers' }">Importar
                    usuarios</router-link>
                <router-link class="router-link__admin-bar" :to="{ name: 'regist-destination' }">Registrar
                    destino</router-link>
                <router-link class="router-link__admin-bar" :to="{ name: 'home-view' }">Volver</router-link>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.admin__bar-wrapper {
    text-align: center;
    width: 100%;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    padding: 10px 0px 0px 0px;
}

.admin__bar-header {
    color: white;
    text-transform: uppercase;
}

.admin__bar-header {
    padding: 0 10px;
}

.options-wrapper {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: none;
    grid-gap: 10px;
}

.router-link__admin-bar {
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.router-link-active {
    color: black;
    background-color: white;
}

@media screen and (min-width: 768px) {

    .admin__bar-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px 0px 0px 10px;
        
    }

    .router-link__admin-bar {
        padding: 10px 20px;
    }

    .options-wrapper {
        display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    grid-template-rows: none;
    }

  }

</style>