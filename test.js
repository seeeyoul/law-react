let list;
if (csv && csvData){
    console.log(csvData);
    list = csvData;
    const predict = csvData[1].map(i => {
        return {
            item: i.item,
            predict: i.result
        }
    });
    const cover = csvData[2].map(i => {
        return {
            item: i.item,
            cover: i.result
        }
    });
    const cover_real = csvData[3].map(i => {
        return {
            item: i.item,
            cover_real: i.result
        }
    });
    const cover_predict = csvData[4].map(i => {
        return {
            item: i.item,
            cover_predict: i.result
        }
    });
    list.forEach((list_item,i)=>{
        predict.forEach((predict_item,i)=>{
            if (list_item.item === predict_item.item) {
                list_item["predict"] = predict_item.predict;
                cover.forEach((cover_item,i)=>{
                    if (predict_item.item === cover_item.item) {
                        list_item['cover'] = cover_item.cover;
                        cover_real.forEach((cover_real_item,i)=>{
                            if (cover_item.item === cover_real_item.item) {
                                list_item['cover_real'] = cover_real_item.cover_real;
                                cover_predict.forEach((cover_predict_item,i)=>{
                                    if (cover_real_item.item === cover_predict_item.item) {
                                        list_item['cover_predict'] = cover_predict_item.cover_predict;
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });
}
