export const presdNum = (num) => {
    let arr = '';
    let returnNum = '';
    let count = 0;
    for (let i=0; i<num.length; i++) {
      if (num[i] == '.' && count < 1) {
        count = 1;
        arr += num[i];
        returnNum = arr;
      } else if (!isNaN(num[i]) && num[i] != '.') {
        arr += num[i];
        returnNum = arr;
      } else {
        returnNum = arr;
      }
    }
    return returnNum;
  };

  export const pureNum = (num) => {
    let arr = '';
    let returnNum = '';
    for (let i=0; i<num.length; i++) {
     if (!isNaN(num[i])) {
        arr += num[i];
        returnNum = arr;
      } else {
        returnNum = arr;
      }
    }
    return returnNum;
  };