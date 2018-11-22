<template>
    <layout-login id="session-warning">
        <div>
            <h1 class="title">You will be logged out!</h1>
            <p>
                You have been idle for longer than {{ idleTime/60 }} minutes. You will be
                logged out in.
            </p>
            <h3 style="text-align:center">Time left: {{ Math.floor(UICountdown/60) }}:{{ UICountdown%60 }} </h3>
            
        </div>
        <bwc-modal-footer>
            <!-- <el-button @click="closeWindow">Cancel</el-button>                                  -->
            <el-button type="primary" @click="stayLoggedIn">
                Stay logged in
            </el-button>
        </bwc-modal-footer>
    </layout-login>
</template>

<script>
import LayoutLogin from '@/views/user/LayoutLogin'

export default {
    name:"SessionExpired",
    components:{
        LayoutLogin
    },
    props:['time','idleTime'],
    data(){
        return({
            UICountdown:null,// Populated by uiTime on idleTimeout, UI countdown decreases every second until timeout is reached
            //UITime:this.time,
            UITimeout: false, // UI timeout status toggle
        })
    },
    created(){
       this.startUICountdown()
    },
    methods:{
        stayLoggedIn(){
            window.close();
        },
        startUICountdown: function () {
            //$('.UICountdown').slideDown(2000);                    // display the UI warning window
            //this.open = true
            this.UICountdown = this.time;                     // initialize the UI timer with UI timeout config value
            this.setUITimer = setInterval(this.UITimer, 1000);  // start UI timer. setUITimer is used to reset UITimer
        },
        // the countdown timer decrements the UICountdown value until zero
        UITimer: function () {
            this.UICountdown = this.UICountdown - 1;            // decrement UI countdown every second

            if(!this.UICountdown){                              // the countdown is complete, take action
                clearInterval(this.setUITimer);                 // reset the UI timer
                this.UITimeout = !this.UITimeout;               // toggle UI timeout status. Use for future events

                this.countdownExpired();                        // post UI countdown expiry events
            }
        },
        countdownExpired: function () {
            // force to login page
            localStorage.clear();
            clearInterval(this.setUITimer);   
            window.opener.location.reload();
            
            let widthPage = screen.width    //width resolution
            let heightPage = screen.height //height resolution
            let leftPage = (widthPage - 550)/2
            let topPage = (heightPage - 250)/2

            self.close()
            window.open(this.$store.getters.rootUrl + "/sessionexpired", '_blank', 
            'width=550, height=200, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, left='+leftPage+',top='+topPage);
        },
    }
}
</script>

<style lang="less">
#session-warning{
    .title{
        text-align: center;
        color: red;
    }
}
</style>