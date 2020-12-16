let mutations = {
    changenum(state) {
        state.num++;
    },
    changenumFn(state, data) {
        state.num = state.num + data;
    },
    catalogLeftdata(state, data) {
        //第一个参数是stata 第二个参数为新的赋值

        if (data) {
            state.catalogLeftdata = state.catalogLeftdata.concat(data);
        }
    },
    catalogRightdata(state, data) {
        //第一个参数是stata 第二个参数为新的赋值
        if (data) {
            state.catalogRightdata = data;
        }
    },
    changecataloglistsdata(state, data) {
        console.log(data);
        //第一个参数是stata 第二个参数为新的赋值
        if (data) {
            console.log(state.cataloglistsdata);
            console.log(data);
            state.cataloglistsdata = state.cataloglistsdata.concat(data);
        }
    },
    detaillists(state, data) {
        //第一个参数是stata 第二个参数为新的赋值
        // console.log(data);
        if (data) {
            state.detaillists = data;
        }
    },
    posterdatas(state, data) {
        state.posterdatas = data;
    },
    // cartnum(state) {
    //     var alldatas = 0;
    //     state.cartDatas.forEach(element => {
    //         alldatas += element.values;
    //     });
    //     state.cartnum = alldatas;
    // }, //为
    cartDatas(state, data) {
        if (data) {
            state.cartDatas.push(data);
        }
        // localStorage.getItem(key):获取指定key本地存储的值
        // localStorage.setItem(key,value)：将value存储到key字段
        console.log(19181);
        console.log(state.cartDatas);
        localStorage.setItem('cart', JSON.stringify(state.cartDatas)); //给属性设置值
    },
    quanxuannum(state, data) {
        state.quanxuannum = data;
        localStorage.setItem('cart', JSON.stringify(state.cartDatas));
    },
    keywords(state, data) {
        state.keywords = data;
    },
    addkeywords(state, data) {
        if (data) {
            state.addkeywords.unshift(data);
            localStorage.setItem('addkeywords', JSON.stringify(state.addkeywords));
        }
    },
    userInfo(state, data) {
        if (data) {
            state.userInfo = data;
            localStorage.setItem('token', JSON.stringify(state.userInfo));
        }
    },
};
export default mutations;