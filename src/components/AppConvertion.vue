<template>
  <div class="container-app">
    <div class="container-app-convertion">
      <h1>Convertion</h1>
      <p>Convert number from base to base.</p>
      <div class="container-app-convertion-form">
        <form @submit="calculate">
          <div class="container-app-convertion-form-wrapper">
            <label for="number">Enter Number:</label><br/>
            <input type="text" v-model.trim="formData.number" placeholder="Enter a number"><br/>

            <label for="fromBase">From Base:</label><br/>
            <select name="fromBase" id="fromBase" v-model="formData.fromBase">
              <option value="">-- From Base --</option>
              <option value="2">2 (Binary)</option>
              <option value="8">8 (Octal)</option>
              <option value="10">10 (Decimal)</option>
              <option value="16">16 (Hexadecimal)</option>
            </select><br/>

            <label for="toBase">To Base:</label><br/>
            <select name="toBase" id="toBase" v-model="formData.toBase">
              <option value="">-- To Base --</option>
              <option value="2">2 (Binary)</option>
              <option value="8">8 (Octal)</option>
              <option value="10">10 (Decimal)</option>
              <option value="16">16 (Hexadecimal)</option>
            </select>

            <button class="convert" id="convert" type="submit">Convert</button>
            <button class="swap" @click="swap">Swap</button>
            <button class="reset" type="reset" @click="reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
    <AppCalculation 
      :number = "formData.number" 
      :numberIndependent = "formData.numberIndependent" 
      :fromBase = "formData.fromBase"
      :fromBaseIndependent = "formData.fromBaseIndependent"
      :fromBaseName = "formData.fromBaseName"
      :toBase = "formData.toBase"
      :toBaseIndependent = "formData.toBaseIndependent"
      :toBaseName = "formData.toBaseName"
      :toDecimal = "formData.toDecimal"
      :powerCalculation = "formData.powerCalculation"
      :calculation = "formData.calculation"
      :isPower= "formData.isPower"
      :isTable= "formData.isTable"
      :isComputed= "formData.isComputed"
      :result= "formData.result"
    />
  </div>
</template>

<script>
import AppCalculation from './AppCalculation.vue';

