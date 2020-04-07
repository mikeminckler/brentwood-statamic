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
            { name: 'One on One Meetings', date: '' },
            //{ name: 'Open House', date: 'April 7' },
            //{ name: 'Grand Prairie', date: 'April 8' },
            //{ name: 'Prince George', date: 'April 16' },
            //{ name: 'Comox', date: 'April 20' },
            //{ name: 'Nanaimo', date: 'April 21' },
            //{ name: 'San Francisco', date: 'May 2nd-5th' },
        ],
    },

    methods: {

        toggleRSVP: function(event) {
            this.showRSVP = !this.showRSVP;
            if (event) {
                this.selectedEvent = event;
            }
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

        createAnalyticsEvent: function(data) {
            ga('send', 'event', data.name, data.action, data.details);
            fbq('track', data.name);
        },

    },
});
