let eventBus = new Vue()

Vue.component('new-card', {
    props: {
        cards: '',
        progress: ''
    },
    template: `
        <div>
            <form action="" @submit.prevent="addCard">
                <input type="text" placeholder="Введите заголовок карточки" v-model="cardTitle">
                <input type="text" placeholder="Введите пункт списка" v-model="cardPoint">
                <button type="submit" @click="addCard"></button>
            </form>
        </div>
    `,
    data() {
        return {
            cardTitle: '',
            cardPoint: '',
        }
    },
    methods: {
        addCard() {
            if(this.cardTitle && this.cardPoint){
                let newCard = {
                    cardTitle: this.cardTitle,
                    cardPoint: this.cardPoint,
                    progress: '<50%'
                }
                eventBus.$emit('add-card', newCard)
                this.cardTitle = null
                this.cardPoint = null
            }
        }
    }
})

Vue.component('card', {
    props: {
        progress: ''
    },
    template: `
        <div>
            <div v-for="card in cards" v-show="card.progress == progress">
                <h5>{{card.cardTitle}}</h5>
                <ul>
                    <li v-for="point in cards" :class="{pointCompleted: point.pointStatus}" @click="donePoint(card, point)">
                        {{point.cardPoint}}
                    </li>
                </ul>
            </div>
            <new-card :cards="cards" :progress="progress"></new-card>
        </div>
    `,
    data() {
        return {
            cards: []
        }
    },
    methods: {
        donePoint(point, card) {
            if(point.pointStatus == false) {
                point.pointStatus = true
            } else {
                point.pointStatus = false
            }
        }
    },
    mounted() {
        eventBus.$on('add-card', newCard => {
            this.cards.push(newCard)
        })
    }
})

let app = new Vue({
    el: '#app',
    data: {
        progress: ['<50%', '>50%', '100%']
    }
})