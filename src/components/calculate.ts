//--Copyright (c) 2023 Robert A. Howell
import RWBError from "../models/RWBErrorBus";
import { PropagationLatencyCalculation } from "../models/PropagationLatencyCalculation";

/**
 * Propagation Latency component.
 */
const latencyCalculator = {
  init: () => {
    let distanceElem: HTMLInputElement;
    let mediumSpeedElem: HTMLInputElement;
    let packetSizeElem: HTMLInputElement;
    let transmissionRateElem: HTMLInputElement;
    let resetElem: HTMLInputElement;
    let calculateElem: HTMLInputElement;
    let exampleElem1: HTMLButtonElement;
    let exampleElem2: HTMLButtonElement;
    let exampleElem3: HTMLButtonElement;

    if (
      RWBError.checkElementforNull("latencyCalculator", "#distance", true, false) ||
      RWBError.checkElementforNull("latencyCalculator", "#mediumSpeed", true, false) ||
      RWBError.checkElementforNull("latencyCalculator", "#packetSize", true, false) ||
      RWBError.checkElementforNull("latencyCalculator", "#transmissionRate", true, false) ||
      RWBError.checkElementforNull("latencyCalculator", "#reset", true, false) ||
      RWBError.checkElementforNull("latencyCalculator", "#calculate", true, false)
    )
      console.log(`%cCheck missing elements at /pages/latency.html`, "color:orange;font-weight:bold;");

    distanceElem = document.querySelector("#distance") as HTMLInputElement;
    mediumSpeedElem = document.querySelector("#mediumSpeed") as HTMLInputElement;
    packetSizeElem = document.querySelector("#packetSize") as HTMLInputElement;
    transmissionRateElem = document.querySelector("#transmissionRate") as HTMLInputElement;
    resetElem = document.querySelector("#reset") as HTMLInputElement;
    calculateElem = document.querySelector("#calculate") as HTMLInputElement;
    exampleElem1 = document.querySelector("#example1") as HTMLButtonElement;
    exampleElem2 = document.querySelector("#example2") as HTMLButtonElement;
    exampleElem3 = document.querySelector("#example3") as HTMLButtonElement;

    calculateElem.addEventListener("click", event => {
      event.preventDefault();
      if (distanceElem.value == null || mediumSpeedElem.value == null) return; //TODO: handle null elements alerts
      if (document.querySelectorAll("#propcalcres p")) {
        let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
        let alltodelete = document.querySelectorAll("#propcalcres p");
        for (let n of alltodelete) {
          resultelem.removeChild(n);
        }
      }

      const validateNumberInput = (str: string) => {
        // Take user input and filter to an accepted string
        var regSTR: any;
        PropagationLatencyCalculation.numberValidation(str) ? (regSTR = Number(str)) : (regSTR = "INVALID");
        return regSTR;
      };

      var distance = validateNumberInput(distanceElem.value);
      if (distance == "INVALID") {
        //TODO: for now, return.
        return;
      }
      var mediumSpeed = validateNumberInput(mediumSpeedElem.value);
      if (mediumSpeed == "INVALID") {
        //TODO: for now, return.
        return;
      } else if (mediumSpeed > 300000) {
        //TODO: for now, return.
        return;
      }
      var packetSize = validateNumberInput(packetSizeElem.value);
      if (packetSize == "INVALID") {
        //TODO: for now, return.
        return;
      }
      var transmissionRate = validateNumberInput(transmissionRateElem.value);
      if (transmissionRate == "INVALID") {
        //TODO: for now, return.
        return;
      }

      let calculation = Object.create(
        new PropagationLatencyCalculation(distance, mediumSpeed, packetSize, transmissionRate)
      );
      console.log(`Answer found: ${calculation.propagationDelay}`);

      latencyCalculator.resultmarkup(calculation);
    });
    resetElem.addEventListener("click", event => {
      let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
      if (resultelem != null) {
        let alltodelete = document.querySelectorAll("#propcalcres p");
        for (let n of alltodelete) {
          resultelem.removeChild(n);
        }
      }
    });
    exampleElem1.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "300";
      mediumSpeedElem.value = "300000";
      packetSizeElem.value = "1500";
      transmissionRateElem.value = "1000000";
    });
    exampleElem2.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "90000000";
      mediumSpeedElem.value = "300000";
      packetSizeElem.value = "4500";
      transmissionRateElem.value = "100000";
    });
    exampleElem3.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "40000";
      mediumSpeedElem.value = "300000";
      packetSizeElem.value = "1500";
      transmissionRateElem.value = "10000";
    });
  },
  resultmarkup: (result: PropagationLatencyCalculation) => {
    let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
    let newResult = document.createElement("p");
    newResult.innerHTML = `
      Propagation Delay: <span>${result.getPropagationDelay()} s</span><br />
      Serialization Delay: <span>${result.getSerializationDelay()} s</span><br />
      Network Latency: <span>${result.getNetworkLatency()} s</span><br><hr>
    `;

    resultelem.appendChild(newResult);
  },
};

export default latencyCalculator;
