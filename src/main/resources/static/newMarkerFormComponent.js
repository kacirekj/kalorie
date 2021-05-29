Vue.component('new-marker-form', {
    data: function () {
        return {
        }
    },
    props: ['marker'],
    methods: {
        onRatingSelected: function (input) {
            console.log('onRatingSelected', input);
            this.marker.rating = input;
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
                        <star-rating id="rating" :star-size=30 :rating="marker.rating" @rating-selected="onRatingSelected"></star-rating>
                    </div>
                    <div class="form-group">
                        <textarea id="markerNote" class="span6" placeholder="Comment" type="text" v-model="marker.note" enabled/>
                    </div>
                    <div class="form-group">
                        <button type="button" @click="$emit('add', marker)">Add</button>
                    </div>
                </div>
            </form>
        </div>  
    </div>
</div>
    `
})