export default {
  name: 'AppConvertion',
  components: {
    AppCalculation
  },
  data() {
    return {
      formData: {
        number: "",
        numberIndependent: "",
        fromBase: "",
        fromBaseIndependent: "",
        fromBaseName: "",
        toBase: "",
        toBaseIndependent: "",
        toBaseName: "",
        powerCalculation: [],
        calculation: [["- - -","- - -","- - -"],["- - -","- - -","- - -"],["- - -","- - -","- - -"]],
        isPower: false,
        isTable: true,
        isComputed: false,
        toDecimal: "---",
        result: "- - -"
      }
    }
  },
  methods: {
    calculate(e) {
      e.preventDefault();

      // Object destructuring
      let { number, fromBase, toBase } = this.formData;

      // Reset the value
      this.formData.powerCalculation = [];
      this.formData.calculation = [["- - -","- - -","- - -"],["- - -","- - -","- - -"],["- - -","- - -","- - -"]];
      this.formData.isPower = false;
      this.formData.isTable = true;
      this.formData.isComputed = false;
      this.formData.toDecimal = "- - -";
      this.formData.result = "- - -";

      // If input doesn't have data then stop the function.
      if(number == "" || fromBase == "" || toBase == "") return 0;

      if(fromBase == 2) this.handleBinary(number, fromBase, toBase);
      if(fromBase == 8) this.handleOctal(number, fromBase, toBase);
      if(fromBase == 10) this.handleDecimal(number, fromBase, toBase);
      if(fromBase == 16) this.handleHexadecimal(number, fromBase, toBase);

      if(fromBase == 2) this.formData.fromBaseName = "Binary";
      if(toBase == 2) this.formData.toBaseName = "Binary";
      if(fromBase == 8) this.formData.fromBaseName = "Octal";
      if(toBase == 8) this.formData.toBaseName = "Octal";
      if(fromBase == 10) this.formData.fromBaseName = "Decimal";
      if(toBase == 10) this.formData.toBaseName = "Decimal";
      if(fromBase == 16) this.formData.fromBaseName = "Hexadecimal";
      if(toBase == 16) this.formData.toBaseName = "Hexadecimal";

      this.formData.numberIndependent = number;
      this.formData.fromBaseIndependent = fromBase;
      this.formData.toBaseIndependent = toBase;

      if(this.formData.isComputed) window.location.href = "#result";
    },
    reset() {
      this.formData.number = "";
      this.formData.numberIndependent = "";
      this.formData.fromBase = "";
      this.formData.fromBaseIndependent = "";
      this.formData.fromBaseName = "";
      this.formData.toBase = "";
      this.formData.toBaseIndependent = "";
      this.formData.toBaseName = "";
      this.formData.powerCalculation = [];
      this.formData.calculation = [["- - -","- - -","- - -"],["- - -","- - -","- - -"],["- - -","- - -","- - -"]];
      this.formData.isPower = false;
      this.formData.isTable = true;
      this.formData.isComputed = false;
      this.formData.toDecimal = "---";
      this.formData.result = "- - -";
    },
    swap(e) {
      e.preventDefault();
      if(this.formData.isComputed) [this.formData.number, this.formData.result] = [this.formData.result, this.formData.number];
      [this.formData.fromBase, this.formData.toBase] = [this.formData.toBase, this.formData.fromBase];
      this.calculate(e);
    },
    handleBinary(number, fromBase, toBase) {
      if (/^[0-1]+$/i.test(number) == false) return 0;

      // Convert Binary String to Number
      number = parseInt(number, 2);

      // Convert Binary to Binary
      if(toBase == 2) this.formData.result = number.toString(2);
      
      // Convert Binary to Octal
      if(toBase == 8) this.formData.result = number.toString(8);

      // Convert Binary to Decimal
      if(toBase == 10) {
        this.formData.result = number.toString();
        this.formData.isTable = false;
      }

      // Convert Binary to Hexadecimal
      if(toBase == 16) this.formData.result = number.toString(16).toUpperCase();

      this.formData.isPower = true;
      this.formData.isComputed = true;
      this.formData.toDecimal = number.toString();
      this.handlePowerCalculation(number.toString(2), fromBase);
      this.handleCalculation(number, toBase);
    },
    handleOctal(number, fromBase, toBase) {
      if (!(/[8-9]+$/i.test(number)) == false) return 0;

      // Convert Octal to Decimal
      number = parseInt(number, 8);
      
      // Convert Octal to Binary
      if(toBase == 2) this.formData.result = number.toString(2);

      // Convert Octal to Octal
      if(toBase == 8) this.formData.result = number.toString(8);

      // Convert Octal to Decimal
      if(toBase == 10) {
        this.formData.isTable = false;
        this.formData.result = number.toString();
      }

      // Convert Octal to Hexadecimal
      if(toBase == 16) this.formData.result = number.toString(16).toUpperCase();

      this.formData.isPower = true;
      this.formData.isComputed = true;
      this.formData.toDecimal = number.toString();
      this.handlePowerCalculation(number.toString(8), fromBase);
      this.handleCalculation(number, toBase);
    },
    handleDecimal(number, fromBase, toBase) {
      if (/^[0-9]+$/i.test(number) == false) return 0;

      // Convert Decimal String to Decimal Number
      number = Number(number);
      
      // Convert Decimal to Binary
      if(toBase == 2) this.formData.result = number.toString(2);

      // Convert Decimal to Octal
      if(toBase == 8) this.formData.result = number.toString(8);

      // Convert Decimal to Decimal
      if(toBase == 10) this.formData.result = number.toString();

      // Convert Decimal to Hexadecimal
      if(toBase == 16) this.formData.result = number.toString(16).toUpperCase();

      this.formData.isPower = false;
      this.formData.isComputed = true;
      this.formData.toDecimal = number.toString();
      this.handlePowerCalculation(number.toString(8), fromBase);
      this.handleCalculation(number, toBase);
    },
    handleHexadecimal(number, fromBase, toBase) {
      if (/^[0-9]+$/i.test(number) == false) return 0;

      // Convert Hexadecimal String to Number
      number = parseInt(number, 16);
      
      // Convert Hexadecimal to Binary
      if(toBase == 2) this.formData.result = number.toString(2);

      // Convert Hexadecimal to Octal
      if(toBase == 8) this.formData.result = number.toString(8);

      // Convert Hexadecimal to Decimal
      if(toBase == 10) {
        this.formData.result = number.toString();
        this.formData.isTable = false;
      }

      // Convert Hexadecimal to Hexadecimal
      if(toBase == 16) {
        this.formData.result = number.toString(16);
        this.formData.isTable = false;
      }

      this.formData.isPower = true;
      this.formData.isComputed = true;
      this.formData.toDecimal = number.toString();
      this.handlePowerCalculation(number.toString(16), fromBase);
      this.handleCalculation(number, toBase);
    },
    handleCalculation(number, toBase) {
      this.formData.calculation = [];
      while(number > 0) {
        this.formData.calculation.push([number+"/"+toBase, (Math.floor(number/toBase)), Math.round(((number/toBase)-Math.floor(number/toBase))*toBase)]);
        number = Math.floor(number/toBase);
      }
    },
    handlePowerCalculation(number, fromBase) {
      this.formData.powerCalculation = [];
      number.split("").forEach((v,i,arr)=>this.formData.powerCalculation.push("("+v+" x "+fromBase+"<sup>"+(arr.length-i-1)+"</sup>)"));
    }
  }
}
</script>

<style>

</style>
