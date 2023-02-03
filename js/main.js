let eventBus = new Vue()

Vue.component('new-card', {
    props: {
        progress: ''
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
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
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
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                items: newArr
            }
            eventBus.$emit('add-card', newCard)
            this.title = null
            this.items = null
        }
    }
})

Vue.component('col-1', {
    template: `
    <div>
        <button class="btn btn-primary" @click="moveCard">Check</button>
        <div v-for="card in firstCards">
            <p>
               <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{card.cardTitle}}
               </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <ul>  
                    <li v-for="item in card.items" v-show="item.itemTitle != ''"><a href="#" @click="isComplete(item)" v-bind:class="{'text-success text-decoration-none': item.itemStatus, 'text-danger text-decoration-none': !item.itemStatus}">{{item.itemTitle}}</a></li>
                </ul>
              </div>
            </div>
        </div>
    </div>
    `,
    mounted() {
        eventBus.$on('add-card', newCard => {
            this.firstCards.push(newCard)
        })
    },
    methods: {
        isComplete(item) {
            item.itemStatus = !item.itemStatus
        },
        moveCard() {
            if(this.firstCards){
                console.log(this.firstCards)
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