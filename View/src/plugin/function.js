
const MESSAGE_SUCCESS ='Congrats, this is a success message.'
const MESSAGE_ERROR ='Oops, this is a error message.'

const functions = {
    $this:this,
    message:{
        success(msg){
            functions.$this.$message({
                showClose: true,
                message: msg == '' || msg == null ? MESSAGE_SUCCESS : msg ,
                type: 'success'
            });
        },
        error(msg){
            functions.$this.$message({
                showClose: true,
                message:  msg == '' || msg == null ? MESSAGE_ERROR : msg ,
                type: 'error'
            });
        }
    }
}
export default functions