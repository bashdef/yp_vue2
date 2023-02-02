let eventBus = new Vue()

Vue.component('new-card', {
    props: {
        progress: ''
    },
    template: `
    <div>
        <form @submit.prevent="addCard">
            <p v-for="error in errors">{{ error }}</p>
            <input type="text" placeholder="Введите заголовок карточки" v-model="title"><br>
            <textarea placeholder="Введите пункты списка (не меньше 3 и не больше 5)" v-model="points"></textarea><br>
            <button class="btn btn-success" type="submit" @click="addCard">Создать</button>
        </form>
    </div>
    `,
    data() {
        return {
            title: '',
            points: [],
            errors: []
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
                if(newPoints.length >= 3 && newPoints.length <= 5){
                    let newCard = {
                        title: this.title,
                        points: newPoints,
                        progress: '<50%'
                    }
                    eventBus.$emit('add-card', newCard)
                    this.title = ''
                    this.points = []
                }
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
                {{card.title}}
                <ul>
                    <li v-for="point in card.points">{{point.pointTitle}}</li>
                </ul>
            </div>
            <div v-for="card in secondCards" v-show="card.progress == progress">
                {{card.title}}
            </div>
            <div v-for="card in thirdCards" v-show="card.progress == progress">
                {{card.title}}
            </div>
        </div>
    `,
    data() {
        return {
            firstCards: [],
            secondCards: [],
            thirdCards: []
        }
    },
    mounted() {
        eventBus.$on('add-card', newCard => {
            this.firstCards.push(newCard)
        })
    }
})

let app = new Vue({
    el: '#app',
    data: {
        progress: ['<50%', '>50%', '100%']
    }
})