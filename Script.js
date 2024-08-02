// JavaScript source code

const BWTinput = document.querySelector('#input1');

const drugDose = document.getElementsByClassName('drugdose');
const fluidCC = document.getElementsByClassName('fluidcc');

const drugSpeed = document.getElementsByClassName('drugspeed');
const drugSpeedTxt = document.getElementsByClassName('drugspeedtxt');
const drugResult = document.getElementsByClassName('drugresult');

const drugItemID = document.getElementById("drugitemid");
const addBt = document.getElementById("addbt");
const position = document.getElementById("position");

addBt.addEventListener('click', function (e) {
    //추가 버튼
    const item = drugItemID.content.cloneNode(true);
    position.appendChild(item);
    update();
})
window.addEventListener('input', function (e) {
    update();
});

const update = function (value) {
    console.log(BWTinput.value);
    
    //
    for (let i = 0; i < drugResult.length; i++) {
        let _bwt = Number(BWTinput.value);

        let _min = 0;
        let _dose = 0;

        let _drugdose = Number(drugDose[i].value);
        let _fluidcc = Number(fluidCC[i].value);

        let _drugspeed = drugSpeed[i].value;
        let _drugspeedtxt = drugSpeedTxt[i].value;
        switch (_drugspeedtxt) {
             
            case "mcg/kg/min":
                _min = 60;
                _dose = 1000;
                break;
            case "mcg/kg/hr":
                _min = 1;
                _dose = 1000;
                break;
            case "mcg/min":
                _min = 60;
                _dose = 1000;
                _bwt = 1;
                break;
            //mg
            case "mg/kg/min":
                _min = 60;
                _dose = 1;
                break;
            case "mg/kg/hr":
                _min = 1;
                _dose = 1;
                break;
            case "mg/min":
                _min = 60;
                _dose = 1;
                _bwt = 1;
                break;
            case "mg/hr":
                _min = 1;
                _dose = 1;
                _bwt = 1;
                break;
            //unit
            case "unit/kg/hr":
                _min = 60;
                _dose = 1000;
                break;
            case "unit/min":
                _min = 60;
                _dose = 1000;
                break;
            case "unit/hr":
                _min = 60;
                _dose = 1000;
                break;
        }
        //0.1mcg/kg/min = cc/hr
        // 0.1mcg/kg/min*hr = cc
        //0.0001  * drugdose / bwt / 60 //mcg는 *1000
        //(data.drugSpeed * data.fluidTotalcc * Bwt * 60) / (data.drugDose * dose);
        let _result = (_drugspeed * _fluidcc * _bwt * _min) / (_drugdose * _dose);

        drugResult[i].value = ` = ${_result.toFixed(1)}cc/hr `;
    }
}