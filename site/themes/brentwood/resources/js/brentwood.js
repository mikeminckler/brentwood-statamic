//import Vue from "vue";
import Vue from 'vue/dist/vue.js';

import lodash from "lodash";
Object.defineProperty(Vue.prototype, "$lodash", { value: lodash });

const app = new Vue({
    el: "#app",

    components: {
        'form-rsvp': () => import(/* webpackChunkName: "form-rsvp" */ '@/Forms/RSVP')
    },

    data: {
        showRSVP: false,
        name: '',
        email: '',
        selectedEvent: {},
        events: [
            { name: 'Calgary', date: 'March 1 & 2' },
            { name: 'Kelowna', date: 'March 3' },
            { name: 'Kamloops', date: 'March 4' },
            { name: 'Vancouver', date: 'March 5 & 6' },
        ],
    },

    methods: {

        toggleRSVP: function() {
            this.showRSVP = !this.showRSVP;
            //if (this.showRSVP) {
                this.doScrolling(this.$refs.rsvp.offsetTop - (window.innerHeight / 2) + 200, 500);
            //}
        },

        doScrolling: function(elementY, duration) {
            var startingY = window.pageYOffset;
            var diff = elementY - startingY;
            var start;

            // Bootstrap our animation - it will get called right before next frame shall be rendered.
            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                // Elapsed milliseconds since start of scrolling.
                var time = timestamp - start;
                // Get percent of completion in range [0, 1].
                var percent = Math.min(time / duration, 1);

                window.scrollTo(0, startingY + diff * percent);

                // Proceed with animation as long as we wanted it to.
                if (time < duration) {
                    window.requestAnimationFrame(step);
                }
            })
        },

    },
});
