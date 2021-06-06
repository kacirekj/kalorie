Vue.component('existing-marker-form', {
    data: function () {
        return {
            isNewMarker: null
        }
    },
    props: ['marker'],
    methods: {
        setIsNewMarker: function () {
            this.isNewMarker = this.marker.id == null;
        },
        onRatingSelected: function (input) {
            console.log('onRatingSelected', input);
            this.marker.rating = input;
        },
        onModify: function () {
            console.log('onModify');
            this.isEdit = true;
        }
    },
    mounted() {
        this.setIsNewMarker();
    },
    updated() {
        this.setIsNewMarker();
    },
    //language=HTML
    template: `
        <div>
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="bologna-list" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" href="#description" role="tab" aria-controls="description" aria-selected="true">Rating</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <star-rating id="rating" :read-only="false" :max-rating="5" :show-rating="true" :increment="0.5" :star-size=30 :rating="marker.rating" @rating-selected="onRatingSelected" disabled></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="markerNote">Comment</label>
                            <textarea id="markerNote" class="form-control span6" type="text" v-model="marker.note"/>
                        </div>

                        
                        <div v-if="this.isNewMarker">
                            <div class="form-group">
                                <label for="phoneNumber">Phone number</label>
                                <div class="input-group">
                                    <input id="phoneNumber" class="form-control" type="text" v-model="marker.author.phoneNumber"></input>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary mb-2">Send</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="authKey">Authorization code</label>
                                <div class="input-group">
                                    <input id="authKey" class="form-control" type="text"></input>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-primary mb-2">Verify identity</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary" @click="$emit('add', marker)">Add</button>
                            </div>

                        </div>
    
                        <div v-if="!this.isNewMarker">
                            <div class="form-group">
                                <label for="phoneNumber">Phone number</label>
                                <div class="input-group">
                                    <input id="phoneNumber" class="form-control" type="text" v-model="marker.author.phoneNumber"></input>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary" @click="$emit('edit', marker)">Edit</button>
                                <button type="button" class="btn btn-danger" @click="$emit('remove', marker)">Remove</button>
                            </div>
                        </div>



                    </form>
                </div>
            </div>


        </div>
    `
})
