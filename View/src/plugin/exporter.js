const exporter = {
    element:{
        div :  document.createElement("DIV"),
        span :  document.createElement("SPAN"),
        table : document.createElement("TABLE"),
        html : document.createElement("HTML"),
        body : document.createElement("BODY"),
        header : document.createElement("HEADER"),
        h2 : document.createElement("H2"),
        h3 : document.createElement("H3"),
        h4 : document.createElement("H4"),
        h5 : document.createElement("H5"),
        image : document.createElement("IMG"),

    },
    readData: async function(dataSource, columns, styles, showIndex){
                
        let table = document.createElement("TABLE");
        //list prices
        let tablePrices = table.cloneNode(true)
        tablePrices.style.fontSize = styles.fontSize
        tablePrices.style.width = styles.width
        
        // Create an empty <tr> element and add it to the 1st position of the table:
        let rowTable = tablePrices.insertRow();  
        if(showIndex)
        {
            let ccell = rowTable.insertCell();
            ccell.innerHTML = '#'
        }
        //render header table
        columns.forEach(element => {   
            let cell = rowTable.insertCell(); 
            cell.innerHTML = element[0]
        });


        //render data detail
        dataSource.forEach((row, index)=>{ 
            // Create an empty <tr> element and add it to the 1st position of the table:
            let rrowTable = tablePrices.insertRow();
            if(showIndex)
            {
                let cccell = rrowTable.insertCell();
                cccell.innerHTML = index + 1
            }

            columns.forEach((cell, i)=>{ // go to through all cells  
                
                // item index  
                let value=i  

                for(var property in row){
                    if(cell[1] === property)
                    {
                        let func = cell[2]
                        if(typeof func === "function"){
                            value = func(row[property])
                        }else{                                
                            value = row[property]
                        }

                        break;
                    }
                }      
                
                let ccell = rrowTable.insertCell();
                ccell.innerHTML = value      
            })
        })
        
        // caculate summary   
        const sums = [];
        const checkShowSummary = columns.filter(function(item){
            return item[3] != null && item[3] != undefined
        })
        const isShowSummary = checkShowSummary != null && checkShowSummary.length > 0

        if(isShowSummary){
            columns.forEach((column, index) => {
                const isSummary = column[3] === 'sum'
                if(isSummary){
                    const values = dataSource.map(item => Number(item[column[1]]));
                    //console.log(values)

                    if (!values.every(value => isNaN(value) || value == '')) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0)
                    }
                }
                else {
                    sums[index] = column[3];
                }
            });   
            // Create an empty <tr> element and add it to the 1st position of the table:
            let rowSummaryTable = tablePrices.insertRow(); 
            //render summary 
            if(showIndex){
                let cell = rowSummaryTable.insertCell(); 
                cell.innerHTML = ''
            } 
            columns.forEach((element,index) => {                  
                let value = sums[index] != undefined ? sums[index] : ''

                let func = element[2]
                if(typeof func === "function" && element[3] === 'sum' ){
                    value = func(value)
                }
                let cell = rowSummaryTable.insertCell(); 
                cell.innerHTML = value
            });
        }
        return tablePrices
    }
}
export default exporter