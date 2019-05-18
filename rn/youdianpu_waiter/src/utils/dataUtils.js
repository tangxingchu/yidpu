export const constraintType = [{value: 1, text: "消费总额(满多少)"}, {value: 2, text: "具体时间段"}];
export const subtractType = [{value: 1, text: "现金优惠"}, {value: 2, text: "折扣"}, {value: 3, text: "赠现金券"}];


export const renderConstraint = (value) => {
    const constraint = constraintType.find(item => item.value == value);
    return constraint ? constraint.text : "";
}
export const renderSubtract = (value) => {
    const subtract = subtractType.find(item => item.value == value);
    return subtract ? subtract.text : "";
}