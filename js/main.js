let eventBus = new Vue()

Vue.component('new-card', {
    props: {
        firstCards: ''
    },
    template: `
    <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Создать карточку
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Создание карточки</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" v-if="this.firstCards.length <= 2">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="cardTitle">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" v-model="checked1">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="item1" v-show="checked3 == true">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" v-model="checked2">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="item2" v-show="checked3 == true">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" v-model="checked3">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="item3" v-show="checked3 == true">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" v-model="checked4">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="item4" v-show="checked4 == true">
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" v-model="checked5">
                  </div>
                  <input type="text" class="form-control" aria-label="Text input with checkbox" v-model="item5" v-show="checked5 == true">
                </div>
              </div>
              <div class="modal-footer" v-if="this.firstCards.length <= 2">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="submit" class="btn btn-outline-success" @click="addCard">Создать</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    `,
    data() {
        return {
            cardTitle: null,
            selected: null,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            item1: '',
            item2: '',
            item3: '',
            item4: '',
            item5: '',
            items: null,
            errors: [],
            completeCard: false,
            progress: 0,
            id: 0,
        }
    },
    methods: {
        addCard() {
            let arr = []
            let newArr = []
            arr.push(this.item1, this.item2, this.item3, this.item4, this.item5)
            for(let i in arr) {
                let item = {
                    itemTitle: arr[i],
                    itemStatus: false
                }
                newArr.push(item)
            }
            let newCard = {
                cardTitle: this.cardTitle,
                items: newArr,
                completeCard: this.completeCard,
                progress: this.progress,
                id: this.id,
            }
            eventBus.$emit('add-card', newCard)
            this.id += 1
            this.title = null
            this.items = null
        }
    },
})

Vue.component('col-1', {
    template: `
    <div>
        <div v-for="card in firstCards">
            <p>
               <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{card.cardTitle}}
               </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <ul>  
                    <li v-for="item in card.items" v-show="item.itemTitle != ''"><a href="#" @click="isComplete(item, card)" v-bind:class="{'text-success text-decoration-none': item.itemStatus, 'text-danger text-decoration-none': !item.itemStatus}">{{item.itemTitle}}</a></li>
                </ul>
              </div>
            </div>
        </div>
        <new-card :firstCards="firstCards"></new-card>
    </div>
    `,
    mounted() {
        eventBus.$on('add-card', newCard => {
            this.firstCards.push(newCard)
        })
        eventBus.$on('add-length', cardLength => {
            this.cardLength = cardLength
        })
    },
    methods: {
        isComplete(item, card) {
            if(this.cardLength === 5){
            } else {
                item.itemStatus = !item.itemStatus
                this.id  = card.id
                let countTrue = 0
                let length = 0
                for(let i in card.items){
                    if(card.items[i].itemStatus === true && card.items[i].itemTitle !== ''){
                        countTrue += 1
                    }
                }
                for(let i in card.items){
                    if(card.items[i].itemTitle !== ''){
                        length += 1
                    }
                }
                card.progress = countTrue / length
                if(card.progress >= 0.5){
                    let secondCard = {
                        cardTitle: card.cardTitle,
                        items: card.items,
                        progress: card.progress,
                        completeCard: card.completeCard,
                        id: this.id,
                    }
                    eventBus.$emit('add-second-card', secondCard)
                    if(card.id === this.id){
                        let index = this.firstCards.findIndex(el => el.id === this.id)
                        console.log(index)
                        this.firstCards.splice(index, 1)
                    }
                    this.cardTitle = null
                    this.items = null
                }
            }
        },
    },
    data() {
        return {
            firstCards: [],
            items: null,
            completeCard: false,
            cardTitle: null,
            progress: 0,
            id: 0,
            cardLength: null,
        }
    }
})

Vue.component('col-2', {
    template: `
    <div>
        <div v-for="card in secondCards">
            <p>
               <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{card.cardTitle}}
               </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <ul>  
                    <li v-for="item in card.items" v-show="item.itemTitle != ''"><a href="#" @click="isComplete(item, card)" v-bind:class="{'text-success text-decoration-none': item.itemStatus, 'text-danger text-decoration-none': !item.itemStatus}">{{item.itemTitle}}</a></li>
                </ul>
              </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            secondCards: [],
            items: null,
            completeCard: false,
            cardTitle: null,
            progress: 0,
            id: 0,
            length: null,
            date: null
        }
    },
    mounted() {
        eventBus.$on('add-second-card', secondCard => {
            this.secondCards.push(secondCard)
        })
    },
    methods: {
        isComplete(item, card) {
            item.itemStatus = !item.itemStatus
            this.id = card.id
            let countTrue = 0
            let length = 0
            let cardDate = new Date().toLocaleString()
            console.log(cardDate)
            for(let i in card.items){
                if(card.items[i].itemStatus === true){
                    countTrue += 1
                }
            }
            for(let i in card.items){
                if(card.items[i].itemTitle !== ''){
                    length += 1
                }
            }
            card.progress = countTrue / length
            if(card.progress === 1){
                let thirdCard = {
                    cardTitle: card.cardTitle,
                    items: card.items,
                    progress: card.progress,
                    completeCard: card.completeCard,
                    id: card.id,
                    date: cardDate
                }
                eventBus.$emit('add-third-card', thirdCard)
                if(card.id === this.id){
                    let index = this.secondCards.findIndex(el => el.id === this.id)
                    this.secondCards.splice(index, 1)
                }
                this.cardTitle = null
                this.items = null
            }
        }
    },
    computed: {
        writing() {
            let cardLength = this.secondCards.length
            eventBus.$emit('add-length', cardLength)
            return cardLength
        }
    }
})

Vue.component('col-3', {
    template: `
    <div>
        <div v-for="card in thirdCards">
            <p>
               <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{card.cardTitle}}
               </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <ul>  
                    <li v-for="item in card.items" v-show="item.itemTitle != ''"><a href="#" v-bind:class="{'text-success text-decoration-none': item.itemStatus, 'text-danger text-decoration-none': !item.itemStatus}">{{item.itemTitle}}</a></li>
                </ul>
                {{card.date}}
              </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            thirdCards: []
        }
    },
    mounted() {
        eventBus.$on('add-third-card', thirdCard => {
            console.log(thirdCard)
            this.thirdCards.push(thirdCard)
        })
    },
    methods: {
        isComplete(item) {
            item.itemStatus = !item.itemStatus
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
        progress: ['<50%', '>50%', '100%'],
    },
})