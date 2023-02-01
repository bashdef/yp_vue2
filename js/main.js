Vue.component('add-card', {
    template: `
    <div class="input-group mb-3">
        <input class="form-control" type="text" v-model="name">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" v-model="check">
        </div>
        <input class="form-control" type="text" v-model="point">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" v-model="check">
        </div>
        <input class="form-control" type="text" v-model="point">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" v-model="check">
        </div>
        <input class="form-control" type="text" v-model="point">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" v-model="check">
        </div>
        <input class="form-control" type="text" v-model="point">
    </div>
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" v-model="check">
        </div>
        <input class="form-control" type="text" v-model="point">
    </div>
    `,
    data() {
        return {
            check: null,
            point: null,
            name: null
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.check && this.point) {

            }
        }
    }
})

Vue.component('card', {
    template: `
        
    `
})

let app = new Vue({
    el: '#app',
    data: {
        count: null
    }
})