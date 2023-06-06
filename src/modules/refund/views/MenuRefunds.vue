<template>
    <main class="menu-wrapper">
        <div class="header">
            <h2>Menú Despachos</h2>
        </div>
        <div class="buttons-wrapper">
            <button @click="$router.push({ name: 'admin-clients' })">Base de datos y reportes</button>
            <button @click="$router.push({ name: 'create-refund' })">Registro de devolución</button>
            <button @click="$router.push({ name: 'get-dispatch-refund-admin' })">En proceso de ingreso</button>
            <button @click="$router.push({ name: 'get-stored-refund' })">Materiales en ubicación</button>
            <button @click="$router.push({ name: 'get-completed-refund' })">Material contabilizado</button>
            <button @click="$router.push({ name: 'home-view' })">Volver</button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
// .wrapper {
//     height: 100%;
// }
.menu-wrapper {
    background-color: white;
    border-radius: 4px;
    border: 1px solid rgba($color: rgb(0, 65, 127), $alpha: 1);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
    width: 90%;
}

.buttons-wrapper {
    display: flex;
    flex-direction: column;
    padding: 5px;
    
}

</style>