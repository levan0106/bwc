const rules ={
    Required: [
        {required: true, message: 'This is a required field', trigger: 'blur' }
    ],
    Email: [
        {required: true, message: 'This is a required field', trigger: 'blur' },
        {type:'email',message: 'Please input correct email', trigger: 'blur' }
    ],
    Min: [
        {validator: checkMin, message: 'This must be greater than 0', trigger: 'blur' }
    ],
    Max: [
        {validator: checkMax,trigger: 'blur' }
    ]
}
var checkMin = (rule, value, callback) => {
    debugger
    if (value < 0) {
      callback(new Error('Please input the number'));
    }
    callback();
  };
var checkMax = (rule, value, callback) => {
    debugger
    if (value > 100) {
      callback(new Error('Please input the number'));
    }
    callback();
  };
export default rules