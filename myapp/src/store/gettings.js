let gettings = {
    numfn(state) {
        if (state.num <= 99) {
            return '0' + state.num;
        } else {
            return state.num;
        }
    },
    cartnum(state) {
        let all = 0;
        state.cartDatas.forEach(element => {
            all += element.values;
        });
        return all;
    },
};
export default gettings;