let eventBus = new Vue()

Vue.component('modal', {
    template: `
      <transition name="modal-fade">
        <div class="modal-backdrop">
          <div class="modal"
          >
            <header
              class="modal-header"
            >
              <slot name="header">
                <button
                  type="button"
                  class="btn-close"
                  @click="close"
                  aria-label="Close modal"
                >
                  x
                </button>
              </slot>
            </header>
            <section
              class="modal-body"
            >
              <slot name="body">
              </slot>
            </section>
            <footer class="modal-footer">
              <slot name="footer">
                <button
                  type="button"
                  class="btn-green"
                  @click="close"
                  aria-label="Close modal"
                >
                  Close me!
                </button>
              </slot>
            </footer>
          </div>
        </div>
      </transition>
    `,
    methods: {
        close() {
            this.$emit('close')
        }
    },
    props: {
        firstCards: ''
    }
})

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
            errors: [],
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
                        progress: '<50%',
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
                <button
                  type="button"
                  class="btn"
                  @click="showModal"
                >
                    {{card.title}}
                </button>
                <modal
                  v-show="isModalVisible"
                  @close="closeModal"
                />
            </div>
            <div v-for="card in firstCards" v-show="card.progress == progress">
                <button
                  type="button"
                  class="btn"
                  @click="showModal"
                >
                    {{card.title}}
                </button>
                <modal
                  v-show="isModalVisible"
                  @close="closeModal"
                />
            </div>
            <div v-for="card in firstCards" v-show="card.progress == progress">
                <button
                  type="button"
                  class="btn"
                  @click="showModal"
                >
                    {{card.title}}
                </button>
                <modal
                  v-show="isModalVisible"
                  @close="closeModal"
                />
            </div>
        </div>
    `,
    data() {
        return {
            firstCards: [],
            secondCards: [],
            thirdCards: [],
            complete: false,
            isModalVisible: false
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
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
        progress: ['<50%', '>50%', '100%'],
    }
})