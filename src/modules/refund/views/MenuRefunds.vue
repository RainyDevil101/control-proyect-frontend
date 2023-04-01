<template>
    <main class="wrapper menu">
        <div class="menu-wrapper">
            <div class="header">
                <h2>Menú Despachos</h2>
            </div>
            <div class="buttons-wrapper">
                <button @click="$router.push({ name: 'admin-clients' })">Administrar</button>
                <button @click="$router.push({ name: 'create-refund' })">Registrar</button>
                <button @click="$router.push({ name: 'get-stored-refund' })">Ver Almacenadas</button>
                <button @click="$router.push({ name: 'get-completed-refund' })">Ver finalizadas</button>
                <button @click="$router.push({ name: 'home-view' })">Volver</button>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>

.menu-wrapper {
    background-color: white;
    border-radius: 4px;
    border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
    padding: 10px;
}

.buttons-wrapper {
    display: flex;
    flex-direction: column;
    padding: 5px;
    
}

.menu {
    width: 100%;
}

</style>