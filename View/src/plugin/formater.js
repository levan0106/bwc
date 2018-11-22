const formater ={
    currency:function (value,digit) {
        let d = digit == null ? 2 :digit;
        let val = isNaN(value/1)?0:value
        return '$' + Number(val).toFixed(d).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
      },
    number:function (value,digit) {
        let d = digit == null ? 0 :digit;
        let val = isNaN(value/1)?0:value
        return Number(val).toFixed(d).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
      },
    hour:function (value,digit) {
      let d = digit == null ? 1 :digit;
      let val = isNaN(value/1)?0:value
      return Number(val).toFixed(d).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") + ' hrs'
    },
    percent:function(val) {
        if(val == undefined)
          return '—'
        else
          return val+ ' %'
      },
    month: function(d) {
      if(d == null || d == '')
        return '';

      var date = new Date(d);
      if(date == 'Invalid Date')
        return d
        
      var month = date.getMonth()+1
      return ( month >= 10 ? month : '0'+month ) + "/" + date.getFullYear();
    },
    date: function(d) {
        if(d == null || d == '')
        return '';
        var dateTime = new Date(d);
        var month = dateTime.getMonth()+1
        var date = dateTime.getDate()
        return ( date >= 10 ? date : '0'+date )  + "/" + ( month >= 10 ? month : '0'+month ) + "/" + dateTime.getFullYear();
      },
    datetime: function(d) {
        if(d == null || d == '')
        return '';
        var dateTime = new Date(d);        
        var month = dateTime.getMonth()+1
        var date = dateTime.getDate()
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return ( date >= 10 ? date : '0'+date ) + "/" + ( month >= 10 ? month : '0' + month ) + "/" + dateTime.getFullYear() + "  " + strTime;
      }
}
export default formater