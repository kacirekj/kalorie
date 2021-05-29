Vue.component('existing-marker-form', {
    data: function () {
        return {
            isEdit: false
        }
    },
    props: ['marker'],
    methods: {
        onRatingSelected: function (input) {
            console.log('onRatingSelected', input);
            this.marker.rating = input;
        },
        onModify: function () {
            console.log('onModify');
            this.isEdit = true;
        }
    },
    template: `
<div>               
    <div class="row">
        <div class="col">
            <form>
               <div class="form-group" id="poDivPasId">
                    <div class="form-group">
    <!--                                <label for="rating">Rating</label>-->
                        <label for="rating">Rating</label>
                        <star-rating id="rating" class="form-control" :star-size=30 :rating="marker.rating" @rating-selected="onRatingSelected"></star-rating>
                    </div>
                    <div class="form-group">
    <!--                                <label for="rating">Rating</label>-->
                        <label for="rating">Rating</label>
                        <star-rating id="rating" class="form-control" :star-size=30 :rating="marker.rating" @rating-selected="onRatingSelected"></star-rating>
                    </div>
                    <div class="form-group">
                        <label for="markerNote">Comment</label>
                        <textarea id="markerNote" class="form-control span6" type="text" v-model="marker.note" enabled/>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="onModify(marker)">Modify</button>
                    </div>
                    <div v-if="isEdit == true">
                                            <div class="form-group">

                        <label for="authKey">Phone number of this rating</label>
                        <input id="authKey" class="form-control" type="text"></input>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-primary" @click="$emit('edit', marker)">Edit</button>
                            <button type="button" class="btn btn-danger" @click="$emit('remove', marker)">Remove</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>  
    </div>
</div>
    `
})
