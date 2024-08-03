// JavaScript source code

const BWTinput = document.querySelector('#input1');

const drugNameTxt = document.getElementsByClassName("drugnametxt");
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

    item.querySelector(".drugnametxt").addEventListener("touchstart", function (e) {
        e.currentTarget.value = "";
    })
    item.querySelector(".drugnametxt").addEventListener("mousedown", function (e) {
        e.currentTarget.value = "";
    })
    item.querySelector(".drugnametxt").addEventListener("change", drugsearch);
   

    position.appendChild(item);
    update();
})
window.addEventListener('input', function (e) {
    update();
});
/**
 * @param {InputEvent} e 
 */
function drugsearch(e) {
    let parent = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
    _drugnametxt = e.currentTarget.value;

    _drugdose = parent.querySelector(".drugdose");
    _fluidcc = parent.querySelector(".fluidcc");

    _drugspeed = parent.parentNode.querySelector(".drugspeed");
    _drugspeedtxt = parent.querySelector(".drugspeedtxt");
    

    switch (_drugnametxt) {
        /*
                            <option value="Norepinephrine"></option>
                            <option value="Dobutamine"></option>
                            <option value="Dopamix(premix)"></option>
                            <option value="Remifentanil"></option>
                            <option value="Propofol"></option>
                            <option value="Midazolam"></option>
                            <option value="Precedex"></option>
        */
        //innotropics
        case "Norepinephrine":
            _drugdose.value = 4;
            _fluidcc.value = 50;
            _drugspeed.value = 0.02;
            _drugspeedtxt.value = "mcg/kg/min";
            break;

        case "Dobutamine":
            _drugdose.value = 400;
            _fluidcc.value = 50;
            _drugspeed.value = 5;
            _drugspeedtxt.value = "mcg/kg/min";
            break;

        case "Dopamix(premix)":
            _drugdose.value = 400;
            _fluidcc.value = 200;
            _drugspeed.value = 5;
            _drugspeedtxt.value = "mcg/kg/min";
            break;

        //sedation
        case "Remifentanil":
            _drugdose.value = 5;
            _fluidcc.value = 50;
            _drugspeed.value = 0.05
            _drugspeedtxt.value = "mcg/kg/min";
            break;
        case "Propofol":
            _drugdose.value = 120;
            _fluidcc.value = 15;
            _drugspeed.value = 0.3;
            _drugspeedtxt.value = "mg/kg/hr";
            break;
        case "Midazolam":
            _drugdose.value = 30;
            _fluidcc.value = 30;
            _drugspeed.value = 1;
            _drugspeedtxt.value = "mg/hr";
            break;
        case "Precedex":
            _drugdose.value = 0.4;
            _fluidcc.value = 100;
            _drugspeed.value = 0.2;
            _drugspeedtxt.value = "mcg/kg/hr";
            break;

        default:
            break;

    }
    update();
    //
}

const update = function (value) {
    //console.log(BWTinput.value);
    
    //
    for (let i = 0; i < drugResult.length; i++) {
        let _drugnametxt = drugNameTxt[i].value;
        
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

        drugResult[i].innerText = ` = ${_result.toFixed(1)}cc/hr `;
    }
}