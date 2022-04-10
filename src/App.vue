<template>
  <header>
    <h1>Number Base Converter</h1>
    <hr>
  </header>
  <div class="container-app">
    <div class="container-app-convertion">
      <h1>Convertion</h1>
      <p>Convert number from any base to any base.</p>
      <div class="container-app-convertion-form">
        <form>
          <div class="container-app-convertion-form-wrapper">
            <label for="number">Enter Number:</label><br/>
            <input type="text" placeholder="Enter a number" v-model.trim="formData.number"><br/>

            <label for="fromBase">From Base:</label><br/>
            <select name="fromBase" id="fromBase" v-model.lazy="formData.fromBase">
              <option value="2">2 (Binary)</option>
              <option value="8">8 (Octal)</option>
              <option value="10">10 (Decimal)</option>
              <option value="16">16 (Hexadecimal)</option>
            </select><br/>

            <label for="toBase">From Base:</label><br/>
            <select name="toBase" id="toBase" v-model.lazy="formData.toBase">
              <option value="2">2 (Binary)</option>
              <option value="8">8 (Octal)</option>
              <option value="10">10 (Decimal)</option>
              <option value="16">16 (Hexadecimal)</option>
            </select>

            <button class="convert" @click="calculate">Convert</button>
            <button class="swap">Swap</button>
            <button class="reset" type="reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
    <div class="container-app-calculation">
      <h1>Calculation</h1>
      <p v-if="formData.isComputed">Base {{formData.fromBase}} ({{formData.fromBaseName}}) to Base {{formData.toBase}} ({{formData.toBaseName}})<br/>Divided by the base to get the digits from the remainders.</p>
      <div class="container-app-calculation-wrapper">
        <div class="table-scroll">
          <table class="table-scroll-content">
            <thead>
              <tr>
                <td>Division</td>
                <td>Quotient</td>
                <td>Remainder</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="eachCalculation in formData.calculation" :key="eachCalculation">
                <td>{{eachCalculation[0]}}</td>
                <td>{{eachCalculation[1]}}</td>
                <td>{{eachCalculation[2]}}</td>
              </tr>
              <tr>
                <td colspan="3"><strong>Result:</strong> {{formData.result}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div>
    {{ JSON.stringify(formData) }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      formData: {
        number: "",
        fromBase: "#",
        toBase: "#",
        fromBaseName: "",
        toBaseName: "",
        calculation: [
          ["- - -","- - -","- - -"],
          ["- - -","- - -","- - -"],
          ["- - -","- - -","- - -"]
        ],
        isComputed: false,
        result: "- - -"
      }
    }
  },
  methods: {
    calculate(e) {
      alert("Changed");
      e.preventDefault();

      // Reset the value
      this.formData.result = "- - -";
      this.formData.isComputed = false;
      this.formData.calculation = [
        ["- - -","- - -","- - -"],
        ["- - -","- - -","- - -"],
        ["- - -","- - -","- - -"]
      ];

      // Object destructuring
      let { number, fromBase, toBase } = this.formData;

      // If input doesn't have data then stop the function.
      if(number == "" || fromBase == "" || toBase == "") return 0;

      if(fromBase == 2 && toBase != 2) {
        if (/^[0-1]+$/i.test(number) == false) return 0;

        // Convert Binary String to Number
        number = parseInt(number, 2);
        
        if(toBase == 8) this.formData.result = number.toString(8) + " (Base 8)";
        if(toBase == 10) this.formData.result = number + " (Base 10)";
        if(toBase == 16) this.formData.result = number.toString(16).toUpperCase() + " (Base 16)";

        this.handleCalculation(number, toBase);
      }

      if(fromBase == 8 && toBase != 8) {
        if (!(/[8-9]+$/i.test(number)) == false) return 0;

        // Convert Octal String to Number
        number = parseInt(number, 8);
        
        if(toBase == 2) this.formData.result = number.toString(2) + " (Base 2)";
        if(toBase == 8) this.formData.result = number + " (Base 10)";
        if(toBase == 16) this.formData.result = number.toString(16).toUpperCase() + " (Base 16)";
        
        this.handleCalculation(number, toBase);
      }

      if(fromBase == 10 && toBase != 10) {
        if (/^[0-9]+$/i.test(number) == false) return 0;

        // Convert Number String to Number
        number = Number(number);
        
        if(toBase == 2) this.formData.result = number.toString(2) + " (Base 2)";
        if(toBase == 8) this.formData.result = number.toString(8) + " (Base 8)";
        if(toBase == 16) this.formData.result = number.toString(16).toUpperCase() + " (Base 16)";
        
        this.handleCalculation(number, toBase);
      }

      if(fromBase == 16 && toBase != 16) {
        if (/^[0-9]+$/i.test(number) == false) return 0;

        // Convert Hexadecimal String to Number
        number = parseInt(number, 16);
        
        if(toBase == 2) this.formData.result = number.toString(2) + " (Base 2)";
        if(toBase == 8) this.formData.result = number.toString(8) + " (Base 8)";
        if(toBase == 16) this.formData.result = number + " (Base 10)";

        this.handleCalculation(number, toBase);
      }

      if(fromBase == 2) this.formData.fromBaseName = "Binary";
      if(toBase == 2) this.formData.toBaseName = "Binary";

      if(fromBase == 8) this.formData.fromBaseName = "Octal";
      if(toBase == 8) this.formData.toBaseName = "Octal";

      if(fromBase == 10) this.formData.fromBaseName = "Decimal";
      if(toBase == 10) this.formData.toBaseName = "Decimal";

      if(fromBase == 16) this.formData.fromBaseName = "Hexadecimal";
      if(toBase == 16) this.formData.toBaseName = "Hexadecimal";

      this.formData.isComputed = true;
    },
    handleCalculation(number, toBase) {
      this.formData.calculation = [];
      while(number > 0) {
        this.formData.calculation.push([number+"/"+toBase, (Math.floor(number/toBase)), ((number/toBase)-Math.floor(number/toBase))*toBase]);
        number = Math.floor(number/toBase);
      }
    }
  }
}
</script>

<style>
  @import '../css/app.css';
</style>
