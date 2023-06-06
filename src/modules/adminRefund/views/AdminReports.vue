<template>
    <div class="admin_menu-wrapper">
        <div class="dates-filter">
            <form @submit.prevent="onSubmit" class="dates_filter-wrapper">
                <p class="dates-input">
                    <label for="date_in">Desde</label>
                    <input id="date_in" type="date" v-model="filters.initDate">
                </p>
                <p class="dates-input">
                    <label for="date_out">Hasta</label>
                    <input id="date_out" type="date" v-model="filters.finDate">
                </p>
                <button type="submit" :disabled="isLoading" class="search-button">Buscar</button>
            </form>
            <label v-if="total || total === 0" class="total">Resultados: {{ total }}</label>
            <div class="buttons_actions-wrapper">
                <button @click="onReset" class="reset-button">Resetear</button>
                <button @click="onExportToExcel" class="export-button">Exportar a excel</button>
            </div>
        </div>
        <table v-if="refunds.length > 0" class="table-wrapper">
            <thead>
                <tr>
                    <th class="id">ID</th>
                    <th>Código</th>
                    <th>Cantidad</th>
                    <th>Cantidad de bultos</th>
                    <th>Ubicación final</th>
                    <th>Patente</th>
                    <th>Responsable de almacenamiento</th>
                    <th>Fecha de ingreso</th>
                    <th>Fecha de almacenamiento</th>
                </tr>
            </thead>
            <tbody>
                <RefundData class="dispatchPlace-wrapper" v-for="refund in refunds" :key="refund.id" :refund="refund" />
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import getRefundByFilter from '../composables/getRefundByFilter';
import RefundData from '../components/RefundData.vue';
import createFile from '../composables/createExcelFile';

export default {
    components: { RefundData },
    setup() {

        const filters = ref(
            {
                initDate: "",
                finDate: "",
            }
        );

        const { isLoading, refunds, total, getRefunds } = getRefundByFilter();

        const { createExcelFile } = createFile();

        return {
            isLoading,
            filters,
            refunds,
            total,
            onSubmit: async () => {

                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const dates = filters.value;

                const { errorsPost, ok, total } = await getRefunds(dates);

                if (ok.value === false) {
                    Swal.fire("Error", `${errorsPost.value}.`, "error");
                    return;
                } else {
                    Swal.fire(
                        `Resultados encontrados: ${total.value}`
                    );
                }
            },
            onReset: () => {
                filters.value = {
                    initDate: "",
                    finDate: "",
                };
                refunds.value = "";
                total.value = null;
            },
            onExportToExcel: async () => {
                new Swal({
                    title: "Generando archivo, espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();

                const refundsData = refunds.value;

                const dates = filters.value;

                const { errors, excel, nice } = await createExcelFile(refundsData, dates);

                if (nice.value === false) {
                    Swal.fire("Error", `${errors.value}.`, "error");
                    return;
                } else {
                    Swal.fire(
                        "Exportado a excel"
                    );
                }

            },
        };
    },
}
</script>

<style lang="scss" scoped>

.admin_menu-wrapper {
    background-color: white;
    padding: 10px;
}

.dates-filter {
    display: block;
    margin: 12px 0;
}

.dates_filter-wrapper {
    display: block;
}

.dates-input label, .total {
    width: 100%;
    padding: 8px;
    margin: 4px 0;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
}

.dates-input {
    display: flex;
    flex-direction: column;
}

.table-wrapper {
    display: none;
}

.table-wrapper tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-wrapper th {
    color: white;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    text-align: left;
    padding: 12px 8px;
}

.id {
    width: 70px;
}

.export-button, .reset-button, .search-button {
    padding: 8px;
    border: none;
    color: white;
    margin: 4px 0;
}

.export-button {
    background-color: darkgreen;
}

.reset-button {
    background-color: chocolate;
}

.search-button {
    background-color: darkslateblue;
    width: 100%;
}

.buttons_actions-wrapper {
    display: flex;
    justify-content: space-around;
}

@media screen and (min-width: 1200px) {
  
.dates-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dates-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.dates_filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dates-input label, .total {
    text-align: center;
    width: 160px;
    margin: 0 12px;
    padding: 8px;
    background-color: rgba($color: rgb(0, 65, 127), $alpha: 1);
    color: white;
}

.table-wrapper {
    display: block;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.export-button, .reset-button, .search-button {
    margin: 0 4px;
}

}
</style>