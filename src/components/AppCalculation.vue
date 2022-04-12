<template>
    <div class="container-app-calculation">
        <h1>Calculation</h1>
        <p v-if="isComputed">Base {{fromBaseIndependent}} ({{fromBaseName}}) to Base {{toBaseIndependent}} ({{toBaseName}})<br/>Divided by the base to get the digits from the remainders.</p>
        <div class="container-app-calculation-wrapper">
            <div class="table-scroll" v-if="isPower">
                <table class="table-scroll-content">
                    <thead>
                        <tr>
                            <td>{{fromBaseName}} to Decimal</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>({{numberIndependent}})<sub>{{fromBaseIndependent}}</sub> = <span v-html="powerCalculation.join(' + ')"></span></td>
                        </tr>
                        <tr class="result">
                            <td><strong>Result:</strong> {{toDecimal}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <h2 class="title" v-if="isComputed">{{fromBaseName}} to {{toBaseName}}</h2>
            <div class="table-scroll" v-if="isTable">
                <table class="table-scroll-content">
                    <thead>
                    <tr>
                        <td>Division</td>
                        <td>Quotient</td>
                        <td>Remainder</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="eachCalculation in calculation" :key="eachCalculation">
                        <td>{{eachCalculation[0]}}</td>
                        <td>{{eachCalculation[1]}}</td>
                        <td>{{eachCalculation[2]}}</td>
                    </tr>
                    <tr class="result">
                        <td colspan="3"><strong>Result:</strong> {{result}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppCalculation',
        props: {
            number: String,
            numberIndependent: String,
            fromBase: String,
            fromBaseIndependent: String,
            fromBaseName: String,
            toBase: String,
            toBaseIndependent: String,
            toBaseName: String,
            toDecimal: String,
            powerCalculation: Array,
            calculation: Array,
            convertToDecimal: Boolean,
            isPower: Boolean,
            isTable: Boolean,
            isComputed: Boolean,
            result: String
        }
    }
</script>