<template>
    <div class="regist-user-wrapper">

        <form @submit.prevent="onSubmit">
            <p><label for="name">Nombre</label>
                <input type="text" id="name" v-model="userForm.fullname" maxlength="60">
            </p>
            <p><label for="lastname">Apellidos</label>
                <input type="text" id="lastname" v-model="userForm.fulllastname" maxlength="60">
            </p>
            <p><label for="rut">Rut</label>
                <input type="text" id="rut" v-model="userForm.rut" placeholder="Ej: 12.345.678-k" maxlength="12">
            </p>
            <p><label for="email">Email</label>
                <input type="email" id="email" v-model="userForm.email" placeholder="ejemplo@gmail.com"
                    maxlength="50">
            </p>
            <p><label for="password">Contraseña</label>
                <input type="password" id="password" v-model="userForm.passwordT" maxlength="70">
            </p>
            <p><label for="passwordC">Confirmar contraseña</label>
                <input type="password" id="passwordC" v-model="userForm.confirmPassword" maxlength="70">
            </p>
            <p><label for="position">Cargo</label>
                <input type="text" id="position" v-model="userForm.position" maxlength="50">
            </p>
            <p class="block"><label for="division">División</label>
                <select v-model="userForm.users_divisions" id="division">
                    <option
                    v-for="division of divisions"
                    :key="division.id"    
                    :value="division.id"
                        >{{ division.name }}</option>
                </select>
            </p>
            <p class="block"><label for="role">Rol de usuario</label>
                <select v-model="userForm.role" id="role">
                    <option v-for="role of roles"
                    :key="role.name" :value="role.role">{{ role.name }}</option>
                </select>
            </p>
            <button class="block" type="submit">Registrar</button>
        </form>

    </div>
</template>

<script>
import registUser from '../composables/registUser';
import submitUser from '../composables/submitUser';

export default {
    setup() {

        const { divisions, roles } = registUser();

        const { onSubmit, userForm } = submitUser();

        return {
            userForm,
            divisions,
            roles,
            onSubmit,
        };
    }
}

</script>

<style lang="scss" scoped>

.regist-user-wrapper {
    background-color: white;
    padding: 1em;
}

.regist-user-wrapper form {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.regist-user-wrapper form .block {
    grid-column: 1/3;
}

.regist-user-wrapper form p {
    margin: 0;
    padding: .5em;
}

.regist-user-wrapper form p label {
    font-size: .8rem;
    padding: 4px 6px;
    margin: 2px 0;
}



.regist-user-wrapper form button,
.regist-user-wrapper form input,
.regist-user-wrapper form select {
    width: 100%;
    padding: .4em;
}

.regist-user-wrapper form button {
    margin: 5px auto;
      background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
      color: white;
      border: none;
      cursor: default;
      transition: 0.2s;
  
      &:hover {
          background-color: rgba($color: #444444, $alpha: 1.0);
      }
}

/* LARGE SCREEN */

@media screen and (min-width: 768px) {
    .regist-user-wrapper form .block {
    grid-column: auto;
}

.regist-user-wrapper form button {
    max-width: 300px;
    height: 50px;
    margin-top: auto;
}
}

</style>