<template>
    <div  @mousemove="idleReset">
        <!-- <el-dialog title="Session Warning " :visible.sync="open" >
        <div class="UICountdown">
            <span>
                <h1>You will be logged out!</h1>
                <p>
                    You have been idle for longer than {{ idleTime }} seconds. You will be
                    logged out in {{ UICountdown }} seconds.
                </p>
                <bwc-modal-footer>
                    <el-button @click="open=false">Cancel</el-button>                                 
                    <el-button type="primary" @click="UIReset">
                        Stay logged in
                    </el-button>
                </bwc-modal-footer>
            </span>
        </div>
        </el-dialog> -->
        <!-- <div class="container">
            <pre>{{ $data }}</pre>
        </div> -->
        <slot/>
    </div>
</template>

<script>

export default {
    name:"TimerWarning",
    data(){
        return({
            el: 'body', // use the body element so we have mousemove on the entire document
            idleTime: 900, // The internal timer that tracks idle time, is reset on event. Set this to your timeout value in seconds
            idleCountdown:null, // Populated at runtime by idleTime value. This value decrease every second until timeout is reached
            idleTimeout: false, // Timeout status toggle
            UITime: 180, // Total time before UI performs action. Set this to your desired countdown to your users
            UICountdown: null, // Populated by uiTime on idleTimeout, UI countdown decreases every second until timeout is reached
            UITimeout: false, // UI timeout status toggle
            //open:false
        })
    },
    created(){
        this.ready()
    },
    // computed:{
    //     sessionIdleReset(){
    //         return this.$store.getters.sessionIdleReset
    //     }
    // },
    // watch:{
    //     sessionIdleReset(val){
    //         if(val){                
    //             this.idleReset()
    //             this.$store.dispatch('sessionIdleReset',false)
    //             console.log('idleReset')
    //         }
    //     }
    // },
    methods: {

        // ************************************* START IDLE COUNTDOWN ************************************* //

        // This starts the internal timer. The internal timer is started automatically
        // on page load. The internal timer will be reset everytime a mouse, click,
        // key event occurs, which means the user is active, on timeout, call
        // the countDown timer which is visible to the UI
        startIdleCountdown: function () {
            console.log('start Idle count down')
            //$('.UICountdown').hide();                               // hides the UI warning window
            this.idleCountdown = this.idleTime;                     // initialize the timer with idle timeout config value
            //this.setIdleTimer = setInterval(this.idleTimer, 1000);  // starts the timer. setTimer is used to clear/reset idleTimer
            this.$store.dispatch('setIdleTimer',setInterval(this.idleTimer, 1000))
        },

        // This is the method that counts down the idle time. Every 1000 ms an additional
        // second is removed from the timer. Once the count hits zero, the UI is
        // displayed and we call the uiCountDown
        idleTimer: function () {
            this.idleCountdown = this.idleCountdown - 1;        // decrement idleCountdown every second

            if(!this.idleCountdown){                            // if countdown is zero timeout is achieved
                //clearInterval(this.setIdleTimer);               // clear timer
                clearInterval(this.$store.getters.setIdleTimer)
                //this.idleTimeout = !this.idleTimeout;           // toggle the idle timeout status

                this.startUICountdown();                        // start the UI timer
            }
        },

        // reset idle timer on mouse or key event.
        idleReset: function () {
            if(!this.idleTimeout) {                                 // reset idle countdown only if idle timeout has not expired
            clearInterval(this.$store.getters.setIdleTimer)
                //clearInterval(this.setIdleTimer);                   // reset the UI timer
                this.startIdleCountdown();                          // start the idle countdown
            }
        },

        // ************************************* START UI COUNTDOWN ************************************* //

        // Starts the UI countdown, and displays the warning to user
        startUICountdown: function () {
            //$('.UICountdown').slideDown(2000);                    // display the UI warning window
            //this.open = true
            let widthPage = screen.width    //width resolution
            let heightPage = screen.height //height resolution
            let leftPage = (widthPage - 550)/2
            let topPage = (heightPage - 250)/2

            window.open(this.$store.getters.rootUrl + "/sessionwarning/"+this.UITime+"/"+this.idleTime, '_blank', 
            'width=550, height=260, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, left='+leftPage+',top='+topPage);

            this.idleReset()

            // this.UICountdown = this.UITime;                     // initialize the UI timer with UI timeout config value
            // this.setUITimer = setInterval(this.UITimer, 1000);  // start UI timer. setUITimer is used to reset UITimer
        },

        // the countdown timer decrements the UICountdown value until zero
        // UITimer: function () {
        //     this.UICountdown = this.UICountdown - 1;            // decrement UI countdown every second

        //     if(!this.UICountdown){                              // the countdown is complete, take action
        //     clearInterval(this.setUITimer);                 // reset the UI timer
        //     this.UITimeout = !this.UITimeout;               // toggle UI timeout status. Use for future events

        //     this.countdownExpired();                        // post UI countdown expiry events
        //     }
        // },

        // If the UI reset button is clicked, we start from the beginning
        // UIReset: function () {
        //     clearInterval(this.setUITimer);                     // reset the UI timer
        //     this.idleTimeout = !this.idleTimeout;               // Toggle idleTimeout status
        //     this.startIdleCountdown();                          // start the idle countdown
        //     //this.open = false
        // },

        // ************************************* COUNTDOWN EXPIRED EVENTS ************************************* //

        // countdownExpired: function () {
        //     this.open = false
        //     localStorage.clear();
        //     clearInterval(this.setUITimer);   
        //     window.open(this.$store.getters.rootUrl + "/sessionexpired", '_blank', 'width=650, height=200,toolbar=0,location=0,menubar=0');
        //     window.location.href = this.$store.getters.rootUrl + "/login";
        // },

        ready: function () {
            //if(this.$store.getters.sessionWarning){
                this.idleReset();
            //}
        }
    },

        
}

</script>

<style>

</style>
