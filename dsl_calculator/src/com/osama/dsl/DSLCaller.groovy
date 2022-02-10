package com.osama.dsl

import com.osama.dsl.calculator.CalculatorImpl
import com.osama.dsl.calculator.ICalculator

class DSLCaller {
    static void call(){
        ICalculator calculator = new CalculatorImpl()

        def binding = new Binding([
                action : calculator,
                sum : calculator.&sum,
                subtract : calculator.&subtract,
                multiply : calculator.&multiply,
                divide : calculator.&divide
        ])

        def shell = new GroovyShell(binding)
        shell.evaluate(new File("src/com/osama/dsl/CalculatorConsole.groovy"))
    }

    static void main(String[] args) {
        call()
    }
}
