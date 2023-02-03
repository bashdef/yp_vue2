let eventBus = new Vue()

Vue.component('new-card', {
    props: {
        progress: ''
    },
    template: `
    <div>
        <form action="" @submit.prevent="itemNumber">
            <input type="text" placeholder="Введите кол-во пунктов списка (от 3 до 5)" v-model="itemNumber">
        </form>
        <form action="" @submit.prevent="addCard">
            <input type="text" v-model="cardTitle" placeholder="Заголовок карточки">
            <input type="text" v-model="item1" placeholder="Пункт первый" v-show="itemNumber >= 3">
            <input type="text" v-model="item2" placeholder="Пункт второй" v-show="itemNumber >= 3">
            <input type="text" v-model="item3" placeholder="Пункт третий" v-show="itemNumber >= 3">
            <input type="text" v-model="item4" placeholder="Пункт четвертый" v-show="itemNumber >= 4">
            <input type="text" v-model="item5" placeholder="Пункт пятый" v-show="itemNumber == 5">
            <button type="submit" @click="addCard" class="btn">Создать</button>
        </form>
    </div>
    `,
    data() {
        return {
            cardTitle: '',
            itemNumber: '',
            item1: '',
            item2: '',
            item3: '',
            item4: '',
            item5: '',
            errors: [],
        }
    },
    methods: {
        addCard() {
            if(this.itemNumber >= 3 && this.itemNumber <= 5){
                let newCard = {
                    cardTitle: this.cardTitle,
                    items: [
                        {
                            itemTitle: this.item1, complete: false
                        },
                        {
                            itemTitle: this.item2, complete: false
                        },
                        {
                            itemTitle: this.item3, complete: false
                        },
                        {
                            itemTitle: this.item4, complete: false
                        },
                        {
                            itemTitle: this.item5, complete: false
                        }
                    ],
                    progress: '<50%'
                }
                eventBus.$emit('new-card', newCard)
                this.cardTitle = null
                this.item1 = null
                this.item2 = null
                this.item3 = null
                this.item4 = null
                this.item5 = null
            }
        }
    }
})

Vue.component('col-1', {
    template: `
    <div>
        <div v-for="card in firstCards">
            <p>{{card.cardTitle}}</p>
            <ul>
                <p v-for="item in card.items" :class="[isComplete ? 'text-success' : '', 'text-danger']" @click="isComplete(item)">{{item.itemTitle}}</p>
            </ul>
        </div>
    </div>
    `,
    mounted() {
        eventBus.$on('new-card', newCard => {
            this.firstCards.push(newCard)
        })
    },
    methods: {
        isComplete(item) {
            if(item.complete === false) {
                item.complete = true
                console.log(item.complete)
            } else {
                item.complete = false
            }
        }
    },
    data() {
        return {
            firstCards: []
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        progress: ['<50%', '>50%', '100%'],
    }
})