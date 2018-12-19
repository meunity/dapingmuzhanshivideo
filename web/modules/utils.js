function ValueFormat(value, precision) {
	if(value && precision >= 0){
		if(typeof value == 'string') {
			return Number(Number(value).toFixed(precision));
		}else if(typeof value == 'number') {
			return Number(value.toFixed(precision));
		}else {
			return value;
		}
	}else{
		return value;
	}
}

function isNumber(val){

  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if(regPos.test(val) || regNeg.test(val)){
      return true;
  }else{
      return false;
  }

}

export const Utils = {
    ValueFormat: (value, precision)=>{
        return ValueFormat(value, precision);
    },
    IsNumber:(value)=>{
      return isNumber(value);
  },
}
