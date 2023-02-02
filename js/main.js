let eventBus = new Vue()

Vue.component('new-card', {
    template: `
    <div>
        <form @submit.prevent="addCard">
            <input type="text" placeholder="Введите заголовок карточки" v-model="title">
            <textarea placeholder="Введите пункты списка" v-model="points"></textarea>
            <button class="btn btn-success" type="submit" @click="addCard">Создать</button>
        </form>
    </div>
    `,
    data() {
        return {
            title: '',
            points: []
        }
    },
    methods: {
        addCard() {
            if(this.title && this.points){
                let arr = this.points.split("\n")
                let newPoints = []
                for(let i in arr){
                    let point = {
                        pointTitle: arr[i],
                        pointStatus: false
                    }
                    newPoints.push(point)
                }
                let newCard = {
                    title: this.title,
                    points: newPoints
                }
                eventBus.$emit('add-card', newCard)
                this.title = ''
                this.points = []
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
            <div v-for="card in firstCards" v-show="card.progress == progress">
                {{card.progress}}
            </div>
            <div v-for="card in secondCards" v-show="card.progress == progress">
                {{card.progress}}
            </div>
            <div v-for="card in thirdCards" v-show="card.progress == progress">
                {{card.progress}}
            </div>
        </div>
    `,
    data() {
        return {
            firstCards: [
                {
                    progress: '<50%'
                }
            ],
            secondCards: [
                {
                    progress: '>50%'
                }
            ],
            thirdCards: [
                {
                    progress: '100%'
                }
            ]
        }
    },
    mounted() {
        eventBus.$on('add-card', newCard => {
            this.firstCards.push(newCard)
            console.log(this.firstCards)
        })
    }
})

let app = new Vue({
    el: '#app',
    data: {
        progress: ['<50%', '>50%', '100%']
    }
})